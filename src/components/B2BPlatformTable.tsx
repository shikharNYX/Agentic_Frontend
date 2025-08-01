import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  BarChart3Icon,
  DollarSignIcon,
  UsersIcon,
  TargetIcon,
  PercentIcon,
  AwardIcon
} from "lucide-react";
import { B2BPlatformData } from "@/types/analytics";

interface B2BPlatformTableProps {
  data: B2BPlatformData[];
  title?: string;
}

type SortField = 'platform' | 'spend' | 'leadsGenerated' | 'cpl' | 'sqlPercentage' | 'roi';
type SortDirection = 'asc' | 'desc';

const B2BPlatformTable: React.FC<B2BPlatformTableProps> = ({ 
  data, 
  title = "Platform Performance" 
}) => {
  const [sortField, setSortField] = useState<SortField>('roi');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'good':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'average':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'poor':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
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

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(item => {
      const matchesSearch = item.platform.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'platform') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [data, searchTerm, statusFilter, sortField, sortDirection]);

  const SortableHeader: React.FC<{ 
    field: SortField; 
    children: React.ReactNode;
    icon?: React.ReactNode;
  }> = ({ field, children, icon }) => (
    <TableHead 
      className="cursor-pointer hover:bg-purple-500/10 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{children}</span>
        {sortField === field && (
          <span className="text-xs">
            {sortDirection === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </div>
    </TableHead>
  );

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
          <Button 
            variant="outline" 
            size="sm"
            className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-300/60" />
            <Input
              placeholder="Search platforms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#2D1B69]/30 border-purple-500/20 text-purple-200 placeholder:text-purple-300/60"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-[#2D1B69]/30 border-purple-500/20 text-purple-200">
              <FilterIcon className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A0B2E] border-purple-500/20">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="average">Average</SelectItem>
              <SelectItem value="poor">Poor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-purple-500/20 overflow-hidden">
          <Table>
            <TableHeader className="bg-[#2D1B69]/30">
              <TableRow className="border-purple-500/20">
                <SortableHeader field="platform" icon={<BarChart3Icon className="h-4 w-4" />}>
                  Platform
                </SortableHeader>
                <SortableHeader field="spend" icon={<DollarSignIcon className="h-4 w-4" />}>
                  Spend
                </SortableHeader>
                <SortableHeader field="leadsGenerated" icon={<UsersIcon className="h-4 w-4" />}>
                  Leads
                </SortableHeader>
                <SortableHeader field="cpl" icon={<TargetIcon className="h-4 w-4" />}>
                  CPL
                </SortableHeader>
                <SortableHeader field="sqlPercentage" icon={<PercentIcon className="h-4 w-4" />}>
                  SQL %
                </SortableHeader>
                <SortableHeader field="roi" icon={<AwardIcon className="h-4 w-4" />}>
                  ROI
                </SortableHeader>
                <TableHead>Trend</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-[#1A0B2E]/50">
              {filteredAndSortedData.map((platform, index) => (
                <TableRow 
                  key={index} 
                  className="border-purple-500/10 hover:bg-purple-500/5 transition-colors"
                >
                  <TableCell className="font-medium text-purple-200">
                    {platform.platform}
                  </TableCell>
                  <TableCell className="text-purple-200">
                    {formatCurrency(platform.spend)}
                  </TableCell>
                  <TableCell className="text-purple-200">
                    {platform.leadsGenerated.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-purple-200">
                    {formatCurrency(platform.cpl)}
                  </TableCell>
                  <TableCell className="text-purple-200">
                    {formatPercentage(platform.sqlPercentage)}
                  </TableCell>
                  <TableCell className="text-purple-200">
                    {formatPercentage(platform.roi)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(platform.trend)}
                      <span className={`text-xs ${
                        platform.trend === 'up' ? 'text-emerald-400' :
                        platform.trend === 'down' ? 'text-rose-400' :
                        'text-gray-400'
                      }`}>
                        {platform.trendValue >= 0 ? '+' : ''}{platform.trendValue}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${getStatusColor(platform.status)} capitalize`}
                    >
                      {platform.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="text-center p-3 bg-[#2D1B69]/30 rounded-lg border border-purple-500/20">
            <div className="text-sm text-purple-300/80">Total Spend</div>
            <div className="text-lg font-semibold text-purple-200">
              {formatCurrency(filteredAndSortedData.reduce((sum, p) => sum + p.spend, 0))}
            </div>
          </div>
          <div className="text-center p-3 bg-[#2D1B69]/30 rounded-lg border border-purple-500/20">
            <div className="text-sm text-purple-300/80">Total Leads</div>
            <div className="text-lg font-semibold text-purple-200">
              {filteredAndSortedData.reduce((sum, p) => sum + p.leadsGenerated, 0).toLocaleString()}
            </div>
          </div>
          <div className="text-center p-3 bg-[#2D1B69]/30 rounded-lg border border-purple-500/20">
            <div className="text-sm text-purple-300/80">Avg CPL</div>
            <div className="text-lg font-semibold text-purple-200">
              {formatCurrency(
                filteredAndSortedData.reduce((sum, p) => sum + p.cpl, 0) / filteredAndSortedData.length
              )}
            </div>
          </div>
          <div className="text-center p-3 bg-[#2D1B69]/30 rounded-lg border border-purple-500/20">
            <div className="text-sm text-purple-300/80">Avg ROI</div>
            <div className="text-lg font-semibold text-purple-200">
              {formatPercentage(
                filteredAndSortedData.reduce((sum, p) => sum + p.roi, 0) / filteredAndSortedData.length
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default B2BPlatformTable; 