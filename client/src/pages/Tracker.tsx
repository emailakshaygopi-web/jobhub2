import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@shared/schema";
import { 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Eye, 
  FileText, 
  Filter, 
  Globe, 
  Heart, 
  LogOut, 
  MapPin, 
  Search, 
  Star, 
  Target, 
  TrendingUp, 
  User as UserIcon,
  Users,
  Zap
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Tracker() {
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
                <Link href="/tracker" className="text-gray-900 hover:text-blue-600 font-medium">Tracker</Link>
                <Link href="/ai-tools" className="text-gray-600 hover:text-blue-600 font-medium">AI Tools</Link>
                <Link href="/resume-tools" className="text-gray-600 hover:text-blue-600 font-medium">Resume Tools</Link>
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
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Target className="h-4 w-4" />
            Job Application Tracker
          </div>
          <h1 className="text-5xl font-display text-gray-900 mb-6 leading-tight">
            Organize Your Job Search<br />
            <span className="text-blue-600">Like a Pro</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stop losing track of applications in spreadsheets and emails. Our visual kanban board 
            keeps every opportunity organized, from discovery to offer.
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

        {/* Feature Showcase */}
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
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-display mb-4">Ready to Organize Your Job Search?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have streamlined their job search with our visual tracking system.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4"
              onClick={() => window.location.href = '/'}
            >
              Start Tracking Jobs Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}