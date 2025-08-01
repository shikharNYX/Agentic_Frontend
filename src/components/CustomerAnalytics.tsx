import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  UsersIcon, 
  UserPlusIcon, 
  RefreshCwIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  AlertTriangleIcon
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
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ComposedChart,
  Area
} from 'recharts';

interface CustomerAnalyticsProps {
  dateRange: {
    from: Date;
    to: Date;
  };
  viewMode: 'b2c' | 'b2b';
}

// Mock data matching the screenshots
const customerData = {
  executiveSummary: [
    { 
      label: 'Total Customers', 
      value: '25,890', 
      description: 'Active customer base',
      icon: UsersIcon 
    },
    { 
      label: 'New Customers', 
      value: '8,250', 
      description: 'Total new customer acquisitions',
      icon: UserPlusIcon 
    },
    { 
      label: 'Repeat Customers', 
      value: '17,640', 
      description: 'Returning customer count',
      icon: RefreshCwIcon 
    }
  ],
  customerSplit: [
    { name: 'New Customers', value: 31.9, color: '#7C3AED' },
    { name: 'Repeat Customers', value: 68.1, color: '#4F46E5' }
  ],
  customerDistribution: [
    { age: '18-24', value: 30, distribution: 30.0, growth: -0.5, trend: 'down' },
    { age: '25-34', value: 45, distribution: 45.0, growth: 8.7, trend: 'up' },
    { age: '35-44', value: 15, distribution: 15.0, growth: 5.1, trend: 'up' },
    { age: '45+', value: 10, distribution: 10.0, growth: 9.4, trend: 'up' }
  ],
  cohortRetention: [
    { cohort: 'October 2023', new: 47, spend: 2.4, rev: 4.7, cac: 50, m1: 95.7, m2: 85.1, m3: 76.6, m4: 68.2, m5: 59.8, m6: 51.4 },
    { cohort: 'September 2023', new: 58, spend: 2.9, rev: 5.8, cac: 50, m1: 92.3, m2: 82.7, m3: 73.4, m4: 65.1, m5: 56.9, m6: 48.7 },
    { cohort: 'August 2023', new: 63, spend: 3.1, rev: 12.6, cac: 50, m1: 89.8, m2: 79.5, m3: 70.2, m4: 61.9, m5: 53.7, m6: 45.5 },
    { cohort: 'July 2023', new: 68, spend: 3.4, rev: 13.6, cac: 50, m1: 87.3, m2: 77.1, m3: 67.8, m4: 58.7, m5: 50.5, m6: 42.3 },
    { cohort: 'June 2023', new: 72, spend: 3.6, rev: 14.4, cac: 50, m1: 84.8, m2: 74.7, m3: 65.4, m4: 56.3, m5: 48.1, m6: 39.9 },
    { cohort: 'May 2023', new: 55, spend: 2.8, rev: 11.0, cac: 50, m1: 82.3, m2: 72.3, m3: 63.0, m4: 53.9, m5: 45.7, m6: 37.5 }
  ],
  repeatPurchaseBehavior: [
    { stage: 'First Purchase', percentage: 100.0, customers: 25890, revenue: 4200000, avgOrderValue: 162 },
    { stage: 'Second Purchase', percentage: 45.0, customers: 11650, revenue: 2100000, avgOrderValue: 180 },
    { stage: 'Third+ Purchase', percentage: 28.0, customers: 7249, revenue: 1450000, avgOrderValue: 200 },
    { stage: 'Fourth Purchase', percentage: 18.5, customers: 4790, revenue: 980000, avgOrderValue: 205 },
    { stage: 'Fifth+ Purchase', percentage: 12.3, customers: 3184, revenue: 680000, avgOrderValue: 214 }
  ],
  churnRate: [
    { month: 'Jan', rate: 2.7 },
    { month: 'Feb', rate: 3.0 },
    { month: 'Mar', rate: 2.8 },
    { month: 'Apr', rate: 3.5 },
    { month: 'May', rate: 3.0 },
    { month: 'Jun', rate: 2.7 },
    { month: 'Jul', rate: 2.5 },
    { month: 'Aug', rate: 2.2 }
  ],
  productPerformance: [
    { category: 'Electronics', newCustomers: 2.8, regularCustomers: 4.2, vipCustomers: 6.5 },
    { category: 'Fashion', newCustomers: 3.5, regularCustomers: 5.0, vipCustomers: 4.8 },
    { category: 'Home & Living', newCustomers: 2.0, regularCustomers: 3.8, vipCustomers: 5.2 },
    { category: 'Beauty', newCustomers: 1.5, regularCustomers: 2.8, vipCustomers: 3.5 }
  ],
  cartSizeBySegment: [
    { segment: 'New Customers', cartValue: 170, itemsPerOrder: 2.5 },
    { segment: 'Regular Customers', cartValue: 290, itemsPerOrder: 3.8 },
    { segment: 'VIP Customers', cartValue: 500, itemsPerOrder: 5.5 }
  ],
  financialMetrics: {
    clv: 850,
    cac: 125,
    crc: 45,
    clvCacRatio: 6.8
  },
  cacTrends: [
    { date: 'Jan 5', currentPeriod: 180, previousPeriod: 200, lastMonth: 140, lastYear: 220 },
    { date: 'Jan 15', currentPeriod: 160, previousPeriod: 180, lastMonth: 150, lastYear: 200 },
    { date: 'Jan 25', currentPeriod: 170, previousPeriod: 170, lastMonth: 160, lastYear: 210 },
    { date: 'Feb 1', currentPeriod: 190, previousPeriod: 160, lastMonth: 170, lastYear: 230 },
    { date: 'Feb 10', currentPeriod: 180, previousPeriod: 160, lastMonth: 190, lastYear: 240 }
  ],
  cacByChannel: [
    { channel: 'Organic', percentage: 30, color: '#7C3AED' },
    { channel: 'Paid', percentage: 25, color: '#4F46E5' },
    { channel: 'Email', percentage: 20, color: '#EC4899' },
    { channel: 'Social Media', percentage: 15, color: '#BE185D' },
    { channel: 'Referral', percentage: 10, color: '#F59E0B' }
  ]
};

