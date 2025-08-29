import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  BarChart3, 
  FileText, 
  Search, 
  Target, 
  TrendingUp, 
  Users 
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-30"></div>
        <div className="absolute inset-0">
          <div className="animate-float-slow absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20"></div>
          <div className="animate-float-medium absolute top-32 right-20 w-24 h-24 bg-purple-100 rounded-full opacity-20"></div>
          <div className="animate-float-fast absolute bottom-20 left-32 w-28 h-28 bg-green-100 rounded-full opacity-20"></div>
          <div className="animate-float-slow absolute bottom-32 right-10 w-20 h-20 bg-orange-100 rounded-full opacity-20"></div>
        </div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-2xl font-bold text-gray-900">
              JobHub
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
              onClick={() => window.location.href = '/api/login'}
              data-testid="button-nav-login"
            >
              Sign In
            </Button>
          </div>
          {/* Tools Menu Bar */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <Link href="/product/tracker" className="text-gray-600 hover:text-blue-600 cursor-pointer font-medium">Tracker</Link>
            
            <div className="relative group">
              <div className="text-gray-900 font-semibold cursor-pointer flex items-center gap-1">
                AI Tools
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="p-2">
                  <Link href="/product/ai-tools" className="block text-gray-600 hover:text-blue-600 cursor-pointer px-3 py-2 text-sm hover:bg-gray-50 rounded">Learn About AI Tools</Link>
                  <div className="text-gray-600 hover:text-blue-600 cursor-pointer px-3 py-2 text-sm hover:bg-gray-50 rounded" onClick={() => window.location.href = '/api/login'}>Try AI Tools</div>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="text-gray-900 font-semibold cursor-pointer flex items-center gap-1">
                Resume Tools
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="p-2">
                  <Link href="/product/resume-tools" className="block text-gray-600 hover:text-blue-600 cursor-pointer px-3 py-2 text-sm hover:bg-gray-50 rounded">Learn About Resume Tools</Link>
                  <div className="text-gray-600 hover:text-blue-600 cursor-pointer px-3 py-2 text-sm hover:bg-gray-50 rounded" onClick={() => window.location.href = '/api/login'}>Try Resume Tools</div>
                </div>
              </div>
            </div>
            
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600 cursor-pointer font-medium">Pricing</Link>
          </div>
        </div>
      </nav>

      {/* Festive Offer Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 py-3">
        <div className="container mx-auto px-6">
          <div className="text-center text-white">
            <div className="text-sm font-medium">
              🎉 <strong>Ganesh Chaturthi Special:</strong> Get 25% OFF 6-Month Pro Plan! Use code: <span className="bg-white/20 px-2 py-1 rounded font-mono">GANESH50</span> - Limited time until Sep 10! 
              <Link href="/ganesh-offer" className="underline hover:no-underline ml-2">Learn More →</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-display text-gray-900 mb-6 leading-tight" data-testid="title-main">
            Less Hassle,<br />
            <span className="text-blue-600">More Interviews</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed font-medium" data-testid="text-description">
            JobHub helps you create tailored resumes and cover letters fast with AI, 
            fill out application forms in one click, and automatically organize your job search.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-sm"
            onClick={() => window.location.href = '/api/login'}
            data-testid="button-login"
          >
            Sign Up for Free
          </Button>
        </div>

        {/* AI Tools Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display text-gray-900 mb-4">Better resumes & cover letters</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              Create interview-worthy resumes and cover letters with AI-powered tools 
              designed specifically for job seekers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="huntr-card text-center" data-testid="card-feature-ai-resume-builder">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mx-auto mb-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">AI Resume Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                  Craft standout resumes with AI suggestions, professional templates, 
                  and proofreading features.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="huntr-card text-center" data-testid="card-feature-ai-resume-review">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mx-auto mb-3">
                  <Search className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">AI Resume Review</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                  Get professional-level feedback in 5 minutes with role-targeted 
                  critique and improvement suggestions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="huntr-card text-center" data-testid="card-feature-resume-checker">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">Resume Checker</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                  Check your resume for spelling, length, metrics usage, and repetition 
                  to ensure it gets noticed.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="huntr-card text-center" data-testid="card-feature-ai-cover-letters">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">AI Cover Letters</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                  Generate personalized cover letters that align perfectly with 
                  job requirements and employer expectations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="huntr-card text-center" data-testid="card-feature-resume-summary">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">Resume Summary Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                  Create compelling resume summaries tailored to specific job 
                  descriptions and experience levels.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="huntr-card text-center" data-testid="card-feature-resume-bullets">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">Resume Bullet Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                  Generate well-written, quantifiable resume achievements 
                  that showcase your experience effectively.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Job Search Tools Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display text-gray-900 mb-4">Organize your search</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              Keep track of every opportunity and streamline your job search process 
              with powerful organization tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="huntr-card text-center" data-testid="card-feature-job-tracker">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">Job Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                  Track every detail about your opportunities - notes, dates, 
                  tasks, salaries, and company information.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="huntr-card text-center" data-testid="card-feature-job-search-metrics">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">Job Search Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                  Track your success rate, response times, and application 
                  performance with detailed analytics.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="huntr-card text-center" data-testid="card-feature-resume-skills">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mx-auto mb-3">
                  <Search className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">Resume Skills Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                  Extract keywords from job descriptions and turn them into 
                  relevant resume skill suggestions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Inspirational Quote */}
        <div className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl font-medium text-gray-700 italic leading-relaxed">
              "The future belongs to those who believe in the beauty of their dreams."
            </blockquote>
            <p className="text-gray-500 mt-4 font-medium">— Eleanor Roosevelt</p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mb-20">
          <Card className="max-w-3xl mx-auto huntr-card border-0" data-testid="card-cta">
            <CardHeader>
              <CardTitle className="text-4xl mb-6 text-gray-800">
                Ready to Land Your Dream Job?
              </CardTitle>
              <CardDescription className="text-xl text-gray-600 leading-relaxed">
                Stop struggling with spreadsheets and start landing interviews. 
                Get organized, get noticed, get hired.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                size="lg" 
                className="text-lg px-12 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm"
                onClick={() => window.location.href = '/api/login'}
                data-testid="button-start-now"
              >
                Start for Free Today
              </Button>
              <p className="text-sm text-gray-500 mt-4">No credit card required • Free forever plan</p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-20">
          <div className="container mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="col-span-1 md:col-span-2">
                <div className="text-2xl font-bold text-gray-900 mb-4">JobHub</div>
                <p className="text-gray-600 mb-6 max-w-md">
                  The modern job search platform that helps you organize applications, 
                  create better resumes, and land your dream job faster.
                </p>
                <div className="flex space-x-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300">
                    <Users className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300">
                    <Target className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300">
                    <Search className="h-4 w-4 text-gray-600" />
                  </div>
                </div>
              </div>

              {/* Product Links */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Job Tracker</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">AI Resume Builder</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Cover Letters</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Analytics</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Job Search</a></li>
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Help Center</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact Us</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Blog</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © 2024 JobHub. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-500 hover:text-blue-600 text-sm">Security</a>
                <a href="#" className="text-gray-500 hover:text-blue-600 text-sm">Status</a>
                <a href="#" className="text-gray-500 hover:text-blue-600 text-sm">Docs</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
      </div>
    </div>
  );
}