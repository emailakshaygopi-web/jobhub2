import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@shared/schema";
import { 
  ArrowRight,
  CheckCircle,
  Edit3,
  FileText,
  Hash,
  List,
  LogOut,
  MessageSquare,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  User as UserIcon,
  Wand2,
  Zap
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ResumeTools() {
  const { user } = useAuth();
  const typedUser = user as User | undefined;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <Link href="/">
                <div className="text-2xl font-bold text-gray-900 cursor-pointer">
                  JobTracker
                </div>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Board</Link>
                <Link href="/tracker" className="text-gray-600 hover:text-blue-600 font-medium">Tracker</Link>
                <Link href="/ai-tools" className="text-gray-600 hover:text-blue-600 font-medium">AI Tools</Link>
                <Link href="/resume-tools" className="text-gray-900 hover:text-blue-600 font-medium">Resume Tools</Link>
              </div>
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

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Edit3 className="h-4 w-4" />
            Resume Enhancement Tools
          </div>
          <h1 className="text-5xl font-display text-gray-900 mb-6 leading-tight">
            Perfect Your Resume<br />
            <span className="text-green-600">With Expert Tools</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your resume from good to exceptional with our suite of professional 
            enhancement tools designed by career experts and HR professionals.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="huntr-card border-0 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all cursor-pointer">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Resume Review</CardTitle>
              <CardDescription className="text-gray-600">
                Get comprehensive feedback on structure, content, and formatting
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="huntr-card border-0 bg-gradient-to-br from-purple-50 to-white hover:shadow-lg transition-all cursor-pointer">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Summary Generator</CardTitle>
              <CardDescription className="text-gray-600">
                Create compelling professional summaries that capture attention
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="huntr-card border-0 bg-gradient-to-br from-orange-50 to-white hover:shadow-lg transition-all cursor-pointer">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <List className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Bullet Generator</CardTitle>
              <CardDescription className="text-gray-600">
                Transform achievements into powerful, quantified bullet points
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="huntr-card border-0 bg-gradient-to-br from-teal-50 to-white hover:shadow-lg transition-all cursor-pointer">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Hash className="h-8 w-8 text-teal-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Skills Generator</CardTitle>
              <CardDescription className="text-gray-600">
                Optimize your skills section for maximum ATS compatibility
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Feature Showcases */}
        <div className="space-y-20">
          {/* Resume Review Feature */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display text-gray-900 mb-6">Comprehensive Resume Review</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Format & Structure Analysis</h3>
                    <p className="text-gray-600">Professional review of layout, formatting, and visual hierarchy for maximum impact</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Content Optimization</h3>
                    <p className="text-gray-600">Expert feedback on achievements, responsibilities, and professional positioning</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Industry Benchmarking</h3>
                    <p className="text-gray-600">Compare against industry standards and top-performing resumes in your field</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8">
              <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Resume Score</h3>
                  <div className="text-2xl font-bold text-blue-600">8.4/10</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Format & Design</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-4/5 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-500">9.2</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Content Quality</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-3/5 h-2 bg-yellow-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-500">7.8</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">ATS Compatibility</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-4/5 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-500">8.9</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Strong Points</span>
                  </div>
                  <p className="text-sm text-green-700">Excellent quantified achievements and clear career progression</p>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Wand2 className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">Improvements</span>
                  </div>
                  <p className="text-sm text-orange-700">Add more industry keywords and strengthen summary section</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Generation Tools */}
          <div className="text-center">
            <h2 className="text-3xl font-display text-gray-900 mb-4">Intelligent Content Generation</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Let our expert-trained algorithms craft compelling content that highlights your unique value proposition.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Summary Generator */}
              <Card className="huntr-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">Professional Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-purple-50 rounded-lg p-4 text-left mb-4">
                    <p className="text-sm text-gray-700 italic">
                      "Results-driven software engineer with 5+ years of experience building scalable web applications. 
                      Led cross-functional teams to deliver 15+ successful projects, improving system performance by 40%..."
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Sparkles className="h-4 w-4" />
                    <span>Tailored to your experience level</span>
                  </div>
                </CardContent>
              </Card>

              {/* Bullet Generator */}
              <Card className="huntr-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <List className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">Achievement Bullets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-orange-50 rounded-lg p-4 text-left mb-4 space-y-2">
                    <p className="text-sm text-gray-700">• Increased user engagement by 35% through implementation of responsive design</p>
                    <p className="text-sm text-gray-700">• Reduced page load time by 50% by optimizing database queries and caching</p>
                    <p className="text-sm text-gray-700">• Mentored 3 junior developers, improving team productivity by 25%</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>Quantified impact statements</span>
                  </div>
                </CardContent>
              </Card>

              {/* Skills Generator */}
              <Card className="huntr-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Hash className="h-6 w-6 text-teal-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">Skills Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-teal-50 rounded-lg p-4 text-left mb-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-teal-100 text-teal-800">React.js</Badge>
                      <Badge className="bg-teal-100 text-teal-800">Node.js</Badge>
                      <Badge className="bg-teal-100 text-teal-800">TypeScript</Badge>
                      <Badge className="bg-teal-100 text-teal-800">AWS</Badge>
                      <Badge className="bg-teal-100 text-teal-800">PostgreSQL</Badge>
                      <Badge className="bg-teal-100 text-teal-800">Docker</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Zap className="h-4 w-4" />
                    <span>ATS-optimized keywords</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Process Workflow */}
          <div className="bg-gray-50 rounded-2xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display text-gray-900 mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our streamlined process transforms your resume from good to great in just a few steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Upload Resume</h3>
                <p className="text-sm text-gray-600">Upload your current resume in any format (PDF, Word, etc.)</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
                <p className="text-sm text-gray-600">Our AI analyzes structure, content, and optimization opportunities</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Expert Review</h3>
                <p className="text-sm text-gray-600">Get detailed feedback and tailored improvement suggestions</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Enhanced Resume</h3>
                <p className="text-sm text-gray-600">Download your optimized resume ready for job applications</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-display mb-4">Ready to Perfect Your Resume?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have enhanced their resumes with our expert tools.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4"
              onClick={() => window.location.href = '/'}
            >
              Try Resume Tools Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}