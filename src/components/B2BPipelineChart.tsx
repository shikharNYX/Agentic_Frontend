import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { TrendingUpIcon, TrendingDownIcon, MinusIcon, DollarSignIcon, UsersIcon } from "lucide-react";
import { B2BPipelineData } from "@/types/analytics";

interface B2BPipelineChartProps {
  data: B2BPipelineData[];
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

const getTrendIcon = (trend: number) => {
  if (trend > 0) return <TrendingUpIcon className="w-4 h-4 text-green-500" />;
  if (trend < 0) return <TrendingDownIcon className="w-4 h-4 text-red-500" />;
  return <MinusIcon className="w-4 h-4 text-gray-500" />;
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

const B2BPipelineChart: React.FC<B2BPipelineChartProps> = ({
  data,
  title = "Pipeline Contribution"
}) => {
  const [viewMode, setViewMode] = useState<'revenue' | 'volume'>('revenue');
  const [groupBy, setGroupBy] = useState<'platform' | 'campaign'>('platform');

  const chartData = data.map(item => ({
    name: groupBy === 'platform' ? item.platform : item.campaign,
    revenue: item.revenue,
    volume: item.volume,
    conversionRate: item.conversionRate,
    avgDealSize: item.avgDealSize,
    trend: item.trend,
  }));

  const colors = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <Card className="bg-[#1A0B2E]/80 border-[#6D28D9]/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            <Select value={groupBy} onValueChange={(value: 'platform' | 'campaign') => setGroupBy(value)}>
              <SelectTrigger className="w-32 bg-[#2D1B69]/50 border-[#6D28D9]/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A0B2E] border-[#6D28D9]/20">
                <SelectItem value="platform">Platform</SelectItem>
                <SelectItem value="campaign">Campaign</SelectItem>
              </SelectContent>
            </Select>
            <Select value={viewMode} onValueChange={(value: 'revenue' | 'volume') => setViewMode(value)}>
              <SelectTrigger className="w-32 bg-[#2D1B69]/50 border-[#6D28D9]/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A0B2E] border-[#6D28D9]/20">
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
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
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9/20" />
                <XAxis 
                  dataKey="name" 
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
                  tickFormatter={viewMode === 'revenue' ? formatCurrency : (value) => value.toString()}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey={viewMode} 
                  fill="#8B5CF6"
                  radius={[4, 4, 0, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-[#6D28D9]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <p className="text-white font-semibold text-lg">
                    {formatCurrency(data.reduce((sum, item) => sum + item.revenue, 0))}
                  </p>
                </div>
                <DollarSignIcon className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-[#6D28D9]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Volume</p>
                  <p className="text-white font-semibold text-lg">
                    {data.reduce((sum, item) => sum + item.volume, 0).toLocaleString()}
                  </p>
                </div>
                <UsersIcon className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-[#6D28D9]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg Conversion</p>
                  <p className="text-white font-semibold text-lg">
                    {formatPercentage(data.reduce((sum, item) => sum + item.conversionRate, 0) / data.length)}
                  </p>
                </div>
                <div className="text-green-400">
                  {getTrendIcon(1)}
                </div>
              </div>
            </div>
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-[#6D28D9]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg Deal Size</p>
                  <p className="text-white font-semibold text-lg">
                    {formatCurrency(data.reduce((sum, item) => sum + item.avgDealSize, 0) / data.length)}
                  </p>
                </div>
                <div className="text-green-400">
                  {getTrendIcon(1)}
                </div>
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-[#2D1B69]/20 rounded-lg p-4 border border-[#6D28D9]/20">
            <h4 className="text-white font-semibold mb-3">Top Performers</h4>
            <div className="space-y-2">
              {chartData
                .sort((a, b) => (viewMode === 'revenue' ? b.revenue - a.revenue : b.volume - a.volume))
                .slice(0, 3)
                .map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="bg-[#6D28D9]/20 text-purple-300 border-[#6D28D9]/40">
                        #{index + 1}
                      </Badge>
                      <span className="text-white">{item.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">
                        {viewMode === 'revenue' ? formatCurrency(item.revenue) : item.volume.toLocaleString()}
                      </span>
                      {getTrendIcon(item.trend)}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default B2BPipelineChart; 