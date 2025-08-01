import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/DateRangePicker";
import B2BSummaryCards from "@/components/B2BSummaryCards";
import B2BPlatformTable from "@/components/B2BPlatformTable";
import B2BFunnelChart from "@/components/B2BFunnelChart";
import B2BPipelineChart from "@/components/B2BPipelineChart";
import B2BLeadQualityChart from "@/components/B2BLeadQualityChart";
import B2BAccountEngagement from "@/components/B2BAccountEngagement";
import B2BSalesCycleChart from "@/components/B2BSalesCycleChart";
import B2BRiskAlerts from "@/components/B2BRiskAlerts";
import { 
  DollarSignIcon, 
  UsersIcon, 
  TargetIcon, 
  TrendingUpIcon,
  BuildingIcon,
  UserCheckIcon,
  AwardIcon,
  PercentIcon,
  ActivityIcon,
  CalendarIcon,
  RefreshCwIcon
} from "lucide-react";
import { 
  B2BSummaryMetrics, 
  B2BPlatformData, 
  B2BFunnelData,
  B2BMetric,
  B2BPipelineData,
  B2BLeadQualityData,
  B2BAccountEngagementData,
  B2BSalesCycleData,
  B2BRiskAlert
} from "@/types/analytics";

// Sample data for demonstration
const sampleB2BSummaryMetrics: B2BSummaryMetrics = {
  marketing: {
    totalSpend: {
      label: "Total Spend",
      value: 125000,
      change: 12.5,
      trend: 'up',
      icon: DollarSignIcon,
      color: 'from-blue-500 to-blue-600',
      format: 'currency'
    },
    mqls: {
      label: "Marketing Qualified Leads",
      value: 1250,
      change: 8.3,
      trend: 'up',
      icon: UsersIcon,
      color: 'from-purple-500 to-purple-600',
      format: 'number'
    },
    cpl: {
      label: "Cost per Lead",
      value: 100,
      change: -3.2,
      trend: 'down',
      icon: TargetIcon,
      color: 'from-emerald-500 to-emerald-600',
      format: 'currency'
    },
    sqlConversionRate: {
      label: "MQL to SQL Rate",
      value: 35.2,
      change: 5.1,
      trend: 'up',
      icon: PercentIcon,
      color: 'from-orange-500 to-orange-600',
      format: 'percentage'
    }
  },
  sales: {
    sqls: {
      label: "Sales Qualified Leads",
      value: 440,
      change: 15.2,
      trend: 'up',
      icon: UserCheckIcon,
      color: 'from-emerald-500 to-emerald-600',
      format: 'number'
    },
    opportunities: {
      label: "Opportunities",
      value: 220,
      change: 12.8,
      trend: 'up',
      icon: TargetIcon,
      color: 'from-blue-500 to-blue-600',
      format: 'number'
    },
    revenue: {
      label: "Revenue Generated",
      value: 850000,
      change: 18.5,
      trend: 'up',
      icon: DollarSignIcon,
      color: 'from-green-500 to-green-600',
      format: 'currency'
    },
    dealWinRate: {
      label: "Deal Win Rate",
      value: 28.5,
      change: 2.1,
      trend: 'up',
      icon: AwardIcon,
      color: 'from-purple-500 to-purple-600',
      format: 'percentage'
    },
    roi: {
      label: "ROI",
      value: 680,
      change: 25.3,
      trend: 'up',
      icon: TrendingUpIcon,
      color: 'from-pink-500 to-pink-600',
      format: 'percentage'
    }
  }
};

