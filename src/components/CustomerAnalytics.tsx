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
  ArrowDownIcon
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
      </div>
    </div>
  );
};

export default CustomerAnalytics; 