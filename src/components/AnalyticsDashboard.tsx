/**
 * @author Healium Digital
 * Analytics Dashboard Component
 * Displays campaign performance metrics and visualizations
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FunnelChart from "@/components/FunnelChart";
import { MapComponent } from "@/components/MapComponent";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUpIcon, 
  TrendingDownIcon,
  MousePointerClickIcon, 
  EyeIcon, 
  TargetIcon,
  DollarSignIcon,
  ActivityIcon,
  CalendarIcon,
  ShoppingCartIcon,
  AlertTriangleIcon,
  BarChart3Icon,
  PieChartIcon,
  LineChartIcon,
  UsersIcon
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { DownloadIcon } from "lucide-react";
import { MoreVerticalIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ComposedChart,
  Area,
  Funnel
} from 'recharts';

interface DataPoint {
  name: string;
  clicks: number;
  impressions: number;
  conversions: number;
  spend: number;
  cpc: number;
  ctr: number;
  cpm: number;
}

// Mock data for development
const mockData = {
  // Enhanced Campaign Analytics Data
  unifiedKPIs: {
    mer: 3.2,
    profit: 125000,
    revenue: 400000,
    profitMargin: 31.25,
    growthRate: 12.5
  },
  
  marketingFunnel: [
    { id: 'Awareness', label: 'Awareness', value: 100000, percentage: 100, color: '#7C3AED' },
    { id: 'Interest', label: 'Interest', value: 45000, percentage: 45, color: '#4F46E5' },
    { id: 'Consideration', label: 'Consideration', value: 22500, percentage: 22.5, color: '#EC4899' },
    { id: 'Intent', label: 'Intent', value: 11250, percentage: 11.25, color: '#BE185D' },
    { id: 'Purchase', label: 'Purchase', value: 6750, percentage: 6.75, color: '#F59E0B' }
  ],
  
  productPerformance: [
    { sku: 'PROD-001', name: 'Premium Headphones', revenue: 85000, units: 425, margin: 35, trend: 'up' },
    { sku: 'PROD-002', name: 'Wireless Speaker', revenue: 72000, units: 360, margin: 28, trend: 'up' },
    { sku: 'PROD-003', name: 'Smart Watch', revenue: 68000, units: 340, margin: 42, trend: 'down' },
    { sku: 'PROD-004', name: 'Laptop Stand', revenue: 45000, units: 900, margin: 25, trend: 'up' },
    { sku: 'PROD-005', name: 'Phone Case', revenue: 38000, units: 1900, margin: 20, trend: 'stable' }
  ],
  
  attributionModels: [
    { model: 'First Touch', revenue: 180000, percentage: 45 },
    { model: 'Last Touch', revenue: 220000, percentage: 55 },
    { model: 'Linear', revenue: 200000, percentage: 50 },
    { model: 'Time Decay', revenue: 210000, percentage: 52.5 },
    { model: 'Position Based', revenue: 195000, percentage: 48.75 }
  ],
  
  creativeAssets: [
    { asset: 'Video Ad A', impressions: 50000, clicks: 2500, ctr: 5.0, conversions: 125, roas: 2.8 },
    { asset: 'Image Ad B', impressions: 45000, clicks: 1800, ctr: 4.0, conversions: 90, roas: 2.2 },
    { asset: 'Carousel Ad C', impressions: 35000, clicks: 2100, ctr: 6.0, conversions: 105, roas: 3.1 },
    { asset: 'Story Ad D', impressions: 30000, clicks: 1500, ctr: 5.0, conversions: 75, roas: 2.5 }
  ],
  
  budgetAlerts: [
    { campaign: 'Summer Sale', issue: 'High CPA', current: 45, target: 35, impact: 'high' },
    { campaign: 'New Product', issue: 'Low CTR', current: 1.2, target: 2.5, impact: 'medium' },
    { campaign: 'B2B Leads', issue: 'Budget Burn', current: 85, target: 70, impact: 'high' }
  ],
  
  communicationAnalytics: {
    email: { sent: 50000, opened: 15000, clicked: 3000, converted: 450, roas: 3.2 },
    sms: { sent: 25000, delivered: 24000, clicked: 1200, converted: 180, roas: 2.8 },
    whatsapp: { sent: 15000, delivered: 14800, clicked: 900, converted: 135, roas: 3.5 }
  },
  
  riskMetrics: {
    cacTrend: { current: 125, previous: 110, trend: 'up', risk: 'medium' },
    roasDecline: { current: 2.8, previous: 3.2, trend: 'down', risk: 'high' },
    churnPrediction: { rate: 2.8, trend: 'stable', risk: 'low' },
    budgetBurn: { rate: 85, trend: 'up', risk: 'high' },
    creativeFatigue: { score: 65, trend: 'down', risk: 'medium' }
  },
  
  forecasting: [
    { month: 'Jan', actual: 400000, forecast: 420000, accuracy: 95 },
    { month: 'Feb', actual: 450000, forecast: 460000, accuracy: 98 },
    { month: 'Mar', actual: 480000, forecast: 500000, accuracy: 96 },
    { month: 'Apr', actual: 520000, forecast: 540000, accuracy: 96 },
    { month: 'May', actual: 550000, forecast: 580000, accuracy: 95 },
    { month: 'Jun', actual: 580000, forecast: 620000, accuracy: 94 }
  ],
  
  b2bMetrics: {
    leadQuality: { score: 78, trend: 'up' },
    pipelineHealth: { value: 850000, conversion: 12.5 },
    contentEffectiveness: { score: 82, trend: 'up' },
    salesCycle: { days: 45, trend: 'down' },
    dealSize: { average: 8500, trend: 'up' }
  },

  accountMetrics: [
    { label: 'Spend', value: '$12,345', change: 8.2 },
    { label: 'Clicks', value: '1,234', change: 12.3 },
    { label: 'Impressions', value: '123,456', change: -3.2 },
    { label: 'CTR', value: '1.2%', change: 15.7 },
    { label: 'CPC', value: '$10.01', change: -5.4 },
    { label: 'Conversions', value: '321', change: 9.8 }
  ],
  timeSeriesData: [
    { date: '2024-01-01', impressions: 15000, clicks: 750, conversions: 80 },
    { date: '2024-01-02', impressions: 17500, clicks: 800, conversions: 90 },
    { date: '2024-01-03', impressions: 16800, clicks: 820, conversions: 85 },
    { date: '2024-01-04', impressions: 18200, clicks: 900, conversions: 95 },
    { date: '2024-01-05', impressions: 17900, clicks: 850, conversions: 88 },
    { date: '2024-01-06', impressions: 19500, clicks: 950, conversions: 100 },
    { date: '2024-01-07', impressions: 20100, clicks: 1000, conversions: 110 }
  ],
  campaignPerformance: [
    { name: 'Campaign A', spend: 5000, impressions: 50000, clicks: 2500, conversions: 125 },
    { name: 'Campaign B', spend: 3500, impressions: 35000, clicks: 1750, conversions: 88 },
    { name: 'Campaign C', spend: 2800, impressions: 28000, clicks: 1400, conversions: 70 },
    { name: 'Campaign D', spend: 4200, impressions: 42000, clicks: 2100, conversions: 105 },
    { name: 'Campaign E', spend: 3900, impressions: 39000, clicks: 1950, conversions: 98 }
  ],
  geographicData: [
    { id: 'USA', value: 35 },
    { id: 'GBR', value: 20 },
    { id: 'CAN', value: 15 },
    { id: 'AUS', value: 10 },
    { id: 'DEU', value: 8 },
    { id: 'FRA', value: 7 },
    { id: 'IND', value: 5 }
  ],
  funnelData: [
    { id: 'Impressions', value: 15420, label: 'Impressions' },
    { id: 'Clicks', value: 8750, label: 'Clicks' },
    { id: 'Conversions', value: 3200, label: 'Conversions' }
  ]
};

interface AnalyticsDashboardProps {
  dateRange: {
    from: Date;
    to: Date;
  };
  viewMode: 'b2c' | 'b2b';
}

const accountMetrics = mockData.accountMetrics;

const metricOptionsForChart = [
  { key: 'impressions', label: 'Impressions', color: '#4F46E5' },
  { key: 'clicks', label: 'Clicks', color: '#7C3AED' },
  { key: 'conversions', label: 'Conversions', color: '#EC4899' },
  { key: 'ctr', label: 'CTR', color: '#FCD34D' },
  { key: 'spend', label: 'Spend', color: '#BE185D' },
  { key: 'cpc', label: 'CPC', color: '#047857' },
  { key: 'cpm', label: 'CPM', color: '#B45309' }
];

const metricOptions = [
  { value: 'clicks', label: 'Clicks' },
  { value: 'impressions', label: 'Impressions' },
  { value: 'totalSpend', label: 'Total Spend' },
  { value: 'cpc', label: 'Cost per Click (CPC)' },
  { value: 'ctr', label: 'Click-Through Rate (CTR)' }
];

const segmentOptions = [
  { value: 'demographics', label: 'Demographics' },
  { value: 'devices', label: 'Devices' },
  { value: 'campaign_objectives', label: 'Campaign Objectives' },
  { value: 'campaigns', label: 'Campaigns' },
  { value: 'gender', label: 'Gender' }
];

const mockSegmentData = {
  demographics: [
    { name: 'Age 18-24', value: 1500, distribution: 30, change: 5.2 },
    { name: 'Age 25-34', value: 2000, distribution: 40, change: 8.1 },
    { name: 'Age 35-44', value: 1000, distribution: 20, change: -2.3 },
    { name: 'Age 45+', value: 500, distribution: 10, change: -1.5 }
  ],
  devices: [
    { name: 'Mobile', value: 2500, distribution: 50, change: 12.5 },
    { name: 'Desktop', value: 1500, distribution: 30, change: 4.2 },
    { name: 'Tablet', value: 500, distribution: 10, change: -2 },
    { name: 'Other', value: 500, distribution: 10, change: -3 }
  ],
  campaign_objectives: [
    { name: 'Brand Awareness', value: 3000, distribution: 35, change: 7.8 },
    { name: 'Website Traffic', value: 2500, distribution: 30, change: 5.2 },
    { name: 'Lead Generation', value: 2000, distribution: 25, change: -1.5 },
    { name: 'Sales', value: 800, distribution: 10, change: 3.4 }
  ],
  campaigns: [
    { name: 'Summer Sale 2024', value: 2800, distribution: 28, change: 9.5 },
    { name: 'New Product Launch', value: 2500, distribution: 25, change: 12.3 },
    { name: 'Holiday Special', value: 2200, distribution: 22, change: -2.1 },
    { name: 'Brand Campaign', value: 1500, distribution: 15, change: 4.7 },
    { name: 'Retargeting', value: 1000, distribution: 10, change: 6.2 }
  ],
  gender: [
    { name: 'Male', value: 4500, distribution: 45, change: 6.7 },
    { name: 'Female', value: 4200, distribution: 42, change: 8.2 },
    { name: 'Other', value: 800, distribution: 8, change: 3.1 },
    { name: 'Undisclosed', value: 500, distribution: 5, change: -1.4 }
  ]
};

const formatValue = (value: number, metric: string): string => {
  switch(metric) {
    case 'spend':
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    case 'cpc':
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(value);
    case 'cpm':
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(value);
    case 'ctr':
      return `${value.toFixed(1)}%`;
    case 'impressions':
    case 'clicks':
    case 'conversions':
      return new Intl.NumberFormat('en-US').format(value);
    default:
      return value.toString();
  }
};

const formatLargeNumber = (value: string): string => {
  // Remove any existing formatting (commas, currency symbols)
  const cleanValue = value.replace(/[$,]/g, '');
  const num = parseFloat(cleanValue);

  if (isNaN(num)) return value; // Return original value if not a number

  // Check if it's a currency value
  const isCurrency = value.startsWith('$');

  if (num >= 1000000) {
    return `${isCurrency ? '$' : ''}${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${isCurrency ? '$' : ''}${(num / 1000).toFixed(1)}K`;
  }

  return value;
};

const gradientDefs = (
  <defs>
    <linearGradient id="impressionsGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#818CF8" />
      <stop offset="100%" stopColor="#4F46E5" />
    </linearGradient>
    <linearGradient id="clicksGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#34D399" />
      <stop offset="100%" stopColor="#059669" />
    </linearGradient>
    <linearGradient id="conversionsGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#F472B6" />
      <stop offset="100%" stopColor="#DB2777" />
    </linearGradient>
    <linearGradient id="ctrGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FCD34D" />
      <stop offset="100%" stopColor="#F59E0B" />
    </linearGradient>
    <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#EC4899" />
      <stop offset="100%" stopColor="#BE185D" />
    </linearGradient>
    <linearGradient id="cpcGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#10B981" />
      <stop offset="100%" stopColor="#047857" />
    </linearGradient>
    <linearGradient id="cpmGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#F59E0B" />
      <stop offset="100%" stopColor="#B45309" />
    </linearGradient>
  </defs>
);

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ dateRange, viewMode }) => {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['impressions', 'clicks', 'conversions']);
  const [selectedSegment, setSelectedSegment] = useState('campaign');
  const [selectedMetric, setSelectedMetric] = useState('spend');
  const [isChartCollapsed, setIsChartCollapsed] = useState(false);
  const [isFunnelCollapsed, setIsFunnelCollapsed] = useState(false);
  const [isSegmentCollapsed, setIsSegmentCollapsed] = useState(false);

  const toggleMetric = (metric: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metric) 
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  // Format the date for display
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Get the date range string
  const getDateRangeString = (): string => {
    return `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`;
  };

  // Use mock data directly
  const data = mockData.timeSeriesData.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    impressions: item.impressions,
    clicks: item.clicks,
    conversions: item.conversions
  }));

  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatCurrencyK = (value: number) => {
    return `$${(value / 1000).toFixed(1)}K`;
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-[#0F0720] via-[#1A0B2E] to-[#0F0720]">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Unified Ecommerce KPIs (B2C) */}
        {viewMode === 'b2c' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">
              Unified Ecommerce KPIs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card className="bg-[#2A1A4D]/90 border-[#6D28D9]/30">
                <CardContent className="p-4 text-center">
                  <DollarSignIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                  <p className="text-sm text-purple-300/80 mb-1">MER</p>
                  <p className="text-2xl font-bold text-purple-200">3.2x</p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                    +12.5%
                  </Badge>
                </CardContent>
              </Card>
              
              <Card className="bg-[#2A1A4D]/90 border-[#6D28D9]/30">
                <CardContent className="p-4 text-center">
                  <TrendingUpIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                  <p className="text-sm text-purple-300/80 mb-1">Profit</p>
                  <p className="text-2xl font-bold text-purple-200">{formatCurrencyK(125000)}</p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                    +18.3%
                  </Badge>
                </CardContent>
              </Card>
              
              <Card className="bg-[#2A1A4D]/90 border-[#6D28D9]/30">
                <CardContent className="p-4 text-center">
                  <BarChart3Icon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                  <p className="text-sm text-purple-300/80 mb-1">Revenue</p>
                  <p className="text-2xl font-bold text-purple-200">{formatCurrencyK(400000)}</p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                    +15.7%
                  </Badge>
                </CardContent>
              </Card>
              
              <Card className="bg-[#2A1A4D]/90 border-[#6D28D9]/30">
                <CardContent className="p-4 text-center">
                  <PieChartIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                  <p className="text-sm text-purple-300/80 mb-1">Profit Margin</p>
                  <p className="text-2xl font-bold text-purple-200">31.25%</p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                    +2.1%
                  </Badge>
                </CardContent>
              </Card>
              
              <Card className="bg-[#2A1A4D]/90 border-[#6D28D9]/30">
                <CardContent className="p-4 text-center">
                  <LineChartIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                  <p className="text-sm text-purple-300/80 mb-1">Growth Rate</p>
                  <p className="text-2xl font-bold text-purple-200">12.5%</p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                    +1.8%
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Performance Behavior Section */}
        <div className="space-y-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">
              Performance Behavior
            </h2>
            <p className="text-purple-300/80 text-sm mt-1">Performance metrics and trends</p>
          </div>

          {/* Stats Overview - Executive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {accountMetrics.map((metric) => (
              <div key={metric.label} className="relative bg-gradient-to-br from-[#1A0B2E]/80 to-[#2D1B69]/60 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
                {/* Content */}
                <div className="relative">
                  <p className="text-sm font-medium text-purple-300/80 mb-2">{metric.label}</p>
                  <div className="flex items-baseline justify-between">
                    <p className="text-purple-200 text-base font-semibold">
                      {formatLargeNumber(metric.value)}
                    </p>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      metric.change > 0 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chart Section - Executive with Collapsible */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#1A0B2E]/90 to-[#2D1B69]/80 backdrop-blur-md rounded-xl border border-purple-500/20">
              {/* Header */}
              <div className="p-6 border-b border-purple-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors duration-300">
                      <ActivityIcon className="w-6 h-6 text-purple-300" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">Performance Trends</h2>
                      <p className="text-sm text-purple-300/80 mt-1">Track your key metrics over time</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 text-sm rounded-lg bg-gradient-to-r from-[#6D28D9] to-[#4F46E5] text-white hover:from-[#5B21B6] hover:to-[#4338CA] transition-all duration-200">Daily</button>
                      <button className="px-3 py-1.5 text-sm rounded-lg bg-[#2D1B69]/30 text-purple-300 hover:bg-[#2D1B69]/50 transition-all duration-200">Weekly</button>
                      <button className="px-3 py-1.5 text-sm rounded-lg bg-[#2D1B69]/30 text-purple-300 hover:bg-[#2D1B69]/50 transition-all duration-200">Monthly</button>
                    </div>
                                         <button
                       onClick={() => setIsChartCollapsed(!isChartCollapsed)}
                       className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 hover:text-white transition-all duration-200"
                     >
                      {isChartCollapsed ? (
                        <ArrowDownIcon className="w-5 h-5" />
                      ) : (
                        <ArrowUpIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Collapsible Chart Content */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isChartCollapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'
              }`}>
                <div className="p-6">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        {gradientDefs}
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
                          height={72}
                          onClick={(e) => {
                            if (typeof e.dataKey === 'string') {
                              toggleMetric(e.dataKey);
                            }
                          }}
                          content={({ payload }) => (
                            <div className="flex flex-wrap gap-3 justify-center mt-8">
                              {payload.map((entry) => (
                                <div
                                  key={String(entry.dataKey)}
                                  onClick={() => {
                                    if (typeof entry.dataKey === 'string') {
                                      toggleMetric(entry.dataKey);
                                    }
                                  }}
                                  className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 group ${
                                    typeof entry.dataKey === 'string' && selectedMetrics.includes(entry.dataKey)
                                      ? 'bg-[#2D1B69]/50 text-white'
                                      : 'text-purple-300/60 hover:text-purple-300'
                                  }`}
                                >
                                  {(typeof entry.dataKey !== 'string' || !selectedMetrics.includes(entry.dataKey)) && (
                                    <div className="absolute inset-0 flex items-center pointer-events-none">
                                      <div 
                                        className="w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent transform -rotate-6"
                                      />
                                    </div>
                                  )}
                                  <span
                                    className={`w-3 h-3 rounded-full transition-opacity duration-200 ${
                                      typeof entry.dataKey === 'string' && !selectedMetrics.includes(entry.dataKey) ? 'opacity-40' : ''
                                    }`}
                                    style={{ 
                                      background: entry.color.replace('url(#', 'linear-gradient(to right, ').replace(')', ', #4F46E5)')
                                    }}
                                  />
                                  <span className={`transition-opacity duration-200 ${
                                    typeof entry.dataKey === 'string' && !selectedMetrics.includes(entry.dataKey) ? 'opacity-40' : ''
                                  }`}>
                                    {metricOptionsForChart.find(m => m.key === entry.dataKey)?.label || entry.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        />
                        {metricOptionsForChart.map(metric => (
                          <Line 
                            key={metric.key}
                            type="monotone" 
                            dataKey={metric.key} 
                            stroke={metric.color}
                            strokeWidth={2}
                            dot={{ fill: metric.color, r: 4, strokeWidth: 2 }}
                            activeDot={{ r: 6, fill: '#E9D5FF', stroke: metric.color, strokeWidth: 2 }}
                            hide={!selectedMetrics.includes(metric.key)}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Subtle glow effect */}
            <div className="absolute -inset-1 rounded-xl bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          </div>
        </div>

        {/* Funnel and Segment Performance Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Funnel View - Executive */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#1A0B2E]/90 to-[#2D1B69]/80 backdrop-blur-md rounded-xl border border-purple-500/20">
              {/* Header */}
              <div className="p-6 border-b border-purple-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <TargetIcon className="w-6 h-6 text-purple-300" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">Conversion Funnel</h2>
                      <p className="text-sm text-purple-300/80 mt-1">Track your funnel conversion rates</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsFunnelCollapsed(!isFunnelCollapsed)}
                    className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 hover:text-white transition-all duration-200"
                  >
                    {isFunnelCollapsed ? (
                      <ArrowDownIcon className="w-5 h-5" />
                    ) : (
                      <ArrowUpIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Collapsible Content */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isFunnelCollapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'
              }`}>
                <div className="p-6">
                  <div className="relative" style={{ height: '400px' }}>
                    <div className="absolute inset-0">
                      <FunnelChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Segment Performance - Executive */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#1A0B2E]/90 to-[#2D1B69]/80 backdrop-blur-md rounded-xl border border-purple-500/20">
              {/* Header */}
              <div className="p-6 border-b border-purple-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <TrendingUpIcon className="w-6 h-6 text-purple-300" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">Segment Performance</h2>
                      <p className="text-sm text-purple-300/80 mt-1">Detailed performance breakdown</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsSegmentCollapsed(!isSegmentCollapsed)}
                    className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 hover:text-white transition-all duration-200"
                  >
                    {isSegmentCollapsed ? (
                      <ArrowDownIcon className="w-5 h-5" />
                    ) : (
                      <ArrowUpIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Collapsible Content */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isSegmentCollapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'
              }`}>
                <div className="p-6">
                  <div className="rounded-lg overflow-hidden border border-[#6D28D9]/20">
                    <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                      <style dangerouslySetInnerHTML={{
                        __html: `
                          .custom-scrollbar::-webkit-scrollbar {
                            width: 8px;
                            height: 8px;
                          }
                          .custom-scrollbar::-webkit-scrollbar-track {
                            background: rgba(109, 40, 217, 0.1);
                            border-radius: 4px;
                          }
                          .custom-scrollbar::-webkit-scrollbar-thumb {
                            background: rgba(109, 40, 217, 0.5);
                            border-radius: 4px;
                          }
                          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: rgba(109, 40, 217, 0.7);
                          }
                        `
                      }} />
                      <Table>
                        <TableHeader className="sticky top-0 bg-[#1A0B2E] z-10">
                          <TableRow className="border-[#6D28D9]/20">
                            <TableHead className="w-[280px]">
                              <Select 
                                value={selectedSegment} 
                                onValueChange={setSelectedSegment}
                              >
                                <SelectTrigger className="w-full bg-transparent text-purple-300 border-0 hover:bg-[#2D1B69]/50 transition-all duration-200 -ml-2">
                                  <SelectValue placeholder="Select Segment" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1A0B2E] border-[#6D28D9]/20 text-purple-300">
                                  {segmentOptions.map((option) => (
                                    <SelectItem 
                                      key={option.value} 
                                      value={option.value}
                                      className="hover:bg-[#6D28D9]/20 focus:bg-[#6D28D9]/20 text-purple-300"
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableHead>
                            <TableHead className="w-[220px]">
                              <Select 
                                value={selectedMetric} 
                                onValueChange={setSelectedMetric}
                              >
                                <SelectTrigger className="w-full bg-transparent text-purple-300 border-0 hover:bg-[#2D1B69]/50 transition-all duration-200 -ml-2">
                                  <SelectValue placeholder="Select Metric" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1A0B2E] border-[#6D28D9]/20 text-purple-300">
                                  {metricOptions.map((option) => (
                                    <SelectItem 
                                      key={option.value} 
                                      value={option.value}
                                      className="hover:bg-[#6D28D9]/20 focus:bg-[#6D28D9]/20 text-purple-300"
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableHead>
                            <TableHead className="text-purple-300">Value</TableHead>
                            <TableHead className="text-purple-300">Change</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockSegmentData[selectedSegment]?.map((item) => (
                            <TableRow 
                              key={item.name} 
                              className="border-[#6D28D9]/20 hover:bg-[#2D1B69]/30 transition-colors duration-200"
                            >
                              <TableCell className="text-purple-200 font-medium">
                                {item.name}
                              </TableCell>
                              <TableCell className="text-purple-200">
                                {selectedMetric 
                                  ? formatValue(item.value, selectedMetric)
                                  : 'Select a metric'}
                              </TableCell>
                              <TableCell className="text-purple-200">
                                {formatValue(item.distribution, 'distribution')}%
                              </TableCell>
                              <TableCell>
                                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                  item.change >= 0 
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                                }`}>
                                  {item.change >= 0 ? '+' : ''}{item.change}%
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Performance Section */}
        <Card className="p-6 bg-[#1A0B2E]/80 border-[#6D28D9]/20 backdrop-blur-xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">
              Regional Performance
            </h2>
            <p className="text-purple-300/80 text-sm mt-1">Performance metrics by region</p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="min-h-[400px] bg-[#2D1B69]/30 rounded-lg border border-[#6D28D9]/20 p-4">
              <MapComponent />
            </div>
            <div className="min-h-[400px] bg-[#2D1B69]/30 rounded-lg border border-[#6D28D9]/20 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-purple-300">Region Details</h3>
                <Select 
                  value={selectedMetric} 
                  onValueChange={setSelectedMetric}
                >
                  <SelectTrigger className="w-[180px] bg-[#2D1B69]/30 text-purple-300 border-[#6D28D9]/20 hover:bg-[#2D1B69]/50 transition-all duration-200">
                    <SelectValue placeholder="Select Metric" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A0B2E] border-[#6D28D9]/20 text-purple-300">
                    {metricOptions.map((option) => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                        className="hover:bg-[#6D28D9]/20 focus:bg-[#6D28D9]/20 text-purple-300"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="overflow-auto max-h-[340px]">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-[#2D1B69]/40 border-[#6D28D9]/20">
                      <TableHead className="text-purple-300 font-medium">Region</TableHead>
                      <TableHead className="text-purple-300 font-medium">Value</TableHead>
                      <TableHead className="text-purple-300 font-medium">Distribution</TableHead>
                      <TableHead className="text-purple-300 font-medium">Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { region: 'North America', value: 45000, distribution: 35, change: 12 },
                      { region: 'Europe', value: 32000, distribution: 25, change: 8 },
                      { region: 'Asia Pacific', value: 28000, distribution: 22, change: -3 },
                      { region: 'Latin America', value: 15000, distribution: 12, change: 5 },
                      { region: 'Middle East', value: 8000, distribution: 6, change: -2 }
                    ].map((item) => (
                      <TableRow 
                        key={item.region} 
                        className="hover:bg-[#2D1B69]/40 border-[#6D28D9]/20"
                      >
                        <TableCell className="font-medium text-purple-300">
                          {item.region}
                        </TableCell>
                        <TableCell className="text-purple-300">
                          {selectedMetric 
                            ? formatValue(item.value, selectedMetric)
                            : 'Select a metric'}
                        </TableCell>
                        <TableCell className="text-purple-300">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 bg-[#2D1B69]/30 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-[#6D28D9] to-[#9F5BF0]"
                                style={{ width: `${item.distribution}%` }}
                              />
                            </div>
                            <span>{item.distribution}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-purple-300">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            item.change >= 0 
                              ? 'bg-emerald-500/10 text-emerald-400' 
                              : 'bg-rose-500/10 text-rose-400'
                          }`}>
                            {item.change >= 0 ? '↑' : '↓'} {Math.abs(item.change)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </Card>

        {/* Enhanced Campaign Analytics Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">
            Enhanced Campaign Analytics
          </h2>

          {/* Unified Ecommerce KPIs */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">
              Unified Ecommerce KPIs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card className="bg-[#2A1A4D]/90 border-[#6D28D9]/30">
                <CardContent className="p-4 text-center">
                  <DollarSignIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                  <p className="text-sm text-purple-300/80 mb-1">MER</p>
                  <p className="text-2xl font-bold text-purple-200">{mockData.unifiedKPIs.mer}x</p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                    +{mockData.unifiedKPIs.growthRate}%
                  </Badge>
                </CardContent>
              </Card>
              
              <Card className="bg-[#2A1A4D]/90 border-[#6D28D9]/30">
                <CardContent className="p-4 text-center">
                  <TrendingUpIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                  <p className="text-sm text-purple-300/80 mb-1">Profit</p>
                  <p className="text-2xl font-bold text-purple-200">${(mockData.unifiedKPIs.profit / 1000).toFixed(1)}K</p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                    +{mockData.unifiedKPIs.growthRate}%
                  </Badge>
                </CardContent>
              </Card>
              
              <Card className="bg-[#2A1A4D]/90 border-[#6D28D9]/30">
                <CardContent className="p-4 text-center">
                  <BarChart3Icon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                  <p className="text-sm text-purple-300/80 mb-1">Revenue</p>
                  <p className="text-2xl font-bold text-purple-200">${(mockData.unifiedKPIs.revenue / 1000).toFixed(1)}K</p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                    +{mockData.unifiedKPIs.growthRate}%
                  </Badge>
                </CardContent>
              </Card>
              
              <Card className="bg-[#2A1A4D]/90 border-[#6D28D9]/30">
                <CardContent className="p-4 text-center">
                  <PieChartIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                  <p className="text-sm text-purple-300/80 mb-1">Profit Margin</p>
                  <p className="text-2xl font-bold text-purple-200">{mockData.unifiedKPIs.profitMargin}%</p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                    +2.1%
                  </Badge>
                </CardContent>
              </Card>
              
              <Card className="bg-[#2A1A4D]/90 border-[#6D28D9]/30">
                <CardContent className="p-4 text-center">
                  <LineChartIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                  <p className="text-sm text-purple-300/80 mb-1">Growth Rate</p>
                  <p className="text-2xl font-bold text-purple-200">{mockData.unifiedKPIs.growthRate}%</p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                    +1.8%
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Marketing Funnel Overview & SKU Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
              <CardHeader>
                <CardTitle className="text-purple-100">Marketing Funnel Overview</CardTitle>
                <CardDescription className="text-purple-300">
                  Customer journey from awareness to purchase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <FunnelChart data={mockData.marketingFunnel} />
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {mockData.marketingFunnel.map((stage, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: stage.color }}
                        />
                        <span className="text-sm text-purple-300">{stage.label}</span>
                      </div>
                      <div className="text-sm text-purple-300">
                        {stage.value.toLocaleString()} ({stage.percentage}%)
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
              <CardHeader>
                <CardTitle className="text-purple-100">SKU/Product Performance</CardTitle>
                <CardDescription className="text-purple-300">
                  Top performing products by revenue and margin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockData.productPerformance.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[#2D1B69]/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <ShoppingCartIcon className="h-5 w-5 text-purple-300" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-purple-200">{product.name}</p>
                          <p className="text-xs text-purple-300/60">{product.sku}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-purple-200">${(product.revenue / 1000).toFixed(1)}K</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-purple-300/60">{product.units} units</span>
                          {product.trend === 'up' ? (
                            <TrendingUpIcon className="h-3 w-3 text-emerald-400" />
                          ) : product.trend === 'down' ? (
                            <TrendingDownIcon className="h-3 w-3 text-rose-400" />
                          ) : (
                            <div className="h-3 w-3 text-purple-400">—</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Multi-Touch Attribution */}
          <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
            <CardHeader>
              <CardTitle className="text-purple-100">Multi-Touch Attribution Models</CardTitle>
              <CardDescription className="text-purple-300">
                Revenue attribution across different attribution models
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockData.attributionModels}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.1} />
                    <XAxis 
                      dataKey="model" 
                      tick={{ fill: '#E9D5FF', fontSize: 12 }}
                      axisLine={{ stroke: '#6D28D9' }}
                    />
                    <YAxis 
                      tick={{ fill: '#E9D5FF', fontSize: 12 }}
                      axisLine={{ stroke: '#6D28D9' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(45, 27, 105, 0.95)',
                        border: '1px solid rgba(109, 40, 217, 0.2)',
                        borderRadius: '12px',
                        color: '#E9D5FF',
                        backdropFilter: 'blur(8px)'
                      }}
                      formatter={(value) => [`$${(Number(value) / 1000).toFixed(1)}K`, 'Revenue']}
                    />
                    <Bar dataKey="revenue" fill="#7C3AED" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Creative Asset Analysis & Budget Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
              <CardHeader>
                <CardTitle className="text-purple-100">Creative Asset Performance</CardTitle>
                <CardDescription className="text-purple-300">
                  Performance analysis of creative assets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.creativeAssets.map((asset, index) => (
                    <div key={index} className="p-4 bg-[#2D1B69]/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-purple-200">{asset.asset}</h4>
                        <Badge className="bg-purple-500/20 text-purple-300">
                          ROAS: {asset.roas}x
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-xs">
                        <div>
                          <p className="text-purple-300/60">CTR</p>
                          <p className="text-purple-200 font-medium">{asset.ctr}%</p>
                        </div>
                        <div>
                          <p className="text-purple-300/60">Conversions</p>
                          <p className="text-purple-200 font-medium">{asset.conversions}</p>
                        </div>
                        <div>
                          <p className="text-purple-300/60">Impressions</p>
                          <p className="text-purple-200 font-medium">{asset.impressions.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
              <CardHeader>
                <CardTitle className="text-purple-100 flex items-center gap-2">
                  <AlertTriangleIcon className="h-5 w-5 text-amber-400" />
                  Budget Optimization Alerts
                </CardTitle>
                <CardDescription className="text-purple-300">
                  Campaigns requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockData.budgetAlerts.map((alert, index) => (
                    <div key={index} className="p-3 bg-[#2D1B69]/30 rounded-lg border-l-4 border-amber-400">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-purple-200">{alert.campaign}</h4>
                        <Badge className={`${
                          alert.impact === 'high' ? 'bg-rose-500/20 text-rose-400' :
                          alert.impact === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {alert.impact.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-xs text-purple-300/60 mb-1">{alert.issue}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-purple-300">Current: {alert.current}</span>
                        <span className="text-purple-300/60">Target: {alert.target}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Communication Analytics */}
          <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
            <CardHeader>
              <CardTitle className="text-purple-100">Email/SMS/WhatsApp Analytics</CardTitle>
              <CardDescription className="text-purple-300">
                Performance across communication channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(mockData.communicationAnalytics).map(([channel, data]) => (
                  <div key={channel} className="p-4 bg-[#2D1B69]/30 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-purple-200 capitalize">{channel}</h4>
                      <Badge className="bg-purple-500/20 text-purple-300">
                        ROAS: {data.roas}x
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-purple-300/60">Sent</span>
                        <span className="text-purple-200">{data.sent.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300/60">Delivered</span>
                        <span className="text-purple-200">
                          {'delivered' in data ? data.delivered.toLocaleString() : 
                           'opened' in data ? data.opened.toLocaleString() : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300/60">Clicked</span>
                        <span className="text-purple-200">{data.clicked.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300/60">Converted</span>
                        <span className="text-purple-200">{data.converted.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk & Alert Metrics & Forecasting */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
              <CardHeader>
                <CardTitle className="text-purple-100">Risk & Alert Metrics</CardTitle>
                <CardDescription className="text-purple-300">
                  Key risk indicators and alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(mockData.riskMetrics).map(([metric, data]) => (
                    <div key={metric} className="p-3 bg-[#2D1B69]/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-purple-200 capitalize">
                          {metric.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <Badge className={`${
                          data.risk === 'high' ? 'bg-rose-500/20 text-rose-400' :
                          data.risk === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {data.risk.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-purple-200">
                          {'current' in data ? data.current : 
                           'rate' in data ? data.rate : 
                           'score' in data ? data.score : 'N/A'}
                          {'current' in data && metric.includes('CAC') ? '' : 
                           'current' in data && metric.includes('ROAS') ? 'x' : 
                           'current' in data && metric.includes('Burn') ? '%' : ''}
                        </span>
                        {data.trend === 'up' ? (
                          <TrendingUpIcon className="h-3 w-3 text-emerald-400" />
                        ) : data.trend === 'down' ? (
                          <TrendingDownIcon className="h-3 w-3 text-rose-400" />
                        ) : (
                          <div className="h-3 w-3 text-purple-400">—</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
              <CardHeader>
                <CardTitle className="text-purple-100">Revenue Forecasting</CardTitle>
                <CardDescription className="text-purple-300">
                  Actual vs forecasted revenue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={mockData.forecasting}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.1} />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: '#E9D5FF', fontSize: 12 }}
                        axisLine={{ stroke: '#6D28D9' }}
                      />
                      <YAxis 
                        tick={{ fill: '#E9D5FF', fontSize: 12 }}
                        axisLine={{ stroke: '#6D28D9' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(45, 27, 105, 0.95)',
                          border: '1px solid rgba(109, 40, 217, 0.2)',
                          borderRadius: '12px',
                          color: '#E9D5FF',
                          backdropFilter: 'blur(8px)'
                        }}
                        formatter={(value) => [`$${(Number(value) / 1000).toFixed(1)}K`, 'Revenue']}
                      />
                      <Bar dataKey="actual" fill="#7C3AED" name="Actual" />
                      <Line type="monotone" dataKey="forecast" stroke="#EC4899" strokeWidth={2} name="Forecast" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Marketing Funnel Overview & Pathing (B2C) */}
          {viewMode === 'b2c' && (
            <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
              <CardHeader>
                <CardTitle className="text-purple-100">Marketing Funnel Overview</CardTitle>
                <CardDescription className="text-purple-300">
                  Customer journey from awareness to purchase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { stage: 'Awareness', value: 100000, percentage: 100 },
                      { stage: 'Interest', value: 45000, percentage: 45 },
                      { stage: 'Consideration', value: 22500, percentage: 22.5 },
                      { stage: 'Intent', value: 11250, percentage: 11.25 },
                      { stage: 'Purchase', value: 6750, percentage: 6.75 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.1} />
                      <XAxis 
                        dataKey="stage" 
                        tick={{ fill: '#E9D5FF', fontSize: 12 }}
                        axisLine={{ stroke: '#6D28D9' }}
                      />
                      <YAxis 
                        tick={{ fill: '#E9D5FF', fontSize: 12 }}
                        axisLine={{ stroke: '#6D28D9' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(45, 27, 105, 0.95)',
                          border: '1px solid rgba(109, 40, 217, 0.2)',
                          borderRadius: '12px',
                          color: '#E9D5FF',
                          backdropFilter: 'blur(8px)'
                        }}
                      />
                      <Bar dataKey="value" fill="#7C3AED" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Platform-Specific ROAS & Efficiency (Both B2B/B2C) */}
          <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
            <CardHeader>
              <CardTitle className="text-purple-100">Platform-Specific ROAS & Efficiency</CardTitle>
              <CardDescription className="text-purple-300">
                Performance across advertising platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={[
                    { platform: 'Google Ads', spend: 50000, revenue: 150000, roas: 3.0, efficiency: 85 },
                    { platform: 'Facebook', spend: 40000, revenue: 120000, roas: 3.0, efficiency: 80 },
                    { platform: 'Instagram', spend: 30000, revenue: 95000, roas: 3.17, efficiency: 90 },
                    { platform: 'LinkedIn', spend: 25000, revenue: 70000, roas: 2.8, efficiency: 75 },
                    { platform: 'TikTok', spend: 20000, revenue: 65000, roas: 3.25, efficiency: 88 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.1} />
                    <XAxis 
                      dataKey="platform" 
                      tick={{ fill: '#E9D5FF', fontSize: 12 }}
                      axisLine={{ stroke: '#6D28D9' }}
                    />
                    <YAxis 
                      yAxisId="left"
                      tick={{ fill: '#E9D5FF', fontSize: 12 }}
                      axisLine={{ stroke: '#6D28D9' }}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      tick={{ fill: '#E9D5FF', fontSize: 12 }}
                      axisLine={{ stroke: '#6D28D9' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(45, 27, 105, 0.95)',
                        border: '1px solid rgba(109, 40, 217, 0.2)',
                        borderRadius: '12px',
                        color: '#E9D5FF',
                        backdropFilter: 'blur(8px)'
                      }}
                    />
                    <Bar yAxisId="left" dataKey="roas" fill="#7C3AED" name="ROAS" />
                    <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#EC4899" strokeWidth={2} name="Efficiency Score" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Multi-Touch Attribution Models (Both B2B/B2C) */}
          <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
            <CardHeader>
              <CardTitle className="text-purple-100">Multi-Touch Attribution Models</CardTitle>
              <CardDescription className="text-purple-300">
                Revenue attribution across different attribution models
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { model: 'First Touch', revenue: 180000, percentage: 45 },
                    { model: 'Last Touch', revenue: 220000, percentage: 55 },
                    { model: 'Linear', revenue: 200000, percentage: 50 },
                    { model: 'Time Decay', revenue: 210000, percentage: 52.5 },
                    { model: 'Position Based', revenue: 195000, percentage: 48.75 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.1} />
                    <XAxis 
                      dataKey="model" 
                      tick={{ fill: '#E9D5FF', fontSize: 12 }}
                      axisLine={{ stroke: '#6D28D9' }}
                    />
                    <YAxis 
                      tick={{ fill: '#E9D5FF', fontSize: 12 }}
                      axisLine={{ stroke: '#6D28D9' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(45, 27, 105, 0.95)',
                        border: '1px solid rgba(109, 40, 217, 0.2)',
                        borderRadius: '12px',
                        color: '#E9D5FF',
                        backdropFilter: 'blur(8px)'
                      }}
                      formatter={(value) => [formatCurrencyK(Number(value)), 'Revenue']}
                    />
                    <Bar dataKey="revenue" fill="#7C3AED" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Creative Asset Analysis (Both B2B/B2C) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
              <CardHeader>
                <CardTitle className="text-purple-100">Creative Asset Performance</CardTitle>
                <CardDescription className="text-purple-300">
                  Performance analysis of creative assets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { asset: 'Video Ad A', impressions: 50000, clicks: 2500, ctr: 5.0, conversions: 125, roas: 2.8 },
                    { asset: 'Image Ad B', impressions: 45000, clicks: 1800, ctr: 4.0, conversions: 90, roas: 2.2 },
                    { asset: 'Carousel Ad C', impressions: 35000, clicks: 2100, ctr: 6.0, conversions: 105, roas: 3.1 },
                    { asset: 'Story Ad D', impressions: 30000, clicks: 1500, ctr: 5.0, conversions: 75, roas: 2.5 }
                  ].map((asset, index) => (
                    <div key={index} className="p-4 bg-[#2D1B69]/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-purple-200">{asset.asset}</h4>
                        <Badge className="bg-purple-500/20 text-purple-300">
                          ROAS: {asset.roas}x
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-xs">
                        <div>
                          <p className="text-purple-300/60">CTR</p>
                          <p className="text-purple-200 font-medium">{asset.ctr}%</p>
                        </div>
                        <div>
                          <p className="text-purple-300/60">Conversions</p>
                          <p className="text-purple-200 font-medium">{asset.conversions}</p>
                        </div>
                        <div>
                          <p className="text-purple-300/60">Impressions</p>
                          <p className="text-purple-200 font-medium">{asset.impressions.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Budget Optimization / Alerting (Both B2B/B2C) */}
            <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
              <CardHeader>
                <CardTitle className="text-purple-100 flex items-center gap-2">
                  <AlertTriangleIcon className="h-5 w-5 text-amber-400" />
                  Budget Optimization Alerts
                </CardTitle>
                <CardDescription className="text-purple-300">
                  Campaigns requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { campaign: 'Summer Sale', issue: 'High CPA', current: 45, target: 35, impact: 'high' },
                    { campaign: 'New Product', issue: 'Low CTR', current: 1.2, target: 2.5, impact: 'medium' },
                    { campaign: 'B2B Leads', issue: 'Budget Burn', current: 85, target: 70, impact: 'high' }
                  ].map((alert, index) => (
                    <div key={index} className="p-3 bg-[#2D1B69]/30 rounded-lg border-l-4 border-amber-400">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-purple-200">{alert.campaign}</h4>
                        <Badge className={`${
                          alert.impact === 'high' ? 'bg-rose-500/20 text-rose-400' :
                          alert.impact === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {alert.impact}
                        </Badge>
                      </div>
                      <p className="text-xs text-purple-300/80 mb-1">{alert.issue}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-purple-300/60">Current: {alert.current}</span>
                        <span className="text-purple-300/60">Target: {alert.target}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Email/SMS/WhatsApp Analytics (Both B2B/B2C) */}
          <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
            <CardHeader>
              <CardTitle className="text-purple-100">Communication Channel Analytics</CardTitle>
              <CardDescription className="text-purple-300">
                Email, SMS, and WhatsApp performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { channel: 'Email', sent: 50000, opened: 15000, clicked: 3000, converted: 450, roas: 3.2 },
                  { channel: 'SMS', sent: 25000, delivered: 24000, clicked: 1200, converted: 180, roas: 2.8 },
                  { channel: 'WhatsApp', sent: 15000, delivered: 14800, clicked: 900, converted: 135, roas: 3.5 }
                ].map((channel, index) => (
                  <div key={index} className="p-4 bg-[#2D1B69]/30 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-purple-200">{channel.channel}</h4>
                      <Badge className="bg-purple-500/20 text-purple-300">
                        ROAS: {channel.roas}x
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-purple-300/80">Sent</span>
                        <span className="text-purple-200">{channel.sent.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300/80">Opened</span>
                        <span className="text-purple-200">{channel.opened?.toLocaleString() || channel.delivered?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300/80">Clicked</span>
                        <span className="text-purple-200">{channel.clicked.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300/80">Converted</span>
                        <span className="text-purple-200">{channel.converted}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk & Alert Metrics (Both B2B/B2C) */}
          <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
            <CardHeader>
              <CardTitle className="text-purple-100 flex items-center gap-2">
                <AlertTriangleIcon className="h-5 w-5 text-rose-400" />
                Risk & Alert Metrics
              </CardTitle>
              <CardDescription className="text-purple-300">
                Early warning system for campaign performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { metric: 'CAC Trend', current: 125, previous: 110, trend: 'up', risk: 'medium' },
                  { metric: 'ROAS Decline', current: 2.8, previous: 3.2, trend: 'down', risk: 'high' },
                  { metric: 'Budget Burn Rate', current: 85, previous: 70, trend: 'up', risk: 'high' },
                  { metric: 'Creative Fatigue', current: 65, previous: 75, trend: 'down', risk: 'medium' }
                ].map((risk, index) => (
                  <div key={index} className="p-3 bg-[#2D1B69]/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-purple-200">{risk.metric}</h4>
                      <Badge className={`${
                        risk.risk === 'high' ? 'bg-rose-500/20 text-rose-400' :
                        risk.risk === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {risk.risk} risk
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-purple-300/80">Current: {risk.current}</span>
                      <span className="text-purple-300/80">Previous: {risk.previous}</span>
                      <div className="flex items-center gap-1">
                        {risk.trend === 'up' ? (
                          <TrendingUpIcon className="h-4 w-4 text-rose-400" />
                        ) : (
                          <TrendingDownIcon className="h-4 w-4 text-emerald-400" />
                        )}
                        <span className={risk.trend === 'up' ? 'text-rose-400' : 'text-emerald-400'}>
                          {risk.trend}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SKU/Product-Level Performance (B2C) */}
          {viewMode === 'b2c' && (
            <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
              <CardHeader>
                <CardTitle className="text-purple-100">SKU/Product Performance</CardTitle>
                <CardDescription className="text-purple-300">
                  Top performing products by revenue and margin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { sku: 'PROD-001', name: 'Premium Headphones', revenue: 85000, units: 425, margin: 35, trend: 'up' },
                    { sku: 'PROD-002', name: 'Wireless Speaker', revenue: 72000, units: 360, margin: 28, trend: 'up' },
                    { sku: 'PROD-003', name: 'Smart Watch', revenue: 68000, units: 340, margin: 42, trend: 'down' },
                    { sku: 'PROD-004', name: 'Laptop Stand', revenue: 45000, units: 900, margin: 25, trend: 'up' },
                    { sku: 'PROD-005', name: 'Phone Case', revenue: 38000, units: 1900, margin: 20, trend: 'stable' }
                  ].map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[#2D1B69]/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <ShoppingCartIcon className="h-5 w-5 text-purple-300" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-purple-200">{product.name}</p>
                          <p className="text-xs text-purple-300/60">{product.sku}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-purple-200">{formatCurrencyK(product.revenue)}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-purple-300/60">{product.units} units</span>
                          <Badge className={`text-xs ${
                            product.trend === 'up' ? 'bg-emerald-500/20 text-emerald-400' :
                            product.trend === 'down' ? 'bg-rose-500/20 text-rose-400' :
                            'bg-amber-500/20 text-amber-400'
                          }`}>
                            {product.margin}% margin
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* B2B Specific Metrics (shown when B2B mode is selected) */}
          {viewMode === 'b2b' && (
            <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
              <CardHeader>
                <CardTitle className="text-purple-100">B2B Lead Generation & Pipeline Metrics</CardTitle>
                <CardDescription className="text-purple-300">
                  Lead quality, pipeline health, ABM performance, and sales metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Enhanced B2B Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
                  <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                    <UsersIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                    <p className="text-sm text-purple-300/80 mb-1">MQLs Generated</p>
                    <p className="text-2xl font-bold text-purple-200">1,240</p>
                    <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                      +15% growth
                    </Badge>
                  </div>
                  <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                    <TrendingUpIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                    <p className="text-sm text-purple-300/80 mb-1">MQL to SQL Rate</p>
                    <p className="text-2xl font-bold text-purple-200">28.5%</p>
                    <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                      Above target
                    </Badge>
                  </div>
                  <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                    <DollarSignIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                    <p className="text-sm text-purple-300/80 mb-1">Cost per Lead</p>
                    <p className="text-2xl font-bold text-purple-200">$142</p>
                    <Badge className="bg-rose-500/20 text-rose-400 mt-2">
                      +$12 vs target
                    </Badge>
                  </div>
                  <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                    <BarChart3Icon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                    <p className="text-sm text-purple-300/80 mb-1">Pipeline Value</p>
                    <p className="text-2xl font-bold text-purple-200">$2.8M</p>
                    <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                      +18% growth
                    </Badge>
                  </div>
                  <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                    <ActivityIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                    <p className="text-sm text-purple-300/80 mb-1">ABM Engagement</p>
                    <p className="text-2xl font-bold text-purple-200">85%</p>
                    <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                      Top quartile
                    </Badge>
                  </div>
                  <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                    <CalendarIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                    <p className="text-sm text-purple-300/80 mb-1">Sales Cycle</p>
                    <p className="text-2xl font-bold text-purple-200">42 days</p>
                    <Badge className="bg-amber-500/20 text-amber-400 mt-2">
                      +3 days vs target
                    </Badge>
                  </div>
                </div>

                {/* Legacy B2B Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                    <TargetIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                    <p className="text-sm text-purple-300/80 mb-1">Lead Quality Score</p>
                    <p className="text-2xl font-bold text-purple-200">{mockData.b2bMetrics.leadQuality.score}</p>
                    <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                      +{mockData.b2bMetrics.leadQuality.trend === 'up' ? '5' : '-2'}%
                    </Badge>
                  </div>
                  
                  <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                    <BarChart3Icon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                    <p className="text-sm text-purple-300/80 mb-1">Pipeline Value</p>
                    <p className="text-2xl font-bold text-purple-200">${(mockData.b2bMetrics.pipelineHealth.value / 1000).toFixed(1)}K</p>
                    <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                      {mockData.b2bMetrics.pipelineHealth.conversion}% conv.
                    </Badge>
                  </div>
                  
                  <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                    <PieChartIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                    <p className="text-sm text-purple-300/80 mb-1">Content Effectiveness</p>
                    <p className="text-2xl font-bold text-purple-200">{mockData.b2bMetrics.contentEffectiveness.score}</p>
                    <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                      +{mockData.b2bMetrics.contentEffectiveness.trend === 'up' ? '3' : '-1'}%
                    </Badge>
                  </div>
                  
                  <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                    <LineChartIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                    <p className="text-sm text-purple-300/80 mb-1">Sales Cycle</p>
                    <p className="text-2xl font-bold text-purple-200">{mockData.b2bMetrics.salesCycle.days} days</p>
                    <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                      {mockData.b2bMetrics.salesCycle.trend === 'down' ? '-5' : '+2'} days
                    </Badge>
                  </div>
                  
                  <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                    <DollarSignIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                    <p className="text-sm text-purple-300/80 mb-1">Avg Deal Size</p>
                    <p className="text-2xl font-bold text-purple-200">${(mockData.b2bMetrics.dealSize.average / 1000).toFixed(1)}K</p>
                    <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                      +{mockData.b2bMetrics.dealSize.trend === 'up' ? '8' : '-3'}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export { AnalyticsDashboard };
export default AnalyticsDashboard;
