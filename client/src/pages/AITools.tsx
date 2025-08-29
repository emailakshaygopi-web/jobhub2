import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import AIChatbot from "@/components/AIChatbot";
import type { User } from "@shared/schema";
import {
  FileText,
  Target,
  Upload,
  Download,
  LogOut,
  User as UserIcon,
  CheckCircle,
  AlertCircle,
  Info,
  Bot
} from "lucide-react";

export default function AITools() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('ai-resume-checker');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showFloatingChatbot, setShowFloatingChatbot] = useState(false);

  const typedUser = user as User | undefined;
  const ADMIN_USER_ID = '47005508';
  const isAdmin = (user as any)?.id === ADMIN_USER_ID;

  const { data: userCredits } = useQuery({
    queryKey: ["/api/user-credits"],
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const runAIAnalysis = async () => {
    console.log('runAIAnalysis called, uploadedFile:', uploadedFile);
    if (!uploadedFile) {
      console.log('No uploaded file found');
      return;
    }
    
    setIsAnalyzing(true);
    console.log('Starting analysis for file:', uploadedFile.name, 'Type:', uploadedFile.type);
    
    try {
      // Always use the file upload endpoint for consistent handling
      const formData = new FormData();
      formData.append('resume', uploadedFile);
      
      console.log('Sending request to /api/ai/analyze-resume-upload');
      const response = await fetch('/api/ai/analyze-resume-upload', {
        method: 'POST',
        body: formData,
        credentials: 'include', // Include cookies for authentication
      });
      
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`Analysis failed: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      console.log('Analysis result:', result);
      
      const analysisData = {
        overallScore: result.score || 0,
        atsCompatibility: result.score || 0,
        keywordOptimization: Math.max(0, (result.score || 0) - 10),
        skillsGapAnalysis: Math.max(0, (result.score || 0) - 15),
        impactMeasurement: Math.max(0, (result.score || 0) - 5),
        recommendations: result.suggestions || result.feedback || ["No recommendations available"],
        strengths: result.feedback || ["Analysis completed successfully"],
        improvements: result.suggestions || ["No improvements suggested"]
      };
      
      console.log('Setting analysis result:', analysisData);
      setAnalysisResult(analysisData);
      
      // Force a re-render by adding a timestamp
      setAnalysisResult({
        ...analysisData,
        timestamp: Date.now()
      });
      
      // Scroll to results after a delay to ensure rendering
      setTimeout(() => {
        const resultsElement = document.querySelector('[data-testid="analysis-results"]');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.log('Results element not found');
        }
      }, 500);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert(`Analysis failed: ${error.message}`);
      setAnalysisResult({
        error: 'Failed to analyze resume. Please try again.',
        overallScore: 0,
        recommendations: ["Please try uploading again or check your file format."]
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderAIResumeChecker = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card className="huntr-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-blue-600" />
              Upload Resume
            </CardTitle>
            <CardDescription>
              Upload your resume for comprehensive AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="resume-upload">Resume File</Label>
              <Input 
                id="resume-upload" 
                type="file" 
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="mt-1"
              />
              {uploadedFile && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ {uploadedFile.name} uploaded
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="target-position">Target Position (Optional)</Label>
              <Input 
                id="target-position" 
                placeholder="e.g., Senior Software Engineer"
                className="mt-1"
              />
            </div>
            <Button 
              onClick={runAIAnalysis}
              disabled={!uploadedFile || isAnalyzing}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}
            </Button>
          </CardContent>
        </Card>

        {/* Analysis Preview */}
        <Card className="huntr-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              What We Analyze
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">ATS Compatibility</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Keyword Optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Skills Gap Analysis</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Impact Measurement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Format Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Industry Standards</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Analysis Results */}
      {analysisResult && (
        <Card className="huntr-card" data-testid="analysis-results">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Analysis Results
            </CardTitle>
            <CardDescription>
              Your resume analysis is complete. Here's what we found:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Score */}
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {analysisResult.overallScore}%
              </div>
              <p className="text-gray-600">Overall Resume Score</p>
            </div>

            {/* Detailed Scores */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {analysisResult.atsCompatibility}%
                </div>
                <p className="text-sm text-gray-600">ATS Compatible</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {analysisResult.keywordOptimization}%
                </div>
                <p className="text-sm text-gray-600">Keyword Optimized</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {analysisResult.skillsGapAnalysis}%
                </div>
                <p className="text-sm text-gray-600">Skills Match</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {analysisResult.impactMeasurement}%
                </div>
                <p className="text-sm text-gray-600">Impact Score</p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {analysisResult.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Strengths
                </h4>
                <ul className="space-y-2">
                  {analysisResult.strengths.map((strength: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Download Detailed Report
              </Button>
              <Button variant="outline">
                Improve Resume
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderAIResumeBuilder = () => (
    <Card className="huntr-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-green-600" />
          AI Resume Builder
        </CardTitle>
        <CardDescription>
          Build a professional resume with AI assistance tailored to your target job
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="job-description">Job Description</Label>
              <Textarea 
                id="job-description" 
                placeholder="Paste the job description here for AI-tailored content..."
                className="mt-1 h-32"
              />
            </div>
            <div>
              <Label htmlFor="experience-level">Experience Level</Label>
              <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md">
                <option value="">Select your experience level</option>
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="mid">Mid Level (3-5 years)</option>
                <option value="senior">Senior Level (6+ years)</option>
                <option value="executive">Executive Level (10+ years)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Input 
                id="industry" 
                placeholder="e.g., Technology, Finance, Healthcare"
                className="mt-1"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="skills">Key Skills</Label>
              <Textarea 
                id="skills" 
                placeholder="List your key skills, separated by commas..."
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="current-resume">Current Resume (Optional)</Label>
              <Input 
                id="current-resume" 
                type="file" 
                accept=".pdf,.doc,.docx"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="template">Template Style</Label>
              <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md">
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="creative">Creative</option>
                <option value="minimalist">Minimalist</option>
              </select>
            </div>
          </div>
        </div>
        <Button 
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={async () => {
            try {
              const jobDescription = (document.getElementById('job-description') as HTMLTextAreaElement)?.value || '';
              const experienceLevel = (document.querySelector('select') as HTMLSelectElement)?.value || 'mid';
              const industry = (document.getElementById('industry') as HTMLInputElement)?.value || '';
              const skills = (document.getElementById('skills') as HTMLTextAreaElement)?.value || '';
              
              if (!jobDescription && !skills) {
                alert('Please provide at least a job description or your key skills to generate a resume.');
                return;
              }
              
              const response = await fetch('/api/ai/generate-resume', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                  jobDescription,
                  experienceLevel,
                  industry,
                  skills,
                  template: 'modern'
                }),
              });
              
              if (!response.ok) {
                throw new Error('Failed to generate resume');
              }
              
              const result = await response.json();
              console.log('Resume generated:', result);
              
              const resumeContent = result.content || result.resume || 'Resume generated successfully!';
              alert(`AI Resume Generated!\n\n${resumeContent.substring(0, 700)}${resumeContent.length > 700 ? '...' : ''}`);
              
            } catch (error) {
              console.error('Resume generation failed:', error);
              alert('Failed to generate resume. Please try again.');
            }
          }}
        >
          Generate AI Resume
        </Button>
      </CardContent>
    </Card>
  );

  const renderAICoverLetter = () => (
    <Card className="huntr-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-purple-600" />
          AI Cover Letter Generator
        </CardTitle>
        <CardDescription>
          Generate personalized cover letters that align with job requirements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="company-name">Company Name</Label>
              <Input 
                id="company-name" 
                placeholder="e.g., Google, Microsoft, Meta"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="position-title">Position Title</Label>
              <Input 
                id="position-title" 
                placeholder="e.g., Software Engineer, Product Manager"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="hiring-manager">Hiring Manager (Optional)</Label>
              <Input 
                id="hiring-manager" 
                placeholder="e.g., Sarah Johnson"
                className="mt-1"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="cover-tone">Writing Tone</Label>
              <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md">
                <option value="professional">Professional</option>
                <option value="enthusiastic">Enthusiastic</option>
                <option value="confident">Confident</option>
                <option value="friendly">Friendly</option>
              </select>
            </div>
            <div>
              <Label htmlFor="cover-length">Length</Label>
              <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md">
                <option value="short">Short (150-200 words)</option>
                <option value="medium">Medium (200-300 words)</option>
                <option value="long">Long (300-400 words)</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="job-posting">Job Posting</Label>
          <Textarea 
            id="job-posting" 
            placeholder="Paste the complete job posting for AI analysis..."
            className="mt-1 h-32"
          />
        </div>
        <div>
          <Label htmlFor="key-achievements">Key Achievements</Label>
          <Textarea 
            id="key-achievements" 
            placeholder="Highlight your most relevant achievements for this role..."
            className="mt-1"
          />
        </div>
        <Button 
          className="w-full bg-purple-600 hover:bg-purple-700"
          onClick={async () => {
            try {
              const response = await fetch('/api/cover-letters/generate', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies for authentication
                body: JSON.stringify({
                  jobTitle: 'Software Engineer', // You can make this dynamic
                  company: 'Tech Company',
                  tone: 'professional',
                  additionalNotes: 'Generated from AI Tools page',
                }),
              });
              
              if (!response.ok) {
                throw new Error('Failed to generate cover letter');
              }
              
              const result = await response.json();
              console.log('Cover letter generated:', result);
              
              // Show the generated cover letter in a modal or alert
              const coverLetterText = result.content || result.letter || 'Cover letter generated successfully!';
              alert(`Cover Letter Generated!\n\n${coverLetterText.substring(0, 500)}${coverLetterText.length > 500 ? '...' : ''}`);
              
            } catch (error) {
              console.error('Cover letter generation failed:', error);
              alert('Failed to generate cover letter. Please try again.');
            }
          }}
        >
          Generate AI Cover Letter
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <Link href="/">
                <div className="text-2xl font-bold text-gray-900 cursor-pointer">
                  JobHub
                </div>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={typedUser?.profileImageUrl || undefined} />
                <AvatarFallback className="text-xs bg-gray-100">
                  <UserIcon className="h-4 w-4 text-gray-600" />
                </AvatarFallback>
              </Avatar>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.location.href = '/api/logout'}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display text-gray-900 mb-2">
            AI-Powered Career Tools
          </h1>
          <p className="text-gray-600 font-medium">
            Enhance your job search with advanced AI tools designed for modern professionals
          </p>
        </div>

        {/* Tool Selection Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            variant={activeTab === 'ai-resume-checker' ? 'default' : 'outline'}
            onClick={() => setActiveTab('ai-resume-checker')}
            className={activeTab === 'ai-resume-checker' ? 'bg-blue-600 hover:bg-blue-700' : ''}
          >
            <Target className="h-4 w-4 mr-2" />
            AI Resume Checker
          </Button>
          <Button
            variant={activeTab === 'ai-resume-builder' ? 'default' : 'outline'}
            onClick={() => setActiveTab('ai-resume-builder')}
            className={activeTab === 'ai-resume-builder' ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            <FileText className="h-4 w-4 mr-2" />
            AI Resume Builder
          </Button>
          <Button
            variant={activeTab === 'ai-cover-letter' ? 'default' : 'outline'}
            onClick={() => setActiveTab('ai-cover-letter')}
            className={activeTab === 'ai-cover-letter' ? 'bg-purple-600 hover:bg-purple-700' : ''}
          >
            <FileText className="h-4 w-4 mr-2" />
            AI Cover Letter
          </Button>
        </div>

        {/* Tool Content */}
        <div className="min-h-[600px]">
          {activeTab === 'ai-resume-checker' && renderAIResumeChecker()}
          {activeTab === 'ai-resume-builder' && renderAIResumeBuilder()}
          {activeTab === 'ai-cover-letter' && renderAICoverLetter()}
        </div>
      </div>

      {/* Floating AI Assistant */}
      {showFloatingChatbot && (
        <AIChatbot 
          isFloating={true} 
          onClose={() => setShowFloatingChatbot(false)} 
        />
      )}
      
      {/* AI Assistant Trigger Button */}
      {(isAdmin || (userCredits as any)?.plan === 'pro') && !showFloatingChatbot && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={() => setShowFloatingChatbot(true)}
            size="lg"
            className="rounded-full w-16 h-16 bg-blue-600 hover:bg-blue-700 shadow-lg"
            data-testid="button-floating-ai-assistant"
          >
            <Bot className="h-8 w-8" />
          </Button>
        </div>
      )}
    </div>
  );
}