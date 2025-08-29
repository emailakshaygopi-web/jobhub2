import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, TrendingUp, Users, MapPin, Briefcase, Star, Target, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface SalaryData {
  jobTitle: string;
  location: string;
  experience: string;
  industry: string;
  currentSalary?: string;
  targetSalary?: string;
}

interface NegotiationAdvice {
  marketResearch: {
    averageSalary: string;
    salaryRange: string;
    percentile: string;
    comparison: string;
  };
  negotiationTips: string[];
  keyTalkingPoints: string[];
  emailTemplate: string;
}

export default function SalaryNegotiationTool() {
  const [salaryData, setSalaryData] = useState<SalaryData>({
    jobTitle: '',
    location: '',
    experience: '',
    industry: ''
  });
  const [advice, setAdvice] = useState<NegotiationAdvice | null>(null);
  const { toast } = useToast();

  const generateAdviceMutation = useMutation({
    mutationFn: async (data: SalaryData) => {
      const response = await apiRequest('POST', '/api/salary-advice', data);
      return response.json();
    },
    onSuccess: (data) => {
      setAdvice(data);
      toast({
        title: "Salary Research Complete",
        description: "Your personalized negotiation strategy is ready!",
      });
    },
    onError: () => {
      toast({
        title: "Research Failed",
        description: "Unable to generate salary advice. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!salaryData.jobTitle || !salaryData.location || !salaryData.experience) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    generateAdviceMutation.mutate(salaryData);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="title-salary-negotiation">
          Salary Negotiation Tool
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get AI-powered market research and personalized negotiation strategies to maximize your earning potential.
        </p>
      </div>

      {!advice ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Salary Research Form
            </CardTitle>
            <CardDescription>
              Tell us about your position to get personalized salary insights and negotiation advice.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title *</Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., Software Engineer"
                    value={salaryData.jobTitle}
                    onChange={(e) => setSalaryData(prev => ({ ...prev, jobTitle: e.target.value }))}
                    data-testid="input-job-title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., San Francisco, CA"
                    value={salaryData.location}
                    onChange={(e) => setSalaryData(prev => ({ ...prev, location: e.target.value }))}
                    data-testid="input-location"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <Input
                    id="experience"
                    placeholder="e.g., 3-5 years"
                    value={salaryData.experience}
                    onChange={(e) => setSalaryData(prev => ({ ...prev, experience: e.target.value }))}
                    data-testid="input-experience"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., Technology, Finance"
                    value={salaryData.industry}
                    onChange={(e) => setSalaryData(prev => ({ ...prev, industry: e.target.value }))}
                    data-testid="input-industry"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentSalary">Current Salary (Optional)</Label>
                  <Input
                    id="currentSalary"
                    placeholder="e.g., $80,000"
                    value={salaryData.currentSalary || ''}
                    onChange={(e) => setSalaryData(prev => ({ ...prev, currentSalary: e.target.value }))}
                    data-testid="input-current-salary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetSalary">Target Salary (Optional)</Label>
                  <Input
                    id="targetSalary"
                    placeholder="e.g., $100,000"
                    value={salaryData.targetSalary || ''}
                    onChange={(e) => setSalaryData(prev => ({ ...prev, targetSalary: e.target.value }))}
                    data-testid="input-target-salary"
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={generateAdviceMutation.isPending}
                data-testid="button-generate-advice"
              >
                {generateAdviceMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Researching Salary Data...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Generate Negotiation Strategy
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="research" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="research" data-testid="tab-research">Market Research</TabsTrigger>
            <TabsTrigger value="tips" data-testid="tab-tips">Negotiation Tips</TabsTrigger>
            <TabsTrigger value="talking-points" data-testid="tab-talking-points">Key Points</TabsTrigger>
            <TabsTrigger value="email" data-testid="tab-email">Email Template</TabsTrigger>
          </TabsList>
          
          <TabsContent value="research" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Market Research Results
                </CardTitle>
                <CardDescription>
                  Based on current market data for {salaryData.jobTitle} in {salaryData.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-700" data-testid="text-average-salary">
                      {advice.marketResearch.averageSalary}
                    </p>
                    <p className="text-sm text-green-600">Average Salary</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-700" data-testid="text-salary-range">
                      {advice.marketResearch.salaryRange}
                    </p>
                    <p className="text-sm text-blue-600">Salary Range</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-700" data-testid="text-percentile">
                      {advice.marketResearch.percentile}
                    </p>
                    <p className="text-sm text-purple-600">Your Percentile</p>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <TrendingUp className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-lg font-bold text-amber-700" data-testid="text-comparison">
                      {advice.marketResearch.comparison}
                    </p>
                    <p className="text-sm text-amber-600">Market Position</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tips" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-orange-600" />
                  Negotiation Tips
                </CardTitle>
                <CardDescription>
                  Expert strategies tailored to your situation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {advice.negotiationTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700" data-testid={`tip-${index}`}>{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="talking-points" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-600" />
                  Key Talking Points
                </CardTitle>
                <CardDescription>
                  Arguments to support your salary request
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {advice.keyTalkingPoints.map((point, index) => (
                    <div key={index} className="p-4 border-l-4 border-indigo-500 bg-indigo-50">
                      <p className="text-gray-700" data-testid={`talking-point-${index}`}>{point}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-red-600" />
                  Email Template
                </CardTitle>
                <CardDescription>
                  Professional email template for salary negotiation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={advice.emailTemplate}
                  readOnly
                  className="min-h-[300px] font-mono text-sm"
                  data-testid="textarea-email-template"
                />
                <Button 
                  onClick={() => {
                    navigator.clipboard.writeText(advice.emailTemplate);
                    toast({
                      title: "Copied!",
                      description: "Email template copied to clipboard.",
                    });
                  }}
                  className="mt-4"
                  data-testid="button-copy-email"
                >
                  Copy Email Template
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
      
      {advice && (
        <div className="text-center">
          <Button 
            onClick={() => {
              setAdvice(null);
              setSalaryData({
                jobTitle: '',
                location: '',
                experience: '',
                industry: ''
              });
            }}
            variant="outline"
            data-testid="button-new-research"
          >
            Start New Research
          </Button>
        </div>
      )}
    </div>
  );
}