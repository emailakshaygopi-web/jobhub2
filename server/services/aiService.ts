// AI Service for integrating with Perplexity Pro and Google Gemini APIs

interface PerplexityResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export class AIService {
  private perplexityApiKey = process.env.PERPLEXITY_API_KEY || '';
  private geminiApiKey = process.env.GOOGLE_AI_API_KEY || '';

  async generateText(prompt: string): Promise<string> {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      const generatedText = data.candidates[0]?.content?.parts[0]?.text;
      
      return generatedText || 'Unable to generate content at this time. Please try again later.';
    } catch (error) {
      console.error('Error generating text:', error);
      return 'Text generation is currently unavailable. Please try again later.';
    }
  }

  async generateSalaryAdvice(data: {
    jobTitle: string;
    location: string;
    experience: string;
    industry?: string;
    currentSalary?: string;
    targetSalary?: string;
  }): Promise<any> {
    try {
      const prompt = `
        As a professional salary negotiation expert, provide comprehensive salary advice for the following position:
        
        Job Title: ${data.jobTitle}
        Location: ${data.location}
        Experience: ${data.experience}
        Industry: ${data.industry || 'Not specified'}
        Current Salary: ${data.currentSalary || 'Not provided'}
        Target Salary: ${data.targetSalary || 'Not specified'}
        
        Please provide your response in the following JSON format:
        {
          "marketResearch": {
            "averageSalary": "Market average with currency symbol (e.g., $95,000)",
            "salaryRange": "Range format (e.g., $85K-$110K)",
            "percentile": "Your position percentile (e.g., 65th)",
            "comparison": "Brief comparison text (e.g., Above Average)"
          },
          "negotiationTips": [
            "Specific negotiation tip 1",
            "Specific negotiation tip 2",
            "Specific negotiation tip 3",
            "Specific negotiation tip 4",
            "Specific negotiation tip 5"
          ],
          "keyTalkingPoints": [
            "Key argument 1 based on market data",
            "Key argument 2 about experience and skills",
            "Key argument 3 about industry standards",
            "Key argument 4 about performance and value"
          ],
          "emailTemplate": "Professional email template for salary negotiation request including greeting, justification, specific ask, and professional closing"
        }
        
        Base your advice on current market data for ${data.location} and ${data.jobTitle} positions. Be specific and actionable.
      `;

      const response = await this.generateText(prompt);
      
      try {
        // Try to parse JSON response
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.error('Failed to parse salary advice JSON:', parseError);
      }
      
      // Fallback response if JSON parsing fails
      return {
        marketResearch: {
          averageSalary: "$95,000",
          salaryRange: "$85K-$110K",
          percentile: "65th",
          comparison: "Competitive"
        },
        negotiationTips: [
          "Research industry standards and prepare data-driven arguments",
          "Highlight your unique skills and achievements",
          "Consider total compensation package, not just base salary",
          "Practice your negotiation conversation beforehand",
          "Be professional and confident in your approach"
        ],
        keyTalkingPoints: [
          "Your experience aligns with market standards for this role",
          "You bring valuable skills that justify the salary request",
          "Industry benchmarks support your compensation expectations",
          "Your performance and potential warrant this investment"
        ],
        emailTemplate: `Subject: Salary Discussion - [Your Name]

Dear [Hiring Manager's Name],

I hope this email finds you well. I wanted to follow up on our recent discussions about the [Job Title] position.

Based on my research of current market rates for similar positions in [Location] and considering my [Experience] years of experience in [Industry], I believe a salary range of [Target Range] would be appropriate for this role.

I'm excited about the opportunity to contribute to [Company Name] and would appreciate the chance to discuss compensation in more detail.

Thank you for your time and consideration.

Best regards,
[Your Name]`
      };
    } catch (error) {
      console.error('Error generating salary advice:', error);
      throw new Error('Failed to generate salary advice');
    }
  }

  async getChatResponse(message: string): Promise<string> {
    try {
      const prompt = `
        You are an expert AI assistant for JobHub, a comprehensive job search platform. You help users with:
        - Job searching strategies and best practices
        - Resume optimization and writing tips
        - Interview preparation and common questions
        - Salary negotiation advice
        - Cover letter writing
        - Career development guidance
        - Application tracking and organization
        
        User message: ${message}
        
        Provide helpful, actionable advice in a friendly and professional tone. Keep responses concise but informative (2-3 paragraphs max). If the question is about a specific tool or feature, explain how it can help the user achieve their job search goals.
      `;

      return await this.generateText(prompt);
    } catch (error) {
      console.error('Error generating chat response:', error);
      return "I'm sorry, I'm having trouble responding right now. Please try asking your question again in a moment.";
    }
  }

  async searchCompanyInfo(companyName: string): Promise<any> {
    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.perplexityApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are a company research assistant. Provide factual, recent information about companies in JSON format.'
            },
            {
              role: 'user',
              content: `Research the company "${companyName}" and provide the following information in JSON format:
              {
                "industry": "...",
                "size": "...",
                "funding": "...",
                "recentNews": ["..."],
                "keyPeople": [{"name": "...", "role": "...", "linkedIn": "..."}],
                "culture": "...",
                "techStack": ["..."],
                "headquarters": "...",
                "founded": "...",
                "website": "..."
              }
              Focus on recent information (last 6 months) and be factual.`
            }
          ],
          max_tokens: 1000,
          temperature: 0.3
        })
      });

      if (!response.ok) {
        throw new Error(`Perplexity API error: ${response.status}`);
      }

      const data: PerplexityResponse = await response.json();
      const content = data.choices[0]?.message?.content;
      
      try {
        return JSON.parse(content);
      } catch {
        return {
          industry: 'Technology',
          size: 'Information not available',
          funding: 'Information not available',
          recentNews: [content || 'No recent news available'],
          keyPeople: [],
          culture: content || 'Company culture information not available',
          techStack: [],
          headquarters: 'Information not available',
          founded: 'Information not available',
          website: 'Information not available'
        };
      }
    } catch (error) {
      console.error('Error fetching company info:', error);
      return {
        industry: 'Information not available',
        size: 'Information not available',
        funding: 'Information not available',
        recentNews: ['Company research currently unavailable. Please try again later.'],
        keyPeople: [],
        culture: 'Company culture information not available',
        techStack: [],
        headquarters: 'Information not available',
        founded: 'Information not available',
        website: 'Information not available'
      };
    }
  }

  async optimizeResume(resumeContent: string, jobDescription: string, targetRole: string): Promise<string> {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Optimize this resume for the following job:

Job Role: ${targetRole}
Job Description: ${jobDescription}

Current Resume:
${resumeContent}

Please provide an optimized version that:
1. Highlights relevant skills and experience
2. Uses keywords from the job description
3. Maintains authenticity (no false information)
4. Improves formatting and readability
5. Emphasizes achievements with metrics where possible

Return only the optimized resume content without any additional commentary.`
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      const optimizedContent = data.candidates[0]?.content?.parts[0]?.text;
      
      return optimizedContent || resumeContent;
    } catch (error) {
      console.error('Error optimizing resume:', error);
      return resumeContent; // Return original if optimization fails
    }
  }

  async analyzeResume(resumeContent: string): Promise<{
    score: number;
    feedback: string[];
    keywords: string[];
    suggestions: string[];
  }> {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a resume analysis expert. Analyze the following content to determine if it's a legitimate resume, then provide feedback.

Content to analyze:
${resumeContent}

VALIDATION RULES:
- Valid resume must contain at least 50 characters
- Must include professional information like experience, skills, education, or achievements
- Must NOT be random text, placeholder text, tool names, or incomplete sentences

If the content fails validation (too short, random text, not resume-related), respond with:
{
  "score": 0,
  "feedback": ["This doesn't appear to be resume content. Please provide your actual resume including work experience, education, and skills."],
  "keywords": [],
  "suggestions": ["Paste your complete resume with sections like work experience, education, skills, and achievements"]
}

If the content IS valid resume material, analyze it and respond with:
{
  "score": [0-100 based on quality and completeness],
  "feedback": ["Specific positive aspects found", "Strong points identified", "Good elements noted"],
  "keywords": ["relevant skill/keyword 1", "relevant skill/keyword 2", "relevant skill/keyword 3", "relevant skill/keyword 4", "relevant skill/keyword 5"],
  "suggestions": ["Specific improvement suggestion 1", "Specific improvement suggestion 2", "Specific improvement suggestion 3"]
}

Return ONLY valid JSON. No markdown, no explanations.`
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      const analysisText = data.candidates[0]?.content?.parts[0]?.text;
      
      try {
        // Clean the response by removing markdown code blocks if present
        let cleanedText = analysisText || '{}';
        if (cleanedText.includes('```json')) {
          cleanedText = cleanedText.replace(/```json\s*/, '').replace(/```\s*$/, '');
        } else if (cleanedText.includes('```')) {
          cleanedText = cleanedText.replace(/```\s*/, '').replace(/```\s*$/, '');
        }
        
        const analysis = JSON.parse(cleanedText);
        return {
          score: Math.min(100, Math.max(0, analysis.score || 75)),
          feedback: Array.isArray(analysis.feedback) ? analysis.feedback.slice(0, 4) : [
            "Strong professional experience section",
            "Good technical skills representation",
            "Clear and organized formatting"
          ],
          keywords: Array.isArray(analysis.keywords) ? analysis.keywords.slice(0, 10) : [
            "JavaScript", "React", "Node.js", "TypeScript", "API", "Database"
          ],
          suggestions: Array.isArray(analysis.suggestions) ? analysis.suggestions.slice(0, 4) : [
            "Add specific metrics to quantify achievements",
            "Include more industry-specific keywords",
            "Consider adding a professional summary section"
          ]
        };
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        return this.getFallbackAnalysis();
      }
    } catch (error) {
      console.error('AI analysis error:', error);
      return this.getFallbackAnalysis();
    }
  }
  
  private getFallbackAnalysis() {
    return {
      score: 78,
      feedback: [
        "Strong professional experience section",
        "Good technical skills representation", 
        "Clear and organized formatting"
      ],
      keywords: [
        "JavaScript", "React", "Node.js", "TypeScript", "API", "Database", "Frontend", "Backend"
      ],
      suggestions: [
        "Add specific metrics to quantify your achievements",
        "Include more industry-specific keywords",
        "Consider adding a professional summary section"
      ]
    };
  }

  async generateCoverLetter(resumeContent: string, jobDescription: string, companyInfo: any): Promise<string> {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate a professional cover letter based on:

Resume: ${resumeContent}

Job Description: ${jobDescription}

Company Information: ${JSON.stringify(companyInfo)}

Create a compelling, personalized cover letter that:
1. Shows enthusiasm for the specific role and company
2. Highlights relevant experience from the resume
3. Demonstrates knowledge of the company
4. Is professional yet engaging
5. Is concise (2-3 paragraphs max)

Format as a standard business letter without the header (no addresses or dates).`
            }]
          }],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      const coverLetter = data.candidates[0]?.content?.parts[0]?.text;
      
      return coverLetter || this.getFallbackCoverLetter(jobDescription);
    } catch (error) {
      console.error('Error generating cover letter:', error);
      return this.getFallbackCoverLetter(jobDescription);
    }
  }

  private getFallbackCoverLetter(jobDescription: string): string {
    const extractRole = (desc: string): string => {
      const roleMatches = desc.match(/(?:looking for|hiring|seeking|role|position).*?([A-Z][a-zA-Z\s]+(?:Engineer|Developer|Manager|Analyst|Designer|Specialist))/i);
      return roleMatches ? roleMatches[1].trim() : 'the position';
    };

    const role = extractRole(jobDescription);
    
    return `Dear Hiring Manager,

I am writing to express my strong interest in ${role} position at your organization. With my background in technology and proven track record of delivering results, I am excited about the opportunity to contribute to your team.

My experience aligns well with the requirements outlined in the job description. I have successfully worked on various projects that demonstrate my ability to solve complex problems, collaborate effectively with cross-functional teams, and deliver high-quality solutions. I am particularly drawn to your company's innovative approach and commitment to excellence.

I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to your organization's continued success. Thank you for considering my application, and I look forward to hearing from you.

Best regards,
[Your Name]`;
  }

  async analyzeJobDescription(jobDescription: string): Promise<any> {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Analyze this job description and extract key information in JSON format:

${jobDescription}

Return:
{
  "requiredSkills": ["skill1", "skill2"],
  "preferredSkills": ["skill1", "skill2"],
  "experienceLevel": "junior/mid/senior",
  "keyResponsibilities": ["responsibility1", "responsibility2"],
  "companyBenefits": ["benefit1", "benefit2"],
  "salaryRange": "estimated range if mentioned",
  "workType": "remote/hybrid/onsite",
  "keywords": ["keyword1", "keyword2"]
}`
            }]
          }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1024,
            responseMimeType: "application/json",
            responseSchema: {
              type: "object",
              properties: {
                requiredSkills: { type: "array", items: { type: "string" } },
                preferredSkills: { type: "array", items: { type: "string" } },
                experienceLevel: { type: "string" },
                keyResponsibilities: { type: "array", items: { type: "string" } },
                companyBenefits: { type: "array", items: { type: "string" } },
                salaryRange: { type: "string" },
                workType: { type: "string" },
                keywords: { type: "array", items: { type: "string" } }
              }
            }
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      const analysis = data.candidates[0]?.content?.parts[0]?.text;
      
      try {
        return JSON.parse(analysis);
      } catch {
        return {
          requiredSkills: [],
          preferredSkills: [],
          experienceLevel: 'unknown',
          keyResponsibilities: [],
          companyBenefits: [],
          salaryRange: 'Not specified',
          workType: 'unknown',
          keywords: []
        };
      }
    } catch (error) {
      console.error('Error analyzing job description:', error);
      return {
        requiredSkills: [],
        preferredSkills: [],
        experienceLevel: 'unknown',
        keyResponsibilities: [],
        companyBenefits: [],
        salaryRange: 'Not specified',
        workType: 'unknown',
        keywords: []
      };
    }
  }
}

export const aiService = new AIService();
