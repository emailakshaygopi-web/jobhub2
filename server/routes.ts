import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertJobApplicationSchema, insertResumeSchema, insertCoverLetterSchema } from "@shared/schema";
import { aiService } from "./services/aiService";
import { emailService } from "./services/emailService";
import { jobService } from "./services/jobService";
import { resumeService } from "./services/resumeService";
import { aiUsageService } from "./services/aiUsageService";
import { setupAuth, isAuthenticated } from "./replitAuth";
import multer from "multer";
import { z } from "zod";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Analytics endpoints
  app.get("/api/analytics", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      let analytics = await storage.getAnalytics(userId);
      
      if (!analytics) {
        // Create analytics with sample data if none exist
        analytics = await storage.createAnalytics(userId);
        // Update with sample data to match the UI
        analytics = await storage.updateAnalytics(userId, {
          totalContacts: 3, // Match the 3 contacts in ContactManagement.tsx
          totalDocuments: 2,
          totalApplications: 5,
          responseRate: 75,
          interviewsScheduled: 2,
          jobOffers: 1
        });
      }
      
      res.json(analytics);
    } catch (error) {
      console.error("Analytics error:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  app.get('/api/user-credits', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      let userCredits = await storage.getUserCredits(userId);
      
      if (!userCredits) {
        userCredits = await storage.createUserCredits(userId);
      }
      
      // Reset daily usage if it's a new day
      const today = new Date();
      const lastReset = new Date(userCredits.lastResetDate || today);
      
      if (today.toDateString() !== lastReset.toDateString()) {
        userCredits = await storage.resetDailyCredits(userId);
      }
      
      res.json(userCredits);
    } catch (error) {
      console.error("Error fetching user credits:", error);
      res.status(500).json({ message: "Failed to fetch user credits" });
    }
  });

  app.get('/api/usage-stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const stats = await aiUsageService.getUsageStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching usage stats:", error);
      res.status(500).json({ message: "Failed to fetch usage statistics" });
    }
  });

  // Visit tracking endpoints
  app.post('/api/track-visit', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { sessionId } = req.body;
      const ipAddress = req.ip || req.connection.remoteAddress;
      const userAgent = req.get('User-Agent');
      
      await storage.recordVisit(userId, sessionId, ipAddress, userAgent);
      res.json({ success: true });
    } catch (error) {
      console.error("Error tracking visit:", error);
      res.status(500).json({ message: "Failed to track visit" });
    }
  });

  app.get('/api/visit-summary', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      let visitSummary = await storage.getVisitSummary(userId);
      
      if (!visitSummary) {
        visitSummary = await storage.updateVisitSummary(userId);
      }
      
      res.json(visitSummary);
    } catch (error) {
      console.error("Error fetching visit summary:", error);
      res.status(500).json({ message: "Failed to fetch visit summary" });
    }
  });

  app.get('/api/check-upgrade-prompt', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const userCredits = await storage.getUserCredits(userId);
      const visitSummary = await storage.getVisitSummary(userId);
      
      // Only show upgrade prompt for free plan users
      if (userCredits?.plan !== 'free') {
        return res.json({ showPrompt: false, reason: 'not_free_plan' });
      }
      
      // Check if already shown prompt
      if (visitSummary?.upgradePromptShown) {
        return res.json({ showPrompt: false, reason: 'already_shown' });
      }
      
      // Show prompt on 6th unique day visit
      const shouldShowPrompt = (visitSummary?.uniqueDays || 0) >= 6;
      
      res.json({ 
        showPrompt: shouldShowPrompt,
        visitCount: visitSummary?.uniqueDays || 0,
        reason: shouldShowPrompt ? 'sixth_visit' : 'not_enough_visits'
      });
    } catch (error) {
      console.error("Error checking upgrade prompt:", error);
      res.status(500).json({ message: "Failed to check upgrade prompt" });
    }
  });

  app.post('/api/mark-upgrade-prompt-shown', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await storage.markUpgradePromptShown(userId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking upgrade prompt shown:", error);
      res.status(500).json({ message: "Failed to mark upgrade prompt shown" });
    }
  });

  // AI Salary Negotiation Tool (Pro feature)
  app.post('/api/salary-advice', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Admin access: User ID 47005508 has unlimited AI usage
      const ADMIN_USER_ID = '47005508';
      const isAdmin = userId === ADMIN_USER_ID;
      
      if (!isAdmin) {
        // Check if user has Pro plan for salary negotiation tool
        const userCredits = await storage.getUserCredits(userId);
        if (userCredits?.plan !== 'pro') {
          return res.status(403).json({ 
            message: "Salary Negotiation Tool requires Pro plan",
            upgradeRequired: true
          });
        }
      }
      
      const { jobTitle, location, experience, industry, currentSalary, targetSalary } = req.body;
      
      if (!jobTitle || !location || !experience) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      const salaryAdvice = await aiService.generateSalaryAdvice({
        jobTitle,
        location,
        experience,
        industry,
        currentSalary,
        targetSalary
      });
      
      res.json(salaryAdvice);
    } catch (error) {
      console.error("Salary advice error:", error);
      res.status(500).json({ message: "Failed to generate salary advice" });
    }
  });

  // AI Chatbot Assistant (Pro feature)
  app.post('/api/ai-chat', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Admin access: User ID 47005508 has unlimited AI usage
      const ADMIN_USER_ID = '47005508';
      const isAdmin = userId === ADMIN_USER_ID;
      
      if (!isAdmin) {
        // Check if user has Pro plan for AI chatbot
        const userCredits = await storage.getUserCredits(userId);
        if (userCredits?.plan !== 'pro') {
          return res.status(403).json({ 
            message: "AI Assistant requires Pro plan",
            upgradeRequired: true
          });
        }
      }
      
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ message: "Message is required" });
      }
      
      const response = await aiService.getChatResponse(message);
      
      res.json({ response });
    } catch (error) {
      console.error("AI chat error:", error);
      res.status(500).json({ message: "Failed to get chat response" });
    }
  });

  // Festive offers endpoints
  app.get('/api/festive-offers', async (req, res) => {
    try {
      const offers = await storage.getActiveFestiveOffers();
      res.json(offers);
    } catch (error) {
      console.error("Error fetching festive offers:", error);
      res.status(500).json({ message: "Failed to fetch festive offers" });
    }
  });

  app.get('/api/festive-offer/:code', async (req, res) => {
    try {
      const { code } = req.params;
      const offer = await storage.getFestiveOfferByCode(code);
      
      if (!offer) {
        return res.status(404).json({ message: "Offer not found or expired" });
      }
      
      res.json(offer);
    } catch (error) {
      console.error("Error fetching festive offer:", error);
      res.status(500).json({ message: "Failed to fetch festive offer" });
    }
  });

  app.post('/api/validate-offer', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { offerCode, planType, billingCycle } = req.body;
      
      if (!offerCode) {
        return res.status(400).json({ message: "Offer code is required" });
      }
      
      const offer = await storage.getFestiveOfferByCode(offerCode);
      
      if (!offer) {
        return res.status(404).json({ message: "Invalid or expired offer code" });
      }
      
      // Check if user has already used this offer
      const hasUsed = await storage.hasUserUsedOffer(userId, offer.id);
      if (hasUsed) {
        return res.status(400).json({ message: "You have already used this offer" });
      }
      
      // Check if offer applies to the selected plan and billing cycle
      if (offer.targetPlan && offer.targetPlan !== 'all' && offer.targetPlan !== planType) {
        return res.status(400).json({ message: "This offer is not valid for the selected plan" });
      }
      
      if (offer.billingCycle && offer.billingCycle !== billingCycle) {
        return res.status(400).json({ message: "This offer is not valid for the selected billing cycle" });
      }
      
      // Calculate discount
      const basePrice = planType === 'pro' ? (billingCycle === '6months' ? 30000 : 50000) : 0; // $300 for 6 months, $500 for annual
      let discountAmount = 0;
      
      if (offer.discountType === 'percentage') {
        discountAmount = Math.round((basePrice * offer.discountValue) / 100);
      } else if (offer.discountType === 'fixed') {
        discountAmount = offer.discountValue * 100; // Convert to cents
      }
      
      const finalAmount = Math.max(0, basePrice - discountAmount);
      
      res.json({
        valid: true,
        offer,
        pricing: {
          basePrice,
          discountAmount,
          finalAmount,
          savings: discountAmount,
          discountPercentage: Math.round((discountAmount / basePrice) * 100)
        }
      });
    } catch (error) {
      console.error("Error validating offer:", error);
      res.status(500).json({ message: "Failed to validate offer" });
    }
  });

  // Resume endpoints
  app.get("/api/resumes", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const resumes = await storage.getResumesByUserId(userId);
      res.json(resumes);
    } catch (error) {
      console.error("Resumes error:", error);
      res.status(500).json({ message: "Failed to fetch resumes" });
    }
  });

  app.post("/api/resumes/upload", isAuthenticated, upload.single("resume"), async (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const userId = req.user.claims.sub;
      const fileContent = req.file.buffer.toString('base64');
      const parsedContent = await resumeService.parseResume(fileContent, req.file.mimetype);
      
      const resumeData = insertResumeSchema.parse({
        userId,
        fileName: req.file.originalname,
        originalContent: fileContent,
        parsedContent,
      });

      const resume = await storage.createResume(resumeData);
      
      // Generate analysis and optimized versions
      const analysis = await resumeService.analyzeResume(parsedContent);
      const optimizedVersions = await resumeService.generateOptimizedVersions(parsedContent);
      
      const updatedResume = await storage.updateResume(resume.id, {
        analysisScore: analysis.score,
        keywords: analysis.keywords,
        optimizedVersions,
      });

      res.json(updatedResume);
    } catch (error) {
      console.error("Resume upload error:", error);
      res.status(500).json({ message: "Failed to process resume" });
    }
  });

  // Job search endpoints
  app.get("/api/jobs/search", async (req: any, res) => {
    try {
      const { query, location, salary, experience, page = 1, limit = 20 } = req.query;
      
      // Get user profile for intelligent matching if authenticated
      let userProfile = null;
      if (req.isAuthenticated && req.isAuthenticated()) {
        try {
          const userId = req.user.claims.sub;
          const user = await storage.getUser(userId);
          // Create a simple profile for job matching
          userProfile = {
            skills: query || 'software engineer',
            desiredTitle: query || 'developer',
            location: location || '',
            experience: experience || ''
          };
        } catch (err) {
          console.log('Could not get user profile for matching');
        }
      }
      
      const jobs = await jobService.searchJobs({
        query: query as string,
        location: location as string,
        salaryMin: salary ? parseInt(salary as string) : undefined,
        resultsPerPage: parseInt(limit as string),
        page: parseInt(page as string),
      }, userProfile);

      // Store discovered jobs
      for (const job of jobs.jobs) {
        try {
          await storage.createJob({
            externalId: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            description: job.description,
            salary: job.salary,
            url: job.url,
            platform: job.platform,
            matchScore: Math.floor(Math.random() * 40) + 60, // Mock match score
          });
        } catch (error) {
          // Job might already exist, continue
        }
      }

      res.json(jobs);
    } catch (error) {
      console.error("Job search error:", error);
      res.status(500).json({ message: "Failed to search jobs" });
    }
  });

  app.get("/api/jobs", async (req, res) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
      const jobs = await storage.getJobs(parseInt(limit as string), offset);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });

  // Admin-only job import endpoint
  app.post("/api/admin/import-jobs", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Check if user is admin (your specific user ID)
      if (userId !== "47005508") {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      // Import jobs from Excel file
      const { importJobsFromExcel } = await import('./scripts/importJobs');
      const result = await importJobsFromExcel('attached_assets/add all the jobs from the list in this format_1756438390728.xlsx');
      
      res.json({
        success: true,
        message: `Successfully imported ${result.imported} jobs, skipped ${result.skipped}`,
        ...result
      });
      
    } catch (error: any) {
      console.error("Job import error:", error);
      res.status(500).json({ message: "Failed to import jobs", error: error.message });
    }
  });

  // Admin-only endpoint to get all uploaded jobs
  app.get("/api/admin/uploaded-jobs", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Check if user is admin
      if (userId !== "47005508") {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      const uploadedJobs = await storage.getJobsByPlatform('Admin Upload');
      res.json(uploadedJobs);
      
    } catch (error: any) {
      console.error("Get uploaded jobs error:", error);
      res.status(500).json({ message: "Failed to fetch uploaded jobs" });
    }
  });

  // Job applications endpoints
  app.get("/api/applications", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const applications = await storage.getJobApplicationsByUserId(userId);
      res.json(applications);
    } catch (error) {
      console.error("Applications error:", error);
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  app.post("/api/applications", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const applicationData = insertJobApplicationSchema.parse({
        ...req.body,
        userId,
      });

      const application = await storage.createJobApplication(applicationData);
      
      // Update analytics
      const analytics = await storage.getAnalytics(userId);
      if (analytics) {
        await storage.updateAnalytics(userId, {
          totalApplications: (analytics.totalApplications || 0) + 1,
        });
      }

      res.json(application);
    } catch (error) {
      console.error("Create application error:", error);
      res.status(400).json({ message: "Invalid application data" });
    }
  });

  app.patch("/api/applications/:id", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const application = await storage.updateJobApplication(id, updates);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      res.json(application);
    } catch (error) {
      res.status(500).json({ message: "Failed to update application" });
    }
  });

  // Cover letter endpoints
  app.get("/api/cover-letters", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const coverLetters = await storage.getCoverLettersByUserId(userId);
      res.json(coverLetters);
    } catch (error) {
      console.error("Cover letters error:", error);
      res.status(500).json({ message: "Failed to fetch cover letters" });
    }
  });

  // AI resume generation endpoint
  app.post("/api/ai/generate-resume", isAuthenticated, async (req: any, res) => {
    try {
      console.log('Generate resume request received:', req.body);
      const { jobDescription, experienceLevel, industry, skills, template } = req.body;
      
      // Basic validation
      if (!jobDescription && !skills) {
        return res.status(400).json({ 
          message: "Either job description or skills must be provided" 
        });
      }
      
      const prompt = `Generate a professional resume based on the following information:
      
Job Description: ${jobDescription || 'Not provided'}
Experience Level: ${experienceLevel || 'Mid-level'}
Industry: ${industry || 'General'}
Key Skills: ${skills || 'Not specified'}
Template Style: ${template || 'Modern'}

Please create a well-structured resume with:
1. Professional Summary
2. Key Skills section
3. Work Experience (with relevant accomplishments)
4. Education
5. Additional relevant sections

Format it as plain text with clear sections.`;

      console.log('Sending prompt to AI service:', prompt.substring(0, 200) + '...');
      
      const aiResult = await aiService.generateText(prompt);
      
      if (!aiResult) {
        return res.status(500).json({ 
          message: "AI service failed to generate resume" 
        });
      }
      
      console.log('AI resume generation successful, length:', aiResult.length);
      
      res.json({
        success: true,
        content: aiResult,
        resume: aiResult,
        message: "Resume generated successfully"
      });
      
    } catch (error) {
      console.error("Resume generation error:", error);
      res.status(500).json({ 
        message: "Failed to generate resume",
        error: error.message 
      });
    }
  });

  // AI Resume Analysis endpoint for file uploads
  app.post("/api/ai/analyze-resume-upload", isAuthenticated, upload.single("resume"), async (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const userId = req.user.claims.sub;
      
      // Extract text from uploaded file
      let resumeContent = '';
      try {
        if (req.file.mimetype === 'application/pdf') {
          // For PDFs, store as base64 and let the AI service handle it
          resumeContent = `PDF file: ${req.file.originalname} (${req.file.size} bytes)`;
        } else {
          // For other file types, try to extract text
          resumeContent = req.file.buffer.toString('utf8');
        }
      } catch (error) {
        resumeContent = `File: ${req.file.originalname}`;
      }

      // Prepare input for caching and usage tracking
      const inputData = {
        fileName: req.file.originalname,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
      };

      // Check usage limits and cache
      const usageResult = await aiUsageService.checkUsageAndCache({
        userId,
        operationType: 'resume_check',
        inputData,
      });

      if (!usageResult.canProceed) {
        return res.status(429).json({ 
          message: "Daily AI generation limit reached. Upgrade to Pro for unlimited generations.",
          creditsRemaining: usageResult.creditsRemaining,
          upgradeUrl: "/pricing"
        });
      }

      // Return cached result if available
      if (usageResult.usageStatus === 'cache_hit' && usageResult.cachedResult) {
        return res.json({
          ...usageResult.cachedResult,
          cached: true,
          creditsRemaining: usageResult.creditsRemaining,
        });
      }

      // Perform AI analysis
      const analysis = await aiService.analyzeResume(resumeContent);
      
      // Store usage and cache result
      const outputData = {
        score: analysis.score,
        feedback: analysis.feedback,
        keywords: analysis.keywords,
        suggestions: analysis.suggestions,
      };

      // Cache the result for future use
      await storage.createCache({
        requestHash: usageResult.requestHash!,
        operationType: 'resume_check',
        inputData,
        outputData,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      });

      // Update user credits
      await storage.incrementDailyUsage(userId);

      // Log usage
      await storage.createAiUsage({
        userId,
        operationType: 'resume_check',
        requestHash: usageResult.requestHash!,
        status: 'success',
        tokensUsed: Math.floor(resumeContent.length / 4),
        costEstimate: 1,
      });

      res.json({
        ...outputData,
        cached: false,
        creditsRemaining: usageResult.creditsRemaining,
      });
    } catch (error) {
      console.error("AI resume file analysis error:", error);
      res.status(500).json({ message: "Failed to analyze resume" });
    }
  });

  // AI Resume Analysis endpoint for text content
  app.post("/api/ai/analyze-resume", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { resumeContent, jobTitle } = req.body;
      
      if (!resumeContent) {
        return res.status(400).json({ message: "Resume content is required" });
      }

      // Prepare input for caching and usage tracking
      const inputData = {
        content: resumeContent.substring(0, 500), // First 500 chars for hash
        jobTitle: jobTitle || "general",
      };

      // Check usage limits and cache
      const usageResult = await aiUsageService.checkUsageAndCache({
        userId,
        operationType: 'resume_check',
        inputData,
      });

      if (!usageResult.canProceed) {
        return res.status(429).json({ 
          message: "Daily AI generation limit reached. Upgrade to Pro for unlimited generations.",
          creditsRemaining: usageResult.creditsRemaining,
          upgradeUrl: "/pricing"
        });
      }

      // Return cached result if available
      if (usageResult.usageStatus === 'cache_hit' && usageResult.cachedResult) {
        return res.json({
          ...usageResult.cachedResult,
          cached: true,
          creditsRemaining: usageResult.creditsRemaining,
        });
      }

      // Perform AI analysis
      const analysis = await aiService.analyzeResume(resumeContent);
      
      // Store usage and cache result
      const outputData = {
        score: analysis.score,
        feedback: analysis.feedback,
        keywords: analysis.keywords,
        suggestions: analysis.suggestions,
      };

      // Cache the result for future use
      await storage.createCache({
        requestHash: usageResult.requestHash!,
        operationType: 'resume_check',
        inputData,
        outputData,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      });

      // Update user credits
      await storage.incrementDailyUsage(userId);

      // Log usage
      await storage.createAiUsage({
        userId,
        operationType: 'resume_check',
        requestHash: usageResult.requestHash!,
        status: 'success',
        tokensUsed: Math.floor(resumeContent.length / 4),
        costEstimate: 1,
      });

      res.json({
        ...outputData,
        cached: false,
        creditsRemaining: usageResult.creditsRemaining,
      });
    } catch (error) {
      console.error("AI resume analysis error:", error);
      res.status(500).json({ message: "Failed to analyze resume" });
    }
  });

  app.post("/api/cover-letters/generate", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { applicationId, jobTitle, company, tone, additionalNotes } = req.body;
      
      let application = null;
      let finalJobTitle = jobTitle;
      let finalCompany = company;
      
      // If applicationId is provided, get the application details
      if (applicationId) {
        application = await storage.getJobApplication(applicationId);
        if (!application) {
          return res.status(404).json({ message: "Application not found" });
        }
        finalJobTitle = application.jobTitle;
        finalCompany = application.company;
      }

      // Validate required fields
      if (!finalJobTitle || !finalCompany) {
        return res.status(400).json({ message: "Job title and company are required" });
      }

      // Get user's resume
      const resumes = await storage.getResumesByUserId(userId);
      const resume = resumes[0]; // Use most recent resume
      
      // Prepare input for caching and usage tracking
      const inputData = {
        jobTitle: finalJobTitle,
        company: finalCompany,
        tone: tone || "professional",
        resumeHash: resume?.id || "no-resume", // Use resume ID as identifier
        additionalNotes,
      };

      // Check usage limits and cache
      const usageResult = await aiUsageService.checkUsageAndCache({
        userId,
        operationType: 'cover_letter',
        inputData,
      });

      if (!usageResult.canProceed) {
        return res.status(429).json({ 
          message: "Daily AI generation limit reached. Upgrade to Pro for unlimited generations.",
          creditsRemaining: usageResult.creditsRemaining,
          upgradeUrl: "/pricing"
        });
      }

      // Return cached result if available
      if (usageResult.usageStatus === 'cache_hit' && usageResult.cachedResult) {
        return res.json({
          ...usageResult.cachedResult,
          cached: true,
          creditsRemaining: usageResult.creditsRemaining,
        });
      }
      
      // Get company research
      let companyInfo = await storage.getCompanyResearch(finalCompany);
      if (!companyInfo) {
        const research = await aiService.searchCompanyInfo(finalCompany);
        companyInfo = await storage.createCompanyResearch({
          company: finalCompany,
          ...research,
        });
      }

      // Generate cover letter
      const resumeContent = resume?.originalContent || "No resume available";
      const jobDescription = `${finalJobTitle} at ${finalCompany}`;
      
      let content: string;
      let tokensUsed = 0;
      
      try {
        content = await aiService.generateCoverLetter(
          resumeContent,
          jobDescription,
          companyInfo
        );
        tokensUsed = Math.floor(content.length / 4); // Rough token estimate
      } catch (error) {
        // Record failure
        await aiUsageService.recordFailure(
          userId,
          'cover_letter',
          usageResult.requestHash!,
          error instanceof Error ? error.message : 'Unknown error'
        );
        throw error;
      }

      const coverLetterData = insertCoverLetterSchema.parse({
        userId,
        applicationId,
        content,
        tone: tone || "professional",
        template: "ai-generated",
      });

      const coverLetter = await storage.createCoverLetter(coverLetterData);
      
      // Record successful usage and cache result
      await aiUsageService.recordUsage(
        userId,
        'cover_letter',
        usageResult.requestHash!,
        coverLetter,
        tokensUsed
      );

      res.json({
        ...coverLetter,
        cached: false,
        creditsRemaining: usageResult.creditsRemaining,
      });
    } catch (error) {
      console.error("Cover letter generation error:", error);
      res.status(500).json({ message: "Failed to generate cover letter" });
    }
  });

  // Company research endpoint
  app.get("/api/company/:name", async (req, res) => {
    try {
      const { name } = req.params;
      
      let companyInfo = await storage.getCompanyResearch(name);
      if (!companyInfo) {
        const research = await aiService.searchCompanyInfo(name);
        companyInfo = await storage.createCompanyResearch({
          company: name,
          ...research,
        });
      }

      res.json(companyInfo);
    } catch (error) {
      console.error("Company research error:", error);
      res.status(500).json({ message: "Failed to research company" });
    }
  });

  // Email endpoints
  app.post("/api/email/test", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const userEmail = req.user.claims.email;
      
      if (!userEmail) {
        return res.status(400).json({ message: "No email address found for user" });
      }
      
      const success = await emailService.sendEmail({
        to_email: userEmail,
        to_name: "Test User",
        from_name: "JobHub",
        from_email: userEmail, // Use the user's own email as sender since it's verified
        subject: "Test Email from JobHub",
        message: `Hello! This is a test email from JobHub.
        
✅ Your SendGrid integration is working perfectly!
✅ Email service is configured correctly
✅ You can now receive job application notifications

This email was sent to verify that our email system is functioning properly for your job search automation needs.

Best regards,
JobHub Team`
      });
      
      if (success) {
        res.json({ 
          success: true, 
          message: `Test email sent successfully to ${userEmail}!` 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to send test email" 
        });
      }
      
    } catch (error) {
      console.error("Test email error:", error);
      res.status(500).json({ message: "Failed to send test email" });
    }
  });

  app.post("/api/email/follow-up", async (req, res) => {
    try {
      const { applicationId, customMessage } = req.body;
      
      const application = await storage.getJobApplication(applicationId);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      // This endpoint needs to be authenticated for user-specific analytics
      return res.status(501).json({ message: "Feature requires authentication" });

      res.json({ success: false, message: "Email feature requires authentication" });
    } catch (error) {
      console.error("Email sending error:", error);
      res.status(500).json({ message: "Failed to send email" });
    }
  });

  // Job analysis endpoint
  app.post("/api/jobs/analyze", async (req, res) => {
    try {
      const { jobDescription } = req.body;
      const analysis = await aiService.analyzeJobDescription(jobDescription);
      res.json(analysis);
    } catch (error) {
      console.error("Job analysis error:", error);
      res.status(500).json({ message: "Failed to analyze job" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
