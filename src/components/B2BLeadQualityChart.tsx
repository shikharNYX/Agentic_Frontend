import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUpIcon, TrendingDownIcon, MinusIcon, TargetIcon, AlertTriangleIcon, CheckCircleIcon } from "lucide-react";
import { B2BLeadQualityData } from "@/types/analytics";

interface B2BLeadQualityChartProps {
  data: B2BLeadQualityData[];
  title?: string;
}

const formatPercentage = (value: number) => {
  return `${value.toFixed(1)}%`;
};

const formatNumber = (value: number) => {
  return value.toLocaleString();
};

const getQualityColor = (score: number) => {
  if (score >= 80) return '#10B981'; // Green
  if (score >= 60) return '#F59E0B'; // Yellow
  if (score >= 40) return '#F97316'; // Orange
  return '#EF4444'; // Red
};

const getQualityLabel = (score: number) => {
  if (score >= 80) return 'Hot';
  if (score >= 60) return 'Warm';
  if (score >= 40) return 'Cool';
  return 'Cold';
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

const B2BLeadQualityChart: React.FC<B2BLeadQualityChartProps> = ({
  data,
  title = "Lead Quality Score Breakdown"
}) => {
  const [viewMode, setViewMode] = useState<'score' | 'volume'>('score');

  const pieData = data.map(item => ({
    name: item.scoreRange,
    value: viewMode === 'score' ? item.avgScore : item.volume,
    volume: item.volume,
    avgScore: item.avgScore,
    conversionRate: item.conversionRate,
    trend: item.trend,
    color: getQualityColor(item.avgScore),
  }));

  const totalVolume = data.reduce((sum, item) => sum + item.volume, 0);
  const avgScore = data.reduce((sum, item) => sum + (item.avgScore * item.volume), 0) / totalVolume;
  const totalConversion = data.reduce((sum, item) => sum + (item.conversionRate * item.volume), 0) / totalVolume;

  return (
    <Card className="bg-[#1A0B2E]/80 border-[#6D28D9]/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg font-semibold">{title}</CardTitle>
          <Select value={viewMode} onValueChange={(value: 'score' | 'volume') => setViewMode(value)}>
            <SelectTrigger className="w-32 bg-[#2D1B69]/50 border-[#6D28D9]/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1A0B2E] border-[#6D28D9]/20">
              <SelectItem value="score">Score</SelectItem>
              <SelectItem value="volume">Volume</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Quality Distribution */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Quality Distribution</h4>
              {data.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: getQualityColor(item.avgScore) }}
                      />
                      <span className="text-white text-sm">{item.scoreRange}</span>
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                        style={{ 
                          backgroundColor: getQualityColor(item.avgScore) + '20',
                          borderColor: getQualityColor(item.avgScore) + '40',
                          color: getQualityColor(item.avgScore)
                        }}
                      >
                        {getQualityLabel(item.avgScore)}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white text-sm font-medium">
                        {formatNumber(item.volume)}
                      </span>
                      {getTrendIcon(item.trend)}
                    </div>
                  </div>
                  <Progress 
                    value={(item.volume / totalVolume) * 100} 
                    className="h-2"
                    style={{
                      backgroundColor: '#2D1B69',
                      '--progress-background': getQualityColor(item.avgScore)
                    } as any}
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Avg Score: {item.avgScore.toFixed(1)}</span>
                    <span>Conversion: {formatPercentage(item.conversionRate)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-[#6D28D9]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Leads</p>
                  <p className="text-white font-semibold text-lg">
                    {formatNumber(totalVolume)}
                  </p>
                </div>
                <TargetIcon className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-[#6D28D9]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg Quality Score</p>
                  <p className="text-white font-semibold text-lg">
                    {avgScore.toFixed(1)}
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
                  <p className="text-gray-400 text-sm">Conversion Rate</p>
                  <p className="text-white font-semibold text-lg">
                    {formatPercentage(totalConversion)}
                  </p>
                </div>
                <CheckCircleIcon className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-[#6D28D9]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">High Quality %</p>
                  <p className="text-white font-semibold text-lg">
                    {formatPercentage(
                      (data.filter(item => item.avgScore >= 60).reduce((sum, item) => sum + item.volume, 0) / totalVolume) * 100
                    )}
                  </p>
                </div>
                <AlertTriangleIcon className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Quality Insights */}
          <div className="bg-[#2D1B69]/20 rounded-lg p-4 border border-[#6D28D9]/20">
            <h4 className="text-white font-semibold mb-3">Quality Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Hot Leads (80+)</span>
                  <span className="text-white font-medium">
                    {formatNumber(data.filter(item => item.avgScore >= 80).reduce((sum, item) => sum + item.volume, 0))}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Warm Leads (60-79)</span>
                  <span className="text-white font-medium">
                    {formatNumber(data.filter(item => item.avgScore >= 60 && item.avgScore < 80).reduce((sum, item) => sum + item.volume, 0))}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Cool Leads (40-59)</span>
                  <span className="text-white font-medium">
                    {formatNumber(data.filter(item => item.avgScore >= 40 && item.avgScore < 60).reduce((sum, item) => sum + item.volume, 0))}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Cold Leads (&lt;40)</span>
                  <span className="text-white font-medium">
                    {formatNumber(data.filter(item => item.avgScore < 40).reduce((sum, item) => sum + item.volume, 0))}
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

export default B2BLeadQualityChart; 