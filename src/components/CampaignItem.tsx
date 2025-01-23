import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Info, Edit } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, RadialBarChart, RadialBar, Legend
} from 'recharts';
import RecommendationsPanel, { Recommendation } from './RecommendationsPanel';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EditCampaignDialog from './EditCampaignDialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CampaignMetrics {
  adCost: number;
  costPerConversion: number;
  clicks: number;
  impressions: number;
  ctr: number;
  conversions: number;
  conversionRate: number;
  costPerClick: number;
  cpm: number;
  previousPeriod: {
    adCost: number;
    costPerConversion: number;
    clicks: number;
    impressions: number;
    conversions: number;
  };
  target: {
    conversions: number;
  };
}

interface PerformanceData {
  date: string;
  impressions: number;
  clicks: number;
  costPerConversion: number;
}

interface CampaignProps {
  id: number;
  name: string;
  status: 'active' | 'paused' | 'completed';
  platform: 'google' | 'meta' | 'linkedin';
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
    target: {
      conversions: number;
    };
  };
  isExpanded: boolean;
  recommendations: Recommendation[];
  onToggleExpand: () => void;
  onApplyRecommendation: (recommendation: Recommendation) => void;
  onEditCampaign: (id: number, updates: Partial<CampaignProps>) => void;
}

