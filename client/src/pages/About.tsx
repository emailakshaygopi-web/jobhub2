import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight,
  Heart,
  Users,
  Target,
  Globe,
  Star,
  CheckCircle,
  Lightbulb,
  Award
} from "lucide-react";

export default function About() {
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
                <Link href="/about" className="text-gray-900 hover:text-blue-600 font-medium">About</Link>
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
            <Heart className="h-4 w-4" />
            Our Story
          </div>
          <h1 className="text-5xl font-display text-gray-900 mb-6 leading-tight">
            Empowering Your Career<br />
            <span className="text-blue-600">Journey with AI</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            JobHub was created by Akshay, a passionate developer who experienced the challenges of job searching firsthand. 
            After spending countless hours organizing applications, crafting cover letters, and tracking opportunities, 
            Akshay realized there had to be a better way. This platform combines cutting-edge AI technology with 
            practical job search management to help professionals like you land their dream careers faster and with less stress.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target className="h-4 w-4" />
              Our Mission
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Making Career Success Accessible to Everyone
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We believe every job seeker deserves the tools and insights that top professionals use. 
              That's why we've combined powerful AI technology with intuitive design to create a platform 
              that adapts to your unique career goals.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">AI-powered insights for better applications</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Streamlined workflow for efficient job tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Data-driven approach to career progression</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation at Heart</h3>
              <p className="text-gray-600">
                We're constantly exploring new ways to leverage AI and automation 
                to make your job search more effective and less stressful.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4" />
              Our Values
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our core values shape everything we do, from product development to customer support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="huntr-card text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">User-Centric</h3>
                <p className="text-gray-600">
                  Every feature we build starts with understanding our users' real needs and challenges.
                </p>
              </CardContent>
            </Card>

            <Card className="huntr-card text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Results-Driven</h3>
                <p className="text-gray-600">
                  We measure our success by your success - more interviews, better offers, dream jobs.
                </p>
              </CardContent>
            </Card>

            <Card className="huntr-card text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Globe className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Accessible</h3>
                <p className="text-gray-600">
                  Professional-grade career tools should be available to everyone, regardless of budget.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Achievement Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12 mb-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="h-4 w-4" />
              Impact & Growth
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Helping Job Seekers Succeed Worldwide
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">50,000+</div>
                <div className="text-gray-600">Applications Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
                <div className="text-gray-600">User Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="h-4 w-4" />
            The Team
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Built by Career Experts and AI Engineers
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Our diverse team combines deep expertise in recruitment, career coaching, and cutting-edge AI technology. 
            We're passionate about using technology to solve real-world career challenges.
          </p>
          <div className="text-center">
            <p className="text-gray-600 italic">
              "We've all been through the job search process ourselves. We know the stress, the uncertainty, 
              and the overwhelming amount of work involved. That's exactly why we built JobHub."
            </p>
            <p className="text-gray-900 font-medium mt-4">— Akshay & Team</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Job Search?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are using JobHub to land their dream jobs faster and with less stress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => window.location.href = '/api/login'}
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/pricing'}
              className="text-lg px-8 py-4"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">JobHub</div>
            <p className="text-gray-400 mb-6">
              Empowering careers with AI-driven insights and intelligent job tracking.
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