const samplePlatformData: B2BPlatformData[] = [
  {
    platform: "LinkedIn",
    spend: 45000,
    leadsGenerated: 380,
    cpl: 118,
    sqlPercentage: 42.1,
    roi: 850,
    trend: 'up',
    trendValue: 15.2,
    status: 'excellent'
  },
  {
    platform: "Google Ads",
    spend: 35000,
    leadsGenerated: 420,
    cpl: 83,
    sqlPercentage: 28.5,
    roi: 620,
    trend: 'up',
    trendValue: 8.7,
    status: 'good'
  },
  {
    platform: "Email Marketing",
    spend: 15000,
    leadsGenerated: 280,
    cpl: 54,
    sqlPercentage: 38.2,
    roi: 720,
    trend: 'stable',
    trendValue: 1.2,
    status: 'good'
  },
  {
    platform: "Webinars",
    spend: 20000,
    leadsGenerated: 120,
    cpl: 167,
    sqlPercentage: 65.8,
    roi: 920,
    trend: 'up',
    trendValue: 22.1,
    status: 'excellent'
  },
  {
    platform: "Content Marketing",
    spend: 10000,
    leadsGenerated: 50,
    cpl: 200,
    sqlPercentage: 45.0,
    roi: 450,
    trend: 'down',
    trendValue: -5.3,
    status: 'average'
  }
];

const sampleFunnelData: B2BFunnelData[] = [
  {
    campaign: "LinkedIn ABM Campaign",
    stages: {
      mql: { count: 380, conversionRate: 100, value: 45000 },
      sql: { count: 160, conversionRate: 42.1, value: 320000 },
      opportunity: { count: 80, conversionRate: 50.0, value: 640000 },
      closedWon: { count: 24, conversionRate: 30.0, value: 480000 }
    },
    totalValue: 480000,
    overallConversionRate: 6.3
  },
  {
    campaign: "Google Search B2B",
    stages: {
      mql: { count: 420, conversionRate: 100, value: 35000 },
      sql: { count: 120, conversionRate: 28.5, value: 240000 },
      opportunity: { count: 60, conversionRate: 50.0, value: 480000 },
      closedWon: { count: 18, conversionRate: 30.0, value: 360000 }
    },
    totalValue: 360000,
    overallConversionRate: 4.3
  },
  {
    campaign: "Email Nurture Series",
    stages: {
      mql: { count: 280, conversionRate: 100, value: 15000 },
      sql: { count: 107, conversionRate: 38.2, value: 214000 },
      opportunity: { count: 53, conversionRate: 49.5, value: 424000 },
      closedWon: { count: 16, conversionRate: 30.2, value: 320000 }
    },
    totalValue: 320000,
    overallConversionRate: 5.7
  }
];

// Sample data for Phase 2 components
const samplePipelineData: B2BPipelineData[] = [
  {
    platform: "LinkedIn",
    campaign: "ABM Campaign",
    revenue: 480000,
    volume: 24,
    conversionRate: 6.3,
    avgDealSize: 20000,
    trend: 15.2
  },
  {
    platform: "Google Ads",
    campaign: "Search B2B",
    revenue: 360000,
    volume: 18,
    conversionRate: 4.3,
    avgDealSize: 20000,
    trend: 8.7
  },
  {
    platform: "Email Marketing",
    campaign: "Nurture Series",
    revenue: 320000,
    volume: 16,
    conversionRate: 5.7,
    avgDealSize: 20000,
    trend: 12.1
  },
  {
    platform: "Webinars",
    campaign: "Industry Webinars",
    revenue: 280000,
    volume: 14,
    conversionRate: 11.7,
    avgDealSize: 20000,
    trend: 22.1
  },
  {
    platform: "Content Marketing",
    campaign: "White Papers",
    revenue: 180000,
    volume: 9,
    conversionRate: 18.0,
    avgDealSize: 20000,
    trend: -5.3
  }
];

const sampleLeadQualityData: B2BLeadQualityData[] = [
  {
    scoreRange: "80-100",
    volume: 525,
    avgScore: 87.5,
    conversionRate: 12.8,
    trend: 8.2
  },
  {
    scoreRange: "60-79",
    volume: 475,
    avgScore: 68.3,
    conversionRate: 8.5,
    trend: 5.1
  },
  {
    scoreRange: "40-59",
    volume: 200,
    avgScore: 49.2,
    conversionRate: 4.2,
    trend: -2.3
  },
  {
    scoreRange: "20-39",
    volume: 50,
    avgScore: 28.7,
    conversionRate: 1.8,
    trend: -8.5
  }
];