const CampaignItem = ({ 
  id,
  name,
  status,
  platform,
  metrics,
  isExpanded,
  onToggleExpand,
  onApplyRecommendation,
  onEditCampaign
}: CampaignProps) => {
  const getStatusColor = (status: CampaignProps['status']) => {
    switch (status) {
      case 'active':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'paused':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toFixed(0);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculatePercentageChange = (current: number, previous: number): string => {
    const change = ((current - previous) / previous) * 100;
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  };

  const getChangeColor = (change: string): string => {
    return change.startsWith('+') ? 'text-green-600' : 'text-red-600';
  };

  const MetricCard = ({ title, value, previousValue, format = 'number', suffix = '' }: {
    title: string;
    value: number;
    previousValue: number;
    format?: 'number' | 'currency' | 'percentage';
    suffix?: string;
  }) => {
    const formattedValue = format === 'currency' 
      ? formatCurrency(value)
      : format === 'percentage'
      ? value.toFixed(1) + '%'
      : formatNumber(value) + suffix;
    
    const percentageChange = calculatePercentageChange(value, previousValue);
    const changeColorClass = getChangeColor(percentageChange);

    return (
      <Card className="border-purple-500/20 bg-indigo-950/50">
        <CardContent className="p-2">
          <div className="flex justify-between items-start">
            <div className="text-xs text-purple-300">{title}</div>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-purple-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Previous period: {format === 'currency' ? formatCurrency(previousValue) : formatNumber(previousValue)}</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
          <div className="mt-0.5 flex items-end justify-between">
            <div className="text-sm font-bold text-gray-100">{formattedValue}</div>
            <div className={`text-[10px] font-medium ${changeColorClass}`}>
              {percentageChange}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const ConversionGauge = () => {
    const progress = (metrics.conversions / metrics.target.conversions) * 100;
    const data = [
      { name: 'progress', value: progress, fill: '#818CF8' },
      { name: 'remaining', value: 100 - progress, fill: '#312E81' }
    ];

    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="75%"
          outerRadius="100%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            background={{ fill: '#312E81' }}
            dataKey="value"
            cornerRadius={30}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-purple-100 text-lg font-bold"
          >
            {progress.toFixed(1)}%
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    );
  };

  const CostPerConversionTrend = () => {
    return (
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={[]}>
            <defs>
              <linearGradient id="cpcGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="100%" stopColor="#BE185D" />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#6D28D9" 
              vertical={false} 
              opacity={0.1} 
            />
            <XAxis 
              dataKey="date" 
              axisLine={{ stroke: '#6D28D9' }}
              tickLine={{ stroke: '#6D28D9' }}
              tick={{ fill: '#E9D5FF', fontSize: 12 }}
            />
            <YAxis 
              axisLine={{ stroke: '#6D28D9' }}
              tickLine={{ stroke: '#6D28D9' }}
              tick={{ fill: '#E9D5FF', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'rgba(45, 27, 105, 0.9)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(109, 40, 217, 0.2)',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              labelStyle={{ color: '#E9D5FF' }}
              itemStyle={{ color: '#E9D5FF' }}
              formatter={(value) => [`$${value}`, 'Cost per Conversion']}
            />
            <Line
              type="monotone"
              dataKey="costPerConversion"
              stroke="url(#cpcGradient)"
              strokeWidth={2}
              dot={{ fill: '#F472B6', r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#E9D5FF', stroke: '#F472B6', strokeWidth: 2 }}
              name="Cost per Conversion"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['impressions', 'clicks']);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const toggleMetric = (metric: string) => {
    setSelectedMetrics(prev => {
      if (prev.includes(metric)) {
        // Don't allow deselecting if it's the last metric
        if (prev.length === 1) return prev;
        return prev.filter(m => m !== metric);
      }
      return [...prev, metric];
    });
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEditDialog(true);
  };

  return (
    <>
      <Card className="mb-2 border border-purple-500/20 bg-indigo-950/30 hover:border-purple-500/30 transition-colors">
        <div
          className={`p-4 cursor-pointer ${isExpanded ? 'border-b border-purple-500/20' : ''}`}
          onClick={onToggleExpand}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-2xl font-semibold text-white mb-1">{name}</div>
                <div className="text-sm text-purple-300">Campaign ID: #{id}</div>
              </div>
              <Badge className={`${getStatusColor(status)} text-sm px-3 py-1 font-medium`}>
                {status}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleEditClick}
                className="p-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-colors"
              >
                <Edit className="h-5 w-5 text-purple-300" />
              </button>
              {isExpanded ? (
                <ChevronUp className="h-6 w-6 text-purple-300" />
              ) : (
                <ChevronDown className="h-6 w-6 text-purple-300" />
              )}
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="p-4 pt-3">
            <div className="mt-4 space-y-6">
              {/* Campaign Details Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-100">Campaign Details</h3>
                  <div className="flex items-center gap-3">
                    <Select defaultValue="7d">
                      <SelectTrigger className="h-8 w-[130px] bg-[#1A0B2E] border-purple-500/20">
                        <SelectValue placeholder="Time Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">Last 7 days</SelectItem>
                        <SelectItem value="30d">Last 30 days</SelectItem>
                        <SelectItem value="90d">Last 90 days</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="h-8 w-[130px] bg-[#1A0B2E] border-purple-500/20">
                        <SelectValue placeholder="Platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Channels</SelectItem>
                        <SelectItem value="google">Google Ads</SelectItem>
                        <SelectItem value="meta">Meta Ads</SelectItem>
                        <SelectItem value="linkedin">LinkedIn Ads</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                  <MetricCard
                    title="Ad Cost"
                    value={metrics.spend}
                    previousValue={0}
                    format="currency"
                  />
                  <MetricCard
                    title="CPC"
                    value={0}
                    previousValue={0}
                    format="currency"
                  />
                  <MetricCard
                    title="Impressions"
                    value={metrics.impressions}
                    previousValue={0}
                  />
                  <MetricCard
                    title="Clicks"
                    value={metrics.clicks}
                    previousValue={0}
                  />
                  <MetricCard
                    title="CTR"
                    value={0}
                    previousValue={0}
                    format="percentage"
                  />
                </div>

                {/* Charts Section */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Card className="border-purple-500/20 bg-[#1A0B2E]">
                      <CardHeader className="p-3 pb-1">
                        <CardTitle className="text-sm font-medium text-purple-100">Impressions vs. Clicks</CardTitle>
                        <CardDescription className="text-xs text-purple-300/80">Track your campaign reach and engagement</CardDescription>
                      </CardHeader>
                      <CardContent className="p-3 pt-1">
                        <div className="bg-[#2D1B69]/30 rounded-lg border border-[#6D28D9]/20 p-2">
                          <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={[]}>
                                <defs>
                                  <linearGradient id="impressionsGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#818CF8" />
                                    <stop offset="100%" stopColor="#4F46E5" />
                                  </linearGradient>
                                  <linearGradient id="clicksGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#34D399" />
                                    <stop offset="100%" stopColor="#059669" />
                                  </linearGradient>
                                </defs>
                                <CartesianGrid 
                                  strokeDasharray="3 3" 
                                  stroke="#6D28D9" 
                                  vertical={false} 
                                  opacity={0.1} 
                                />
                                <XAxis 
                                  dataKey="date" 
                                  axisLine={{ stroke: '#6D28D9' }}
                                  tickLine={{ stroke: '#6D28D9' }}
                                  tick={{ fill: '#E9D5FF', fontSize: 12 }}
                                />
                                <YAxis 
                                  yAxisId="left"
                                  axisLine={{ stroke: '#6D28D9' }}
                                  tickLine={{ stroke: '#6D28D9' }}
                                  tick={{ fill: '#E9D5FF', fontSize: 12 }}
                                />
                                <YAxis 
                                  yAxisId="right"
                                  orientation="right"
                                  axisLine={{ stroke: '#6D28D9' }}
                                  tickLine={{ stroke: '#6D28D9' }}
                                  tick={{ fill: '#E9D5FF', fontSize: 12 }}
                                />
                                <Tooltip
                                  contentStyle={{ 
                                    backgroundColor: 'rgba(45, 27, 105, 0.9)',
                                    backdropFilter: 'blur(8px)',
                                    border: '1px solid rgba(109, 40, 217, 0.2)',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                  }}
                                  labelStyle={{ color: '#E9D5FF' }}
                                  itemStyle={{ color: '#E9D5FF' }}
                                />
                                <Legend
                                  verticalAlign="bottom"
                                  height={36}
                                  onClick={(e) => {
                                    if (typeof e.dataKey === 'string') {
                                      toggleMetric(e.dataKey);
                                    }
                                  }}
                                  content={({ payload }) => (
                                    <div className="flex gap-4 justify-center mt-4">
                                      {payload?.map((entry) => (
                                        <div
                                          key={String(entry.dataKey)}
                                          onClick={() => toggleMetric(String(entry.dataKey))}
                                          className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 ${
                                            selectedMetrics.includes(String(entry.dataKey))
                                              ? 'bg-[#2D1B69]/50 text-white'
                                              : 'text-purple-300/60 hover:text-purple-300'
                                          }`}
                                        >
                                          {!selectedMetrics.includes(String(entry.dataKey)) && (
                                            <div className="absolute inset-0 flex items-center pointer-events-none">
                                              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent transform -rotate-6" />
                                            </div>
                                          )}
                                          <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: entry.color }}
                                          />
                                          <span className="transition-opacity duration-200">{entry.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                />
                                <Line
                                  yAxisId="left"
                                  type="monotone"
                                  dataKey="impressions"
                                  stroke="url(#impressionsGradient)"
                                  strokeWidth={2}
                                  dot={{ fill: '#818CF8', r: 4, strokeWidth: 2 }}
                                  activeDot={{ r: 6, fill: '#E9D5FF', stroke: '#818CF8', strokeWidth: 2 }}
                                  name="Impressions"
                                  hide={!selectedMetrics.includes('impressions')}
                                />
                                <Line
                                  yAxisId="right"
                                  type="monotone"
                                  dataKey="clicks"
                                  stroke="url(#clicksGradient)"
                                  strokeWidth={2}
                                  dot={{ fill: '#34D399', r: 4, strokeWidth: 2 }}
                                  activeDot={{ r: 6, fill: '#E9D5FF', stroke: '#34D399', strokeWidth: 2 }}
                                  name="Clicks"
                                  hide={!selectedMetrics.includes('clicks')}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-500/20 bg-[#1A0B2E]">
                      <CardHeader className="p-3 pb-1">
                        <CardTitle className="text-sm font-medium text-purple-100">Conversion Target Progress</CardTitle>
                        <CardDescription className="text-xs text-purple-300/80">Track your conversion goals</CardDescription>
                      </CardHeader>
                      <CardContent className="p-3 pt-1">
                        <div className="h-[200px] flex items-center justify-center">
                          <ConversionGauge />
                        </div>
                        <div className="text-center mt-2">
                          <div className="text-xs text-purple-200">Target: {formatNumber(metrics.target.conversions)}</div>
                          <div className="text-xs text-purple-200">
                            Progress: {((metrics.conversions / metrics.target.conversions) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-purple-500/20 bg-[#1A0B2E]">
                    <CardHeader className="p-3 pb-1">
                      <CardTitle className="text-sm font-medium text-purple-100">Cost per Conversion Trend</CardTitle>
                      <CardDescription className="text-xs text-purple-300/80">Monitor your conversion costs over time</CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 pt-1">
                      <div className="bg-[#2D1B69]/30 rounded-lg border border-[#6D28D9]/20 p-2">
                        <CostPerConversionTrend />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Recommendations Section */}
              <Card className="border-purple-500/20 bg-[#1A0B2E]">
                <CardHeader className="p-3 pb-1">
                  <CardTitle className="text-sm font-medium text-purple-100">Recommendations</CardTitle>
                  <CardDescription className="text-xs text-purple-300/80">Get personalized suggestions</CardDescription>
                </CardHeader>
                <CardContent className="p-3 pt-1">
                  <RecommendationsPanel 
                    recommendations={recommendations}
                    onApplyRecommendation={onApplyRecommendation}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </Card>

      <EditCampaignDialog 
        open={showEditDialog} 
        onOpenChange={setShowEditDialog}
        campaignId={id}
        campaignName={name}
        campaignStatus={status}
        metrics={metrics}
      />
    </>
  );
};

export default CampaignItem;
