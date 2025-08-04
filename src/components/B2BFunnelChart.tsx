import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FunnelChart as RechartsFunnelChart,
  Funnel,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';
import {
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
  FilterIcon,
  DownloadIcon,
  BarChart3Icon,
  UsersIcon,
  UserCheckIcon,
  TargetIcon,
  AwardIcon,
  DollarSignIcon,
  PercentIcon
} from "lucide-react";
import { B2BFunnelData } from "@/types/analytics";

interface B2BFunnelChartProps {
  data: B2BFunnelData[];
  title?: string;
}

const B2BFunnelChart: React.FC<B2BFunnelChartProps> = ({ 
  data, 
  title = "Campaign Funnel View" 
}) => {
  const [selectedCampaign, setSelectedCampaign] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'funnel' | 'pie'>('funnel');

  const funnelColors = [
    '#8B5CF6', // Purple - MQL
    '#3B82F6', // Blue - SQL
    '#F59E0B', // Amber - Opportunity
    '#10B981'  // Emerald - Closed Won
  ];

  const stageLabels = {
    mql: 'Marketing Qualified Leads',
    sql: 'Sales Qualified Leads',
    opportunity: 'Opportunities',
    closedWon: 'Closed Won'
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getConversionTrend = (current: number, previous: number) => {
    if (current > previous) return 'up';
    if (current < previous) return 'down';
    return 'stable';
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUpIcon className="h-3 w-3 text-emerald-400" />;
      case 'down':
        return <TrendingDownIcon className="h-3 w-3 text-rose-400" />;
      case 'stable':
        return <MinusIcon className="h-3 w-3 text-gray-400" />;
    }
  };

  const selectedData = selectedCampaign === 'all' 
    ? data 
    : data.filter(item => item.campaign === selectedCampaign);

  const aggregateData = selectedData.reduce((acc, campaign) => {
    Object.entries(campaign.stages).forEach(([stage, data]) => {
      if (!acc[stage]) {
        acc[stage] = { count: 0, value: 0, conversionRate: 0 };
      }
      acc[stage].count += data.count;
      acc[stage].value += data.value;
      acc[stage].conversionRate += data.conversionRate;
    });
    return acc;
  }, {} as Record<string, { count: number; value: number; conversionRate: number }>);

  // Calculate averages for conversion rates
  Object.keys(aggregateData).forEach(stage => {
    aggregateData[stage].conversionRate /= selectedData.length;
  });

  const funnelData = [
    {
      name: 'MQL',
      count: aggregateData.mql?.count || 0,
      conversionRate: aggregateData.mql?.conversionRate || 0,
      value: aggregateData.mql?.value || 0,
      fill: funnelColors[0]
    },
    {
      name: 'SQL',
      count: aggregateData.sql?.count || 0,
      conversionRate: aggregateData.sql?.conversionRate || 0,
      value: aggregateData.sql?.value || 0,
      fill: funnelColors[1]
    },
    {
      name: 'Opportunity',
      count: aggregateData.opportunity?.count || 0,
      conversionRate: aggregateData.opportunity?.conversionRate || 0,
      value: aggregateData.opportunity?.value || 0,
      fill: funnelColors[2]
    },
    {
      name: 'Closed Won',
      count: aggregateData.closedWon?.count || 0,
      conversionRate: aggregateData.closedWon?.conversionRate || 0,
      value: aggregateData.closedWon?.value || 0,
      fill: funnelColors[3]
    }
  ];

  // Separate data for funnel chart (using count for funnel visualization)
  const funnelChartData = funnelData.map(item => ({
    name: item.name,
    value: item.count,
    fill: item.fill,
    conversionRate: item.conversionRate,
    monetaryValue: item.value
  }));

  // Separate data for pie chart
  const pieData = funnelData.map(item => ({
    name: item.name,
    value: item.count,
    fill: item.fill
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#1A0B2E]/95 border border-purple-500/30 rounded-lg p-3 shadow-lg backdrop-blur-sm">
          <p className="text-purple-200 font-medium">{data.name}</p>
          <p className="text-purple-300 text-sm">
            Count: {data.value.toLocaleString()}
          </p>
          <p className="text-purple-300 text-sm">
            Conversion Rate: {formatPercentage(data.conversionRate || 0)}
          </p>
          <p className="text-purple-300 text-sm">
            Value: {formatCurrency(data.monetaryValue || data.value || 0)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-[#1A0B2E]/80 border-[#6D28D9]/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3Icon className="h-5 w-5 text-purple-400" />
            <CardTitle className="text-lg font-semibold text-purple-200">
              {title}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Select value={viewMode} onValueChange={(value: 'funnel' | 'pie') => setViewMode(value)}>
              <SelectTrigger className="w-[120px] bg-[#2D1B69]/30 border-purple-500/20 text-purple-200">
                <FilterIcon className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A0B2E] border-purple-500/20">
                <SelectItem value="funnel">Funnel</SelectItem>
                <SelectItem value="pie">Pie Chart</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm"
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
            >
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Campaign Filter */}
        <div className="mb-6">
          <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
            <SelectTrigger className="w-full sm:w-[300px] bg-[#2D1B69]/30 border-purple-500/20 text-purple-200">
              <FilterIcon className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select campaign" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A0B2E] border-purple-500/20">
              <SelectItem value="all">All Campaigns</SelectItem>
              {data.map((campaign, index) => (
                <SelectItem key={index} value={campaign.campaign}>
                  {campaign.campaign}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Chart */}
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {viewMode === 'funnel' ? (
              <RechartsFunnelChart>
                <Tooltip content={<CustomTooltip />} />
                                 <Funnel
                   dataKey="value"
                   data={funnelChartData}
                   isAnimationActive={true}
                   labelFormatter={(value) => `${value.toLocaleString()} leads`}
                 >
                   {funnelChartData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.fill} />
                   ))}
                 </Funnel>
              </RechartsFunnelChart>
            ) : (
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value.toLocaleString()}`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Stage Details */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {funnelData.map((stage, index) => (
            <div 
              key={stage.name}
              className="p-4 bg-[#2D1B69]/30 rounded-lg border border-purple-500/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: stage.fill }}
                />
                <span className="text-sm font-medium text-purple-200">
                  {stage.name}
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-semibold text-purple-200">
                  {stage.value.toLocaleString()}
                </div>
                <div className="text-xs text-purple-300/80">
                  Conversion: {formatPercentage(stage.conversionRate)}
                </div>
                <div className="text-xs text-purple-300/80">
                  Value: {formatCurrency(stage.value)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <UsersIcon className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-200">Total Pipeline</span>
            </div>
            <div className="text-lg font-semibold text-blue-200">
              {formatCurrency(funnelData.reduce((sum, stage) => sum + stage.value, 0))}
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-lg border border-emerald-500/20">
            <div className="flex items-center gap-2 mb-2">
              <PercentIcon className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-200">Overall Conversion</span>
            </div>
            <div className="text-lg font-semibold text-emerald-200">
              {formatPercentage(
                selectedData.reduce((sum, campaign) => sum + campaign.overallConversionRate, 0) / selectedData.length
              )}
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <AwardIcon className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-200">Closed Won Value</span>
            </div>
            <div className="text-lg font-semibold text-purple-200">
              {formatCurrency(funnelData[3]?.value || 0)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default B2BFunnelChart; 