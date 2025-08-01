import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUpIcon, TrendingDownIcon, MinusIcon, BuildingIcon, UsersIcon, ActivityIcon, TargetIcon } from "lucide-react";
import { B2BAccountEngagementData } from "@/types/analytics";

interface B2BAccountEngagementProps {
  data: B2BAccountEngagementData[];
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

const getEngagementColor = (score: number) => {
  if (score >= 80) return 'bg-green-500/20 text-green-400 border-green-500/40';
  if (score >= 60) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40';
  if (score >= 40) return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
  return 'bg-red-500/20 text-red-400 border-red-500/40';
};

const getEngagementLabel = (score: number) => {
  if (score >= 80) return 'High';
  if (score >= 60) return 'Medium';
  if (score >= 40) return 'Low';
  return 'Very Low';
};

const getTrendIcon = (trend: number) => {
  if (trend > 0) return <TrendingUpIcon className="w-4 h-4 text-green-500" />;
  if (trend < 0) return <TrendingDownIcon className="w-4 h-4 text-red-500" />;
  return <MinusIcon className="w-4 h-4 text-gray-500" />;
};

const getHeatmapColor = (value: number, maxValue: number) => {
  const intensity = value / maxValue;
  if (intensity >= 0.8) return 'bg-green-500/30';
  if (intensity >= 0.6) return 'bg-yellow-500/30';
  if (intensity >= 0.4) return 'bg-orange-500/30';
  if (intensity >= 0.2) return 'bg-red-500/30';
  return 'bg-gray-500/20';
};

const B2BAccountEngagement: React.FC<B2BAccountEngagementProps> = ({
  data,
  title = "Account Engagement View"
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [sizeFilter, setSizeFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof B2BAccountEngagementData>('engagementScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredData = useMemo(() => {
    let filtered = data.filter(item => 
      item.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (industryFilter !== 'all') {
      filtered = filtered.filter(item => item.industry === industryFilter);
    }

    if (sizeFilter !== 'all') {
      filtered = filtered.filter(item => item.companySize === sizeFilter);
    }

    return filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  }, [data, searchTerm, industryFilter, sizeFilter, sortField, sortDirection]);

  const maxRevenue = Math.max(...data.map(item => item.revenue));
  const maxEngagement = Math.max(...data.map(item => item.engagementScore));
  const maxTouchpoints = Math.max(...data.map(item => item.touchpoints));

  const industries = [...new Set(data.map(item => item.industry))];
  const companySizes = [...new Set(data.map(item => item.companySize))];

  const handleSort = (field: keyof B2BAccountEngagementData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortableHeader: React.FC<{
    field: keyof B2BAccountEngagementData;
    children: React.ReactNode;
  }> = ({ field, children }) => (
    <th
      className="cursor-pointer hover:bg-purple-500/10 transition-colors text-left p-3 text-sm font-medium text-gray-300"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortField === field && (
          <span className="text-purple-400">
            {sortDirection === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </div>
    </th>
  );

  return (
    <Card className="bg-[#1A0B2E]/80 border-[#6D28D9]/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48 bg-[#2D1B69]/50 border-[#6D28D9]/20 text-white placeholder-gray-400"
            />
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-32 bg-[#2D1B69]/50 border-[#6D28D9]/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A0B2E] border-[#6D28D9]/20">
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sizeFilter} onValueChange={setSizeFilter}>
              <SelectTrigger className="w-32 bg-[#2D1B69]/50 border-[#6D28D9]/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A0B2E] border-[#6D28D9]/20">
                <SelectItem value="all">All Sizes</SelectItem>
                {companySizes.map(size => (
                  <SelectItem key={size} value={size}>{size}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-[#6D28D9]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Accounts</p>
                  <p className="text-white font-semibold text-lg">
                    {formatNumber(filteredData.length)}
                  </p>
                </div>
                <BuildingIcon className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-[#6D28D9]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg Engagement</p>
                  <p className="text-white font-semibold text-lg">
                    {(filteredData.reduce((sum, item) => sum + item.engagementScore, 0) / filteredData.length).toFixed(1)}
                  </p>
                </div>
                <ActivityIcon className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-[#6D28D9]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <p className="text-white font-semibold text-lg">
                    {formatCurrency(filteredData.reduce((sum, item) => sum + item.revenue, 0))}
                  </p>
                </div>
                <TargetIcon className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-[#6D28D9]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">High Engagement %</p>
                  <p className="text-white font-semibold text-lg">
                    {formatPercentage(
                      (filteredData.filter(item => item.engagementScore >= 60).length / filteredData.length) * 100
                    )}
                  </p>
                </div>
                <UsersIcon className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Account Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#6D28D9]/20">
                  <th className="text-left p-3 text-sm font-medium text-gray-300">Account</th>
                  <SortableHeader field="industry">Industry</SortableHeader>
                  <SortableHeader field="companySize">Size</SortableHeader>
                  <SortableHeader field="engagementScore">Engagement</SortableHeader>
                  <SortableHeader field="revenue">Revenue</SortableHeader>
                  <SortableHeader field="touchpoints">Touchpoints</SortableHeader>
                  <SortableHeader field="lastActivity">Last Activity</SortableHeader>
                  <th className="text-left p-3 text-sm font-medium text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index} className="border-b border-[#6D28D9]/10 hover:bg-[#2D1B69]/20">
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-[#6D28D9]/20 text-purple-300 text-xs">
                            {item.accountName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium">{item.accountName}</p>
                          <p className="text-gray-400 text-xs">{item.contactPerson}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-gray-300">{item.industry}</td>
                    <td className="p-3 text-gray-300">{item.companySize}</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-16 h-2 rounded-full ${getHeatmapColor(item.engagementScore, maxEngagement)}`} />
                        <span className="text-white font-medium">{item.engagementScore}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getEngagementColor(item.engagementScore)}`}
                        >
                          {getEngagementLabel(item.engagementScore)}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-16 h-2 rounded-full ${getHeatmapColor(item.revenue, maxRevenue)}`} />
                        <span className="text-white font-medium">{formatCurrency(item.revenue)}</span>
                        {getTrendIcon(item.revenueTrend)}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-16 h-2 rounded-full ${getHeatmapColor(item.touchpoints, maxTouchpoints)}`} />
                        <span className="text-white font-medium">{item.touchpoints}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-300">{item.lastActivity}</td>
                    <td className="p-3">
                      <Badge 
                        variant="outline" 
                        className={
                          item.status === 'Active' ? 'bg-green-500/20 text-green-400 border-green-500/40' :
                          item.status === 'At Risk' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                          'bg-yellow-500/20 text-yellow-400 border-yellow-500/40'
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Engagement Insights */}
          <div className="bg-[#2D1B69]/20 rounded-lg p-4 border border-[#6D28D9]/20">
            <h4 className="text-white font-semibold mb-3">Engagement Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">High Engagement (80+)</span>
                  <span className="text-white font-medium">
                    {filteredData.filter(item => item.engagementScore >= 80).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Medium Engagement (60-79)</span>
                  <span className="text-white font-medium">
                    {filteredData.filter(item => item.engagementScore >= 60 && item.engagementScore < 80).length}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Low Engagement (40-59)</span>
                  <span className="text-white font-medium">
                    {filteredData.filter(item => item.engagementScore >= 40 && item.engagementScore < 60).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Very Low (&lt;40)</span>
                  <span className="text-white font-medium">
                    {filteredData.filter(item => item.engagementScore < 40).length}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Active Accounts</span>
                  <span className="text-white font-medium">
                    {filteredData.filter(item => item.status === 'Active').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">At Risk</span>
                  <span className="text-white font-medium">
                    {filteredData.filter(item => item.status === 'At Risk').length}
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

export default B2BAccountEngagement; 