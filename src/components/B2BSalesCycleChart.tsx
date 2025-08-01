import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { TrendingUpIcon, TrendingDownIcon, MinusIcon, ClockIcon, TargetIcon, UsersIcon, DollarSignIcon } from "lucide-react";
import { B2BSalesCycleData } from "@/types/analytics";

interface B2BSalesCycleChartProps {
  data: B2BSalesCycleData[];
  title?: string;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercentage = (value: number) => {
  return `${value.toFixed(1)}%`;
};

const formatNumber = (value: number) => {
  return value.toLocaleString();
};

const getTrendIcon = (trend: number) => {
  if (trend > 0) return <TrendingUpIcon className="w-4 h-4 text-green-500" />;
  if (trend < 0) return <TrendingDownIcon className="w-4 h-4 text-red-500" />;
  return <MinusIcon className="w-4 h-4 text-gray-500" />;
};

const getVelocityColor = (days: number) => {
  if (days <= 30) return '#10B981'; // Green
  if (days <= 60) return '#F59E0B'; // Yellow
  if (days <= 90) return '#F97316'; // Orange
  return '#EF4444'; // Red
};

const getVelocityLabel = (days: number) => {
  if (days <= 30) return 'Fast';
  if (days <= 60) return 'Normal';
  if (days <= 90) return 'Slow';
  return 'Very Slow';
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A0B2E] border border-[#6D28D9]/20 p-3 rounded-lg shadow-lg">
        <p className="text-white font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const B2BSalesCycleChart: React.FC<B2BSalesCycleChartProps> = ({
  data,
  title = "Sales Cycle Velocity"
}) => {
  const [viewMode, setViewMode] = useState<'timeline' | 'conversion'>('timeline');
  const [selectedSegment, setSelectedSegment] = useState<string>('all');

  const chartData = data.map(item => ({
    segment: item.segment,
    mqlToSql: item.mqlToSql,
    sqlToOpportunity: item.sqlToOpportunity,
    opportunityToClose: item.opportunityToClose,
    totalCycle: item.totalCycle,
    conversionRate: item.conversionRate,
    avgDealSize: item.avgDealSize,
    trend: item.trend,
  }));

  const selectedData = selectedSegment === 'all' 
    ? chartData 
    : chartData.filter(item => item.segment === selectedSegment);

  const segments = [...new Set(data.map(item => item.segment))];

  const avgCycleTime = selectedData.reduce((sum, item) => sum + item.totalCycle, 0) / selectedData.length;
  const avgConversionRate = selectedData.reduce((sum, item) => sum + item.conversionRate, 0) / selectedData.length;
  const totalDeals = selectedData.reduce((sum, item) => sum + (item.conversionRate * 100), 0);
  const totalRevenue = selectedData.reduce((sum, item) => sum + (item.avgDealSize * item.conversionRate * 100), 0);

  // Timeline data for area chart
  const timelineData = [
    { stage: 'MQL', avgDays: selectedData.reduce((sum, item) => sum + item.mqlToSql, 0) / selectedData.length },
    { stage: 'SQL', avgDays: selectedData.reduce((sum, item) => sum + item.sqlToOpportunity, 0) / selectedData.length },
    { stage: 'Opportunity', avgDays: selectedData.reduce((sum, item) => sum + item.opportunityToClose, 0) / selectedData.length },
    { stage: 'Closed', avgDays: 0 },
  ];

  return (
    <Card className="bg-[#1A0B2E]/80 border-[#6D28D9]/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            <Select value={selectedSegment} onValueChange={setSelectedSegment}>
              <SelectTrigger className="w-40 bg-[#2D1B69]/50 border-[#6D28D9]/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A0B2E] border-[#6D28D9]/20">
                <SelectItem value="all">All Segments</SelectItem>
                {segments.map(segment => (
                  <SelectItem key={segment} value={segment}>{segment}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={viewMode} onValueChange={(value: 'timeline' | 'conversion') => setViewMode(value)}>
              <SelectTrigger className="w-32 bg-[#2D1B69]/50 border-[#6D28D9]/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A0B2E] border-[#6D28D9]/20">
                <SelectItem value="timeline">Timeline</SelectItem>
                <SelectItem value="conversion">Conversion</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {viewMode === 'timeline' ? (
                <AreaChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9/20" />
                  <XAxis 
                    dataKey="stage" 
                    stroke="#E5E7EB"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#E5E7EB"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    label={{ value: 'Days', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#E5E7EB' } }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="avgDays" 
                    stroke="#8B5CF6" 
                    fill="#8B5CF6/20"
                    strokeWidth={2}
                  />
                </AreaChart>
              ) : (
                <LineChart data={selectedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9/20" />
                  <XAxis 
                    dataKey="segment" 
                    stroke="#E5E7EB"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#E5E7EB"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={formatPercentage}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="conversionRate" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-[#6D28D9]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg Cycle Time</p>
                  <p className="text-white font-semibold text-lg">
                    {avgCycleTime.toFixed(1)} days
                  </p>
                </div>
                <ClockIcon className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-[#6D28D9]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Conversion Rate</p>
                  <p className="text-white font-semibold text-lg">
                    {formatPercentage(avgConversionRate)}
                  </p>
                </div>
                <TargetIcon className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-[#6D28D9]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Deals</p>
                  <p className="text-white font-semibold text-lg">
                    {formatNumber(totalDeals)}
                  </p>
                </div>
                <UsersIcon className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-[#6D28D9]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <p className="text-white font-semibold text-lg">
                    {formatCurrency(totalRevenue)}
                  </p>
                </div>
                <DollarSignIcon className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Cycle Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#2D1B69]/20 rounded-lg p-4 border border-[#6D28D9]/20">
              <h4 className="text-white font-semibold mb-3">Cycle Stage Breakdown</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">MQL → SQL</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">
                      {(selectedData.reduce((sum, item) => sum + item.mqlToSql, 0) / selectedData.length).toFixed(1)} days
                    </span>
                    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/40">
                      Fast
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">SQL → Opportunity</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">
                      {(selectedData.reduce((sum, item) => sum + item.sqlToOpportunity, 0) / selectedData.length).toFixed(1)} days
                    </span>
                    <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/40">
                      Normal
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Opportunity → Close</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">
                      {(selectedData.reduce((sum, item) => sum + item.opportunityToClose, 0) / selectedData.length).toFixed(1)} days
                    </span>
                    <Badge variant="outline" className="bg-orange-500/20 text-orange-400 border-orange-500/40">
                      Slow
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#2D1B69]/20 rounded-lg p-4 border border-[#6D28D9]/20">
              <h4 className="text-white font-semibold mb-3">Velocity Insights</h4>
              <div className="space-y-3">
                {selectedData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <span className="text-white font-medium">{item.segment}</span>
                      <p className="text-gray-400 text-xs">{item.totalCycle.toFixed(1)} days avg</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                        style={{ 
                          backgroundColor: getVelocityColor(item.totalCycle) + '20',
                          borderColor: getVelocityColor(item.totalCycle) + '40',
                          color: getVelocityColor(item.totalCycle)
                        }}
                      >
                        {getVelocityLabel(item.totalCycle)}
                      </Badge>
                      {getTrendIcon(item.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-[#2D1B69]/20 rounded-lg p-4 border border-[#6D28D9]/20">
            <h4 className="text-white font-semibold mb-3">Performance Metrics</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Fast Cycles (≤30 days)</span>
                  <span className="text-white font-medium">
                    {selectedData.filter(item => item.totalCycle <= 30).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Normal Cycles (31-60 days)</span>
                  <span className="text-white font-medium">
                    {selectedData.filter(item => item.totalCycle > 30 && item.totalCycle <= 60).length}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Slow Cycles (61-90 days)</span>
                  <span className="text-white font-medium">
                    {selectedData.filter(item => item.totalCycle > 60 && item.totalCycle <= 90).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Very Slow (&gt;90 days)</span>
                  <span className="text-white font-medium">
                    {selectedData.filter(item => item.totalCycle > 90).length}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">High Conversion (&gt;20%)</span>
                  <span className="text-white font-medium">
                    {selectedData.filter(item => item.conversionRate > 20).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Low Conversion (&lt;10%)</span>
                  <span className="text-white font-medium">
                    {selectedData.filter(item => item.conversionRate < 10).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default B2BSalesCycleChart; 