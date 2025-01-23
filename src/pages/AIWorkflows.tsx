import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bot,
  Workflow,
  GitBranch,
  Target,
  Megaphone,
  PenTool,
  BarChart2,
  Users,
  MessageSquare,
  Mail,
  Zap,
  Settings,
  PlayCircle
} from 'lucide-react';

interface WorkflowTemplate {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  steps: string[];
  estimatedTime: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
}

const workflowTemplates: WorkflowTemplate[] = [
  {
    id: 'campaign-optimizer',
    title: 'Campaign Performance Optimizer',
    description: 'Automatically analyze and optimize campaign performance across multiple channels',
    icon: Target,
    category: 'Optimization',
    steps: [
      'Analyze campaign metrics across channels',
      'Identify underperforming segments',
      'Generate optimization recommendations',
      'Implement budget reallocation',
      'Monitor performance changes'
    ],
    estimatedTime: '2-3 hours',
    difficulty: 'Advanced'
  },
  {
    id: 'content-generator',
    title: 'Ad Creative Generator',
    description: 'Generate and test multiple ad variations based on performance data',
    icon: PenTool,
    category: 'Content',
    steps: [
      'Analyze top-performing ad content',
      'Generate new ad variations',
      'Create A/B test groups',
      'Schedule content deployment',
      'Track performance metrics'
    ],
    estimatedTime: '1-2 hours',
    difficulty: 'Medium'
  },
  {
    id: 'audience-builder',
    title: 'Smart Audience Builder',
    description: 'Build and refine target audiences using AI-driven insights',
    icon: Users,
    category: 'Targeting',
    steps: [
      'Analyze customer behavior data',
      'Identify high-value segments',
      'Create lookalike audiences',
      'Set up custom audiences',
      'Monitor audience performance'
    ],
    estimatedTime: '1-2 hours',
    difficulty: 'Medium'
  },
  {
    id: 'engagement-automation',
    title: 'Customer Engagement Automation',
    description: 'Automate personalized customer interactions across channels',
    icon: MessageSquare,
    category: 'Automation',
    steps: [
      'Set up trigger events',
      'Create response templates',
      'Configure automation rules',
      'Set up A/B testing',
      'Monitor engagement metrics'
    ],
    estimatedTime: '2-3 hours',
    difficulty: 'Advanced'
  },
  {
    id: 'email-optimizer',
    title: 'Email Campaign Optimizer',
    description: 'Optimize email campaigns using AI-driven insights and automation',
    icon: Mail,
    category: 'Optimization',
    steps: [
      'Analyze email performance data',
      'Generate subject line variations',
      'Optimize send times',
      'Create personalized content',
      'Track conversion rates'
    ],
    estimatedTime: '1-2 hours',
    difficulty: 'Medium'
  },
  {
    id: 'performance-reporter',
    title: 'Automated Performance Reporter',
    description: 'Generate comprehensive performance reports with insights and recommendations',
    icon: BarChart2,
    category: 'Analytics',
    steps: [
      'Collect cross-channel data',
      'Generate performance insights',
      'Create visualization dashboards',
      'Schedule automated reports',
      'Track KPI changes'
    ],
    estimatedTime: '1 hour',
    difficulty: 'Easy'
  }
];

export default function AIWorkflows() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(workflowTemplates.map(t => t.category.toLowerCase()))];
  
  const filteredTemplates = selectedCategory === 'all' 
    ? workflowTemplates 
    : workflowTemplates.filter(t => t.category.toLowerCase() === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'bg-emerald-500/10 text-emerald-400';
      case 'Medium': return 'bg-amber-500/10 text-amber-400';
      case 'Advanced': return 'bg-rose-500/10 text-rose-400';
      default: return 'bg-purple-500/10 text-purple-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0720] via-[#1A0B2E] to-[#0F0720]">
      <div className="p-6">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 mb-2">
              AI Workflows
            </h1>
            <p className="text-purple-300/80">Automate your marketing tasks with AI-powered workflows</p>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant="ghost"
                className={`${
                  selectedCategory === category
                    ? 'bg-[#2D1B69] text-purple-200'
                    : 'text-purple-300/80 hover:bg-[#2D1B69]/50 hover:text-purple-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>

          {/* Workflow Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <Card key={template.id} className="bg-[#1A0B2E]/80 border-[#6D28D9]/20 backdrop-blur-xl hover:bg-[#1A0B2E] transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-lg bg-[#2D1B69]/50">
                        <Icon className="h-5 w-5 text-purple-400" />
                      </div>
                      <Badge className={`${getDifficultyColor(template.difficulty)}`}>
                        {template.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-purple-200">{template.title}</CardTitle>
                    <CardDescription className="text-purple-300/80">{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-purple-300 mb-2">Workflow Steps</h4>
                        <ul className="space-y-2">
                          {template.steps.map((step, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-purple-300/70">
                              <span className="h-5 w-5 flex items-center justify-center rounded-full bg-[#2D1B69]/30 text-xs">
                                {index + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-[#6D28D9]/20">
                        <div className="flex items-center text-sm text-purple-300/70">
                          <Zap className="h-4 w-4 mr-1" />
                          {template.estimatedTime}
                        </div>
                        <Button variant="ghost" className="hover:bg-[#2D1B69]/50">
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Start Workflow
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
