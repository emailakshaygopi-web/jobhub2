import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { 
  FileText, 
  Target, 
  Zap, 
  PenTool,
  Copy,
  RefreshCw,
  Sparkles,
  CheckCircle,
  Lock
} from 'lucide-react';

export default function ProfessionalTools() {
  const [selectedTool, setSelectedTool] = useState('resume-review');
  const [inputText, setInputText] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [userPlan, setUserPlan] = useState('free');
  const { toast } = useToast();
  const { user } = useAuth();
  
  const ADMIN_USER_ID = '47005508'; // Akshay's user ID
  const isAdmin = user?.id === ADMIN_USER_ID;
  
  useEffect(() => {
    // Check user's plan status
    fetch('/api/user-credits', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      setUserPlan(data.plan || 'free');
    })
    .catch(err => console.error('Error fetching user plan:', err));
  }, []);

  const tools = [
    { id: 'resume-review', label: 'Resume Review & Feedback', icon: FileText, description: 'Get detailed feedback on your resume' },
    { id: 'bullet-generator', label: 'Bullet Point Generator', icon: Target, description: 'Create impactful bullet points' },
    { id: 'skills-optimization', label: 'Skills Optimization', icon: Zap, description: 'Optimize your skills section' },
    { id: 'summary-generator', label: 'Summary Generator', icon: PenTool, description: 'Generate professional summaries' },
  ];

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please provide some content to work with",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let result = '';
    
    // Contextual analysis based on selected tool and input content
    if (!inputText.trim()) {
      result = `Please provide content for ${selectedTool === 'resume-review' ? 'resume analysis' : selectedTool === 'bullet-generator' ? 'bullet point generation' : selectedTool === 'skills-optimization' ? 'skills optimization' : 'summary generation'}.`;
    } else if (inputText.length < 20) {
      result = 'Please provide more detailed content for a comprehensive analysis.';
    } else {
      const content = inputText.toLowerCase();
      
      switch (selectedTool) {
        case 'resume-review':
          const hasWorkExperience = content.includes('experience') || content.includes('worked') || content.includes('developed') || content.includes('managed');
          const hasSkills = content.includes('skills') || content.includes('technologies') || content.includes('programming') || content.includes('software');
          const hasEducation = content.includes('education') || content.includes('degree') || content.includes('university') || content.includes('college');
          const hasAchievements = content.includes('achieved') || content.includes('improved') || content.includes('increased') || /\d+%/.test(inputText);
          
          result = `📋 Resume Analysis & Feedback:\n\n✅ Strengths Identified:`;
          if (hasWorkExperience) result += `\n• Clear work experience section present`;
          if (hasSkills) result += `\n• Technical skills are mentioned`;
          if (hasEducation) result += `\n• Educational background included`;
          if (hasAchievements) result += `\n• Quantifiable achievements noted`;
          
          result += `\n\n⚠️ Areas for Improvement:`;
          if (!hasAchievements) result += `\n• Add quantifiable achievements (numbers, percentages, dollar amounts)`;
          if (!content.includes('summary') && !content.includes('objective')) result += `\n• Consider adding a professional summary section`;
          if (inputText.length < 200) result += `\n• Expand content with more detailed descriptions`;
          
          result += `\n\n💡 Specific Recommendations:\n• Use action verbs: "Developed," "Implemented," "Achieved," "Led"\n• Include industry-relevant keywords for ATS optimization\n• Ensure consistent formatting throughout\n\nOverall Assessment: ${hasWorkExperience && hasSkills ? 'Strong foundation' : 'Needs enhancement'} - Focus on quantifying achievements.`;
          break;
          
        case 'bullet-generator':
          if (!content.includes('responsible') && !content.includes('manage') && !content.includes('develop') && !content.includes('lead')) {
            result = 'Please provide job responsibilities, tasks, or achievements to generate professional bullet points.';
          } else {
            result = `🎯 Professional Bullet Points Based on Your Input:\n\n`;
            const responsibilities = inputText.split(/[.;,\n]/).filter(item => item.trim().length > 5);
            responsibilities.slice(0, 5).forEach((resp, index) => {
              const cleanResp = resp.trim();
              if (cleanResp) {
                result += `• ${cleanResp.charAt(0).toUpperCase() + cleanResp.slice(1).replace(/^(i |my |the )/i, '').replace(/^\w/, c => c.toUpperCase())}, resulting in measurable impact\n`;
              }
            });
            result += `\n💡 Tips: Add specific metrics and numbers to make these bullets more impactful.`;
          }
          break;
          
        case 'skills-optimization':
          if (!content.includes('skill') && !content.includes('technology') && !content.includes('programming') && !content.includes('software')) {
            result = 'Please provide your current skills, technologies, or tools to optimize this section.';
          } else {
            result = `⚡ Optimized Skills Section:\n\nBased on your input, here's an organized skills section:\n\n`;
            if (content.includes('javascript') || content.includes('python') || content.includes('java') || content.includes('programming')) {
              result += `Technical Skills:\n• Programming Languages: Extract from your input\n• Frameworks & Libraries: Based on mentioned technologies\n• Development Tools: Version control, IDEs, etc.\n\n`;
            }
            result += `Core Competencies:\n• ${inputText.split(/[,;\n]/).slice(0, 6).map(skill => skill.trim().charAt(0).toUpperCase() + skill.trim().slice(1)).join('\n• ')}\n\n💡 Recommendation: Group similar skills together and prioritize the most relevant ones for your target role.`;
          }
          break;
          
        case 'summary-generator':
          if (inputText.length < 50) {
            result = 'Please provide more information about your background, experience, and career goals for a comprehensive summary.';
          } else {
            const yearsMatch = inputText.match(/(\d+)\s*year/i);
            const years = yearsMatch ? yearsMatch[1] : '5+';
            result = `✨ Professional Summary:\n\nBased on your background:\n\n`;
            if (content.includes('develop') || content.includes('engineer') || content.includes('technical')) {
              result += `Experienced professional with ${years} years of expertise in your field. `;
            } else {
              result += `Results-driven professional with ${years} years of progressive experience. `;
            }
            result += `Proven track record of delivering high-quality solutions and driving business growth.\n\nKey Strengths:\n• Strong analytical and problem-solving abilities\n• Excellent communication and collaboration skills\n• Track record of successful project delivery\n\nSeeking to leverage expertise and contribute to organizational success in a challenging role.\n\n💡 Tip: Customize this summary to match specific job requirements and include quantifiable achievements.`;
          }
          break;
          
        default:
          result = 'Generated content will appear here...';
      }
    }
    
    setGeneratedContent(result);
    setIsGenerating(false);
    
    toast({
      title: "Content Generated",
      description: "Your professional content has been created successfully",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied to Clipboard",
      description: "Content has been copied to your clipboard",
    });
  };

  const handleReset = () => {
    setInputText('');
    setGeneratedContent('');
  };

  // Show Pro upgrade gate for non-admin users on free plan
  if (!isAdmin && userPlan === 'free') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-8">
              <Lock className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Unlock Pro Tools
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Access premium AI-powered tools to create professional documents that stand out.
            </p>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Pro Tools Include:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-purple-500" />
                  <span className="text-gray-700">AI Resume Review & Feedback</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-purple-500" />
                  <span className="text-gray-700">Bullet Point Generator</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-purple-500" />
                  <span className="text-gray-700">Skills Optimization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-purple-500" />
                  <span className="text-gray-700">Professional Summary Generator</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-purple-500" />
                  <span className="text-gray-700">Cover Letter Templates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-purple-500" />
                  <span className="text-gray-700">Interview Prep Tools</span>
                </div>
              </div>
            </div>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl text-lg font-semibold"
              onClick={() => window.location.href = '/upgrade'}
            >
              Upgrade to Pro - $225/year
            </Button>
            <p className="text-gray-500 mt-4">30-day money-back guarantee</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pro Tools</h1>
        <p className="text-muted-foreground">AI-powered tools to enhance your professional documents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tool Selection */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Choose Tool</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    selectedTool === tool.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  data-testid={`tool-${tool.id}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium text-sm">{tool.label}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{tool.description}</p>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Input and Output */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              {tools.find(t => t.id === selectedTool)?.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Quick Start Examples */}
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Quick Start Examples
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedTool === 'resume-review' && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setInputText('John Smith\nSoftware Engineer\nEmail: john@example.com | Phone: (555) 123-4567\n\nPROFESSIONAL SUMMARY\nExperienced full-stack developer with 5+ years building scalable web applications using React, Node.js, and Python. Led development teams and increased system performance by 40%.\n\nWORK EXPERIENCE\nSenior Software Engineer | TechCorp Inc. | 2021-Present\n• Developed and maintained 15+ web applications serving 10,000+ users\n• Led a team of 4 developers in agile development practices\n• Improved application performance by 40% through code optimization\n• Implemented CI/CD pipelines reducing deployment time by 60%\n\nSoftware Developer | StartupXYZ | 2019-2021\n• Built responsive web applications using React and TypeScript\n• Collaborated with designers and product managers on user experience\n• Integrated third-party APIs and payment systems\n• Mentored 2 junior developers\n\nSKILLS\n• Programming: JavaScript, TypeScript, Python, Java\n• Frontend: React, Vue.js, HTML5, CSS3, Sass\n• Backend: Node.js, Express, Django, REST APIs\n• Databases: PostgreSQL, MongoDB, Redis\n• Cloud: AWS, Docker, Kubernetes\n• Tools: Git, Jenkins, JIRA, Figma\n\nEDUCATION\nBachelor of Science in Computer Science | University of Technology | 2019\n• Relevant Coursework: Data Structures, Algorithms, Database Systems\n• Senior Project: Built an e-commerce platform with React and Node.js')}
                      className="text-xs justify-start h-auto py-2 px-3"
                    >
                      Review Sample Resume
                    </Button>
                  </>
                )}
                {selectedTool === 'bullet-generator' && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setInputText('As a Marketing Manager, I was responsible for managing social media campaigns, creating content, analyzing performance metrics, and coordinating with the design team. I increased follower engagement and managed a budget while working with influencers and running paid advertising campaigns.')}
                      className="text-xs justify-start h-auto py-2 px-3"
                    >
                      Generate Sample Points
                    </Button>
                  </>
                )}
                {selectedTool === 'skills-optimization' && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setInputText('JavaScript, HTML, CSS, React, Angular, Node.js, Express, MongoDB, MySQL, Git, GitHub, VS Code, Adobe Photoshop, Microsoft Office, Project Management, Team Leadership, Communication, Problem Solving, Time Management, Python, REST APIs, Agile, Scrum')}
                      className="text-xs justify-start h-auto py-2 px-3"
                    >
                      Optimize Sample Skills
                    </Button>
                  </>
                )}
                {selectedTool === 'summary-generator' && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setInputText('I am a digital marketing professional with 6 years of experience in SEO, social media marketing, content creation, and paid advertising. I have managed campaigns for e-commerce, SaaS, and B2B companies, increasing conversion rates by up to 45%. I am experienced with Google Ads, Facebook Ads, HubSpot, Salesforce, and analytics tools. I have led marketing teams and collaborated cross-functionally with sales and product teams. I am looking for a senior marketing role where I can drive growth and lead strategic initiatives.')}
                      className="text-xs justify-start h-auto py-2 px-3"
                    >
                      Generate Sample Summary
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Input Section */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {selectedTool === 'resume-review' ? 'Resume Content' :
                 selectedTool === 'bullet-generator' ? 'Job Responsibilities' :
                 selectedTool === 'skills-optimization' ? 'Current Skills' :
                 'Background Information'}
              </label>
              {selectedTool === 'resume-review' ? (
                <Textarea
                  placeholder="Paste your complete resume content here for detailed analysis... Include work experience, skills, education, achievements, and any other relevant sections."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={6}
                  data-testid="input-content"
                />
              ) : selectedTool === 'bullet-generator' ? (
                <Textarea
                  placeholder="Describe your job responsibilities, achievements, or experience that you want to turn into professional bullet points..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={4}
                  data-testid="input-content"
                />
              ) : selectedTool === 'skills-optimization' ? (
                <Textarea
                  placeholder="List your current skills, technologies, tools, and competencies that you want to organize and optimize..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={4}
                  data-testid="input-content"
                />
              ) : (
                <Textarea
                  placeholder="Provide information about your background, experience, career goals, and key achievements for summary generation..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={4}
                  data-testid="input-content"
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="bg-blue-600 hover:bg-blue-700"
                data-testid="button-generate"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    {selectedTool === 'resume-review' ? 'Analyze' :
                     selectedTool === 'bullet-generator' ? 'Generate' :
                     selectedTool === 'skills-optimization' ? 'Optimize' :
                     'Generate'}
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleReset} data-testid="button-reset">
                Reset
              </Button>
            </div>

            {/* Output Section */}
            {generatedContent && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium">Generated Content</label>
                  <Button size="sm" variant="outline" onClick={handleCopy} data-testid="button-copy">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800">
                    {generatedContent}
                  </pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Start Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => {
                setSelectedTool('resume-review');
                setInputText('John Smith\nSoftware Engineer\n\nExperience:\n• Developed web applications using React and Node.js\n• Managed team of 3 developers\n• Improved application performance by 30%\n\nSkills:\nJavaScript, React, Node.js, MongoDB, Git\n\nEducation:\nBachelor of Computer Science');
              }}
              data-testid="quick-resume-review"
            >
              <FileText className="h-6 w-6" />
              <span className="text-xs">Review Sample Resume</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => {
                setSelectedTool('bullet-generator');
                setInputText('Led a team of developers, improved app performance, managed project deadlines, collaborated with stakeholders, implemented new features');
              }}
              data-testid="quick-bullet-generator"
            >
              <Target className="h-6 w-6" />
              <span className="text-xs">Generate Sample Points</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => {
                setSelectedTool('skills-optimization');
                setInputText('JavaScript, React, Node.js, MongoDB, Git, Agile, Problem-solving, Team leadership, Project management');
              }}
              data-testid="quick-skills-optimization"
            >
              <Zap className="h-6 w-6" />
              <span className="text-xs">Optimize Sample Skills</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => {
                setSelectedTool('summary-generator');
                setInputText('Full-stack developer with 4 years experience, specializing in web applications, led multiple projects, strong in React and Node.js, seeking senior role');
              }}
              data-testid="quick-summary-generator"
            >
              <PenTool className="h-6 w-6" />
              <span className="text-xs">Generate Sample Summary</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}