const sampleAccountEngagementData: B2BAccountEngagementData[] = [
  {
    accountName: "TechCorp Solutions",
    contactPerson: "Sarah Johnson",
    industry: "Technology",
    companySize: "Enterprise",
    engagementScore: 85,
    revenue: 150000,
    revenueTrend: 12.5,
    touchpoints: 24,
    lastActivity: "2 hours ago",
    status: "Active"
  },
  {
    accountName: "Global Manufacturing Inc",
    contactPerson: "Mike Chen",
    industry: "Manufacturing",
    companySize: "Large",
    engagementScore: 72,
    revenue: 120000,
    revenueTrend: 8.3,
    touchpoints: 18,
    lastActivity: "1 day ago",
    status: "Active"
  },
  {
    accountName: "Healthcare Systems",
    contactPerson: "Dr. Emily Rodriguez",
    industry: "Healthcare",
    companySize: "Enterprise",
    engagementScore: 68,
    revenue: 95000,
    revenueTrend: -2.1,
    touchpoints: 15,
    lastActivity: "3 days ago",
    status: "At Risk"
  },
  {
    accountName: "Financial Services Co",
    contactPerson: "David Thompson",
    industry: "Finance",
    companySize: "Large",
    engagementScore: 91,
    revenue: 180000,
    revenueTrend: 18.7,
    touchpoints: 32,
    lastActivity: "5 hours ago",
    status: "Active"
  },
  {
    accountName: "Retail Innovations",
    contactPerson: "Lisa Wang",
    industry: "Retail",
    companySize: "Medium",
    engagementScore: 45,
    revenue: 65000,
    revenueTrend: -5.2,
    touchpoints: 8,
    lastActivity: "1 week ago",
    status: "At Risk"
  }
];

const sampleSalesCycleData: B2BSalesCycleData[] = [
  {
    segment: "Enterprise",
    mqlToSql: 8,
    sqlToOpportunity: 15,
    opportunityToClose: 60,
    totalCycle: 83,
    conversionRate: 25.5,
    avgDealSize: 50000,
    trend: 5.2
  },
  {
    segment: "Mid-Market",
    mqlToSql: 12,
    sqlToOpportunity: 20,
    opportunityToClose: 45,
    totalCycle: 77,
    conversionRate: 18.3,
    avgDealSize: 25000,
    trend: 2.1
  },
  {
    segment: "SMB",
    mqlToSql: 15,
    sqlToOpportunity: 25,
    opportunityToClose: 35,
    totalCycle: 75,
    conversionRate: 12.7,
    avgDealSize: 15000,
    trend: -1.8
  }
];

const sampleRiskAlertsData: B2BRiskAlert[] = [
  {
    title: "Declining Lead Quality",
    description: "Lead quality scores have dropped 15% in the last 7 days",
    severity: "high",
    impact: 75000,
    responseTime: 4,
    detectedAt: "2 hours ago",
    status: "active",
    trend: -15.2,
    recommendations: [
      "Review lead scoring criteria",
      "Analyze recent lead sources",
      "Update qualification process"
    ]
  },
  {
    title: "Low Conversion Rate Alert",
    description: "SQL to opportunity conversion rate below target by 8%",
    severity: "medium",
    impact: 45000,
    responseTime: 6,
    detectedAt: "1 day ago",
    status: "active",
    trend: -8.3,
    recommendations: [
      "Review sales process",
      "Check lead nurturing campaigns",
      "Analyze sales team performance"
    ]
  },
  {
    title: "High CPL Warning",
    description: "Cost per lead increased by 12% across all platforms",
    severity: "medium",
    impact: 30000,
    responseTime: 8,
    detectedAt: "2 days ago",
    status: "resolved",
    trend: 12.1,
    recommendations: [
      "Optimize ad spend allocation",
      "Review bidding strategies",
      "Analyze competitor activity"
    ]
  },
  {
    title: "Account Engagement Drop",
    description: "Key account engagement scores decreased by 20%",
    severity: "high",
    impact: 120000,
    responseTime: 2,
    detectedAt: "4 hours ago",
    status: "active",
    trend: -20.5,
    recommendations: [
      "Schedule account review meetings",
      "Increase touchpoint frequency",
      "Review account health metrics"
    ]
  }
];