const CustomerAnalytics: React.FC<CustomerAnalyticsProps> = ({ dateRange, viewMode }) => {
  const [selectedSegment, setSelectedSegment] = useState('demographics');
  const [isCustomerSplitCollapsed, setIsCustomerSplitCollapsed] = useState(false);
  const [isCustomerDistributionCollapsed, setIsCustomerDistributionCollapsed] = useState(false);
  const [isCustomerRetentionCollapsed, setIsCustomerRetentionCollapsed] = useState(false);

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
        {/* Filters removed */}
        {/* Executive Summary - Enhanced */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">
            {viewMode === 'b2b' ? 'Account & Pipeline Analytics' : 'Executive Summary'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerData.executiveSummary.map((metric) => (
              <div key={metric.label} className="relative bg-gradient-to-br from-[#1A0B2E]/80 to-[#2D1B69]/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                {/* Content */}
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <metric.icon className="h-6 w-6 text-purple-300" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{metric.value}</h3>
                  </div>
                  <p className="text-sm font-semibold text-purple-200 tracking-wide mb-2">{metric.label}</p>
                  <p className="text-xs text-purple-300/60">{metric.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* B2B Specific Metrics (shown when B2B mode is selected) */}
        {viewMode === 'b2b' && (
          <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
            <CardHeader>
              <CardTitle className="text-purple-100">B2B Account Metrics</CardTitle>
              <CardDescription className="text-purple-300">
                Enterprise account management and pipeline analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                  <UsersIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                  <p className="text-sm text-purple-300/80 mb-1">Enterprise Accounts</p>
                  <p className="text-2xl font-bold text-purple-200">124</p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                    +8 this month
                  </Badge>
                </div>

                <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                  <TrendingUpIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                  <p className="text-sm text-purple-300/80 mb-1">Pipeline Value</p>
                  <p className="text-2xl font-bold text-purple-200">$2.8M</p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                    +15.2% vs last month
                  </Badge>
                </div>

                <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                  <RefreshCwIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                  <p className="text-sm text-purple-300/80 mb-1">Avg Sales Cycle</p>
                  <p className="text-2xl font-bold text-purple-200">42 days</p>
                  <Badge className="bg-rose-500/20 text-rose-400 mt-2">
                    +3 days vs target
                  </Badge>
                </div>

                <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                  <UserPlusIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                  <p className="text-sm text-purple-300/80 mb-1">Account Health Score</p>
                  <p className="text-2xl font-bold text-purple-200">87%</p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                    Excellent
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* B2C Specific Metrics (shown when B2C mode is selected) */}
        {viewMode === 'b2c' && (
          <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
            <CardHeader>
              <CardTitle className="text-purple-100">B2C Customer Insights</CardTitle>
              <CardDescription className="text-purple-300">
                Consumer behavior and e-commerce analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                  <UsersIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                  <p className="text-sm text-purple-300/80 mb-1">Active Customers</p>
                  <p className="text-2xl font-bold text-purple-200">15.2K</p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                    +12.5% growth
                  </Badge>
                </div>

                <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                  <TrendingUpIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                  <p className="text-sm text-purple-300/80 mb-1">Avg Order Value</p>
                  <p className="text-2xl font-bold text-purple-200">$185</p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                    +8.3% vs last month
                  </Badge>
                </div>

                <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                  <RefreshCwIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                  <p className="text-sm text-purple-300/80 mb-1">Repeat Purchase Rate</p>
                  <p className="text-2xl font-bold text-purple-200">68%</p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                    Above industry avg
                  </Badge>
                </div>

                <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                  <UserPlusIcon className="h-8 w-8 text-purple-300 mx-auto mb-2" />
                  <p className="text-sm text-purple-300/80 mb-1">Customer Satisfaction</p>
                  <p className="text-2xl font-bold text-purple-200">4.7/5</p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 mt-2">
                    Excellent rating
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Customer Split and Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Split - Executive */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#1A0B2E]/90 to-[#2D1B69]/80 backdrop-blur-md rounded-xl border border-purple-500/20">
              {/* Header */}
              <div className="p-6 border-b border-purple-500/20">
                <div className="flex items-center justify-between">
                                     <div className="flex items-center gap-3">
                     <div className="p-2 bg-purple-500/20 rounded-lg">
                       <UsersIcon className="w-6 h-6 text-purple-300" />
                     </div>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">Customer Split</h2>
                      <p className="text-sm text-purple-300/80 mt-1">Distribution of new vs repeat customers</p>
                    </div>
                  </div>
                                     <button
                     onClick={() => setIsCustomerSplitCollapsed(!isCustomerSplitCollapsed)}
                     className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 hover:text-white transition-all duration-200"
                   >
                    {isCustomerSplitCollapsed ? (
                      <ArrowDownIcon className="w-5 h-5" />
                    ) : (
                      <ArrowUpIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Collapsible Content */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isCustomerSplitCollapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'
              }`}>
                <div className="p-6">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={customerData.customerSplit}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {customerData.customerSplit.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(45, 27, 105, 0.95)',
                            border: '1px solid rgba(109, 40, 217, 0.2)',
                            borderRadius: '12px',
                            color: '#E9D5FF',
                            backdropFilter: 'blur(8px)'
                          }}
                          labelStyle={{ color: '#E9D5FF' }}
                          itemStyle={{ color: '#E9D5FF' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-6 mt-4">
                    {customerData.customerSplit.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-purple-300">
                          {item.name} ({item.value}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Subtle glow effect */}
            <div className="absolute -inset-1 rounded-xl bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          </div>

          {/* Customer Distribution - Enhanced */}
          <div className="relative group">
            <div className="bg-gradient-to-br from-[#1A0B2E]/90 to-[#2D1B69]/80 backdrop-blur-md rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              {/* Header */}
              <div className="p-6 border-b border-purple-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors duration-300">
                      <TrendingUpIcon className="w-6 h-6 text-purple-300" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">Customer Distribution</h2>
                      <p className="text-sm text-purple-300/80 mt-1">Breakdown by customer segments and growth</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsCustomerDistributionCollapsed(!isCustomerDistributionCollapsed)}
                    className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 hover:text-white transition-all duration-200 group-hover:scale-105"
                  >
                    {isCustomerDistributionCollapsed ? (
                      <ArrowDownIcon className="w-5 h-5" />
                    ) : (
                      <ArrowUpIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Collapsible Content */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isCustomerDistributionCollapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'
              }`}>
                <div className="p-6">
                  <div className="mb-4">
                    <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                      <SelectTrigger className="w-[200px] bg-[#2D1B69]/30 text-purple-300 border-[#6D28D9]/20">
                        <SelectValue>Demographics</SelectValue>
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A0B2E] border-[#6D28D9]/20">
                        <SelectItem value="demographics" className="text-purple-300">Demographics</SelectItem>
                        <SelectItem value="geographic" className="text-purple-300">Geographic</SelectItem>
                        <SelectItem value="behavioral" className="text-purple-300">Behavioral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    {customerData.customerDistribution.map((item) => (
                      <div key={item.age} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-16 bg-[#2D1B69]/30 h-2 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#6D28D9] to-[#9F5BF0]"
                              style={{ width: `${item.distribution}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-purple-300 w-8">{item.value}</span>
                          <span className="text-sm text-purple-300">{item.age}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-purple-300">{item.distribution}%</span>
                          <div className="flex items-center gap-1">
                            {item.trend === 'up' ? (
                              <TrendingUpIcon className="h-3 w-3 text-emerald-400" />
                            ) : (
                              <TrendingDownIcon className="h-3 w-3 text-rose-400" />
                            )}
                            <span className={`text-xs ${item.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {Math.abs(item.growth)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Subtle glow effect */}
            <div className="absolute -inset-1 rounded-xl bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          </div>
        </div>

        {/* Customer Retention - Enhanced */}
        <div className="relative group">
          <div className="bg-gradient-to-br from-[#1A0B2E]/90 to-[#2D1B69]/80 backdrop-blur-md rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
            {/* Header */}
            <div className="p-6 border-b border-purple-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors duration-300">
                    <RefreshCwIcon className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Customer Retention</h2>
                    <p className="text-sm text-purple-300/80 mt-1">Cohort Retention Analysis</p>
                    <p className="text-xs text-purple-300/60 mt-1">User retention analysis by cohort and month</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCustomerRetentionCollapsed(!isCustomerRetentionCollapsed)}
                  className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 hover:text-white transition-all duration-200 group-hover:scale-105"
                >
                  {isCustomerRetentionCollapsed ? (
                    <ArrowDownIcon className="w-5 h-5" />
                  ) : (
                    <ArrowUpIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Collapsible Content */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isCustomerRetentionCollapsed ? 'max-h-0 opacity-0' : 'max-h-[800px] opacity-100'
            }`}>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-purple-500/20">
                        <th className="text-left py-3 px-4 text-purple-300 font-medium">Cohort</th>
                        <th className="text-right py-3 px-4 text-purple-300 font-medium">New Users</th>
                        <th className="text-right py-3 px-4 text-purple-300 font-medium">Spend</th>
                        <th className="text-right py-3 px-4 text-purple-300 font-medium">Revenue</th>
                        <th className="text-right py-3 px-4 text-purple-300 font-medium">CAC</th>
                        <th className="text-right py-3 px-4 text-purple-300 font-medium">M1</th>
                        <th className="text-right py-3 px-4 text-purple-300 font-medium">M2</th>
                        <th className="text-right py-3 px-4 text-purple-300 font-medium">M3</th>
                        <th className="text-right py-3 px-4 text-purple-300 font-medium">M4</th>
                        <th className="text-right py-3 px-4 text-purple-300 font-medium">M5</th>
                        <th className="text-right py-3 px-4 text-purple-300 font-medium">M6</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerData.cohortRetention.map((cohort, index) => (
                        <tr key={index} className="border-b border-purple-500/10 hover:bg-[#2D1B69]/20 transition-colors duration-200">
                          <td className="py-3 px-4 text-purple-200 font-medium">{cohort.cohort}</td>
                          <td className="py-3 px-4 text-right text-purple-200">{cohort.new}</td>
                          <td className="py-3 px-4 text-right text-purple-200">{formatCurrencyK(cohort.spend)}</td>
                          <td className="py-3 px-4 text-right text-purple-200">{formatCurrencyK(cohort.rev)}</td>
                          <td className="py-3 px-4 text-right text-purple-200">{formatCurrency(cohort.cac)}</td>
                          <td className="py-3 px-4 text-right text-purple-200">{cohort.m1}%</td>
                          <td className="py-3 px-4 text-right text-purple-200">{cohort.m2}%</td>
                          <td className="py-3 px-4 text-right text-purple-200">{cohort.m3}%</td>
                          <td className="py-3 px-4 text-right text-purple-200">{cohort.m4}%</td>
                          <td className="py-3 px-4 text-right text-purple-200">{cohort.m5}%</td>
                          <td className="py-3 px-4 text-right text-purple-200">{cohort.m6}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subtle glow effect */}
          <div className="absolute -inset-1 rounded-xl bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
        </div>

        {/* Repeat Purchase Behavior and Churn Rate */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Repeat Purchase Behavior */}
          <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
            <CardHeader>
              <CardTitle className="text-purple-100">Repeat Purchase Behavior</CardTitle>
              <CardDescription className="text-purple-300">
                Customer purchase frequency and retention analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={customerData.repeatPurchaseBehavior} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.1} />
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: '#E9D5FF', fontSize: 12 }} />
                    <YAxis dataKey="stage" type="category" tick={{ fill: '#E9D5FF', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(45, 27, 105, 0.95)',
                        border: '1px solid rgba(109, 40, 217, 0.2)',
                        borderRadius: '12px',
                        color: '#E9D5FF',
                        backdropFilter: 'blur(8px)'
                      }}
                      labelStyle={{ color: '#E9D5FF' }}
                      itemStyle={{ color: '#E9D5FF' }}
                      formatter={(value, name, props) => [
                        `${value}%`,
                        'Retention Rate'
                      ]}
                      labelFormatter={(label) => `${label} Stage`}
                    />
                    <Bar dataKey="percentage" fill="#7C3AED" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-[#2D1B69]/30 rounded-lg border border-[#6D28D9]/20">
                  <p className="text-sm text-purple-300/80">Total Customers</p>
                  <p className="text-lg font-semibold text-purple-200">25,890</p>
                </div>
                <div className="text-center p-3 bg-[#2D1B69]/30 rounded-lg border border-[#6D28D9]/20">
                  <p className="text-sm text-purple-300/80">Repeat Customers</p>
                  <p className="text-lg font-semibold text-purple-200">11,650</p>
                </div>
                <div className="text-center p-3 bg-[#2D1B69]/30 rounded-lg border border-[#6D28D9]/20">
                  <p className="text-sm text-purple-300/80">Avg Order Value</p>
                  <p className="text-lg font-semibold text-purple-200">$185</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Churn Rate */}
          <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
            <CardHeader>
              <CardTitle className="text-purple-100">Customer Churn Rate</CardTitle>
              <CardDescription className="text-purple-300">
                Monthly customer churn analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={customerData.churnRate}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.1} />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: '#E9D5FF', fontSize: 12 }}
                      axisLine={{ stroke: '#6D28D9' }}
                    />
                    <YAxis 
                      tick={{ fill: '#E9D5FF', fontSize: 12 }}
                      axisLine={{ stroke: '#6D28D9' }}
                      domain={[0, 4]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(45, 27, 105, 0.95)',
                        border: '1px solid rgba(109, 40, 217, 0.2)',
                        borderRadius: '12px',
                        color: '#E9D5FF',
                        backdropFilter: 'blur(8px)'
                      }}
                      labelStyle={{ color: '#E9D5FF' }}
                      itemStyle={{ color: '#E9D5FF' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="#7C3AED" 
                      strokeWidth={2}
                      dot={{ fill: '#7C3AED', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Behavior Insights */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">
            Customer Behavior Insights
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Performance by Customer Segment */}
            <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
              <CardHeader>
                <CardTitle className="text-purple-100">Product Performance by Customer Segment</CardTitle>
                <CardDescription className="text-purple-300">
                  Top selling categories across different customer groups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={customerData.productPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.1} />
                      <XAxis 
                        dataKey="category" 
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
                        labelStyle={{ color: '#E9D5FF' }}
                        itemStyle={{ color: '#E9D5FF' }}
                      />
                      <Bar dataKey="newCustomers" fill="#4F46E5" name="New Customers" />
                      <Bar dataKey="regularCustomers" fill="#7C3AED" name="Regular Customers" />
                      <Bar dataKey="vipCustomers" fill="#BE185D" name="VIP Customers" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Average Cart Size by Segment */}
            <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
              <CardHeader>
                <CardTitle className="text-purple-100">Average Cart Size by Segment</CardTitle>
                <CardDescription className="text-purple-300">
                  Cart value and items per order across customer segments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={customerData.cartSizeBySegment}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.1} />
                      <XAxis 
                        dataKey="segment" 
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
                        labelStyle={{ color: '#E9D5FF' }}
                        itemStyle={{ color: '#E9D5FF' }}
                      />
                      <Bar yAxisId="left" dataKey="cartValue" fill="#4F46E5" name="Cart Value" />
                      <Line yAxisId="right" type="monotone" dataKey="itemsPerOrder" stroke="#BE185D" strokeWidth={2} name="Items per Order" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Customer Financial Metrics */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">
            Customer Financial Metrics
          </h2>
          
          {/* Financial Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-[#2A1A4D]/90 border-[#6D28D9]/30">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-purple-300/80 mb-1">Customer Lifetime Value (CLV)</p>
                <p className="text-2xl font-bold text-purple-200">{formatCurrency(customerData.financialMetrics.clv)}</p>
              </CardContent>
            </Card>
            <Card className="bg-[#2A1A4D]/90 border-[#6D28D9]/30">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-purple-300/80 mb-1">Customer Acquisition Cost (CAC)</p>
                <p className="text-2xl font-bold text-purple-200">{formatCurrency(customerData.financialMetrics.cac)}</p>
              </CardContent>
            </Card>
            <Card className="bg-[#2A1A4D]/90 border-[#6D28D9]/30">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-purple-300/80 mb-1">Customer Retention Cost (CRC)</p>
                <p className="text-2xl font-bold text-purple-200">{formatCurrency(customerData.financialMetrics.crc)}</p>
              </CardContent>
            </Card>
            <Card className="bg-[#2A1A4D]/90 border-[#6D28D9]/30">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-purple-300/80 mb-1">CLV to CAC Ratio (CLV:CAC)</p>
                <p className="text-2xl font-bold text-purple-200">{customerData.financialMetrics.clvCacRatio}x</p>
              </CardContent>
            </Card>
          </div>

          {/* CAC Trends and CAC by Channel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CAC Trends */}
            <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
              <CardHeader>
                <CardTitle className="text-purple-100">Customer Acquisition Cost Trends</CardTitle>
                <CardDescription className="text-purple-300">
                  Monthly CAC analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={customerData.cacTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.1} />
                      <XAxis 
                        dataKey="date" 
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
                        labelStyle={{ color: '#E9D5FF' }}
                        itemStyle={{ color: '#E9D5FF' }}
                      />
                      <Line type="monotone" dataKey="currentPeriod" stroke="#7C3AED" strokeWidth={2} name="Current Period" />
                      <Line type="monotone" dataKey="previousPeriod" stroke="#4F46E5" strokeWidth={2} name="Previous Period" />
                      <Line type="monotone" dataKey="lastMonth" stroke="#EC4899" strokeWidth={2} name="Last Month" />
                      <Line type="monotone" dataKey="lastYear" stroke="#F59E0B" strokeWidth={2} name="Last Year" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* CAC by Channel */}
            <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
              <CardHeader>
                <CardTitle className="text-purple-100">CAC by Channel</CardTitle>
                <CardDescription className="text-purple-300">
                  Distribution across acquisition channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerData.cacByChannel}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="percentage"
                      >
                        {customerData.cacByChannel.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(45, 27, 105, 0.95)',
                          border: '1px solid rgba(109, 40, 217, 0.2)',
                          borderRadius: '12px',
                          color: '#E9D5FF',
                          backdropFilter: 'blur(8px)'
                        }}
                        labelStyle={{ color: '#E9D5FF' }}
                        itemStyle={{ color: '#E9D5FF' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {customerData.cacByChannel.map((item) => (
                    <div key={item.channel} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-purple-300">
                        {item.channel} ({item.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Customer Journey Mapping/Visualization (Both B2B/B2C) */}
        <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
          <CardHeader>
            <CardTitle className="text-purple-100">Customer Journey Mapping</CardTitle>
            <CardDescription className="text-purple-300">
              Understanding customer touchpoints and friction points
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { stage: 'Discovery', touchpoints: viewMode === 'b2b' ? 4 : 3, avgTime: viewMode === 'b2b' ? 3.2 : 2.5, conversion: viewMode === 'b2b' ? 90 : 85 },
                { stage: 'Consideration', touchpoints: viewMode === 'b2b' ? 6 : 5, avgTime: viewMode === 'b2b' ? 12.5 : 7.2, conversion: viewMode === 'b2b' ? 75 : 65 },
                { stage: 'Purchase', touchpoints: viewMode === 'b2b' ? 3 : 2, avgTime: viewMode === 'b2b' ? 2.8 : 1.8, conversion: viewMode === 'b2b' ? 55 : 45 },
                { stage: 'Post-Purchase', touchpoints: viewMode === 'b2b' ? 5 : 4, avgTime: viewMode === 'b2b' ? 4.2 : 3.1, conversion: viewMode === 'b2b' ? 85 : 78 }
              ].map((stage, index) => (
                <div key={index} className="p-4 bg-[#2D1B69]/30 rounded-lg text-center">
                  <h4 className="text-lg font-semibold text-purple-200 mb-2">{stage.stage}</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-purple-300/60">Touchpoints</p>
                      <p className="text-purple-200 font-medium">{stage.touchpoints}</p>
                    </div>
                    <div>
                      <p className="text-purple-300/60">Avg Time (days)</p>
                      <p className="text-purple-200 font-medium">{stage.avgTime}</p>
                    </div>
                    <div>
                      <p className="text-purple-300/60">Conversion Rate</p>
                      <p className="text-purple-200 font-medium">{stage.conversion}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Segmented Audience Insights (Both B2B/B2C) */}
        <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
          <CardHeader>
            <CardTitle className="text-purple-100">Segmented Audience Insights</CardTitle>
            <CardDescription className="text-purple-300">
              Tailored insights for high-LTV, loyal, and churn-risk customer groups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(viewMode === 'b2b' ? [
                { segment: 'Enterprise', size: 150, avgLTV: 25000, retention: 95, growth: 22 },
                { segment: 'Mid-Market', size: 450, avgLTV: 8500, retention: 88, growth: 15 },
                { segment: 'SMB', size: 1200, avgLTV: 2800, retention: 72, growth: 8 },
                { segment: 'Startup', size: 300, avgLTV: 1200, retention: 45, growth: -8 }
              ] : [
                { segment: 'High LTV', size: 2500, avgLTV: 850, retention: 92, growth: 15 },
                { segment: 'Mid LTV', size: 8500, avgLTV: 420, retention: 78, growth: 8 },
                { segment: 'Low LTV', size: 15000, avgLTV: 180, retention: 45, growth: -5 },
                { segment: 'Churn Risk', size: 3200, avgLTV: 95, retention: 25, growth: -12 }
              ]).map((segment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#2D1B69]/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <UsersIcon className="h-6 w-6 text-purple-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-purple-200">{segment.segment}</h4>
                      <p className="text-sm text-purple-300/60">{segment.size} customers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm text-purple-300/60">Avg LTV</p>
                        <p className="text-lg font-semibold text-purple-200">{formatCurrency(segment.avgLTV)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-purple-300/60">Retention</p>
                        <p className="text-lg font-semibold text-purple-200">{segment.retention}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-purple-300/60">Growth</p>
                        <div className="flex items-center gap-1">
                          {segment.growth > 0 ? (
                            <TrendingUpIcon className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <TrendingDownIcon className="h-4 w-4 text-rose-400" />
                          )}
                          <p className={`text-lg font-semibold ${segment.growth > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {segment.growth > 0 ? '+' : ''}{segment.growth}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Advanced Benchmarking & Revenue Growth Rate (Both B2B/B2C) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
            <CardHeader>
              <CardTitle className="text-purple-100">Advanced Benchmarking</CardTitle>
              <CardDescription className="text-purple-300">
                Performance vs historical and peer groups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: 'Industry Average', revenue: viewMode === 'b2b' ? 18.5 : 12.5, retention: viewMode === 'b2b' ? 12.2 : 8.2, cac: viewMode === 'b2b' ? 22.3 : 15.3 },
                  { type: 'Cohort Performance', revenue: viewMode === 'b2b' ? 25.7 : 18.7, retention: viewMode === 'b2b' ? 18.1 : 12.1, cac: viewMode === 'b2b' ? 15.9 : 8.9 },
                  { type: 'Competitors', revenue: viewMode === 'b2b' ? 20.2 : 14.2, retention: viewMode === 'b2b' ? 14.8 : 9.8, cac: viewMode === 'b2b' ? 18.1 : 12.1 }
                ].map((benchmark, index) => (
                  <div key={index} className="p-3 bg-[#2D1B69]/30 rounded-lg">
                    <h4 className="text-sm font-medium text-purple-200 mb-2">{benchmark.type}</h4>
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="text-purple-300/60">Revenue Growth</p>
                        <p className="text-purple-200 font-medium">{benchmark.revenue}%</p>
                      </div>
                      <div>
                        <p className="text-purple-300/60">Retention</p>
                        <p className="text-purple-200 font-medium">{benchmark.retention}%</p>
                      </div>
                      <div>
                        <p className="text-purple-300/60">CAC</p>
                        <p className="text-purple-200 font-medium">${benchmark.cac}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
            <CardHeader>
              <CardTitle className="text-purple-100">Revenue Growth Rate</CardTitle>
              <CardDescription className="text-purple-300">
                Company growth momentum tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={[
                    { month: 'Jan', growth: viewMode === 'b2b' ? 18.5 : 12.5, revenue: viewMode === 'b2b' ? 850000 : 400000 },
                    { month: 'Feb', growth: viewMode === 'b2b' ? 22.2 : 15.2, revenue: viewMode === 'b2b' ? 1037000 : 460000 },
                    { month: 'Mar', growth: viewMode === 'b2b' ? 25.7 : 18.7, revenue: viewMode === 'b2b' ? 1302000 : 545000 },
                    { month: 'Apr', growth: viewMode === 'b2b' ? 28.1 : 22.1, revenue: viewMode === 'b2b' ? 1668000 : 665000 },
                    { month: 'May', growth: viewMode === 'b2b' ? 31.8 : 25.8, revenue: viewMode === 'b2b' ? 2199000 : 835000 },
                    { month: 'Jun', growth: viewMode === 'b2b' ? 34.4 : 28.4, revenue: viewMode === 'b2b' ? 2956000 : 1072000 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.1} />
                    <XAxis 
                      dataKey="month" 
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
                    <Bar yAxisId="left" dataKey="revenue" fill="#7C3AED" name="Revenue" />
                    <Line yAxisId="right" type="monotone" dataKey="growth" stroke="#EC4899" strokeWidth={2} name="Growth Rate %" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Retention & Repeat Purchase Analysis (Both B2B/B2C) */}
        <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
          <CardHeader>
            <CardTitle className="text-purple-100">
              {viewMode === 'b2b' ? 'Account Retention & Expansion' : 'Customer Retention & Repeat Purchase'}
            </CardTitle>
            <CardDescription className="text-purple-300">
              {viewMode === 'b2b' ? 'Account retention and revenue expansion analysis' : 'Customer loyalty and repeat purchase behavior'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                <p className="text-sm text-purple-300/80 mb-1">Overall Retention</p>
                <p className="text-2xl font-bold text-purple-200">{viewMode === 'b2b' ? '88.5' : '78.5'}%</p>
              </div>
              <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                <p className="text-sm text-purple-300/80 mb-1">{viewMode === 'b2b' ? 'Account Expansion' : 'Repeat Purchase Rate'}</p>
                <p className="text-2xl font-bold text-purple-200">{viewMode === 'b2b' ? '65.2' : '45.2'}%</p>
              </div>
              <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                <p className="text-sm text-purple-300/80 mb-1">{viewMode === 'b2b' ? 'New vs Existing' : 'New vs Repeat Ratio'}</p>
                <p className="text-2xl font-bold text-purple-200">{viewMode === 'b2b' ? '75.3' : '65.3'}%</p>
              </div>
              <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                <p className="text-sm text-purple-300/80 mb-1">Avg LTV</p>
                <p className="text-2xl font-bold text-purple-200">{formatCurrency(viewMode === 'b2b' ? 8500 : 650)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Operational Metrics (Both B2B/B2C with B2C specific ones) */}
        <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
          <CardHeader>
            <CardTitle className="text-purple-100">Operational Performance Metrics</CardTitle>
            <CardDescription className="text-purple-300">
              User engagement and operational efficiency indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                <p className="text-sm text-purple-300/80 mb-1">Session Duration</p>
                <p className="text-2xl font-bold text-purple-200">{viewMode === 'b2b' ? '320' : '245'}s</p>
              </div>
              <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                <p className="text-sm text-purple-300/80 mb-1">Bounce Rate</p>
                <p className="text-2xl font-bold text-purple-200">{viewMode === 'b2b' ? '28.5' : '32.5'}%</p>
              </div>
              {viewMode === 'b2c' && (
                <>
                  <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                    <p className="text-sm text-purple-300/80 mb-1">Cart Abandonment</p>
                    <p className="text-2xl font-bold text-purple-200">68.2%</p>
                  </div>
                  <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                    <p className="text-sm text-purple-300/80 mb-1">Return Rate</p>
                    <p className="text-2xl font-bold text-purple-200">8.5%</p>
                  </div>
                  <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                    <p className="text-sm text-purple-300/80 mb-1">Avg Order Value</p>
                    <p className="text-2xl font-bold text-purple-200">$185</p>
                  </div>
                </>
              )}
              {viewMode === 'b2b' && (
                <>
                  <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                    <p className="text-sm text-purple-300/80 mb-1">Demo Completion</p>
                    <p className="text-2xl font-bold text-purple-200">78.5%</p>
                  </div>
                  <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                    <p className="text-sm text-purple-300/80 mb-1">Proposal Accept</p>
                    <p className="text-2xl font-bold text-purple-200">45.2%</p>
                  </div>
                  <div className="text-center p-4 bg-[#2D1B69]/30 rounded-lg">
                    <p className="text-sm text-purple-300/80 mb-1">Avg Deal Size</p>
                    <p className="text-2xl font-bold text-purple-200">$12.5K</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Risk & Alert: Customer Churn Prediction (Both B2B/B2C) */}
        <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
          <CardHeader>
            <CardTitle className="text-purple-100 flex items-center gap-2">
              <AlertTriangleIcon className="h-5 w-5 text-rose-400" />
              Customer Churn Prediction & Risk Alerts
            </CardTitle>
            <CardDescription className="text-purple-300">
              Early warning system for customer retention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Churn Risk Gauge */}
              <div>
                <h4 className="text-lg font-semibold text-purple-200 mb-4">Overall Churn Risk</h4>
                <div className="text-center p-6 bg-[#2D1B69]/30 rounded-lg">
                  <div className="text-6xl font-bold text-purple-200 mb-2">{viewMode === 'b2b' ? '1.8' : '2.8'}%</div>
                  <p className="text-purple-300/80">Monthly Churn Rate</p>
                  <Badge className={`mt-3 ${viewMode === 'b2b' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    {viewMode === 'b2b' ? 'Low Risk' : 'Medium Risk'}
                  </Badge>
                </div>
              </div>

              {/* At-Risk Customers */}
              <div>
                <h4 className="text-lg font-semibold text-purple-200 mb-4">High-Risk {viewMode === 'b2b' ? 'Accounts' : 'Customers'}</h4>
                <div className="space-y-3">
                  {(viewMode === 'b2b' ? [
                    { name: 'TechStart Solutions', risk: 85, value: 25000, lastActivity: '14 days ago' },
                    { name: 'Global Enterprises', risk: 72, value: 45000, lastActivity: '8 days ago' },
                    { name: 'Innovation Hub', risk: 68, value: 18000, lastActivity: '21 days ago' }
                  ] : [
                    { name: 'Premium Segment', risk: 78, value: 850, lastActivity: '12 days ago' },
                    { name: 'Loyal Customers', risk: 65, value: 420, lastActivity: '9 days ago' },
                    { name: 'High-Value Users', risk: 72, value: 650, lastActivity: '18 days ago' }
                  ]).map((customer, index) => (
                    <div key={index} className="p-3 bg-[#2D1B69]/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-purple-200">{customer.name}</h5>
                        <Badge className="bg-rose-500/20 text-rose-400">
                          {customer.risk}% risk
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-purple-300/80">Value: {formatCurrency(customer.value)}</span>
                        <span className="text-purple-300/80">{customer.lastActivity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Forecasting: Revenue & Customer Growth (Both B2B/B2C) */}
        <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
          <CardHeader>
            <CardTitle className="text-purple-100">Revenue & Customer Growth Forecasting</CardTitle>
            <CardDescription className="text-purple-300">
              Business planning and investment decision support
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={[
                  { month: 'Jan', actual: viewMode === 'b2b' ? 850000 : 400000, forecast: viewMode === 'b2b' ? 880000 : 420000, customers: viewMode === 'b2b' ? 150 : 15200, accuracy: 97 },
                  { month: 'Feb', actual: viewMode === 'b2b' ? 920000 : 450000, forecast: viewMode === 'b2b' ? 950000 : 460000, customers: viewMode === 'b2b' ? 168 : 16800, accuracy: 98 },
                  { month: 'Mar', actual: viewMode === 'b2b' ? 980000 : 480000, forecast: viewMode === 'b2b' ? 1020000 : 500000, customers: viewMode === 'b2b' ? 185 : 18200, accuracy: 96 },
                  { month: 'Apr', actual: viewMode === 'b2b' ? 1050000 : 520000, forecast: viewMode === 'b2b' ? 1100000 : 540000, customers: viewMode === 'b2b' ? 198 : 19500, accuracy: 95 },
                  { month: 'May', actual: viewMode === 'b2b' ? 1120000 : 550000, forecast: viewMode === 'b2b' ? 1180000 : 580000, customers: viewMode === 'b2b' ? 215 : 21000, accuracy: 95 },
                  { month: 'Jun', actual: viewMode === 'b2b' ? 1180000 : 580000, forecast: viewMode === 'b2b' ? 1250000 : 620000, customers: viewMode === 'b2b' ? 235 : 22800, accuracy: 94 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.1} />
                  <XAxis 
                    dataKey="month" 
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
                    formatter={(value, name) => [
                      name === 'customers' ? value.toLocaleString() : formatCurrencyK(Number(value)), 
                      name === 'customers' ? 'Customers' : name === 'actual' ? 'Actual Revenue' : 'Forecast Revenue'
                    ]}
                  />
                  <Bar yAxisId="left" dataKey="actual" fill="#7C3AED" name="Actual Revenue" />
                  <Line yAxisId="left" type="monotone" dataKey="forecast" stroke="#EC4899" strokeWidth={2} name="Forecast Revenue" />
                  <Line yAxisId="right" type="monotone" dataKey="customers" stroke="#F59E0B" strokeWidth={2} name="Customer Count" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* B2B-Specific: Account-Based Marketing (ABM) & Decision Maker Scoring (B2B Only) */}
        {viewMode === 'b2b' && (
          <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
            <CardHeader>
              <CardTitle className="text-purple-100">Account-Based Marketing & Decision Maker Engagement</CardTitle>
              <CardDescription className="text-purple-300">
                Key metrics for long-cycle B2B sales engagement and decision maker analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ABM Performance */}
                <div>
                  <h4 className="text-lg font-semibold text-purple-200 mb-4">ABM Campaign Performance</h4>
                  <div className="space-y-3">
                    {[
                      { campaign: 'Enterprise Tech ABM', accounts: 25, engagement: 92, pipeline: 450000, status: 'active' },
                      { campaign: 'Healthcare ABM', accounts: 18, engagement: 78, pipeline: 280000, status: 'active' },
                      { campaign: 'Financial Services ABM', accounts: 15, engagement: 85, pipeline: 320000, status: 'paused' },
                      { campaign: 'Manufacturing ABM', accounts: 12, engagement: 64, pipeline: 150000, status: 'active' }
                    ].map((campaign, index) => (
                      <div key={index} className="p-4 bg-[#2D1B69]/30 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-medium text-purple-200">{campaign.campaign}</h5>
                          <Badge className={`${
                            campaign.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {campaign.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-purple-300/60">Target Accounts</p>
                            <p className="text-purple-200 font-medium">{campaign.accounts}</p>
                          </div>
                          <div>
                            <p className="text-purple-300/60">Engagement</p>
                            <p className="text-purple-200 font-medium">{campaign.engagement}%</p>
                          </div>
                          <div>
                            <p className="text-purple-300/60">Pipeline</p>
                            <p className="text-purple-200 font-medium">{formatCurrencyK(campaign.pipeline)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decision Maker Scoring */}
                <div>
                  <h4 className="text-lg font-semibold text-purple-200 mb-4">Decision Maker Engagement Scores</h4>
                  <div className="space-y-3">
                    {[
                      { contact: 'Sarah Chen, CTO', company: 'TechCorp', score: 94, role: 'decision-maker', lastEngagement: '2 days ago' },
                      { contact: 'Michael Rodriguez, VP Sales', company: 'GlobalTech', score: 87, role: 'influencer', lastEngagement: '1 week ago' },
                      { contact: 'Jennifer Kim, CFO', company: 'InnovateCorp', score: 91, role: 'decision-maker', lastEngagement: '4 days ago' },
                      { contact: 'David Thompson, IT Director', company: 'EnterpriseInc', score: 76, role: 'user', lastEngagement: '3 days ago' }
                    ].map((contact, index) => (
                      <div key={index} className="p-4 bg-[#2D1B69]/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h5 className="font-medium text-purple-200">{contact.contact}</h5>
                            <p className="text-xs text-purple-300/60">{contact.company}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={`${
                              contact.score >= 90 ? 'bg-emerald-500/20 text-emerald-400' :
                              contact.score >= 80 ? 'bg-amber-500/20 text-amber-400' :
                              'bg-rose-500/20 text-rose-400'
                            }`}>
                              {contact.score} score
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-purple-300/80 capitalize">{contact.role.replace('-', ' ')}</span>
                          <span className="text-purple-300/80">{contact.lastEngagement}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
};

export default CustomerAnalytics; 