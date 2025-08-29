import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  Check,
  CheckCircle,
  FileText,
  Globe,
  Heart,
  Search,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  Wand2,
  Zap
} from "lucide-react";

export default function Pricing() {
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
                <Link href="/product/resume-tools" className="text-gray-600 hover:text-blue-600 font-medium">Resume Tools</Link>
                <Link href="/pricing" className="text-gray-900 hover:text-blue-600 font-medium">Pricing</Link>
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
        {/* Festive Offer Banner */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl p-6 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Heart className="h-4 w-4" />
                Ganesh Chaturthi Special
              </div>
              <h2 className="text-3xl font-bold mb-2">
                🎉 25% OFF 6-Month Pro Plan! 🎉
              </h2>
              <p className="text-lg mb-4 opacity-90">
                Celebrate with us and save on your career journey. Use code: <strong>GANESH50</strong>
              </p>
              <div className="text-sm opacity-80">
                ⏰ Limited time offer expires September 10, 2025
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4" />
            Simple Pricing
          </div>
          <h1 className="text-5xl font-display text-gray-900 mb-6 leading-tight">
            Choose Your Perfect<br />
            <span className="text-blue-600">Career Plan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Start with our free AI tools and upgrade when you're ready for the complete 
            job search management experience.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Free Plan */}
          <Card className="huntr-card border-2 border-gray-200 relative">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bot className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900 mb-2">AI Tools</CardTitle>
              <CardDescription className="text-gray-600 mb-4">
                Perfect for getting started with AI-powered career tools
              </CardDescription>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  $0
                  <span className="text-lg font-normal text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-500">Forever free</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Bot className="h-4 w-4 text-blue-600" />
                  AI-Powered Tools
                </h4>
                <div className="space-y-3 ml-6">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">AI Resume Checker</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">AI Resume Builder</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">AI Cover Letter Generator</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Basic resume analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">3 AI generations per month</span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                onClick={() => window.location.href = '/api/login'}
              >
                Start Free
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                No credit card required • Upgrade anytime
              </p>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="huntr-card border-2 border-blue-500 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
            </div>
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900 mb-2">Pro</CardTitle>
              <CardDescription className="text-gray-600 mb-4">
                Complete job search management with unlimited AI tools
              </CardDescription>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  $50.00
                  <span className="text-lg font-normal text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-500">Billed monthly</p>
                
                {/* Special 6-Month Offer */}
                <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg">
                  <div className="text-sm font-medium text-orange-700 mb-1">
                    🎉 Ganesh Chaturthi Special
                  </div>
                  <div className="text-xs text-orange-600">
                    6-Month Plan: <span className="line-through">$300</span> <span className="font-bold text-lg text-red-600">$225</span>
                  </div>
                  <div className="text-xs text-orange-600 mt-1">
                    Use code: <span className="font-mono bg-orange-100 px-1 rounded">GANESH50</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Bot className="h-4 w-4 text-blue-600" />
                  Everything in Free, plus:
                </h4>
                <div className="space-y-3 ml-6">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Unlimited AI generations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Advanced resume analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Priority AI processing</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                  Job Tracking & Management
                </h4>
                <div className="space-y-3 ml-6">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Visual Kanban board</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Unlimited job applications</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Smart reminders & deadlines</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Interview scheduling</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Application analytics</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Wand2 className="h-4 w-4 text-green-600" />
                  Professional Tools
                </h4>
                <div className="space-y-3 ml-6">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Resume review & feedback</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Bullet point generator</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Skills optimization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Professional summary generator</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Search className="h-4 w-4 text-orange-600" />
                  Advanced Features
                </h4>
                <div className="space-y-3 ml-6">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Auto job discovery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Company research automation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Email integrations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Export & backup</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Priority support</span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg py-6"
                onClick={() => window.location.href = '/api/login'}
              >
                Start Pro Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                14-day free trial • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Feature Comparison */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display text-gray-900 mb-4">Compare Plans</h2>
            <p className="text-lg text-gray-600">See what's included in each plan</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Free</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 text-gray-700">AI Resume Checker</td>
                  <td className="py-4 px-6 text-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">AI Resume Builder</td>
                  <td className="py-4 px-6 text-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">AI Cover Letter Generator</td>
                  <td className="py-4 px-6 text-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">AI Generations per month</td>
                  <td className="py-4 px-6 text-center text-gray-600">3</td>
                  <td className="py-4 px-6 text-center text-gray-600">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Job Tracking Board</td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Application Analytics</td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Resume Tools Suite</td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Smart Job Discovery</td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Priority Support</td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display text-gray-900 mb-12">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Is the free plan really free forever?</h3>
              <p className="text-gray-600">Yes! Our free plan includes access to all AI tools with a monthly usage limit. No hidden fees or time restrictions.</p>
            </div>
            
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Can I upgrade or downgrade anytime?</h3>
              <p className="text-gray-600">Absolutely! You can upgrade to Pro anytime or cancel your subscription with no penalties. Changes take effect immediately.</p>
            </div>
            
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards (Visa, MasterCard, American Express) and PayPal for your convenience.</p>
            </div>
            
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">Yes, we offer a 30-day money-back guarantee for Pro subscriptions if you're not completely satisfied.</p>
            </div>
            
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-2">How does the 14-day trial work?</h3>
              <p className="text-gray-600">Start your Pro trial with full access to all features. No charges until the trial ends, and you can cancel anytime.</p>
            </div>
            
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Is my data secure?</h3>
              <p className="text-gray-600">Your privacy is our priority. We use enterprise-grade security and never share your personal information with third parties.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-display mb-4">Ready to Transform Your Job Search?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Start with our free AI tools today or unlock the complete job search management experience with Pro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4"
                onClick={() => window.location.href = '/api/login'}
              >
                Start Free
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4"
                onClick={() => window.location.href = '/api/login'}
              >
                Try Pro Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}