export default function B2BDashboard() {
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date()
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-[#0F0720] via-[#1A0B2E] to-[#0F0720]">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">
              B2B Dashboard
            </h1>
            <p className="text-purple-300/80 text-sm mt-1">
              Comprehensive view of B2B marketing and sales performance
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
            <Button
              onClick={handleRefresh}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
            >
              <RefreshCwIcon className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <B2BSummaryCards 
          metrics={sampleB2BSummaryMetrics}
          dateRange={dateRange}
        />

        {/* Platform Performance and Funnel Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <B2BPlatformTable 
            data={samplePlatformData}
            title="Platform Performance"
          />
          <B2BFunnelChart 
            data={sampleFunnelData}
            title="Campaign Funnel View"
          />
        </div>

        {/* Pipeline Contribution and Lead Quality */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <B2BPipelineChart 
            data={samplePipelineData}
            title="Pipeline Contribution"
          />
          <B2BLeadQualityChart 
            data={sampleLeadQualityData}
            title="Lead Quality Score Breakdown"
          />
        </div>

        {/* Account Engagement and Sales Cycle */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <B2BAccountEngagement 
            data={sampleAccountEngagementData}
            title="Account Engagement View"
          />
          <B2BSalesCycleChart 
            data={sampleSalesCycleData}
            title="Sales Cycle Velocity"
          />
        </div>

        {/* Risk Alerts Dashboard */}
        <B2BRiskAlerts 
          data={sampleRiskAlertsData}
          title="Risk Alerts Dashboard"
        />

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 hover:border-blue-500/40 transition-all duration-200 cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <BuildingIcon className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-200">Lead Quality</h3>
                  <p className="text-xs text-blue-300/80">Review and optimize</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200 cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <UserCheckIcon className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-200">Sales Pipeline</h3>
                  <p className="text-xs text-emerald-300/80">Monitor opportunities</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-500/40 transition-all duration-200 cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <AwardIcon className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-purple-200">ROI Analysis</h3>
                  <p className="text-xs text-purple-300/80">Performance insights</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20 hover:border-orange-500/40 transition-all duration-200 cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <ActivityIcon className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-orange-200">Risk Alerts</h3>
                  <p className="text-xs text-orange-300/80">Monitor anomalies</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Metrics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-[#1A0B2E]/80 border-[#6D28D9]/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-purple-200">Sales Cycle</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-purple-300/80">MQL to SQL</span>
                  <span className="text-purple-200 font-semibold">12 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300/80">SQL to Opportunity</span>
                  <span className="text-purple-200 font-semibold">18 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300/80">Opportunity to Close</span>
                  <span className="text-purple-200 font-semibold">45 days</span>
                </div>
                <div className="pt-2 border-t border-purple-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-300/80 font-medium">Total Cycle</span>
                    <span className="text-purple-200 font-bold">75 days</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A0B2E]/80 border-[#6D28D9]/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TargetIcon className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-blue-200">Lead Quality</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-300/80">High Quality</span>
                  <span className="text-blue-200 font-semibold">42%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-300/80">Medium Quality</span>
                  <span className="text-blue-200 font-semibold">38%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-300/80">Low Quality</span>
                  <span className="text-blue-200 font-semibold">20%</span>
                </div>
                <div className="pt-2 border-t border-blue-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-300/80 font-medium">Avg Score</span>
                    <span className="text-blue-200 font-bold">7.2/10</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A0B2E]/80 border-[#6D28D9]/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AwardIcon className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-semibold text-emerald-200">Top Performers</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-300/80">Best Platform</span>
                  <span className="text-emerald-200 font-semibold">LinkedIn</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-300/80">Best Campaign</span>
                  <span className="text-emerald-200 font-semibold">ABM Campaign</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-300/80">Best ROI</span>
                  <span className="text-emerald-200 font-semibold">920%</span>
                </div>
                <div className="pt-2 border-t border-emerald-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-300/80 font-medium">Conversion Rate</span>
                    <span className="text-emerald-200 font-bold">6.3%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 