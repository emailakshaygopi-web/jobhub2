import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  Bot,
  CheckCircle,
  FileText,
  Lightbulb,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Wand2,
  Zap
} from "lucide-react";

export default function AIToolsProduct() {
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
                <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
                <Link href="/product/tracker" className="text-gray-600 hover:text-blue-600 font-medium">Tracker</Link>
                <Link href="/product/ai-tools" className="text-gray-900 hover:text-blue-600 font-medium">AI Tools</Link>
                <Link href="/product/resume-tools" className="text-gray-600 hover:text-blue-600 font-medium">Resume Tools</Link>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => window.location.href = '/api/login'}
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => window.location.href = '/api/login'}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Bot className="h-4 w-4" />
            AI-Powered Career Tools
          </div>
          <h1 className="text-5xl font-display text-gray-900 mb-6 leading-tight">
            Let AI Transform Your<br />
            <span className="text-blue-600">Career Documents</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Harness the power of artificial intelligence to create compelling resumes, 
            cover letters, and career content that gets you noticed by employers and ATS systems.
          </p>
        </div>

        {/* AI Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="huntr-card border-0 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">AI Resume Checker</CardTitle>
              <CardDescription className="text-gray-600">
                Get instant AI analysis of your resume with ATS compatibility scores and improvement suggestions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="huntr-card border-0 bg-gradient-to-br from-green-50 to-white">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">AI Resume Builder</CardTitle>
              <CardDescription className="text-gray-600">
                Build professional resumes tailored to specific jobs using AI-powered content generation
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="huntr-card border-0 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Wand2 className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">AI Cover Letter</CardTitle>
              <CardDescription className="text-gray-600">
                Generate personalized cover letters that perfectly match job requirements and company culture
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Feature Showcases */}
        <div className="space-y-20">
          {/* AI Resume Checker */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display text-gray-900 mb-6">AI Resume Checker</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">ATS Compatibility Analysis</h3>
                    <p className="text-gray-600">Get detailed scoring on how well your resume performs with Applicant Tracking Systems</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Keyword Optimization</h3>
                    <p className="text-gray-600">AI identifies missing keywords and suggests improvements for better job matching</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Smart Recommendations</h3>
                    <p className="text-gray-600">Receive actionable feedback on content, formatting, and structure improvements</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    87%
                  </div>
                  <p className="text-gray-600">Overall Resume Score</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">ATS Compatibility</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-5/6 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">92%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Keyword Match</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-3/4 h-2 bg-yellow-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">78%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Impact Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-4/5 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">85%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Top Suggestions</span>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Add more quantified achievements</li>
                    <li>• Include industry-specific keywords</li>
                    <li>• Improve skills section formatting</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* AI Resume Builder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Generated Content</h3>
                <p className="text-gray-600">Tailored to your target position</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-2">Professional Summary</h4>
                  <p className="text-sm text-gray-700 italic">
                    "Results-driven software engineer with 5+ years developing scalable web applications. 
                    Led cross-functional teams to deliver 15+ projects, improving system performance by 40%..."
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-2">Achievement Bullets</h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>• Increased user engagement by 35% through responsive design implementation</p>
                    <p>• Reduced page load time by 50% via database optimization</p>
                    <p>• Mentored 3 junior developers, improving team productivity by 25%</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-2">Optimized Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-100 text-green-800">React.js</Badge>
                    <Badge className="bg-green-100 text-green-800">Node.js</Badge>
                    <Badge className="bg-green-100 text-green-800">TypeScript</Badge>
                    <Badge className="bg-green-100 text-green-800">AWS</Badge>
                    <Badge className="bg-green-100 text-green-800">PostgreSQL</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display text-gray-900 mb-6">AI Resume Builder</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Job-Tailored Content</h3>
                    <p className="text-gray-600">AI analyzes job descriptions to create perfectly matched resume content</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Industry Templates</h3>
                    <p className="text-gray-600">Choose from professional templates optimized for your specific industry</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Expert Optimization</h3>
                    <p className="text-gray-600">Built-in best practices from top recruiters and hiring managers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Cover Letter */}
          <div className="text-center">
            <h2 className="text-3xl font-display text-gray-900 mb-4">AI Cover Letter Generator</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Create compelling, personalized cover letters that perfectly align with job requirements and company culture.
            </p>
            
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Job Analysis</h3>
                  <p className="text-sm text-gray-600">AI analyzes job postings to identify key requirements and company values</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Wand2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Personalization</h3>
                  <p className="text-sm text-gray-600">Creates unique content that highlights your relevant experience and skills</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tone Matching</h3>
                  <p className="text-sm text-gray-600">Adapts writing style to match company culture and industry standards</p>
                </div>
              </div>
              
              <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-left">
                <h4 className="font-medium text-gray-900 mb-3">Sample AI-Generated Cover Letter:</h4>
                <div className="text-sm text-gray-700 space-y-3">
                  <p>Dear Hiring Manager,</p>
                  <p>
                    I am excited to apply for the Senior Software Engineer position at TechCorp. With 5+ years of experience 
                    building scalable web applications and a proven track record of leading high-performing teams, I am 
                    confident I can contribute to your mission of revolutionizing digital experiences.
                  </p>
                  <p>
                    At my current role, I spearheaded the development of a microservices architecture that improved system 
                    performance by 40% and reduced deployment time by 60%. This aligns perfectly with your focus on scalable, 
                    efficient solutions mentioned in the job description...
                  </p>
                  <p className="text-gray-500 italic">[Continues with personalized content based on job requirements]</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-display mb-4">Ready to Experience AI-Powered Career Tools?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their career documents with our AI technology.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4"
              onClick={() => window.location.href = '/api/login'}
            >
              Try AI Tools Free
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}