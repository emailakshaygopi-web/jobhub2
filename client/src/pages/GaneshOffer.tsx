import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  Heart,
  Star,
  Gift,
  Clock,
  CheckCircle,
  Sparkles,
  Trophy,
  Target,
  Calendar
} from "lucide-react";

export default function GaneshOffer() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <Link href="/">
                <div className="text-2xl font-bold text-gray-900 cursor-pointer">
                  JobHub
                </div>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
                <Link href="/product/tracker" className="text-gray-600 hover:text-blue-600 font-medium">Tracker</Link>
                <Link href="/product/ai-tools" className="text-gray-600 hover:text-blue-600 font-medium">AI Tools</Link>
                <Link href="/product/resume-tools" className="text-gray-600 hover:text-blue-600 font-medium">Resume Tools</Link>
                <Link href="/pricing" className="text-gray-600 hover:text-blue-600 font-medium">Pricing</Link>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium">About</Link>
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
        {/* Hero Banner */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-lg font-medium mb-6">
                <Heart className="h-5 w-5" />
                Ganesh Chaturthi Special
              </div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                🎉 Celebrate Success with<br />
                <span className="text-yellow-200">25% OFF Pro Plan!</span> 🎉
              </h1>
              <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                Lord Ganesh is the remover of obstacles and the patron of arts and sciences. 
                This Ganesh Chaturthi, remove the obstacles in your career path with our special offer!
              </p>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-lg font-medium">
                <Clock className="h-5 w-5" />
                Limited Time: Valid until September 10, 2025
              </div>
            </div>
          </div>
        </div>

        {/* Offer Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Gift className="h-4 w-4" />
              Exclusive Offer
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Remove Career Obstacles with AI-Powered Tools
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Just as Lord Ganesh removes obstacles from our path, our AI-powered platform removes 
              the friction from your job search journey. This festive season, we're offering an 
              unprecedented discount to help you accelerate your career success.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700 font-medium">6-Month Pro Plan: <span className="line-through text-gray-400">$300</span> <span className="text-red-600 font-bold">$225</span></span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Unlimited AI-powered resume optimizations</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Advanced job tracking with analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Smart cover letter generation</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Priority customer support</span>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <div className="text-center">
                <div className="text-lg font-medium text-orange-700 mb-2">Use Promo Code:</div>
                <div className="text-3xl font-bold text-orange-900 font-mono bg-white px-4 py-2 rounded border-2 border-orange-300 inline-block">
                  GANESH50
                </div>
                <div className="text-sm text-orange-600 mt-2">25% discount on 6-month Pro plan</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <Card className="huntr-card border-2 border-orange-300 relative overflow-hidden">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 text-sm">
                  🎉 Festival Special
                </Badge>
              </div>
              
              <CardHeader className="text-center pt-8 pb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900 mb-2">Pro Plan - 6 Months</CardTitle>
                <CardDescription className="text-gray-600 mb-4">
                  Complete career acceleration package
                </CardDescription>
                
                <div className="text-center">
                  <div className="text-sm text-gray-500 line-through mb-1">Regular Price: $300</div>
                  <div className="text-4xl font-bold text-red-600 mb-2">
                    $225
                    <span className="text-lg font-normal text-gray-600">/6 months</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    <Sparkles className="h-4 w-4" />
                    Save $75!
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Button 
                    size="lg"
                    onClick={() => window.location.href = '/pricing'}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg py-6"
                  >
                    Claim This Offer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-xs text-gray-500 mt-3">
                    Automatic discount applied with code GANESH50
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why This Offer */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4" />
              Festival Significance
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Ganesh Chaturthi & Career Growth Go Hand in Hand
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ganesh Chaturthi is all about new beginnings, removing obstacles, and achieving success. 
              Your career deserves the same fresh start and divine intervention!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="huntr-card text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Remove Obstacles</h3>
                <p className="text-gray-600">
                  Just like Lord Ganesh removes barriers, our AI removes the guesswork from job applications.
                </p>
              </CardContent>
            </Card>

            <Card className="huntr-card text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Sparkles className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">New Beginnings</h3>
                <p className="text-gray-600">
                  Start your career transformation journey with the most powerful tools available.
                </p>
              </CardContent>
            </Card>

            <Card className="huntr-card text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Trophy className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Achieve Success</h3>
                <p className="text-gray-600">
                  Land more interviews and get better job offers with AI-optimized applications.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Urgency Section */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Clock className="h-4 w-4" />
            Limited Time Offer
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Don't Miss This Auspicious Opportunity!
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            This special Ganesh Chaturthi offer expires on <strong>September 10, 2025</strong>. 
            Start your career transformation journey today with 50% savings!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <Calendar className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">Aug 28</div>
              <div className="text-sm text-gray-600">Offer Starts</div>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">14 Days</div>
              <div className="text-sm text-gray-600">Only Available</div>
            </div>
            <div className="text-center">
              <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">Sep 10</div>
              <div className="text-sm text-gray-600">Offer Expires</div>
            </div>
          </div>

          <Button 
            size="lg"
            onClick={() => window.location.href = '/pricing'}
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white text-xl px-12 py-6"
          >
            Claim 50% OFF Now!
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>

        {/* Terms */}
        <div className="text-center bg-gray-50 rounded-2xl p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Offer Terms & Conditions</h3>
          <div className="text-sm text-gray-600 space-y-2 max-w-3xl mx-auto">
            <p>• Valid from August 28, 2025 to September 10, 2025 (11:59 PM PST)</p>
            <p>• Applies only to 6-month Pro plan subscription</p>
            <p>• Use promo code GANESH50 at checkout to apply discount</p>
            <p>• Cannot be combined with other offers or promotions</p>
            <p>• New subscribers only - limit one per customer</p>
            <p>• Subscription will auto-renew at regular price after 6 months unless cancelled</p>
            <p>• Full refund available within 30 days if not satisfied</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">JobHub</div>
            <p className="text-gray-400 mb-6">
              Celebrating Ganesh Chaturthi with career success for all! 🎉
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/" className="text-gray-400 hover:text-white">Home</Link>
              <Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link>
              <Link href="/about" className="text-gray-400 hover:text-white">About</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}