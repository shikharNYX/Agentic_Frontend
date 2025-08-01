import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSignIcon, 
  UsersIcon, 
  TargetIcon, 
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
  BuildingIcon,
  UserCheckIcon,
  AwardIcon,
  BarChart3Icon,
  PercentIcon,
  ActivityIcon
} from "lucide-react";
import { B2BSummaryMetrics, B2BMetric } from "@/types/analytics";

interface B2BSummaryCardsProps {
  metrics: B2BSummaryMetrics;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

const formatValue = (metric: B2BMetric): string => {
  const value = metric.value;
  
  if (metric.format === 'currency') {
    return typeof value === 'number' 
      ? new Intl.NumberFormat('en-US', { 
          style: 'currency', 
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value)
      : value.toString();
  }
  
  if (metric.format === 'percentage') {
    return typeof value === 'number' 
      ? `${value.toFixed(1)}%`
      : value.toString();
  }
  
  if (metric.format === 'decimal') {
    return typeof value === 'number' 
      ? value.toFixed(2)
      : value.toString();
  }
  
  return typeof value === 'number' 
    ? new Intl.NumberFormat('en-US').format(value)
    : value.toString();
};

const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
  switch (trend) {
    case 'up':
      return <TrendingUpIcon className="h-4 w-4 text-emerald-400" />;
    case 'down':
      return <TrendingDownIcon className="h-4 w-4 text-rose-400" />;
    case 'stable':
      return <MinusIcon className="h-4 w-4 text-gray-400" />;
  }
};

const MetricCard: React.FC<{ metric: B2BMetric; title: string }> = ({ metric, title }) => {
  const Icon = metric.icon;
  
  return (
    <Card className="bg-[#1A0B2E]/80 border-[#6D28D9]/20 hover:border-[#6D28D9]/40 transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs text-purple-300/80 font-medium">{title}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-fuchsia-300">
                {formatValue(metric)}
              </span>
              <div className="flex items-center gap-1">
                {getTrendIcon(metric.trend)}
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                  metric.trend === 'up' 
                    ? 'bg-emerald-500/10 text-emerald-400' 
                    : metric.trend === 'down'
                    ? 'bg-rose-500/10 text-rose-400'
                    : 'bg-gray-500/10 text-gray-400'
                }`}>
                  {metric.change >= 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
            </div>
          </div>
          <div className={`p-2 rounded-lg bg-gradient-to-br ${metric.color} bg-opacity-10`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const B2BSummaryCards: React.FC<B2BSummaryCardsProps> = ({ metrics, dateRange }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">
            B2B Dashboard
          </h2>
          <p className="text-purple-300/80 text-sm mt-1">
            Marketing and Sales Performance Overview
            {dateRange && (
              <span className="ml-2 text-purple-400">
                {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
              </span>
            )}
          </p>
        </div>
        <Badge variant="outline" className="border-purple-500/30 text-purple-300">
          B2B Focus
        </Badge>
      </div>

      {/* Marketing Metrics */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BuildingIcon className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-blue-200">Marketing Metrics</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            metric={metrics.marketing.totalSpend} 
            title="Total Spend"
          />
          <MetricCard 
            metric={metrics.marketing.mqls} 
            title="Marketing Qualified Leads"
          />
          <MetricCard 
            metric={metrics.marketing.cpl} 
            title="Cost per Lead"
          />
          <MetricCard 
            metric={metrics.marketing.sqlConversionRate} 
            title="MQL to SQL Rate"
          />
        </div>
      </div>

      {/* Sales Metrics */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <UserCheckIcon className="h-5 w-5 text-emerald-400" />
          <h3 className="text-lg font-semibold text-emerald-200">Sales Metrics</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard 
            metric={metrics.sales.sqls} 
            title="Sales Qualified Leads"
          />
          <MetricCard 
            metric={metrics.sales.opportunities} 
            title="Opportunities"
          />
          <MetricCard 
            metric={metrics.sales.revenue} 
            title="Revenue Generated"
          />
          <MetricCard 
            metric={metrics.sales.dealWinRate} 
            title="Deal Win Rate"
          />
          <MetricCard 
            metric={metrics.sales.roi} 
            title="ROI"
          />
        </div>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <ActivityIcon className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-200">Lead Quality</span>
            </div>
            <p className="text-xs text-blue-300/80">
              {metrics.marketing.sqlConversionRate.trend === 'up' 
                ? 'Lead quality improving' 
                : 'Lead quality needs attention'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AwardIcon className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-200">Sales Performance</span>
            </div>
            <p className="text-xs text-emerald-300/80">
              {metrics.sales.dealWinRate.trend === 'up' 
                ? 'Sales team performing well' 
                : 'Sales performance needs improvement'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3Icon className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-200">Overall ROI</span>
            </div>
            <p className="text-xs text-purple-300/80">
              {metrics.sales.roi.trend === 'up' 
                ? 'Strong return on investment' 
                : 'ROI optimization needed'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default B2BSummaryCards; 