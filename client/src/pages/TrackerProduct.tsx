import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  BarChart3, 
  Calendar, 
  CheckCircle,
  CheckCircle2, 
  Clock, 
  Eye, 
  FileText, 
  Filter, 
  Globe, 
  Heart, 
  Lightbulb,
  MapPin, 
  Search, 
  Star, 
  Target, 
  TrendingUp, 
  Users,
  Zap
} from "lucide-react";

export default function TrackerProduct() {
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
                <Link href="/product/tracker" className="text-gray-900 hover:text-blue-600 font-medium">Tracker</Link>
                <Link href="/product/ai-tools" className="text-gray-600 hover:text-blue-600 font-medium">AI Tools</Link>
                <Link href="/product/resume-tools" className="text-gray-600 hover:text-blue-600 font-medium">Resume Tools</Link>
                <Link href="/pricing" className="text-gray-600 hover:text-blue-600 font-medium">Pricing</Link>
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
            <Target className="h-4 w-4" />
            Job Application Tracker
          </div>
          <h1 className="text-5xl font-display text-gray-900 mb-6 leading-tight">
            Never Lose Track of<br />
            <span className="text-blue-600">Your Dream Job</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your chaotic job search into an organized, visual pipeline. 
            Track every application, interview, and opportunity with our powerful kanban-style board.
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="huntr-card border-0 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Visual Pipeline</CardTitle>
              <CardDescription className="text-gray-600">
                Drag and drop applications through customizable stages from "Wishlist" to "Offer"
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="huntr-card border-0 bg-gradient-to-br from-green-50 to-white">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Smart Reminders</CardTitle>
              <CardDescription className="text-gray-600">
                Never miss a follow-up with intelligent reminders for interviews and deadlines
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="huntr-card border-0 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Analytics & Insights</CardTitle>
              <CardDescription className="text-gray-600">
                Track response rates, interview success, and optimize your job search strategy
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Feature Showcases */}
        <div className="space-y-20">
          {/* Kanban Board Preview */}
          <div className="text-center">
            <h2 className="text-3xl font-display text-gray-900 mb-4">Visual Kanban Board</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              See your entire job search at a glance. Organize applications by stage and never lose track of opportunities.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Wishlist Column */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Heart className="h-4 w-4 text-pink-500" />
                      Wishlist
                    </h3>
                    <Badge variant="secondary">8</Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 text-sm">Senior Developer</h4>
                      <p className="text-sm text-gray-600">Google</p>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">San Francisco</span>
                      </div>
                    </div>
                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 text-sm">Product Manager</h4>
                      <p className="text-sm text-gray-600">Meta</p>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">Remote</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Applied Column */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      Applied
                    </h3>
                    <Badge variant="secondary">12</Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 text-sm">Full Stack Engineer</h4>
                      <p className="text-sm text-gray-600">Stripe</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">3 days ago</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 text-sm">Software Engineer</h4>
                      <p className="text-sm text-gray-600">Airbnb</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">1 week ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interview Column */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Users className="h-4 w-4 text-orange-500" />
                      Interview
                    </h3>
                    <Badge variant="secondary">5</Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 text-sm">Frontend Engineer</h4>
                      <p className="text-sm text-gray-600">Netflix</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">Tomorrow 2PM</span>
                      </div>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 text-sm">Backend Engineer</h4>
                      <p className="text-sm text-gray-600">Spotify</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">Friday 10AM</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Offer Column */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Offer
                    </h3>
                    <Badge variant="secondary">2</Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 text-sm">Senior Engineer</h4>
                      <p className="text-sm text-gray-600">Uber</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Star className="h-3 w-3 text-yellow-400" />
                        <span className="text-xs text-gray-500">$150K offer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display text-gray-900 mb-6">Smart Job Discovery</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Search className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Auto-Import Jobs</h3>
                    <p className="text-gray-600">Connect to LinkedIn, Indeed, and other job boards to automatically import opportunities</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Filter className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Smart Filtering</h3>
                    <p className="text-gray-600">AI-powered job matching based on your skills, experience, and preferences</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Company Research</h3>
                    <p className="text-gray-600">Automatic company insights, funding info, and culture details for every application</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Job Discovery Dashboard</h3>
                <p className="text-gray-600">Find and track the perfect opportunities</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Zap className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Senior React Developer</h4>
                      <p className="text-sm text-gray-600">TechCorp • $120-150K • Remote</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">95% Match</Badge>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Target className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Full Stack Engineer</h4>
                      <p className="text-sm text-gray-600">StartupXYZ • $100-130K • San Francisco</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">87% Match</Badge>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Eye className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Frontend Lead</h4>
                      <p className="text-sm text-gray-600">MegaCorp • $140-170K • New York</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">82% Match</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Dashboard */}
          <div className="text-center">
            <h2 className="text-3xl font-display text-gray-900 mb-4">Powerful Analytics</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Track your job search performance and identify areas for improvement with comprehensive analytics.
            </p>
            
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-2">47</div>
                  <p className="text-sm text-gray-600">Applications Sent</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-2">12</div>
                  <p className="text-sm text-gray-600">Interviews Scheduled</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-purple-600 mb-2">25%</div>
                  <p className="text-sm text-gray-600">Response Rate</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
                  <p className="text-sm text-gray-600">Offers Received</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Application Funnel</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Applied</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div className="w-full h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">47</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Phone Screens</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div className="w-3/4 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">18</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">On-site Interviews</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div className="w-1/2 h-2 bg-orange-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">12</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Offers</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div className="w-1/4 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">3</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Success Insights</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Best performing day</p>
                        <p className="text-xs text-gray-600">Tuesday applications get 40% more responses</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Target className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Top industry match</p>
                        <p className="text-xs text-gray-600">FinTech companies show highest interest</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Lightbulb className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Optimization tip</p>
                        <p className="text-xs text-gray-600">Add 2 more skills to increase match rate by 15%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-display mb-4">Ready to Organize Your Job Search?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have streamlined their job search with our visual tracking system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4"
                onClick={() => window.location.href = '/api/login'}
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4"
                onClick={() => window.location.href = '/pricing'}
              >
                View Pricing
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}