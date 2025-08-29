import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { type User, type Analytics, type UserCredits } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { 
  BarChart3, 
  FileText, 
  Search, 
  Target, 
  LogOut,
  User as UserIcon,
  Upload,
  Download,
  Users,
  FolderOpen,
  TrendingUp,
  Home as HomeIcon,
  Bot,
  Briefcase,
  Mail,
  Plus,
  Eye,
  Trash2,
  Edit
} from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [visitTracked, setVisitTracked] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const { data: analytics } = useQuery<Analytics>({
    queryKey: ["/api/analytics"],
    enabled: !!user,
  });

  const { data: userCredits } = useQuery<UserCredits>({
    queryKey: ["/api/user-credits"],
    enabled: !!user,
  });

  const typedUser = user as User | undefined;
  const userPlan = userCredits?.plan || 'free';

  const { data: upgradePrompt } = useQuery<{showPrompt: boolean, visitCount: number, reason: string}>({
    queryKey: ["/api/check-upgrade-prompt"],
    enabled: !!user && userPlan === 'free',
    refetchInterval: false, // Only check once per session
  });
  const isProUser = userPlan === 'pro';
  const dailyUsed = userCredits?.dailyUsed || 0;
  const dailyLimit = userCredits?.dailyLimit || 5;
  const creditsRemaining = dailyLimit - dailyUsed;
  const usagePercentage = (dailyUsed / dailyLimit) * 100;

  // Track visit on first load
  useEffect(() => {
    if (user && !visitTracked) {
      apiRequest('POST', '/api/track-visit', { 
        sessionId: Math.random().toString(36).substring(7) 
      }).catch(console.error);
      setVisitTracked(true);
    }
  }, [user, visitTracked]);

  // Show upgrade prompt when condition is met
  useEffect(() => {
    if (upgradePrompt?.showPrompt && userPlan === 'free') {
      setShowUpgradeModal(true);
    }
  }, [upgradePrompt, userPlan]);

  const handleUpgradeModalClose = async () => {
    setShowUpgradeModal(false);
    // Mark prompt as shown
    try {
      await apiRequest('POST', '/api/mark-upgrade-prompt-shown');
    } catch (error) {
      console.error('Failed to mark upgrade prompt shown:', error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleDocumentUpload = async () => {
    if (!uploadedFile) return;
    
    try {
      const formData = new FormData();
      formData.append('resume', uploadedFile);
      
      const response = await fetch('/api/resumes/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload document');
      }
      
      const result = await response.json();
      console.log('Upload successful:', result);
      setUploadedFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const renderAIToolContent = () => {
    switch (activeTab) {
      case 'ai-resume-checker':
        return (
          <Card className="huntr-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                AI Resume Checker
              </CardTitle>
              <CardDescription>
                AI-powered resume analysis and optimization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ai-resume-upload">Upload Resume for AI Analysis</Label>
                <div className="mt-1 flex items-center gap-2">
                  <Input 
                    id="ai-resume-upload" 
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={async () => {
                      if (!uploadedFile) return;
                      
                      try {
                        const formData = new FormData();
                        formData.append('resume', uploadedFile);
                        
                        const response = await fetch('/api/ai/analyze-resume-upload', {
                          method: 'POST',
                          body: formData,
                        });
                        
                        if (response.ok) {
                          const result = await response.json();
                          console.log('AI Analysis Result:', result);
                          // You can display the result or redirect to a results page
                        }
                      } catch (error) {
                        console.error('Analysis failed:', error);
                      }
                      
                      setUploadedFile(null);
                    }}
                    disabled={!uploadedFile}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Analyze with AI
                  </Button>
                </div>
                {uploadedFile && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {uploadedFile.name} ready to upload
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="ai-target-job">Target Job Title</Label>
                <Input 
                  id="ai-target-job" 
                  placeholder="e.g., Senior Software Engineer, Marketing Director"
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">AI Analysis includes:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• ATS compatibility score</li>
                    <li>• Keyword optimization</li>
                    <li>• Skills gap analysis</li>
                    <li>• Impact measurement</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Get AI recommendations for:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Better formatting</li>
                    <li>• Stronger action verbs</li>
                    <li>• Missing key skills</li>
                    <li>• Industry-specific terms</li>
                  </ul>
                </div>
              </div>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!isProUser && (analytics?.aiGenerationsUsed || 0) >= 3}
              >
                {!isProUser && (analytics?.aiGenerationsUsed || 0) >= 3 
                  ? "Upgrade to Pro for More AI Analysis" 
                  : "Run AI Analysis"
                }
              </Button>
              {!isProUser && (analytics?.aiGenerationsUsed || 0) >= 3 && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  You've used all 3 free AI generations this month. 
                  <Link href="/pricing" className="text-blue-600 hover:text-blue-700 ml-1">Upgrade to Pro</Link>
                </p>
              )}
            </CardContent>
          </Card>
        );

      case 'ai-resume-builder':
        return (
          <Card className="huntr-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                AI Resume Builder
              </CardTitle>
              <CardDescription>
                Build a professional resume with AI assistance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ai-job-description">Job Description</Label>
                <Textarea 
                  id="ai-job-description" 
                  placeholder="Paste the job description to get AI-tailored resume content..."
                  className="mt-1 h-32"
                />
              </div>
              <div>
                <Label htmlFor="ai-experience-level">Experience Level</Label>
                <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md">
                  <option value="">Select your experience level</option>
                  <option value="entry">Entry Level (0-2 years)</option>
                  <option value="mid">Mid Level (3-5 years)</option>
                  <option value="senior">Senior Level (6+ years)</option>
                  <option value="executive">Executive Level (10+ years)</option>
                </select>
              </div>
              <div>
                <Label htmlFor="ai-industry">Industry</Label>
                <Input 
                  id="ai-industry" 
                  placeholder="e.g., Technology, Finance, Healthcare"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="ai-current-resume">Current Resume (Optional)</Label>
                <div className="mt-1 flex items-center gap-2">
                  <Input id="ai-current-resume" type="file" accept=".pdf,.doc,.docx" />
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!isProUser && (analytics?.aiGenerationsUsed || 0) >= 3}
              >
                {!isProUser && (analytics?.aiGenerationsUsed || 0) >= 3 
                  ? "Upgrade to Pro for More AI Building" 
                  : "Build Resume with AI"
                }
              </Button>
              {!isProUser && (analytics?.aiGenerationsUsed || 0) >= 3 && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  You've used all 3 free AI generations this month. 
                  <Link href="/pricing" className="text-blue-600 hover:text-blue-700 ml-1">Upgrade to Pro</Link>
                </p>
              )}
            </CardContent>
          </Card>
        );

      case 'ai-cover-letter':
        return (
          <Card className="huntr-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                AI Cover Letter Generator
              </CardTitle>
              <CardDescription>
                Generate personalized cover letters with AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ai-cover-company">Company Name</Label>
                <Input 
                  id="ai-cover-company" 
                  placeholder="e.g., Google, Microsoft, Meta"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="ai-cover-position">Position Title</Label>
                <Input 
                  id="ai-cover-position" 
                  placeholder="e.g., Software Engineer, Product Manager"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="ai-cover-job-posting">Job Posting</Label>
                <Textarea 
                  id="ai-cover-job-posting" 
                  placeholder="Paste the complete job posting for AI analysis..."
                  className="mt-1 h-32"
                />
              </div>
              <div>
                <Label htmlFor="ai-cover-tone">Writing Tone</Label>
                <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md">
                  <option value="professional">Professional</option>
                  <option value="enthusiastic">Enthusiastic</option>
                  <option value="confident">Confident</option>
                  <option value="friendly">Friendly</option>
                </select>
              </div>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={!isProUser && (analytics?.aiGenerationsUsed || 0) >= 3}
              >
                {!isProUser && (analytics?.aiGenerationsUsed || 0) >= 3 
                  ? "Upgrade to Pro for More AI Generation" 
                  : "Generate AI Cover Letter"
                }
              </Button>
              {!isProUser && (analytics?.aiGenerationsUsed || 0) >= 3 && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  You've used all 3 free AI generations this month. 
                  <Link href="/pricing" className="text-blue-600 hover:text-blue-700 ml-1">Upgrade to Pro</Link>
                </p>
              )}
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <div className="text-2xl font-bold text-gray-900">
                JobTracker
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Avatar data-testid="avatar-user" className="h-8 w-8">
                <AvatarImage src={typedUser?.profileImageUrl || undefined} />
                <AvatarFallback className="text-xs bg-gray-100">
                  <UserIcon className="h-4 w-4 text-gray-600" />
                </AvatarFallback>
              </Avatar>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.location.href = '/api/logout'}
                data-testid="button-logout"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Dashboard</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveSection('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === 'dashboard' 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <HomeIcon className="h-5 w-5" />
                Overview
              </button>
              
              
              <button
                onClick={() => setActiveSection('metrics')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === 'metrics' 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <TrendingUp className="h-5 w-5" />
                Metrics
              </button>
              
              <div className="border-t border-gray-300 my-4"></div>
              
              
              <div className="border-t border-gray-300 my-4"></div>
              
              <button
                onClick={() => setActiveSection('email-settings')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === 'email-settings' 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Mail className="h-5 w-5" />
                Email Settings
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-display text-gray-900 mb-2" data-testid="title-welcome">
                {activeSection === 'dashboard' ? 'Welcome back, Akshay!' :
                 activeSection === 'contacts' ? 'Contact Management' :
                 activeSection === 'documents' ? 'Document Library' :
                 activeSection === 'metrics' ? 'Performance Metrics' :
                 activeSection === 'email-settings' ? 'Email API Configuration' : 'Dashboard'}
              </h1>
              <p className="text-gray-600 font-medium" data-testid="text-subtitle">
                {activeSection === 'dashboard' ? 'Keep your job search organized and track your progress to success' :
                 activeSection === 'contacts' ? 'Manage your professional network and email outreach' :
                 activeSection === 'documents' ? 'Store and manage your resumes, cover letters, and job-related documents' :
                 activeSection === 'metrics' ? 'Analyze your job search performance and identify improvement areas' :
                 activeSection === 'email-settings' ? 'Configure your own email service API for unlimited sending' : ''}
              </p>
            </div>

            {/* Content based on active section */}
            {activeSection === 'dashboard' && (
              <>
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                  <Card className="huntr-card border-0 hover-lift cursor-pointer" data-testid="card-stat-contacts" onClick={() => window.location.href = '/contacts'}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Contacts</p>
                          <p className="text-3xl font-display text-gray-900" data-testid="text-contacts">
                            {analytics?.totalContacts || 0}
                          </p>
                          {!isProUser && (
                            <p className="text-xs text-gray-500 mt-1">Free: 10 emails/day limit</p>
                          )}
                        </div>
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                          <UserIcon className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="huntr-card border-0 hover-lift cursor-pointer" data-testid="card-stat-documents" onClick={() => window.location.href = '/upload'}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Documents</p>
                          <p className="text-3xl font-display text-gray-900" data-testid="text-documents">
                            {analytics?.totalDocuments || 0}
                          </p>
                          {!isProUser && (
                            <p className="text-xs text-gray-500 mt-1">Free: Basic storage only</p>
                          )}
                        </div>
                        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="huntr-card border-0 hover-lift" data-testid="card-stat-metrics">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 mb-2">AI Credits Today</p>
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-3xl font-display text-gray-900" data-testid="text-ai-generations">
                              {dailyUsed}
                            </p>
                            <span className="text-lg text-gray-500">/ {dailyLimit}</span>
                          </div>
                          
                          {/* Credits Progress Bar */}
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                usagePercentage >= 100 ? 'bg-red-500' :
                                usagePercentage >= 80 ? 'bg-orange-500' :
                                usagePercentage >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs">
                            <span className={`font-medium ${
                              creditsRemaining <= 0 ? 'text-red-600' :
                              creditsRemaining <= 2 ? 'text-orange-600' : 'text-gray-600'
                            }`}>
                              {creditsRemaining <= 0 ? 'No credits left!' : `${creditsRemaining} remaining`}
                            </span>
                            <span className="text-gray-500">{isProUser ? 'Pro Plan' : 'Free Plan'}</span>
                          </div>
                        </div>
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          creditsRemaining <= 0 ? 'bg-red-50' :
                          creditsRemaining <= 2 ? 'bg-orange-50' : 'bg-purple-50'
                        }`}>
                          <BarChart3 className={`h-6 w-6 ${
                            creditsRemaining <= 0 ? 'text-red-600' :
                            creditsRemaining <= 2 ? 'text-orange-600' : 'text-purple-600'
                          }`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="huntr-card border-0 hover-lift" data-testid="card-stat-plan">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Current Plan</p>
                          <p className="text-3xl font-display text-gray-900 capitalize" data-testid="text-plan">
                            {userPlan}
                          </p>
                          {!isProUser && (
                            <Link href="/pricing" className="text-xs text-blue-600 hover:text-blue-700 mt-1 inline-block">
                              Upgrade to Pro →
                            </Link>
                          )}
                        </div>
                        <div className={`w-12 h-12 ${isProUser ? 'bg-yellow-50' : 'bg-gray-50'} rounded-lg flex items-center justify-center`}>
                          <Target className={`h-6 w-6 ${isProUser ? 'text-yellow-600' : 'text-gray-600'}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
            
            {/* Contacts Section */}
            {activeSection === 'contacts' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Professional Contacts</h3>
                    <p className="text-sm text-gray-600">Manage your network and track communication</p>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contact
                  </Button>
                </div>
                
                {!isProUser && (
                  <Card className="border-orange-200 bg-orange-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-orange-600" />
                        <div>
                          <p className="text-sm font-medium text-orange-800">Free Plan Email Limit</p>
                          <p className="text-xs text-orange-700">You can send up to 10 emails per day. Add your own email API or upgrade to Pro for unlimited emails.</p>
                        </div>
                        <div className="ml-auto flex gap-2">
                          <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-100" onClick={() => setActiveSection('email-settings')}>
                            Add API Key
                          </Button>
                          <Link href="/pricing">
                            <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                              Upgrade
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Sample contact cards */}
                  <Card className="huntr-card">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <UserIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                          <p className="text-sm text-gray-600">HR Manager at TechCorp</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>📧 sarah.johnson@techcorp.com</p>
                        <p>💼 LinkedIn connected</p>
                        <p>📅 Last contact: 2 days ago</p>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="huntr-card">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <UserIcon className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Mike Chen</h4>
                          <p className="text-sm text-gray-600">Software Engineer at StartupXYZ</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>📧 mike.chen@startupxyz.com</p>
                        <p>💼 Referral opportunity</p>
                        <p>📅 Last contact: 1 week ago</p>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Mail className="h-3 w-3 mr-1" />
                          Follow up
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="huntr-card border-dashed border-gray-300 bg-gray-50">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                      <Plus className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 font-medium">Add New Contact</p>
                      <p className="text-xs text-gray-500">Build your professional network</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            {/* Documents Section */}
            {activeSection === 'documents' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Document Library</h3>
                    <p className="text-sm text-gray-600">Organize your resumes, cover letters, and references</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      id="document-upload-input"
                    />
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        if (!uploadedFile) {
                          document.getElementById('document-upload-input')?.click();
                        } else {
                          handleDocumentUpload();
                        }
                      }}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {uploadedFile ? `Upload ${uploadedFile.name}` : 'Upload Document'}
                    </Button>
                  </div>
                </div>
                {uploadedFile && (
                  <div className="mt-2">
                    <p className="text-sm text-green-600">
                      ✓ Ready to upload: {uploadedFile.name}
                    </p>
                  </div>
                )}
                
                {!isProUser && (
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <FolderOpen className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">Free Plan Storage</p>
                          <p className="text-xs text-blue-700">Basic document storage with limited organization features. Upgrade to Pro for advanced document management.</p>
                        </div>
                        <Link href="/pricing" className="ml-auto">
                          <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                            Upgrade
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Sample document cards */}
                  <Card className="huntr-card">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Resume_2024_Software_Engineer.pdf</h4>
                          <p className="text-sm text-gray-600">Updated 3 days ago</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>📄 Resume • 2.1 MB</p>
                        <p>⭐ AI Score: 85/100</p>
                        <p>🎯 Optimized for: Software Engineer roles</p>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="huntr-card">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <FileText className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Cover_Letter_TechCorp.pdf</h4>
                          <p className="text-sm text-gray-600">Created 1 week ago</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>📄 Cover Letter • 1.2 MB</p>
                        <p>🤖 AI Generated</p>
                        <p>🏢 Company: TechCorp</p>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="huntr-card border-dashed border-gray-300 bg-gray-50">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 font-medium">Upload Document</p>
                      <p className="text-xs text-gray-500">PDF, DOC, or DOCX files</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            {/* Metrics Section */}
            {activeSection === 'metrics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="huntr-card">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{analytics?.totalApplications || 0}</div>
                      <p className="text-sm text-gray-600">Total Applications</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="huntr-card">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">{analytics?.responseRate || 0}%</div>
                      <p className="text-sm text-gray-600">Response Rate</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="huntr-card">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{analytics?.interviewsScheduled || 0}</div>
                      <p className="text-sm text-gray-600">Interviews</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="huntr-card">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-2">{analytics?.jobOffers || 0}</div>
                      <p className="text-sm text-gray-600">Job Offers</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="huntr-card">
                  <CardHeader>
                    <CardTitle>Application Performance</CardTitle>
                    <CardDescription>Your job search progress over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      📊 Performance charts will be displayed here
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="huntr-card">
                    <CardHeader>
                      <CardTitle>Top Industries</CardTitle>
                      <CardDescription>Where you're applying most</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Technology</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full">
                              <div className="w-12 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">75%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Finance</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full">
                              <div className="w-6 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">40%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Healthcare</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full">
                              <div className="w-4 h-2 bg-purple-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">25%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="huntr-card">
                    <CardHeader>
                      <CardTitle>Response Times</CardTitle>
                      <CardDescription>How quickly companies respond</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Same day</span>
                          <span className="text-sm font-medium">15%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">1-3 days</span>
                          <span className="text-sm font-medium">35%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">1 week</span>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">2+ weeks</span>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            
            
            {/* Email Settings Section */}
            {activeSection === 'email-settings' && (
              <div className="space-y-6">
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">Current Email Limit</p>
                        <p className="text-xs text-blue-700">Free plan: 10 emails per day. Add your own email service API for unlimited sending.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* SendGrid Configuration */}
                  <Card className="huntr-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-blue-600" />
                        SendGrid API
                      </CardTitle>
                      <CardDescription>
                        Configure SendGrid for reliable email delivery (Recommended)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="sendgrid-api-key">SendGrid API Key</Label>
                        <Input 
                          id="sendgrid-api-key" 
                          type="password"
                          placeholder="SG.xxxxxxxxxxxxxxxxxx"
                          className="mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Get your API key from <a href="https://app.sendgrid.com/settings/api_keys" target="_blank" className="text-blue-600 hover:text-blue-700">SendGrid Dashboard</a>
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="sendgrid-from-email">From Email Address</Label>
                        <Input 
                          id="sendgrid-from-email" 
                          type="email"
                          placeholder="noreply@yourdomain.com"
                          className="mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Must be a verified sender in SendGrid
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="sendgrid-from-name">From Name</Label>
                        <Input 
                          id="sendgrid-from-name" 
                          placeholder="Your Name"
                          className="mt-1"
                        />
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Save SendGrid Configuration
                      </Button>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>✓ Up to 100 emails/day (free SendGrid plan)</p>
                        <p>✓ Professional email delivery</p>
                        <p>✓ Detailed analytics and tracking</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* SMTP Configuration */}
                  <Card className="huntr-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-green-600" />
                        Custom SMTP
                      </CardTitle>
                      <CardDescription>
                        Use your own SMTP server (Gmail, Outlook, etc.)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="smtp-host">SMTP Host</Label>
                        <Input 
                          id="smtp-host" 
                          placeholder="smtp.gmail.com"
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="smtp-port">Port</Label>
                          <Input 
                            id="smtp-port" 
                            placeholder="587"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="smtp-security">Security</Label>
                          <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md">
                            <option value="tls">TLS</option>
                            <option value="ssl">SSL</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="smtp-username">Username/Email</Label>
                        <Input 
                          id="smtp-username" 
                          type="email"
                          placeholder="your-email@gmail.com"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="smtp-password">Password/App Password</Label>
                        <Input 
                          id="smtp-password" 
                          type="password"
                          placeholder="Your app password"
                          className="mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          For Gmail, use an App Password instead of your regular password
                        </p>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Save SMTP Configuration
                      </Button>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>✓ Use your existing email provider</p>
                        <p>✓ Emails sent from your domain</p>
                        <p>⚠️ Limited by provider's daily limits</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Current Configuration Status */}
                <Card className="huntr-card">
                  <CardHeader>
                    <CardTitle>Email Configuration Status</CardTitle>
                    <CardDescription>Your current email sending setup</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium">Default Service</p>
                            <p className="text-xs text-gray-600">10 emails per day limit</p>
                          </div>
                        </div>
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Active</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg opacity-50">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium">SendGrid API</p>
                            <p className="text-xs text-gray-600">Not configured</p>
                          </div>
                        </div>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Inactive</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg opacity-50">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium">Custom SMTP</p>
                            <p className="text-xs text-gray-600">Not configured</p>
                          </div>
                        </div>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Inactive</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800 font-medium">💡 Pro Tip</p>
                      <p className="text-xs text-blue-700 mt-1">
                        Configure SendGrid or SMTP to remove the 10 emails/day limit and send professional emails from your own domain.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}