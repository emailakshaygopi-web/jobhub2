import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  CheckCircle,
  Edit3,
  FileText,
  Hash,
  List,
  MessageSquare,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Wand2,
  Zap
} from "lucide-react";

export default function ResumeToolsProduct() {
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
                <Link href="/product/ai-tools" className="text-gray-600 hover:text-blue-600 font-medium">AI Tools</Link>
                <Link href="/product/resume-tools" className="text-gray-900 hover:text-blue-600 font-medium">Resume Tools</Link>
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
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Edit3 className="h-4 w-4" />
            Professional Resume Tools
          </div>
          <h1 className="text-5xl font-display text-gray-900 mb-6 leading-tight">
            Perfect Every Detail of<br />
            <span className="text-green-600">Your Resume</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert-crafted tools designed by career professionals to help you create 
            compelling resume content that stands out to recruiters and hiring managers.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="huntr-card border-0 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all">
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

          <Card className="huntr-card border-0 bg-gradient-to-br from-purple-50 to-white hover:shadow-lg transition-all">
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

          <Card className="huntr-card border-0 bg-gradient-to-br from-orange-50 to-white hover:shadow-lg transition-all">
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

          <Card className="huntr-card border-0 bg-gradient-to-br from-teal-50 to-white hover:shadow-lg transition-all">
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
          {/* Resume Review */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display text-gray-900 mb-6">Professional Resume Review</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Expert Analysis</h3>
                    <p className="text-gray-600">Professional review of content, structure, and impact by career experts</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Industry Standards</h3>
                    <p className="text-gray-600">Benchmarking against top-performing resumes in your field</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Actionable Insights</h3>
                    <p className="text-gray-600">Specific recommendations to improve your resume's effectiveness</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Resume Analysis</h3>
                  <div className="text-2xl font-bold text-blue-600">8.7/10</div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Content Quality</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-5/6 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-500">9.1</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Format & Design</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-4/5 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-500">8.8</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Impact Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-3/4 h-2 bg-yellow-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-500">7.9</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Strengths</span>
                    </div>
                    <p className="text-sm text-green-700">Clear career progression and quantified achievements</p>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Wand2 className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">Recommendations</span>
                    </div>
                    <p className="text-sm text-orange-700">Add more action verbs and industry keywords</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Generation Tools */}
          <div className="text-center">
            <h2 className="text-3xl font-display text-gray-900 mb-4">Expert Content Generation</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Transform your experience into compelling content that highlights your unique value and achievements.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Summary Generator */}
              <Card className="huntr-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">Professional Summary</CardTitle>
                  <CardDescription>Create compelling summaries that capture your career story</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-purple-50 rounded-lg p-4 text-left mb-4">
                    <p className="text-sm text-gray-700 italic">
                      "Innovative marketing professional with 7+ years driving growth for SaaS companies. 
                      Successfully launched 12+ campaigns that generated $2M+ in revenue and increased brand awareness by 150%..."
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Sparkles className="h-4 w-4" />
                    <span>Tailored to your industry</span>
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
                  <CardDescription>Transform experiences into powerful impact statements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-orange-50 rounded-lg p-4 text-left mb-4 space-y-2">
                    <p className="text-sm text-gray-700">• Increased sales revenue by 45% through strategic client relationship management</p>
                    <p className="text-sm text-gray-700">• Led team of 8 developers to deliver project 3 weeks ahead of schedule</p>
                    <p className="text-sm text-gray-700">• Implemented cost-saving measures that reduced expenses by $50K annually</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>Quantified results</span>
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
                  <CardDescription>Organize skills for maximum ATS and recruiter impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-teal-50 rounded-lg p-4 text-left mb-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xs font-medium text-gray-600 mb-2">TECHNICAL SKILLS</h4>
                        <div className="flex flex-wrap gap-1">
                          <Badge className="bg-teal-100 text-teal-800 text-xs">Python</Badge>
                          <Badge className="bg-teal-100 text-teal-800 text-xs">SQL</Badge>
                          <Badge className="bg-teal-100 text-teal-800 text-xs">Tableau</Badge>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-gray-600 mb-2">SOFT SKILLS</h4>
                        <div className="flex flex-wrap gap-1">
                          <Badge className="bg-teal-100 text-teal-800 text-xs">Leadership</Badge>
                          <Badge className="bg-teal-100 text-teal-800 text-xs">Communication</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Zap className="h-4 w-4" />
                    <span>ATS-optimized format</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Process Workflow */}
          <div className="bg-gray-50 rounded-2xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display text-gray-900 mb-4">Simple 4-Step Process</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our expert tools guide you through creating professional resume content step by step.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Input Your Info</h3>
                <p className="text-sm text-gray-600">Provide your experience, skills, and career goals</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Choose Your Tool</h3>
                <p className="text-sm text-gray-600">Select from our suite of professional resume tools</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Expert Generation</h3>
                <p className="text-sm text-gray-600">Get professionally crafted content tailored to your field</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Refine & Use</h3>
                <p className="text-sm text-gray-600">Customize the generated content and add to your resume</p>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="text-center">
            <h2 className="text-3xl font-display text-gray-900 mb-12">Trusted by Professionals</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="huntr-card">
                <CardHeader>
                  <div className="flex items-center gap-1 text-yellow-400 mb-2">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <CardDescription className="text-gray-700 italic">
                    "The bullet generator transformed my boring job descriptions into powerful achievement statements. 
                    I got 3x more interview requests!"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Sarah Chen</p>
                      <p className="text-sm text-gray-600">Product Manager</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="huntr-card">
                <CardHeader>
                  <div className="flex items-center gap-1 text-yellow-400 mb-2">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <CardDescription className="text-gray-700 italic">
                    "The professional summary tool helped me articulate my value proposition clearly. 
                    Landed my dream job within 2 months!"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Mike Rodriguez</p>
                      <p className="text-sm text-gray-600">Software Engineer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="huntr-card">
                <CardHeader>
                  <div className="flex items-center gap-1 text-yellow-400 mb-2">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <CardDescription className="text-gray-700 italic">
                    "The resume review tool gave me specific feedback that I couldn't get anywhere else. 
                    My resume now stands out from the competition."
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Emily Foster</p>
                      <p className="text-sm text-gray-600">Marketing Director</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
              onClick={() => window.location.href = '/api/login'}
            >
              Try Resume Tools Free
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}