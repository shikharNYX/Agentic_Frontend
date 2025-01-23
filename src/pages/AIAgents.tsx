import React from 'react';
import { Activity, BarChart3, BrainCircuit, Target, Users } from 'lucide-react';

interface AgentStats {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  usageCount: number;
  successRate: number;
  specialization: string[];
}

const agents: AgentStats[] = [
  {
    id: '1',
    name: 'Campaign Strategist',
    description: 'Specializes in developing targeted marketing campaigns with optimal budget allocation across platforms.',
    icon: <Target className="w-6 h-6 text-purple-400" />,
    usageCount: 156,
    successRate: 92,
    specialization: ['Campaign Planning', 'Budget Optimization', 'Platform Selection']
  },
  {
    id: '2',
    name: 'Content Generator',
    description: 'Creates engaging ad content optimized for different platforms and audience segments.',
    icon: <BrainCircuit className="w-6 h-6 text-purple-400" />,
    usageCount: 243,
    successRate: 88,
    specialization: ['Ad Copy', 'Creative Direction', 'Multi-platform Content']
  },
  {
    id: '3',
    name: 'Analytics Expert',
    description: 'Monitors campaign performance and provides data-driven optimization recommendations.',
    icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
    usageCount: 189,
    successRate: 95,
    specialization: ['Performance Analysis', 'ROI Tracking', 'Optimization']
  },
  {
    id: '4',
    name: 'Audience Analyst',
    description: 'Identifies and segments target audiences for maximum campaign effectiveness.',
    icon: <Users className="w-6 h-6 text-purple-400" />,
    usageCount: 134,
    successRate: 90,
    specialization: ['Audience Segmentation', 'Demographic Analysis', 'Targeting']
  },
  {
    id: '5',
    name: 'Performance Optimizer',
    description: 'Continuously optimizes campaigns based on real-time performance metrics.',
    icon: <Activity className="w-6 h-6 text-purple-400" />,
    usageCount: 167,
    successRate: 93,
    specialization: ['Real-time Optimization', 'A/B Testing', 'Budget Management']
  }
];

const AIAgents = () => {
  return (
    <div className="min-h-screen bg-[#0F0225] text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-100">NYX AI Agents</h1>
          <p className="text-purple-300/70 mt-2">
            Specialized AI agents for performance marketing optimization
          </p>
        </div>

        {/* Agents List */}
        <div className="space-y-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-[#1A0B2E] border border-[#6D28D9]/20 rounded-lg p-6 hover:border-[#6D28D9]/40 transition-colors"
            >
              <div className="flex items-start gap-6">
                <div className="bg-[#2D1B69]/30 p-3 rounded-lg">
                  {agent.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-purple-100">{agent.name}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-purple-300/70">{agent.usageCount} uses</span>
                      <span className="text-green-400">{agent.successRate}% success</span>
                    </div>
                  </div>

                  <p className="text-purple-300/70 text-sm mb-3">
                    {agent.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {agent.specialization.map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs bg-[#2D1B69]/30 text-purple-300 px-2 py-1 rounded-md border border-[#6D28D9]/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAgents;
