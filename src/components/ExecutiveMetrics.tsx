import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSignIcon, 
  TrendingUpIcon, 
  TrendingDownIcon,
  TargetIcon,
  BarChart3Icon,
  UsersIcon,
  UserPlusIcon,
  GlobeIcon,
  AwardIcon,
  ShoppingCartIcon,
  EyeIcon,
  MousePointerClickIcon,
  RepeatIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  BuildingIcon,
  UserIcon,
  BriefcaseIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  PieChartIcon,
  BarChartIcon,
  LineChartIcon,
  FilterIcon,
  MapIcon,
  Users2Icon,
  ShoppingBagIcon,
  CreditCardIcon,
  HeartIcon,
  StarIcon,
  MessageSquareIcon,
  BellIcon,
  MonitorIcon,
  SmartphoneIcon,
  TabletIcon,
  Building2Icon,
  FileTextIcon,
  VideoIcon,
  ImageIcon,
  LayersIcon,
  ZapIcon,
  ShieldIcon,
  ActivityIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon,
  DownloadIcon,
  SearchIcon,
  X as XIcon,
  LinkIcon,
  PackageIcon,
  RefreshCwIcon
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
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  FunnelChart as RechartsFunnelChart,
  Funnel,
  Legend
} from 'recharts';

// Currency Configuration
const CURRENCY_CONFIG = {
  code: 'INR',
  symbol: '₹',
  name: 'Indian Rupee',
  locale: 'en-IN'
};

// Currency formatting utility functions
const formatCurrency = (amount: number | string, options?: { 
  compact?: boolean; 
  decimals?: number;
  showSymbol?: boolean;
}) => {
  const { compact = false, decimals = 0, showSymbol = true } = options || {};
  
  const numAmount = typeof amount === 'string' ? parseFloat(amount.replace(/[^\d.-]/g, '')) : amount;
  
  if (compact) {
    const formatter = new Intl.NumberFormat(CURRENCY_CONFIG.locale, {
      style: 'currency',
      currency: CURRENCY_CONFIG.code,
      notation: 'compact',
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals
    });
    return formatter.format(numAmount);
  }
  
  const formatter = new Intl.NumberFormat(CURRENCY_CONFIG.locale, {
    style: showSymbol ? 'currency' : 'decimal',
    currency: CURRENCY_CONFIG.code,
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  });
  
  return formatter.format(numAmount);
};

const formatCurrencyValue = (value: string, options?: { 
  compact?: boolean; 
  decimals?: number;
  showSymbol?: boolean;
}) => {
  // Extract numeric value from strings like "$8.7M", "₹569", "3.2M AED"
  const numericMatch = value.match(/[\d.,]+/);
  if (!numericMatch) return value;
  
  let numericValue = parseFloat(numericMatch[0].replace(/,/g, ''));
  
  // Handle multipliers (K, M, B)
  if (value.includes('K') || value.includes('k')) {
    numericValue *= 1000;
  } else if (value.includes('M') || value.includes('m')) {
    numericValue *= 1000000;
  } else if (value.includes('B') || value.includes('b')) {
    numericValue *= 1000000000;
  }
  
  return formatCurrency(numericValue, options);
};

interface ExecutiveMetricsProps {
  dateRange: {
    from: Date;
    to: Date;
  };
}

type CustomerType = 'b2c' | 'b2b';

// Metric interface for type safety
interface Metric {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
}

interface MetricSection {
  id: string;
  title: string;
  description: string;
  icon: any;
  layout: 'grid' | 'list' | 'chart';
  gridCols?: number;
  metrics: Metric[];
  customerTypes: CustomerType[];
  order: number;
}

interface ChartData {
  stage: string;
  value: number;
}

interface CampaignData {
  name: string;
  performance: string;
  spend: number;
  roi: number;
  creativeType: string;
}

interface CustomerSuccessData {
  healthScore: number;
  nps: number;
  csat: number;
}

// Configuration-driven approach
const metricSections: MetricSection[] = [
  // 1. EXECUTIVE SUMMARY - Key Business KPIs (Always first)
  {
    id: 'executive-summary',
    title: 'Executive Summary',
    description: 'Critical business performance indicators at a glance',
    icon: TargetIcon,
    layout: 'grid',
    gridCols: 4,
    order: 1,
    customerTypes: ['b2c', 'b2b'],
    metrics: [
      { label: 'Total Revenue', value: '₹8.7M', change: 18.3, trend: 'up', icon: DollarSignIcon },
      { label: 'Total Spend', value: '₹2.4M', change: 12.5, trend: 'up', icon: DollarSignIcon },
      { label: 'ROI', value: '3.6x', change: 5.2, trend: 'up', icon: TrendingUpIcon },
      { label: 'Total Conversions', value: '12.4K', change: 22.1, trend: 'up', icon: TargetIcon },
      { label: 'CPC', value: '₹2.69', change: -3.2, trend: 'down', icon: DollarSignIcon },
      { label: 'CPM', value: '₹53.10', change: -1.8, trend: 'down', icon: DollarSignIcon },
      { label: 'CPConv', value: '₹193.55', change: -7.8, trend: 'down', icon: DollarSignIcon },
      { label: 'Total Customers', value: '45.2K', change: 15.7, trend: 'up', icon: UsersIcon }
    ]
  },

  // 2. REVENUE & GROWTH PERFORMANCE (Executive Priority)
  {
    id: 'revenue-growth-performance',
    title: 'Revenue & Growth Performance',
    description: 'Revenue metrics, growth rates, and market expansion indicators',
    icon: TrendingUpIcon,
    layout: 'grid',
    gridCols: 4,
    order: 2,
    customerTypes: ['b2c'],
    metrics: [
      { label: 'Daily GMV', value: '₹3.2M', change: 52.2, trend: 'up', icon: DollarSignIcon },
      { label: 'MTD GMV', value: '₹59.6M', change: 45.2, trend: 'up', icon: DollarSignIcon },
      { label: 'Revenue Growth Rate', value: '18.3%', change: 5.2, trend: 'up', icon: TrendingUpIcon },
      { label: 'Market Share', value: '12.4%', change: 2.1, trend: 'up', icon: PieChartIcon },
      { label: 'Customer Growth Rate', value: '15.7%', change: 3.8, trend: 'up', icon: UserPlusIcon },
      { label: 'Revenue per Customer', value: '₹192', change: 8.9, trend: 'up', icon: DollarSignIcon },
      { label: 'AOV Growth', value: '12.7%', change: 2.3, trend: 'up', icon: ShoppingCartIcon },
      { label: 'Revenue Efficiency Score', value: '8.7/10', change: 1.2, trend: 'up', icon: StarIcon }
    ]
  },

  // 3. OPERATIONAL EFFICIENCY (Executive Priority)
  {
    id: 'operational-efficiency',
    title: 'Operational Efficiency',
    description: 'Cost management, efficiency metrics, and operational performance',
    icon: ActivityIcon,
    layout: 'grid',
    gridCols: 4,
    order: 3,
    customerTypes: ['b2c'],
    metrics: [
      { label: 'Overall CIR', value: '20%', change: 2.0, trend: 'up', icon: PieChartIcon },
      { label: 'Overall CPO', value: '₹31', change: -5.2, trend: 'down', icon: DollarSignIcon },
      { label: 'Overall CAC', value: '₹51', change: -8.7, trend: 'down', icon: DollarSignIcon },
      { label: 'Budget Utilization', value: '126%', change: 8.7, trend: 'up', icon: TargetIcon },
      { label: 'Marketing Efficiency Ratio', value: '3.6x', change: 0.4, trend: 'up', icon: TrendingUpIcon },
      { label: 'Cost per Acquisition', value: '₹53.10', change: -8.2, trend: 'down', icon: DollarSignIcon },
      { label: 'Operational Margin', value: '78%', change: 5.3, trend: 'up', icon: BarChartIcon },
      { label: 'Efficiency Score', value: '8.9/10', change: 0.8, trend: 'up', icon: StarIcon }
    ]
  },

  // 4. CUSTOMER ACQUISITION & RETENTION (Executive Priority)
  {
    id: 'customer-acquisition-retention',
    title: 'Customer Acquisition & Retention',
    description: 'Customer lifecycle metrics, acquisition costs, and retention strategies',
    icon: UserPlusIcon,
    layout: 'grid',
    gridCols: 4,
    order: 4,
    customerTypes: ['b2c'],
    metrics: [
      { label: 'New Customers (63%)', value: '3,291', change: 56.2, trend: 'up', icon: UserPlusIcon },
      { label: 'Repeat Customers (31%)', value: '1,619', change: 51.3, trend: 'up', icon: RepeatIcon },
      { label: 'Customer Retention Rate', value: '78%', change: 5.3, trend: 'up', icon: RepeatIcon },
      { label: 'Customer Churn Rate', value: '2.1%', change: -12.5, trend: 'down', icon: TrendingDownIcon },
      { label: 'CLV', value: '₹2.1K', change: 12.7, trend: 'up', icon: UsersIcon },
      { label: 'CLV/CAC Ratio', value: '39.5x', change: 18.9, trend: 'up', icon: TrendingUpIcon },
      { label: 'Repeat Purchase Rate', value: '45%', change: 8.7, trend: 'up', icon: ShoppingCartIcon },
      { label: 'Customer Lifetime Value', value: '₹2.1K', change: 12.7, trend: 'up', icon: UsersIcon }
    ]
  },

  // 5. SALES & CONVERSION PERFORMANCE (Executive Priority)
  {
    id: 'sales-conversion-performance',
    title: 'Sales & Conversion Performance',
    description: 'Sales metrics, conversion rates, and revenue attribution',
    icon: BarChart3Icon,
    layout: 'grid',
    gridCols: 4,
    order: 5,
    customerTypes: ['b2c'],
    metrics: [
      { label: 'Daily Orders', value: '5,624', change: 47.6, trend: 'up', icon: ShoppingCartIcon },
      { label: 'MTD Orders', value: '103.1K', change: 42.8, trend: 'up', icon: ShoppingCartIcon },
      { label: 'Conversion Rate', value: '2.8%', change: 15.7, trend: 'up', icon: TargetIcon },
      { label: 'Cart Abandonment Rate', value: '23%', change: -8.7, trend: 'down', icon: ShoppingCartIcon },
      { label: 'Checkout Rate', value: '77%', change: 12.3, trend: 'up', icon: CreditCardIcon },
      { label: 'Units Sold', value: '12.4K', change: 18.7, trend: 'up', icon: ShoppingCartIcon },
      { label: 'Sales Velocity', value: '₹45.2K', change: 15.7, trend: 'up', icon: TrendingUpIcon },
      { label: 'March Target Achievement', value: '87%', change: 5.3, trend: 'up', icon: TargetIcon }
    ]
  },

  // 6. PLATFORM & CHANNEL PERFORMANCE (Executive Priority)
  {
    id: 'platform-channel-performance',
    title: 'Platform & Channel Performance',
    description: 'Performance across advertising platforms and marketing channels',
    icon: GlobeIcon,
    layout: 'grid',
    gridCols: 4,
    order: 6,
    customerTypes: ['b2c'],
    metrics: [
      { label: 'Facebook ROI', value: '3.8x', change: 8.9, trend: 'up', icon: TrendingUpIcon },
      { label: 'Google Ads ROI', value: '4.2x', change: 12.3, trend: 'up', icon: TrendingUpIcon },
      { label: 'TikTok ROI', value: '2.9x', change: 18.7, trend: 'up', icon: TrendingUpIcon },
      { label: 'Platform Efficiency Score', value: '8.7/10', change: 5.2, trend: 'up', icon: StarIcon },
      { label: 'Paid Traffic (60%)', value: '245.1K', change: 18.9, trend: 'up', icon: DollarSignIcon },
      { label: 'Organic Traffic (37%)', value: '151.1K', change: 42.1, trend: 'up', icon: SearchIcon },
      { label: 'Paid CIR', value: '41%', change: 3.2, trend: 'up', icon: PieChartIcon },
      { label: 'Channel Attribution Score', value: '9.1/10', change: 2.3, trend: 'up', icon: StarIcon }
    ]
  },

  // 7. TRAFFIC & USER ENGAGEMENT (Operational)
  {
    id: 'traffic-user-engagement',
    title: 'Traffic & User Engagement',
    description: 'User acquisition, engagement metrics, and session analysis',
    icon: EyeIcon,
    layout: 'grid',
    gridCols: 4,
    order: 7,
    customerTypes: ['b2c'],
    metrics: [
      { label: 'Daily Users', value: '326.8K', change: 25.9, trend: 'up', icon: UsersIcon },
      { label: 'Daily Sessions', value: '408.5K', change: 26.8, trend: 'up', icon: ActivityIcon },
      { label: 'Daily GVs', value: '707K', change: 33.7, trend: 'up', icon: EyeIcon },
      { label: 'Daily Installs', value: '70.3K', change: 8.2, trend: 'up', icon: DownloadIcon },
      { label: 'Sessions per User', value: '1.3', change: 0.7, trend: 'up', icon: BarChartIcon },
      { label: 'Time on Site', value: '4m 32s', change: 12.5, trend: 'up', icon: ClockIcon },
      { label: 'Pages per Session', value: '3.2', change: 8.9, trend: 'up', icon: FileTextIcon },
      { label: 'Bounce Rate', value: '32%', change: -8.3, trend: 'down', icon: TrendingDownIcon }
    ]
  },

  // 8. E-COMMERCE PERFORMANCE (Operational)
  {
    id: 'ecommerce-performance',
    title: 'E-commerce Performance',
    description: 'Shopping behavior, product performance, and conversion metrics',
    icon: ShoppingBagIcon,
    layout: 'grid',
    gridCols: 4,
    order: 8,
    customerTypes: ['b2c'],
    metrics: [
      { label: 'Return Rate', value: '4.2%', change: -15.8, trend: 'down', icon: ArrowDownIcon },
      { label: 'Mobile Sales', value: '68%', change: 15.7, trend: 'up', icon: SmartphoneIcon },
      { label: 'Desktop Sales', value: '28%', change: -5.2, trend: 'down', icon: MonitorIcon },
      { label: 'Tablet Sales', value: '4%', change: -2.1, trend: 'down', icon: TabletIcon },
      { label: 'Product Performance Score', value: '8.7/10', change: 3.2, trend: 'up', icon: StarIcon },
      { label: 'Inventory Turnover', value: '12.4x', change: 8.7, trend: 'up', icon: RefreshCwIcon },
      { label: 'Average Order Value', value: '₹701', change: 12.7, trend: 'up', icon: ShoppingCartIcon },
      { label: 'Cross-sell Rate', value: '23%', change: 5.8, trend: 'up', icon: ShoppingBagIcon }
    ]
  },

  // 9. ENGAGEMENT & RETENTION (Operational)
  {
    id: 'engagement-retention',
    title: 'Engagement & Retention',
    description: 'Customer engagement, social media, and loyalty metrics',
    icon: ActivityIcon,
    layout: 'grid',
    gridCols: 4,
    order: 9,
    customerTypes: ['b2c'],
    metrics: [
      { label: 'Social Media Engagement', value: '12.4K', change: 15.3, trend: 'up', icon: HeartIcon },
      { label: 'Push Notification CTR', value: '8.7%', change: 12.5, trend: 'up', icon: BellIcon },
      { label: 'Email Open Rate', value: '24.8%', change: 3.2, trend: 'up', icon: MailIcon },
      { label: 'Email Click Rate', value: '3.1%', change: 8.7, trend: 'up', icon: MousePointerClickIcon },
      { label: 'App Sessions', value: '45.2K', change: 22.1, trend: 'up', icon: SmartphoneIcon },
      { label: 'Customer Satisfaction Score', value: '4.6/5', change: 0.2, trend: 'up', icon: StarIcon },
      { label: 'Net Promoter Score', value: '72', change: 8.9, trend: 'up', icon: MessageSquareIcon },
      { label: 'Customer Health Score', value: '87/100', change: 5.3, trend: 'up', icon: ActivityIcon }
    ]
  },

  // 10. REVENUE & ATTRIBUTION (Analytical)
  {
    id: 'revenue-attribution',
    title: 'Revenue & Attribution',
    description: 'Revenue breakdown by platform and attribution analysis',
    icon: PieChartIcon,
    layout: 'grid',
    gridCols: 4,
    order: 10,
    customerTypes: ['b2c'],
    metrics: [
      { label: 'E-commerce Revenue', value: '65%', change: 5.2, trend: 'up', icon: ShoppingCartIcon },
      { label: 'Quick Commerce Revenue', value: '20%', change: 15.7, trend: 'up', icon: ZapIcon },
      { label: 'DT2 Website Revenue', value: '12%', change: -2.1, trend: 'down', icon: GlobeIcon },
      { label: 'Offline Channel Revenue', value: '3%', change: -8.7, trend: 'down', icon: BuildingIcon },
      { label: 'First Click Attribution', value: '35%', change: 2.1, trend: 'up', icon: MousePointerClickIcon },
      { label: 'Last Click Attribution', value: '45%', change: -1.8, trend: 'down', icon: TargetIcon },
      { label: 'Linear Attribution', value: '15%', change: 0.5, trend: 'stable', icon: BarChartIcon },
      { label: 'Data-Driven Attribution', value: '5%', change: 8.9, trend: 'up', icon: ActivityIcon }
    ]
  },

  // 11. BUDGET & FORECASTING (Analytical)
  {
    id: 'budget-forecasting',
    title: 'Budget & Forecasting',
    description: 'Budget utilization, pacing, and predictive analytics',
    icon: DollarSignIcon,
    layout: 'grid',
    gridCols: 4,
    order: 11,
    customerTypes: ['b2c'],
    metrics: [
      { label: 'Burn Rate', value: '2.1%', change: -0.8, trend: 'down', icon: TrendingDownIcon },
      { label: 'Budget vs Performance', value: '105%', change: 8.7, trend: 'up', icon: TargetIcon },
      { label: '30-Day Forecast Revenue', value: '₹2.8M', change: 12.5, trend: 'up', icon: TrendingUpIcon },
      { label: '60-Day Forecast Revenue', value: '₹5.2M', change: 15.7, trend: 'up', icon: TrendingUpIcon },
      { label: 'Predicted ROI', value: '3.8x', change: 5.2, trend: 'up', icon: BarChartIcon },
      { label: 'Risk Score', value: 'Low', change: -15.3, trend: 'down', icon: ShieldIcon },
      { label: 'Anomaly Alerts', value: '2', change: -5.7, trend: 'down', icon: AlertTriangleIcon },
      { label: 'Forecast Accuracy', value: '94%', change: 2.1, trend: 'up', icon: TargetIcon }
    ]
  },

  // 12. AUDIENCE INSIGHTS (Analytical)
  {
    id: 'audience-insights',
    title: 'Audience Insights',
    description: 'Demographics, device usage, and interest segment analysis',
    icon: UsersIcon,
    layout: 'grid',
    gridCols: 4,
    order: 12,
    customerTypes: ['b2c'],
    metrics: [
      { label: 'Female Conversion Rate', value: '2.8%', change: 12.5, trend: 'up', icon: UserIcon },
      { label: 'Male Conversion Rate', value: '2.1%', change: 8.7, trend: 'up', icon: UserIcon },
      { label: '18-24 Age Group ROI', value: '2.8x', change: 15.3, trend: 'up', icon: TrendingUpIcon },
      { label: '25-34 Age Group ROI', value: '4.2x', change: 8.9, trend: 'up', icon: TrendingUpIcon },
      { label: 'Mobile CAC', value: '₹45.20', change: -8.7, trend: 'down', icon: SmartphoneIcon },
      { label: 'Desktop CAC', value: '₹67.80', change: -5.2, trend: 'down', icon: MonitorIcon },
      { label: 'High-Interest Segment ROI', value: '5.8x', change: 22.1, trend: 'up', icon: StarIcon },
      { label: 'New Interest Segment CAC', value: '₹89.50', change: 12.3, trend: 'up', icon: UserPlusIcon }
    ]
  },

  // 13. CREATIVE PERFORMANCE (Analytical)
  {
    id: 'creative-performance',
    title: 'Creative Performance',
    description: 'Performance by creative type and format analysis',
    icon: ImageIcon,
    layout: 'grid',
    gridCols: 4,
    order: 13,
    customerTypes: ['b2c'],
    metrics: [
      { label: 'Video CTR', value: '2.8%', change: 15.7, trend: 'up', icon: VideoIcon },
      { label: 'Image CTR', value: '1.9%', change: 8.7, trend: 'up', icon: ImageIcon },
      { label: 'Carousel CTR', value: '2.1%', change: 12.3, trend: 'up', icon: LayersIcon },
      { label: 'Text Ad CTR', value: '1.2%', change: -2.1, trend: 'down', icon: FileTextIcon },
      { label: 'Video ROI', value: '4.2x', change: 18.9, trend: 'up', icon: VideoIcon },
      { label: 'Image ROI', value: '3.1x', change: 8.7, trend: 'up', icon: ImageIcon },
      { label: 'Carousel ROI', value: '3.8x', change: 12.5, trend: 'up', icon: LayersIcon },
      { label: 'Creative Fatigue Score', value: 'Low', change: -15.3, trend: 'down', icon: AlertTriangleIcon }
    ]
  },

  // B2B EXECUTIVE PRIORITY SECTIONS (order 1-6)
  {
    id: 'b2b-overall-summary',
    title: 'B2B Overall Summary',
    description: 'Key marketing and sales KPIs for B2B performance',
    icon: BuildingIcon,
    layout: 'grid',
    gridCols: 4,
    order: 1,
    customerTypes: ['b2b'],
    metrics: [
      { label: 'Total Spend', value: '$125K', change: 12.5, trend: 'up', icon: DollarSignIcon },
      { label: 'MQLs Generated', value: '1,250', change: 8.3, trend: 'up', icon: UsersIcon },
      { label: 'SQLs Generated', value: '440', change: 15.2, trend: 'up', icon: UserPlusIcon },
      { label: 'Revenue Generated', value: '$850K', change: 18.5, trend: 'up', icon: TrendingUpIcon },
      { label: 'Cost per Lead', value: '$100', change: -3.2, trend: 'down', icon: TargetIcon },
      { label: 'Cost per SQL', value: '$284', change: -5.8, trend: 'down', icon: TargetIcon },
      { label: 'ROI', value: '6.8x', change: 12.3, trend: 'up', icon: BarChart3Icon },
      { label: 'Deal Win Rate', value: '32%', change: 5.7, trend: 'up', icon: AwardIcon }
    ]
  },
  {
    id: 'b2b-platform-performance',
    title: 'B2B Platform Performance',
    description: 'Channel-wise performance across B2B marketing platforms',
    icon: GlobeIcon,
    layout: 'grid',
    gridCols: 4,
    order: 2,
    customerTypes: ['b2b'],
    metrics: [
      { label: 'LinkedIn ROI', value: '4.2x', change: 8.9, trend: 'up', icon: TrendingUpIcon },
      { label: 'Google Ads ROI', value: '3.8x', change: 12.3, trend: 'up', icon: TrendingUpIcon },
      { label: 'Email ROI', value: '5.6x', change: 18.7, trend: 'up', icon: MailIcon },
      { label: 'Webinar ROI', value: '7.2x', change: 25.3, trend: 'up', icon: VideoIcon },
      { label: 'LinkedIn CPL', value: '$85', change: -5.2, trend: 'down', icon: DollarSignIcon },
      { label: 'Google Ads CPL', value: '$120', change: -8.7, trend: 'down', icon: DollarSignIcon },
      { label: 'Email CPL', value: '$45', change: -12.1, trend: 'down', icon: DollarSignIcon },
      { label: 'Platform Efficiency', value: '8.7/10', change: 5.2, trend: 'up', icon: StarIcon }
    ]
  },
  {
    id: 'b2b-campaign-funnel',
    title: 'B2B Campaign Funnel',
    description: 'MQL to Closed Won conversion funnel analysis',
    icon: BarChart3Icon,
    layout: 'grid',
    gridCols: 4,
    order: 3,
    customerTypes: ['b2b'],
    metrics: [
      { label: 'MQL to SQL Rate', value: '35.2%', change: 5.1, trend: 'up', icon: TargetIcon },
      { label: 'SQL to Opportunity', value: '50%', change: 8.7, trend: 'up', icon: TargetIcon },
      { label: 'Opportunity to Close', value: '32%', change: 3.2, trend: 'up', icon: TargetIcon },
      { label: 'Overall Conversion', value: '5.6%', change: 12.5, trend: 'up', icon: TargetIcon },
      { label: 'Funnel Velocity', value: '45 days', change: -8.3, trend: 'down', icon: ClockIcon },
      { label: 'Lead Quality Score', value: '7.2/10', change: 2.1, trend: 'up', icon: StarIcon },
      { label: 'Pipeline Coverage', value: '3.2x', change: 15.7, trend: 'up', icon: BarChartIcon },
      { label: 'Funnel Efficiency', value: '8.4/10', change: 4.3, trend: 'up', icon: ActivityIcon }
    ]
  },

  // B2B OPERATIONAL SECTIONS (order 7-9)
  {
    id: 'b2b-pipeline-contribution',
    title: 'B2B Pipeline Contribution',
    description: 'Pipeline value influenced by marketing campaigns',
    icon: BarChartIcon,
    layout: 'grid',
    gridCols: 4,
    order: 7,
    customerTypes: ['b2b'],
    metrics: [
      { label: 'Pipeline Value', value: '$2.4M', change: 22.1, trend: 'up', icon: BarChart3Icon },
      { label: 'Marketing Sourced', value: '45%', change: 8.7, trend: 'up', icon: TargetIcon },
      { label: 'Marketing Influenced', value: '78%', change: 12.3, trend: 'up', icon: TrendingUpIcon },
      { label: 'Avg Deal Size', value: '$8.7K', change: 15.7, trend: 'up', icon: DollarSignIcon },
      { label: 'Pipeline Velocity', value: '$45.2K', change: 18.9, trend: 'up', icon: TrendingUpIcon },
      { label: 'Win Rate', value: '32%', change: 5.2, trend: 'up', icon: AwardIcon },
      { label: 'Sales Cycle Length', value: '67 days', change: -8.7, trend: 'down', icon: ClockIcon },
      { label: 'Pipeline Health', value: '8.9/10', change: 3.1, trend: 'up', icon: ActivityIcon }
    ]
  },
  {
    id: 'b2b-lead-quality',
    title: 'B2B Lead Quality',
    description: 'Lead quality score breakdown and distribution',
    icon: TargetIcon,
    layout: 'grid',
    gridCols: 4,
    order: 8,
    customerTypes: ['b2b'],
    metrics: [
      { label: 'Avg Lead Score', value: '7.2/10', change: 2.1, trend: 'up', icon: StarIcon },
      { label: 'Hot Leads (80+)', value: '156', change: 15.3, trend: 'up', icon: TargetIcon },
      { label: 'Warm Leads (60-79)', value: '289', change: 8.7, trend: 'up', icon: TargetIcon },
      { label: 'Cool Leads (40-59)', value: '445', change: 12.3, trend: 'up', icon: TargetIcon },
      { label: 'Cold Leads (<40)', value: '360', change: -5.2, trend: 'down', icon: TargetIcon },
      { label: 'High Quality %', value: '35.6%', change: 8.9, trend: 'up', icon: TargetIcon },
      { label: 'Conversion Rate', value: '12.4%', change: 15.7, trend: 'up', icon: TargetIcon },
      { label: 'Quality Trend', value: '+2.1', change: 2.1, trend: 'up', icon: TrendingUpIcon }
    ]
  },
  {
    id: 'b2b-account-engagement',
    title: 'B2B Account Engagement',
    description: 'Account penetration and engagement metrics',
    icon: BuildingIcon,
    layout: 'grid',
    gridCols: 4,
    order: 9,
    customerTypes: ['b2b'],
    metrics: [
      { label: 'Active Accounts', value: '1,247', change: 8.9, trend: 'up', icon: BuildingIcon },
      { label: 'Avg Engagement Score', value: '7.8/10', change: 3.2, trend: 'up', icon: ActivityIcon },
      { label: 'Account Penetration', value: '67%', change: 12.5, trend: 'up', icon: TargetIcon },
      { label: 'Multi-touch Accounts', value: '892', change: 18.7, trend: 'up', icon: Users2Icon },
      { label: 'High Engagement %', value: '45.2%', change: 15.3, trend: 'up', icon: TargetIcon },
      { label: 'At Risk Accounts', value: '23', change: -12.1, trend: 'down', icon: AlertTriangleIcon },
      { label: 'Avg Touchpoints', value: '8.7', change: 5.8, trend: 'up', icon: ActivityIcon },
      { label: 'Engagement Trend', value: '+3.2', change: 3.2, trend: 'up', icon: TrendingUpIcon }
    ]
  },

  // B2B ANALYTICAL SECTIONS (order 10+)
  {
    id: 'b2b-sales-cycle-velocity',
    title: 'B2B Sales Cycle Velocity',
    description: 'Sales cycle analysis and velocity metrics',
    icon: ClockIcon,
    layout: 'grid',
    gridCols: 4,
    order: 10,
    customerTypes: ['b2b'],
    metrics: [
      { label: 'Avg Cycle Time', value: '67 days', change: -8.7, trend: 'down', icon: ClockIcon },
      { label: 'MQL to SQL', value: '12 days', change: -15.3, trend: 'down', icon: ClockIcon },
      { label: 'SQL to Opportunity', value: '23 days', change: -8.9, trend: 'down', icon: ClockIcon },
      { label: 'Opportunity to Close', value: '32 days', change: -5.2, trend: 'down', icon: ClockIcon },
      { label: 'Fast Cycles (≤30)', value: '156', change: 25.3, trend: 'up', icon: TrendingUpIcon },
      { label: 'Normal Cycles (31-60)', value: '289', change: 8.7, trend: 'up', icon: TrendingUpIcon },
      { label: 'Slow Cycles (61-90)', value: '445', change: -12.1, trend: 'down', icon: TrendingDownIcon },
      { label: 'Velocity Score', value: '8.2/10', change: 4.3, trend: 'up', icon: StarIcon }
    ]
  },
  {
    id: 'b2b-risk-alerts',
    title: 'B2B Risk & Anomaly Alerts',
    description: 'Risk monitoring and anomaly detection',
    icon: AlertTriangleIcon,
    layout: 'grid',
    gridCols: 4,
    order: 11,
    customerTypes: ['b2b'],
    metrics: [
      { label: 'Active Alerts', value: '7', change: -12.1, trend: 'down', icon: AlertTriangleIcon },
      { label: 'High Risk', value: '2', change: -25.3, trend: 'down', icon: AlertTriangleIcon },
      { label: 'Medium Risk', value: '3', change: -8.7, trend: 'down', icon: AlertTriangleIcon },
      { label: 'Low Risk', value: '2', change: 15.7, trend: 'up', icon: AlertTriangleIcon },
      { label: 'Avg Response Time', value: '4.2h', change: -18.9, trend: 'down', icon: ClockIcon },
      { label: 'Risk Score', value: 'Low', change: -15.3, trend: 'down', icon: ShieldIcon },
      { label: 'Anomaly Detection', value: '94%', change: 8.7, trend: 'up', icon: ActivityIcon },
      { label: 'Risk Trend', value: '-12.1', change: -12.1, trend: 'down', icon: TrendingDownIcon }
    ]
  },
  {
    id: 'b2b-content-performance',
    title: 'B2B Content Performance',
    description: 'Content marketing and asset performance',
    icon: FileTextIcon,
    layout: 'grid',
    gridCols: 4,
    order: 12,
    customerTypes: ['b2b'],
    metrics: [
      { label: 'Content Downloads', value: '2.4K', change: 18.7, trend: 'up', icon: DownloadIcon },
      { label: 'Webinar Attendance', value: '892', change: 25.3, trend: 'up', icon: VideoIcon },
      { label: 'Whitepaper Views', value: '1.8K', change: 15.7, trend: 'up', icon: FileTextIcon },
      { label: 'Case Study Views', value: '1.2K', change: 22.1, trend: 'up', icon: FileTextIcon },
      { label: 'Content ROI', value: '6.8x', change: 18.9, trend: 'up', icon: TrendingUpIcon },
      { label: 'Lead Generation', value: '445', change: 25.3, trend: 'up', icon: UsersIcon },
      { label: 'Engagement Rate', value: '78%', change: 12.5, trend: 'up', icon: TargetIcon },
      { label: 'Content Score', value: '8.7/10', change: 3.2, trend: 'up', icon: StarIcon }
    ]
  },
  {
    id: 'b2b-abm-metrics',
    title: 'B2B Account-Based Marketing',
    description: 'ABM campaign performance and account targeting',
    icon: TargetIcon,
    layout: 'grid',
    gridCols: 4,
    order: 13,
    customerTypes: ['b2b'],
    metrics: [
      { label: 'Target Accounts', value: '156', change: 8.9, trend: 'up', icon: TargetIcon },
      { label: 'Account Penetration', value: '67%', change: 15.3, trend: 'up', icon: TargetIcon },
      { label: 'Engagement Score', value: '8.2/10', change: 12.5, trend: 'up', icon: StarIcon },
      { label: 'ABM ROI', value: '7.8x', change: 18.7, trend: 'up', icon: TrendingUpIcon },
      { label: 'Multi-touch Accounts', value: '89', change: 25.3, trend: 'up', icon: Users2Icon },
      { label: 'Pipeline Influence', value: '78%', change: 15.7, trend: 'up', icon: TargetIcon },
      { label: 'Account Velocity', value: '45 days', change: -8.7, trend: 'down', icon: ClockIcon },
      { label: 'ABM Efficiency', value: '9.1/10', change: 4.3, trend: 'up', icon: ActivityIcon }
    ]
  }
];

// Utility functions
const getPerformanceColor = (performance: string) => {
  switch (performance) {
    case 'excellent': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'good': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'average': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'poor': return 'bg-red-500/20 text-red-400 border-red-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return <TrendingUpIcon className="w-4 h-4 text-emerald-400" />;
    case 'down': return <TrendingDownIcon className="w-4 h-4 text-red-400" />;
    case 'stable': return <MinusIcon className="w-4 h-4 text-yellow-400" />;
    default: return <MinusIcon className="w-4 h-4 text-gray-400" />;
  }
};

// Reusable Metric Card Component
const MetricCard: React.FC<{ metric: Metric }> = ({ metric }) => {
  const isPositive = metric.change >= 0;
  const isNegative = metric.change < 0;
  
  return (
    <div className="relative group bg-gradient-to-br from-[#1A0B2E]/80 to-[#2D1B69]/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:scale-[1.02]">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Header with icon and title */}
      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors duration-300">
            <metric.icon className="w-5 h-5 text-purple-300" />
          </div>
          <h3 className="text-sm font-semibold text-purple-200 tracking-wide">{metric.label}</h3>
        </div>
      </div>
      
      {/* Main value */}
      <div className="relative mb-3">
        <p className="text-2xl font-bold text-white tracking-tight">{metric.value}</p>
      </div>
      
      {/* Change indicator */}
      <div className="relative flex items-center gap-2">
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          isPositive 
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
            : isNegative 
            ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
            : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
        }`}>
          {getTrendIcon(metric.trend)}
          <span>{Math.abs(metric.change)}%</span>
        </div>
        <span className="text-xs text-purple-400/70">vs previous period</span>
      </div>
      
      {/* Subtle glow effect */}
      <div className={`absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
        isPositive ? 'bg-emerald-500' : isNegative ? 'bg-red-500' : 'bg-purple-500'
      } blur-sm`} />
    </div>
  );
};

// Reusable Section Component
const MetricSection: React.FC<{ 
  section: MetricSection; 
  customerType: CustomerType;
  isCollapsed: boolean;
  onToggle: () => void;
}> = ({ section, customerType, isCollapsed, onToggle }) => {
  if (!section.customerTypes.includes(customerType)) {
    return null;
  }

  const gridColsClass = section.gridCols ? `grid-cols-${section.gridCols}` : 'grid-cols-2';

  return (
    <div className="relative group">
      {/* Section Card */}
      <div className="bg-gradient-to-br from-[#1A0B2E]/90 to-[#2D1B69]/80 backdrop-blur-md rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
        {/* Header */}
        <div className="p-6 border-b border-purple-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors duration-300">
                <section.icon className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">{section.title}</h2>
                <p className="text-sm text-purple-300/80 mt-1">{section.description}</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 hover:text-white transition-all duration-200 group-hover:scale-105"
            >
              {isCollapsed ? (
                <ArrowDownIcon className="w-5 h-5" />
              ) : (
                <ArrowUpIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        
        {/* Collapsible Content */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[2000px] opacity-100'
        }`}>
          <div className="p-6">
            <div className={`grid ${gridColsClass} gap-6`}>
              {section.metrics.map((metric, index) => (
                <MetricCard key={index} metric={metric} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute -inset-1 rounded-xl bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
    </div>
  );
};

// Sample data for charts and additional components
const sampleData = {
  marketingFunnel: [
    { stage: 'Awareness', value: 45000 },
    { stage: 'Consideration', value: 28000 },
    { stage: 'Intent', value: 15000 },
    { stage: 'Purchase', value: 8500 }
  ],
  topCampaigns: [
    { name: 'Summer Sale', performance: 'excellent', spend: 450, roi: 4.2, creativeType: 'Video' },
    { name: 'Brand Awareness', performance: 'good', spend: 320, roi: 3.1, creativeType: 'Image' },
    { name: 'Retargeting', performance: 'excellent', spend: 280, roi: 5.8, creativeType: 'Dynamic' }
  ],
  customerSuccess: {
    healthScore: 87,
    nps: 72,
    csat: 4.6
  }
};

const ExecutiveMetrics: React.FC<ExecutiveMetricsProps> = ({ dateRange }) => {
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('daily');
  const [customerType, setCustomerType] = useState<CustomerType>('b2c');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState('executive');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const toggleSection = (sectionId: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Filter sections based on customer type and sort by order
  const filteredSections = metricSections
    .filter(section => section.customerTypes.includes(customerType))
    .sort((a, b) => a.order - b.order);

  // Group sections by priority for better UX
  const executivePrioritySections = filteredSections.filter(section => 
    section.order <= 6
  );
  const operationalSections = filteredSections.filter(section => 
    section.order > 6 && section.order <= 9
  );
  const analyticalSections = filteredSections.filter(section => 
    section.order > 9
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0B14] via-[#1A0B2E] to-[#0A0B14]">
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
          
          .glass-effect {
            background: rgba(45, 27, 105, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(109, 40, 217, 0.2);
          }
          
          .metric-card-hover {
            transition: all 0.3s ease;
          }
          
          .metric-card-hover:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(109, 40, 217, 0.3);
            border-color: rgba(109, 40, 217, 0.4);
          }
          
          .priority-badge {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(59, 130, 246, 0.2));
            border: 1px solid rgba(16, 185, 129, 0.3);
          }
          
          .operational-badge {
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(236, 72, 153, 0.2));
            border: 1px solid rgba(245, 158, 11, 0.3);
          }
          
          .analytical-badge {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2));
            border: 1px solid rgba(139, 92, 246, 0.3);
          }
        `
      }} />
      
      <div className="max-w-[1800px] mx-auto">
        {/* Modern Executive Header */}
        <div className="sticky top-0 z-50 glass-effect border-b border-[#6D28D9]/20">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 bg-clip-text text-transparent">
                    Executive Command Center
                  </h1>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-2 text-sm text-purple-300">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span>Live Performance Monitoring</span>
                    </div>
                    <span className="text-purple-400">•</span>
                    <span className="text-sm text-purple-300">
                      {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Performance Status */}
                <div className="flex items-center gap-3">
                  <div className="priority-badge px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-emerald-400 font-semibold">Performance: Excellent</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#2D1B69]/40 rounded-lg border border-[#6D28D9]/30">
                    <TrendingUpIcon className="w-4 h-4 text-emerald-400" />
                    <span className="text-purple-200 text-sm font-medium">+18.3% Revenue</span>
                  </div>
                </div>

                {/* View Toggle */}
                <div className="inline-flex rounded-lg bg-[#2D1B69]/40 border border-[#6D28D9]/30 p-1">
                  <Button
                    variant={customerType === 'b2c' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCustomerType('b2c')}
                    className={customerType === 'b2c' 
                      ? 'bg-gradient-to-r from-[#6D28D9] to-[#4F46E5] text-white shadow-lg' 
                      : 'text-purple-300 hover:text-purple-100'
                    }
                  >
                    B2C
                  </Button>
                  <Button
                    variant={customerType === 'b2b' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCustomerType('b2b')}
                    className={customerType === 'b2b' 
                      ? 'bg-gradient-to-r from-[#6D28D9] to-[#4F46E5] text-white shadow-lg' 
                      : 'text-purple-300 hover:text-purple-100'
                    }
                  >
                    B2B
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Filter Navigation */}
        <div className="px-6 py-4 border-b border-[#6D28D9]/20 bg-[#1A0B2E]/50">
          <div className="flex items-center gap-4">
            <span className="text-purple-200 font-medium">View Priority:</span>
            <div className="flex items-center gap-2">
              <Button
                variant={selectedPriority === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPriority('all')}
                className={selectedPriority === 'all' 
                  ? 'bg-gradient-to-r from-[#6D28D9] to-[#4F46E5] text-white' 
                  : 'text-purple-300 hover:text-purple-100'
                }
              >
                All Metrics
              </Button>
              <Button
                variant={selectedPriority === 'executive' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPriority('executive')}
                className={selectedPriority === 'executive' 
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white' 
                  : 'text-purple-300 hover:text-purple-100'
                }
              >
                Executive Priority
              </Button>
              <Button
                variant={selectedPriority === 'operational' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPriority('operational')}
                className={selectedPriority === 'operational' 
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white' 
                  : 'text-purple-300 hover:text-purple-100'
                }
              >
                Operational
              </Button>
              <Button
                variant={selectedPriority === 'analytical' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPriority('analytical')}
                className={selectedPriority === 'analytical' 
                  ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white' 
                  : 'text-purple-300 hover:text-purple-100'
                }
              >
                Analytical
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 space-y-8">
          {/* Executive Summary Section */}
          <div className="space-y-6">
            <ExecutiveSummary />
          </div>

          {/* Executive Priority Section */}
          {(selectedPriority === 'all' || selectedPriority === 'executive') && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="priority-badge px-3 py-1 rounded-lg">
                  <span className="text-emerald-400 font-semibold text-sm">Executive Priority</span>
                </div>
                <h2 className="text-2xl font-bold text-purple-100">Strategic Business Metrics</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {executivePrioritySections.map((section) => (
                  <MetricSection
                    key={section.id}
                    section={section}
                    customerType={customerType}
                    isCollapsed={collapsedSections[section.id] || false}
                    onToggle={() => toggleSection(section.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Operational Section */}
          {(selectedPriority === 'all' || selectedPriority === 'operational') && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="operational-badge px-3 py-1 rounded-lg">
                  <span className="text-amber-400 font-semibold text-sm">Operational Metrics</span>
                </div>
                <h2 className="text-2xl font-bold text-purple-100">Day-to-Day Performance</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {operationalSections.map((section) => (
                  <MetricSection
                    key={section.id}
                    section={section}
                    customerType={customerType}
                    isCollapsed={collapsedSections[section.id] || false}
                    onToggle={() => toggleSection(section.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Analytical Section */}
          {(selectedPriority === 'all' || selectedPriority === 'analytical') && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="analytical-badge px-3 py-1 rounded-lg">
                  <span className="text-purple-400 font-semibold text-sm">Analytical Insights</span>
                </div>
                <h2 className="text-2xl font-bold text-purple-100">Deep Dive Analysis</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {analyticalSections.map((section) => (
                  <MetricSection
                    key={section.id}
                    section={section}
                    customerType={customerType}
                    isCollapsed={collapsedSections[section.id] || false}
                    onToggle={() => toggleSection(section.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Visualizations */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="analytical-badge px-3 py-1 rounded-lg">
                <span className="text-purple-400 font-semibold text-sm">Advanced Analytics</span>
              </div>
              <h2 className="text-2xl font-bold text-purple-100">Strategic Visualizations</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Marketing Funnel Chart */}
              <Card className="glass-effect metric-card-hover">
                <CardHeader>
                  <CardTitle className="text-purple-100 flex items-center gap-2">
                    <BarChart3Icon className="w-6 h-6 text-purple-400" />
                    Marketing Funnel Analysis
                  </CardTitle>
                  <CardDescription className="text-purple-300">
                    Conversion funnel from awareness to repeat customers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sampleData.marketingFunnel}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.2} />
                        <XAxis 
                          dataKey="stage" 
                          stroke="#E9D5FF" 
                          tick={{ fill: '#E9D5FF', fontSize: 12 }}
                        />
                        <YAxis stroke="#E9D5FF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(45, 27, 105, 0.95)',
                            border: '1px solid rgba(109, 40, 217, 0.2)',
                            borderRadius: '12px',
                            color: '#E9D5FF'
                          }}
                        />
                        <defs>
                          <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="#6D28D9" />
                          </linearGradient>
                        </defs>
                        <Bar dataKey="value" fill="url(#purpleGradient)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Success & Campaigns */}
              <Card className="glass-effect metric-card-hover">
                <CardHeader>
                  <CardTitle className="text-purple-100 flex items-center gap-2">
                    <AwardIcon className="w-6 h-6 text-purple-400" />
                    Customer Success & Top Campaigns
                  </CardTitle>
                  <CardDescription className="text-purple-300">
                    Customer satisfaction metrics and top performing campaigns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Customer Success Metrics */}
                    <div>
                      <h4 className="text-lg font-semibold text-purple-200 mb-4 flex items-center gap-2">
                        <AwardIcon className="w-5 h-5 text-purple-400" />
                        Customer Success
                      </h4>
                      <div className="space-y-4">
                        <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-purple-500/20">
                          <p className="text-sm text-purple-300 mb-1">Health Score</p>
                          <p className="text-xl font-bold text-purple-200">{sampleData.customerSuccess.healthScore}/100</p>
                        </div>
                        <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-purple-500/20">
                          <p className="text-sm text-purple-300 mb-1">NPS</p>
                          <p className="text-xl font-bold text-purple-200">{sampleData.customerSuccess.nps}</p>
                        </div>
                        <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-purple-500/20">
                          <p className="text-sm text-purple-300 mb-1">CSAT</p>
                          <p className="text-xl font-bold text-purple-200">{sampleData.customerSuccess.csat}/5</p>
                        </div>
                      </div>
                    </div>

                    {/* Top Campaigns */}
                    <div className="md:col-span-2">
                      <h4 className="text-lg font-semibold text-purple-200 mb-4 flex items-center gap-2">
                        <TargetIcon className="w-5 h-5 text-purple-400" />
                        Top Campaigns
                      </h4>
                      <div className="space-y-4">
                        {sampleData.topCampaigns.map((campaign, index) => (
                          <div key={index} className="bg-[#2D1B69]/30 rounded-lg p-4 border border-purple-500/20">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm font-medium text-purple-200">{campaign.name}</p>
                              <Badge className={getPerformanceColor(campaign.performance)}>
                                {campaign.performance}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-purple-400">Spend</span>
                                <span className="text-purple-200">{formatCurrency(campaign.spend)}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-purple-400">ROI</span>
                                <span className="text-purple-200">{campaign.roi}x</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-purple-400">Type</span>
                                <span className="text-purple-200">{campaign.creativeType}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional specialized components for B2C views */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="analytical-badge px-3 py-1 rounded-lg">
                <span className="text-purple-400 font-semibold text-sm">Detailed Analysis</span>
              </div>
              <h2 className="text-2xl font-bold text-purple-100">Comprehensive Performance Data</h2>
            </div>
            
            <div className="space-y-6">
              {/* Overall Summary Cards */}
              <OverallSummaryCards />
              
              {/* Enhanced Platform and Channel Performance */}
              <EnhancedPlatformTable />
              <EnhancedChannelTable />
              
              {/* Enhanced Trend Analysis */}
              <EnhancedTrendChart />
              
              {/* Enhanced Customer Acquisition */}
              <EnhancedCACCLVChart />
              
              {/* Enhanced Top Campaigns */}
              <EnhancedTopCampaignsTable />
              
              {/* Enhanced Geography/Region Analysis */}
              <EnhancedGeographyMap />
              
              {/* Enhanced Marketing Funnel */}
              <EnhancedMarketingFunnelChart />
              
              {/* Enhanced Attribution Summary */}
              <EnhancedAttributionSummary />
              
              {/* Enhanced Budget Utilization */}
              <EnhancedBudgetUtilization />
              
              {/* Enhanced Forecasting */}
              <EnhancedForecastingView />
              
              {/* Enhanced Audience Insights */}
              <EnhancedAudienceInsights />
              
              {/* Enhanced Creative Performance */}
              <EnhancedCreativePerformance />
              
              {/* Legacy Components for Reference */}
              <SalesPerformanceDeepDive />
              <MarketingEfficiencyDashboard />
              <TrendAnalysisForecasting />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Additional specialized components for B2C views

// Platform Performance Table Component
const PlatformTable: React.FC = () => {
  const platformData = [
    { platform: 'Facebook', spend: '₹1.2M', spendPercent: '50%', roi: '3.8x', cpconv: '₹45.20', status: 'excellent' },
    { platform: 'Google Ads', spend: '₹720K', spendPercent: '30%', roi: '4.2x', cpconv: '₹38.50', status: 'excellent' },
    { platform: 'TikTok', spend: '₹360K', spendPercent: '15%', roi: '2.9x', cpconv: '₹52.80', status: 'good' },
    { platform: 'Instagram', spend: '₹180K', spendPercent: '7.5%', roi: '3.2x', cpconv: '₹41.20', status: 'good' },
    { platform: 'YouTube', spend: '₹120K', spendPercent: '5%', roi: '2.5x', cpconv: '₹67.40', status: 'average' },
    { platform: 'Other', spend: '₹120K', spendPercent: '2.5%', roi: '2.1x', cpconv: '₹89.50', status: 'poor' }
  ];

  return (
    <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <GlobeIcon className="w-6 h-6 text-purple-400" />
          Platform Performance Overview
        </CardTitle>
        <CardDescription className="text-purple-300">
          Detailed breakdown of spend, ROI, and cost per conversion by platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-[#6D28D9]/20">
              <TableHead className="text-purple-200">Platform</TableHead>
              <TableHead className="text-purple-200">Spend</TableHead>
              <TableHead className="text-purple-200">% of Total</TableHead>
              <TableHead className="text-purple-200">ROI</TableHead>
              <TableHead className="text-purple-200">CPConv</TableHead>
              <TableHead className="text-purple-200">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {platformData.map((row, index) => (
              <TableRow key={index} className="border-[#6D28D9]/10 hover:bg-[#2D1B69]/20">
                <TableCell className="text-purple-200 font-medium">{row.platform}</TableCell>
                <TableCell className="text-purple-200">{formatCurrency(row.spend)}</TableCell>
                <TableCell className="text-purple-200">{row.spendPercent}</TableCell>
                <TableCell className="text-purple-200">{row.roi}</TableCell>
                <TableCell className="text-purple-200">{formatCurrency(row.cpconv)}</TableCell>
                <TableCell>
                  <Badge className={getPerformanceColor(row.status)}>
                    {row.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Channel Performance Table Component
const ChannelTable: React.FC = () => {
  const channelData = [
    { channel: 'Paid Search', traffic: '45.2K', sessions: '89.4K', newVisitors: '67%', repeatVisitors: '33%', conversion: '2.8%' },
    { channel: 'Organic Search', traffic: '28.7K', sessions: '56.2K', newVisitors: '72%', repeatVisitors: '28%', conversion: '1.9%' },
    { channel: 'Social Media', traffic: '15.3K', sessions: '32.1K', newVisitors: '58%', repeatVisitors: '42%', conversion: '3.2%' },
    { channel: 'Direct', traffic: '12.8K', sessions: '25.6K', newVisitors: '45%', repeatVisitors: '55%', conversion: '4.1%' },
    { channel: 'Referral', traffic: '8.9K', sessions: '18.7K', newVisitors: '63%', repeatVisitors: '37%', conversion: '2.5%' },
    { channel: 'Email', traffic: '6.4K', sessions: '12.8K', newVisitors: '38%', repeatVisitors: '62%', conversion: '5.8%' }
  ];

  return (
    <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <BarChart3Icon className="w-6 h-6 text-purple-400" />
          Channel Performance Overview
        </CardTitle>
        <CardDescription className="text-purple-300">
          Traffic, sessions, and visitor breakdown by marketing channel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-[#6D28D9]/20">
              <TableHead className="text-purple-200">Channel</TableHead>
              <TableHead className="text-purple-200">Traffic</TableHead>
              <TableHead className="text-purple-200">Sessions</TableHead>
              <TableHead className="text-purple-200">New Visitors</TableHead>
              <TableHead className="text-purple-200">Repeat Visitors</TableHead>
              <TableHead className="text-purple-200">Conversion Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {channelData.map((row, index) => (
              <TableRow key={index} className="border-[#6D28D9]/10 hover:bg-[#2D1B69]/20">
                <TableCell className="text-purple-200 font-medium">{row.channel}</TableCell>
                <TableCell className="text-purple-200">{formatCurrency(row.traffic)}</TableCell>
                <TableCell className="text-purple-200">{formatCurrency(row.sessions)}</TableCell>
                <TableCell className="text-purple-200">{row.newVisitors}</TableCell>
                <TableCell className="text-purple-200">{row.repeatVisitors}</TableCell>
                <TableCell className="text-purple-200">{row.conversion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Top Campaigns Table Component
const TopCampaignsTable: React.FC = () => {
  const campaignsData = [
    { name: 'Summer Sale 2024', spend: '₹450K', conversions: '2.4K', roi: '4.2x', creativeType: 'Video', performance: 'excellent' },
    { name: 'Brand Awareness Q1', spend: '₹320K', conversions: '1.8K', roi: '3.1x', creativeType: 'Image', performance: 'good' },
    { name: 'Retargeting Campaign', spend: '₹280K', conversions: '2.1K', roi: '5.8x', creativeType: 'Dynamic', performance: 'excellent' },
    { name: 'Holiday Special', spend: '₹220K', conversions: '1.2K', roi: '2.8x', creativeType: 'Carousel', performance: 'good' },
    { name: 'Product Launch', spend: '₹180K', conversions: '890', roi: '3.5x', creativeType: 'Video', performance: 'good' },
    { name: 'Seasonal Promotion', spend: '₹150K', conversions: '720', roi: '2.9x', creativeType: 'Image', performance: 'average' }
  ];

  return (
    <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <TargetIcon className="w-6 h-6 text-purple-400" />
          Top Campaigns Performance
        </CardTitle>
        <CardDescription className="text-purple-300">
          Best performing campaigns ranked by ROI and conversions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-[#6D28D9]/20">
              <TableHead className="text-purple-200">Campaign</TableHead>
              <TableHead className="text-purple-200">Spend</TableHead>
              <TableHead className="text-purple-200">Conversions</TableHead>
              <TableHead className="text-purple-200">ROI</TableHead>
              <TableHead className="text-purple-200">Creative Type</TableHead>
              <TableHead className="text-purple-200">Performance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaignsData.map((row, index) => (
              <TableRow key={index} className="border-[#6D28D9]/10 hover:bg-[#2D1B69]/20">
                <TableCell className="text-purple-200 font-medium">{row.name}</TableCell>
                <TableCell className="text-purple-200">{formatCurrency(row.spend)}</TableCell>
                <TableCell className="text-purple-200">{formatCurrency(row.conversions)}</TableCell>
                <TableCell className="text-purple-200">{row.roi}x</TableCell>
                <TableCell className="text-purple-200">{row.creativeType}</TableCell>
                <TableCell>
                  <Badge className={getPerformanceColor(row.performance)}>
                    {row.performance}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Trend Chart Component
const TrendChart: React.FC = () => {
  const trendData = [
    { date: 'Jan', spend: 180, revenue: 650, roi: 3.6, cpconv: 45 },
    { date: 'Feb', spend: 200, revenue: 720, roi: 3.6, cpconv: 42 },
    { date: 'Mar', spend: 220, revenue: 800, roi: 3.6, cpconv: 40 },
    { date: 'Apr', spend: 240, revenue: 880, roi: 3.7, cpconv: 38 },
    { date: 'May', spend: 260, revenue: 960, roi: 3.7, cpconv: 36 },
    { date: 'Jun', spend: 280, revenue: 1040, roi: 3.7, cpconv: 35 }
  ];

  return (
    <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <LineChartIcon className="w-6 h-6 text-purple-400" />
          Key KPIs Trend (6 Months)
        </CardTitle>
        <CardDescription className="text-purple-300">
          Monthly trends for spend, revenue, ROI, and cost per conversion
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.2} />
              <XAxis 
                dataKey="date" 
                stroke="#E9D5FF" 
                tick={{ fill: '#E9D5FF', fontSize: 12 }}
              />
              <YAxis yAxisId="left" stroke="#E9D5FF" />
              <YAxis yAxisId="right" orientation="right" stroke="#E9D5FF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(45, 27, 105, 0.95)',
                  border: '1px solid rgba(109, 40, 217, 0.2)',
                  borderRadius: '12px',
                  color: '#E9D5FF'
                }}
              />
              <Legend />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="spend" 
                stackId="1" 
                stroke="#8B5CF6" 
                fill="#8B5CF6" 
                fillOpacity={0.3}
                name="Spend (₹K)"
              />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="revenue" 
                stackId="2" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.3}
                name="Revenue (₹K)"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="roi" 
                stroke="#F59E0B" 
                strokeWidth={3}
                name="ROI (x)"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="cpconv" 
                stroke="#EF4444" 
                strokeWidth={3}
                name="CPConv (₹)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// CAC vs CLV Comparison Chart
const CACCLVChart: React.FC = () => {
  const cacClvData = [
    { month: 'Jan', cac: 45, clv: 2100 },
    { month: 'Feb', cac: 42, clv: 2150 },
    { month: 'Mar', cac: 40, clv: 2200 },
    { month: 'Apr', cac: 38, clv: 2250 },
    { month: 'May', cac: 36, clv: 2300 },
    { month: 'Jun', cac: 35, clv: 2350 }
  ];

  return (
    <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <UsersIcon className="w-6 h-6 text-purple-400" />
          CAC vs CLV Comparison
        </CardTitle>
        <CardDescription className="text-purple-300">
          Customer Acquisition Cost vs Customer Lifetime Value trend
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cacClvData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.2} />
              <XAxis 
                dataKey="month" 
                stroke="#E9D5FF" 
                tick={{ fill: '#E9D5FF', fontSize: 12 }}
              />
              <YAxis yAxisId="left" stroke="#E9D5FF" />
              <YAxis yAxisId="right" orientation="right" stroke="#E9D5FF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(45, 27, 105, 0.95)',
                  border: '1px solid rgba(109, 40, 217, 0.2)',
                  borderRadius: '12px',
                  color: '#E9D5FF'
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="cac" fill="#EF4444" name="CAC (₹)" />
              <Bar yAxisId="right" dataKey="clv" fill="#10B981" name="CLV (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// Geography/Region View Component
const GeographyMap: React.FC = () => {
  const geoData = [
    { state: 'California', spend: 450, conversions: 1200, roi: 3.8, customers: 8500, color: '#10B981' },
    { state: 'Texas', spend: 320, conversions: 890, roi: 4.2, customers: 6200, color: '#3B82F6' },
    { state: 'New York', spend: 380, conversions: 1100, roi: 3.5, customers: 7800, color: '#8B5CF6' },
    { state: 'Florida', spend: 280, conversions: 750, roi: 4.1, customers: 5200, color: '#F59E0B' },
    { state: 'Illinois', spend: 220, conversions: 620, roi: 3.9, customers: 4100, color: '#EF4444' },
    { state: 'Pennsylvania', spend: 180, conversions: 480, roi: 4.5, customers: 3400, color: '#06B6D4' },
    { state: 'Ohio', spend: 150, conversions: 420, roi: 3.7, customers: 2900, color: '#84CC16' },
    { state: 'Georgia', spend: 200, conversions: 580, roi: 4.0, customers: 3800, color: '#F97316' }
  ];

  return (
    <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <MapIcon className="w-6 h-6 text-purple-400" />
          Geography Performance
        </CardTitle>
        <CardDescription className="text-purple-300">
          Spend, Conversions, ROI, and Customers by State
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Interactive Map Placeholder */}
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg p-6 border border-purple-500/20">
            <div className="text-center">
              <MapIcon className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-purple-100 font-semibold mb-2">Interactive Heatmap</h3>
              <p className="text-purple-300 text-sm mb-4">
                Interactive geo heatmap showing performance by state
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-purple-300">High Performance</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span className="text-purple-300">Medium Performance</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-purple-300">Low Performance</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gray-500 rounded"></div>
                  <span className="text-purple-300">No Data</span>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Data Table */}
          <div className="space-y-4">
            <h3 className="text-purple-100 font-semibold">Top Performing States</h3>
            <div className="space-y-3">
              {geoData.slice(0, 6).map((region, index) => (
                <div key={region.state} className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" 
                         style={{ backgroundColor: region.color }}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-purple-100 font-medium">{region.state}</div>
                      <div className="text-purple-300 text-xs">
                        {formatCurrency(region.spend)} spend • {region.conversions} conversions
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-purple-100 font-semibold">{region.roi}x ROI</div>
                    <div className="text-purple-300 text-xs">{region.customers.toLocaleString()} customers</div>
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

// Funnel View Component
const MarketingFunnelChart: React.FC = () => {
  const funnelData = [
    { stage: 'Impressions', value: 2500000, dropoff: 0, color: '#8B5CF6' },
    { stage: 'Clicks', value: 125000, dropoff: 95, color: '#3B82F6' },
    { stage: 'Landing Page Visits', value: 112500, dropoff: 10, color: '#06B6D4' },
    { stage: 'Conversions', value: 12400, dropoff: 89, color: '#10B981' },
    { stage: 'Sales', value: 11800, dropoff: 4.8, color: '#F59E0B' },
    { stage: 'Repeat Customers', value: 5900, dropoff: 50, color: '#EF4444' }
  ];

  return (
    <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <BarChart3Icon className="w-6 h-6 text-purple-400" />
          Marketing Funnel Analysis
        </CardTitle>
        <CardDescription className="text-purple-300">
          Conversion funnel from impressions to repeat customers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Funnel Chart */}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsFunnelChart data={funnelData}>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(45, 27, 105, 0.95)',
                    border: '1px solid rgba(109, 40, 217, 0.2)',
                    borderRadius: '12px',
                    color: '#E9D5FF'
                  }}
                  formatter={(value: any, name: any) => [
                    `${name}: ${value.toLocaleString()}`,
                    'Value'
                  ]}
                />
                <Funnel
                  dataKey="value"
                  data={funnelData}
                  isAnimationActive={true}
                >
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Funnel>
              </RechartsFunnelChart>
            </ResponsiveContainer>
          </div>

          {/* Funnel Details */}
          <div className="space-y-4">
            <h3 className="text-purple-100 font-semibold">Funnel Performance</h3>
            <div className="space-y-3">
              {funnelData.map((stage, index) => (
                <div key={stage.stage} className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }}></div>
                      <span className="text-purple-100 font-medium">{stage.stage}</span>
                    </div>
                    <span className="text-purple-300 text-sm font-semibold">
                      {formatCurrency(stage.value)}
                    </span>
                  </div>
                  {index > 0 && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-purple-400">Drop-off Rate:</span>
                      <span className="text-red-400 font-semibold">{stage.dropoff}%</span>
                    </div>
                  )}
                  {index > 0 && (
                    <div className="mt-2">
                      <div className="w-full bg-purple-800/30 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${100 - stage.dropoff}%`,
                            backgroundColor: stage.color 
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Detailed Attribution Component
const DetailedAttribution: React.FC = () => {
  const attributionData = [
    { channel: 'Facebook Ads', firstClick: 35, lastClick: 45, linear: 15, dataDriven: 5, totalContribution: 100 },
    { channel: 'Google Ads', firstClick: 25, lastClick: 35, linear: 20, dataDriven: 8, totalContribution: 88 },
    { channel: 'TikTok Ads', firstClick: 20, lastClick: 15, linear: 12, dataDriven: 3, totalContribution: 50 },
    { channel: 'Organic Search', firstClick: 15, lastClick: 5, linear: 18, dataDriven: 2, totalContribution: 40 },
    { channel: 'Email Marketing', firstClick: 5, lastClick: 0, linear: 15, dataDriven: 1, totalContribution: 21 },
    { channel: 'Referral', firstClick: 0, lastClick: 0, linear: 20, dataDriven: 1, totalContribution: 21 }
  ];

  const pathData = [
    { path: 'Facebook → Google → Conversion', frequency: 25, avgTouchpoints: 3.2 },
    { path: 'Google → Facebook → Conversion', frequency: 20, avgTouchpoints: 2.8 },
    { path: 'TikTok → Facebook → Conversion', frequency: 15, avgTouchpoints: 2.5 },
    { path: 'Organic → Google → Conversion', frequency: 12, avgTouchpoints: 2.1 },
    { path: 'Direct → Conversion', frequency: 10, avgTouchpoints: 1.0 },
    { path: 'Email → Facebook → Conversion', frequency: 8, avgTouchpoints: 2.3 }
  ];

  return (
    <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <PieChartIcon className="w-6 h-6 text-purple-400" />
          Detailed Attribution Analysis
        </CardTitle>
        <CardDescription className="text-purple-300">
          Multi-touch attribution and conversion path analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attribution Methods Comparison */}
          <div>
            <h3 className="text-purple-100 font-semibold mb-4">Attribution by Channel</h3>
            <div className="space-y-3">
              {attributionData.map((channel) => (
                <div key={channel.channel} className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-100 font-medium">{channel.channel}</span>
                    <span className="text-purple-300 text-sm font-semibold">
                      {channel.totalContribution}% total
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-purple-400">First Click</div>
                      <div className="text-purple-100 font-semibold">{channel.firstClick}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-400">Last Click</div>
                      <div className="text-purple-100 font-semibold">{channel.lastClick}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-400">Linear</div>
                      <div className="text-purple-100 font-semibold">{channel.linear}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-400">Data-Driven</div>
                      <div className="text-purple-100 font-semibold">{channel.dataDriven}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Paths */}
          <div>
            <h3 className="text-purple-100 font-semibold mb-4">Top Conversion Paths</h3>
            <div className="space-y-3">
              {pathData.map((path, index) => (
                <div key={path.path} className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white">
                        {index + 1}
                      </div>
                      <span className="text-purple-100 font-medium text-sm">{path.path}</span>
                    </div>
                    <span className="text-purple-300 text-sm font-semibold">{path.frequency}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-purple-400">Avg Touchpoints:</span>
                    <span className="text-purple-100 font-semibold">{path.avgTouchpoints}</span>
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

// Pulse Report Specialized Components

// Sales Performance Deep Dive Component
const SalesPerformanceDeepDive: React.FC = () => {
  const customerTypeData = [
    { type: 'New Customers', share: '63%', count: '3,291', aov: '₹563', unitsPerOrder: '2.6', ordersPerCustomer: '1.1', ddChange: '56.2%' },
    { type: 'Repeat Customers', share: '31%', count: '1,619', aov: '₹556', unitsPerOrder: '2.8', ordersPerCustomer: '1.1', ddChange: '51.3%' },
    { type: 'Others', share: '6%', count: '314', aov: '₹751', unitsPerOrder: '2.5', ordersPerCustomer: '1.0', ddChange: '21.4%' }
  ];

  const regionalData = [
    { region: 'UAE', share: '14%', count: '731', aov: '₹470', unitsPerOrder: '3.0', sessionsPerUser: '1.2', gvsPerSession: '1.6' },
    { region: 'KSA', share: '86%', count: '4,493', aov: '₹588', unitsPerOrder: '2.6', sessionsPerUser: '1.3', gvsPerSession: '1.8' }
  ];

  const mtdData = [
    { metric: 'MTD GMV', value: '₹59.6M', target: '₹94M', achievement: '63%', projection: '₹81.9M' },
    { metric: 'MTD Orders', value: '103.1K', target: '131.2K', achievement: '79%', projection: '142.5K' },
    { metric: 'MTD Units', value: '268.1K', target: '335K', achievement: '80%', projection: '372.9K' },
    { metric: 'MTD Customers', value: '75.2K', target: 'N/A', achievement: 'N/A', projection: 'N/A' }
  ];

  return (
    <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <BarChart3Icon className="w-6 h-6 text-purple-400" />
          Sales Performance Deep Dive
        </CardTitle>
        <CardDescription className="text-purple-300">
          Detailed sales breakdown by customer type and region with MTD performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Type Breakdown */}
          <div>
            <h3 className="text-purple-100 font-semibold mb-4">Customer Type Breakdown</h3>
            <div className="space-y-3">
              {customerTypeData.map((customer) => (
                <div key={customer.type} className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-100 font-medium">{customer.type}</span>
                    <span className="text-purple-300 text-sm font-semibold">{customer.share}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-purple-400">Count</div>
                      <div className="text-purple-100 font-semibold">{formatCurrency(customer.count)}</div>
                    </div>
                    <div>
                      <div className="text-purple-400">AOV</div>
                      <div className="text-purple-100 font-semibold">{formatCurrency(customer.aov)}</div>
                    </div>
                    <div>
                      <div className="text-purple-400">Units/Order</div>
                      <div className="text-purple-100 font-semibold">{customer.unitsPerOrder}</div>
                    </div>
                    <div>
                      <div className="text-purple-400">D/D Change</div>
                      <div className="text-emerald-400 font-semibold">{customer.ddChange}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Breakdown */}
          <div>
            <h3 className="text-purple-100 font-semibold mb-4">Regional Performance</h3>
            <div className="space-y-3">
              {regionalData.map((region) => (
                <div key={region.region} className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-100 font-medium">{region.region}</span>
                    <span className="text-purple-300 text-sm font-semibold">{region.share}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-purple-400">Count</div>
                      <div className="text-purple-100 font-semibold">{formatCurrency(region.count)}</div>
                    </div>
                    <div>
                      <div className="text-purple-400">AOV</div>
                      <div className="text-purple-100 font-semibold">{formatCurrency(region.aov)}</div>
                    </div>
                    <div>
                      <div className="text-purple-400">Units/Order</div>
                      <div className="text-purple-100 font-semibold">{region.unitsPerOrder}</div>
                    </div>
                    <div>
                      <div className="text-purple-400">Sessions/User</div>
                      <div className="text-purple-100 font-semibold">{region.sessionsPerUser}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MTD Performance */}
          <div>
            <h3 className="text-purple-100 font-semibold mb-4">MTD Performance vs Targets</h3>
            <div className="space-y-3">
              {mtdData.map((item) => (
                <div key={item.metric} className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-100 font-medium text-sm">{item.metric}</span>
                    <span className="text-purple-300 text-sm font-semibold">{formatCurrency(item.value)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-purple-400">Target</div>
                      <div className="text-purple-100 font-semibold">{formatCurrency(item.target)}</div>
                    </div>
                    <div>
                      <div className="text-purple-400">Achievement</div>
                      <div className="text-purple-100 font-semibold">{item.achievement}</div>
                    </div>
                    {item.projection !== 'N/A' && (
                      <>
                        <div className="col-span-2">
                          <div className="text-purple-400">Projection</div>
                          <div className="text-emerald-400 font-semibold">{formatCurrency(item.projection)}</div>
                        </div>
                      </>
                    )}
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

// Marketing Efficiency Dashboard Component
const MarketingEfficiencyDashboard: React.FC = () => {
  const overallData = [
    { metric: 'Overall CIR', value: '20%', yesterday: '18%', change: '+2%', trend: 'up' },
    { metric: 'Overall CPO', value: '₹31', yesterday: '₹33', change: '-₹2', trend: 'down' },
    { metric: 'Overall CAC', value: '₹51', yesterday: '₹56', change: '-₹5', trend: 'down' },
    { metric: 'Daily Spend', value: '₹175.7K', yesterday: '₹144.8K', change: '+₹30.9K', trend: 'up' }
  ];

  const channelData = [
    { channel: 'Affiliate', spend: '₹77.8K', share: '44%', cir: '42%', installs: '67%', status: 'excellent' },
    { channel: 'Social', spend: '₹34.9K', share: '20%', cir: '38%', installs: '15%', status: 'good' },
    { channel: 'Remarketing', spend: '₹12.6K', share: '7%', cir: '35%', installs: '8%', status: 'good' },
    { channel: 'UAC', spend: '₹5.7K', share: '3%', cir: '45%', installs: '5%', status: 'average' },
    { channel: 'SEM Branded', spend: '₹3.4K', share: '2%', cir: '28%', installs: '2%', status: 'excellent' },
    { channel: 'Influencers', spend: '₹19K', share: '11%', cir: '15051%', installs: '3%', status: 'poor' }
  ];

  const budgetData = [
    { metric: 'MTD Spend', value: '₹3.72M', budget: '₹3.9M', utilization: '95%' },
    { metric: 'March Budget', value: '₹3.9M', target: '₹3.9M', utilization: '100%' },
    { metric: 'Projection', value: '₹4.9M', target: '₹3.9M', utilization: '126%' },
    { metric: 'Required Daily Run Rate', value: '₹4.9M', target: '₹3.9M', utilization: '126%' }
  ];

  return (
    <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <TrendingUpIcon className="w-6 h-6 text-purple-400" />
          Marketing Efficiency Dashboard
        </CardTitle>
        <CardDescription className="text-purple-300">
          CIR, ROI, CPO, CAC with channel breakdown and budget utilization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overall Performance */}
          <div>
            <h3 className="text-purple-100 font-semibold mb-4">Overall Performance</h3>
            <div className="space-y-3">
              {overallData.map((item) => (
                <div key={item.metric} className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-100 font-medium text-sm">{item.metric}</span>
                    <span className="text-purple-300 text-sm font-semibold">{formatCurrency(item.value)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-purple-400">Yesterday</div>
                      <div className="text-purple-100 font-semibold">{formatCurrency(item.yesterday)}</div>
                    </div>
                    <div>
                      <div className="text-purple-400">Change</div>
                      <div className={`font-semibold ${item.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {item.change}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Channel Performance */}
          <div>
            <h3 className="text-purple-100 font-semibold mb-4">Channel Performance</h3>
            <div className="space-y-3">
              {channelData.map((channel) => (
                <div key={channel.channel} className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-100 font-medium text-sm">{channel.channel}</span>
                    <Badge className={getPerformanceColor(channel.status)}>
                      {channel.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-purple-400">Spend</div>
                      <div className="text-purple-100 font-semibold">{formatCurrency(channel.spend)}</div>
                    </div>
                    <div>
                      <div className="text-purple-400">Share</div>
                      <div className="text-purple-100 font-semibold">{channel.share}</div>
                    </div>
                    <div>
                      <div className="text-purple-400">CIR</div>
                      <div className="text-purple-100 font-semibold">{channel.cir}</div>
                    </div>
                    <div>
                      <div className="text-purple-400">Installs</div>
                      <div className="text-purple-100 font-semibold">{channel.installs}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Utilization */}
          <div>
            <h3 className="text-purple-100 font-semibold mb-4">Budget Utilization</h3>
            <div className="space-y-3">
              {budgetData.map((item) => (
                <div key={item.metric} className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-100 font-medium text-sm">{item.metric}</span>
                    <span className="text-purple-300 text-sm font-semibold">{formatCurrency(item.value)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-purple-400">Target</div>
                      <div className="text-purple-100 font-semibold">{formatCurrency(item.target)}</div>
                    </div>
                    <div>
                      <div className="text-purple-400">Utilization</div>
                      <div className={`font-semibold ${parseInt(item.utilization) > 100 ? 'text-red-400' : 'text-emerald-400'}`}>
                        {item.utilization}
                      </div>
                    </div>
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

// Trend Analysis & Forecasting Component
const TrendAnalysisForecasting: React.FC = () => {
  const trendData = [
    { date: 'Mar 1', revenue: 2.1, orders: 3200, ordersPerSession: 1.8, installs: 45000, sessions: 180000 },
    { date: 'Mar 5', revenue: 2.8, orders: 4200, ordersPerSession: 2.1, installs: 52000, sessions: 200000 },
    { date: 'Mar 10', revenue: 3.2, orders: 4800, ordersPerSession: 2.4, installs: 58000, sessions: 220000 },
    { date: 'Mar 15', revenue: 2.9, orders: 4400, ordersPerSession: 2.2, installs: 54000, sessions: 200000 },
    { date: 'Mar 20', revenue: 3.5, orders: 5200, ordersPerSession: 2.6, installs: 62000, sessions: 240000 },
    { date: 'Mar 24', revenue: 3.2, orders: 5624, ordersPerSession: 2.8, installs: 70300, sessions: 408500 }
  ];

  const forecastData = [
    { metric: '30-Day Revenue Forecast', current: '₹3.2M', projected: '₹4.8M', growth: '+50%' },
    { metric: '30-Day Orders Forecast', current: '5.6K', projected: '8.4K', growth: '+50%' },
    { metric: '30-Day Customers Forecast', current: '5.2K', projected: '7.8K', growth: '+50%' },
    { metric: 'March Target Achievement', current: '87%', projected: '95%', growth: '+8%' }
  ];

  return (
    <Card className="bg-[#1A0B2E] border-[#6D28D9]/20">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <LineChartIcon className="w-6 h-6 text-purple-400" />
          Trend Analysis & Forecasting
        </CardTitle>
        <CardDescription className="text-purple-300">
          March 1-24 trends with 30-day projections and target achievement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trend Charts */}
          <div>
            <h3 className="text-purple-100 font-semibold mb-4">March Trends (1-24)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.3} />
                  <XAxis dataKey="date" stroke="#E9D5FF" />
                  <YAxis stroke="#E9D5FF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(45, 27, 105, 0.95)',
                      border: '1px solid rgba(109, 40, 217, 0.2)',
                      borderRadius: '12px',
                      color: '#E9D5FF'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} name="Revenue (M)" />
                  <Line type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} name="Orders (K)" />
                  <Area type="monotone" dataKey="sessions" fill="#8B5CF6" fillOpacity={0.3} stroke="#8B5CF6" name="Sessions (K)" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Forecast Data */}
          <div>
            <h3 className="text-purple-100 font-semibold mb-4">30-Day Forecast</h3>
            <div className="space-y-3">
              {forecastData.map((item) => (
                <div key={item.metric} className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-100 font-medium text-sm">{item.metric}</span>
                    <span className="text-emerald-400 text-sm font-semibold">{item.growth}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-purple-400">Current</div>
                      <div className="text-purple-100 font-semibold">{formatCurrency(item.current)}</div>
                    </div>
                    <div>
                      <div className="text-purple-400">Projected</div>
                      <div className="text-emerald-400 font-semibold">{formatCurrency(item.projected)}</div>
                    </div>
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

// Enhanced Overall Summary Cards Component
const OverallSummaryCards: React.FC = () => {
  const marketingMetrics = [
    { label: 'Total Spend', value: '₹2.4M', change: 12.5, trend: 'up', icon: DollarSignIcon },
    { label: 'CPC', value: '₹2.69', change: -3.2, trend: 'down', icon: DollarSignIcon },
    { label: 'CPM', value: '₹53.10', change: -1.8, trend: 'down', icon: DollarSignIcon },
    { label: 'CPConv', value: '₹193.55', change: -7.8, trend: 'down', icon: DollarSignIcon },
    { label: 'ROI', value: '3.6x', change: 5.2, trend: 'up', icon: TrendingUpIcon },
    { label: 'Conversions', value: '12.4K', change: 22.1, trend: 'up', icon: TargetIcon }
  ];

  const salesMetrics = [
    { label: 'Total Revenue', value: '₹8.7M', change: 18.3, trend: 'up', icon: DollarSignIcon },
    { label: 'Total Customers', value: '45.2K', change: 15.7, trend: 'up', icon: UsersIcon },
    { label: 'New Customers', value: '28.5K', change: 18.9, trend: 'up', icon: UserPlusIcon },
    { label: 'Repeat Customers', value: '16.7K', change: 10.2, trend: 'up', icon: RepeatIcon },
    { label: 'Units Sold', value: '89.3K', change: 22.4, trend: 'up', icon: ShoppingCartIcon },
    { label: 'AOV', value: '₹701', change: 12.7, trend: 'up', icon: ShoppingCartIcon }
  ];

  return (
    <div className="space-y-6">
      {/* Marketing Metrics */}
      <Card className="glass-effect metric-card-hover">
        <CardHeader>
          <CardTitle className="text-purple-100 flex items-center gap-2">
            <BarChart3Icon className="w-6 h-6 text-purple-400" />
            Marketing Metrics
          </CardTitle>
          <CardDescription className="text-purple-300">
            Key performance indicators for marketing campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {marketingMetrics.map((metric, index) => (
              <div key={index} className="bg-[#2D1B69]/30 rounded-lg p-4 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <metric.icon className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-300 font-medium">{metric.label}</span>
                </div>
                <p className="text-xl font-bold text-purple-200 mb-1">{metric.value}</p>
                <div className="flex items-center gap-1">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-emerald-400' : metric.trend === 'down' ? 'text-red-400' : 'text-purple-400'}`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                  <span className="text-xs text-purple-400">vs previous period</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sales Metrics */}
      <Card className="glass-effect metric-card-hover">
        <CardHeader>
          <CardTitle className="text-purple-100 flex items-center gap-2">
            <ShoppingCartIcon className="w-6 h-6 text-purple-400" />
            Sales Metrics
          </CardTitle>
          <CardDescription className="text-purple-300">
            Revenue and customer acquisition performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {salesMetrics.map((metric, index) => (
              <div key={index} className="bg-[#2D1B69]/30 rounded-lg p-4 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <metric.icon className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-300 font-medium">{metric.label}</span>
                </div>
                <p className="text-xl font-bold text-purple-200 mb-1">{metric.value}</p>
                <div className="flex items-center gap-1">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-emerald-400' : metric.trend === 'down' ? 'text-red-400' : 'text-purple-400'}`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                  <span className="text-xs text-purple-400">vs previous period</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Enhanced Platform Performance Table
const EnhancedPlatformTable: React.FC = () => {
  const platformData = [
    { platform: 'Facebook', spend: '₹1.2M', spendPercent: '50%', roi: '3.8x', cpconv: '₹45.20', status: 'excellent', color: '#1877F2' },
    { platform: 'Google Ads', spend: '₹720K', spendPercent: '30%', roi: '4.2x', cpconv: '₹38.50', status: 'excellent', color: '#4285F4' },
    { platform: 'TikTok', spend: '₹360K', spendPercent: '15%', roi: '2.9x', cpconv: '₹52.80', status: 'good', color: '#000000' },
    { platform: 'Instagram', spend: '₹180K', spendPercent: '7.5%', roi: '3.2x', cpconv: '₹41.20', status: 'good', color: '#E4405F' },
    { platform: 'YouTube', spend: '₹120K', spendPercent: '5%', roi: '2.5x', cpconv: '₹67.40', status: 'average', color: '#FF0000' },
    { platform: 'Other', spend: '₹120K', spendPercent: '2.5%', roi: '2.1x', cpconv: '₹89.50', status: 'poor', color: '#6B7280' }
  ];

  return (
    <Card className="glass-effect metric-card-hover">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <GlobeIcon className="w-6 h-6 text-purple-400" />
          Paid Platform Performance
        </CardTitle>
        <CardDescription className="text-purple-300">
          Platform-level split of spends, ROI, and CPConv with percentage distribution
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Spend Distribution Chart */}
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.2} />
                <XAxis type="number" stroke="#E9D5FF" />
                <YAxis dataKey="platform" type="category" stroke="#E9D5FF" width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(45, 27, 105, 0.95)',
                    border: '1px solid rgba(109, 40, 217, 0.2)',
                    borderRadius: '12px',
                    color: '#E9D5FF'
                  }}
                  formatter={(value, name) => [value, 'Spend']}
                />
                <Bar dataKey="spendPercent" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Table */}
          <Table>
            <TableHeader>
              <TableRow className="border-[#6D28D9]/20">
                <TableHead className="text-purple-200">Platform</TableHead>
                <TableHead className="text-purple-200">Spend</TableHead>
                <TableHead className="text-purple-200">% of Total</TableHead>
                <TableHead className="text-purple-200">ROI</TableHead>
                <TableHead className="text-purple-200">CPConv</TableHead>
                <TableHead className="text-purple-200">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {platformData.map((row, index) => (
                <TableRow key={index} className="border-[#6D28D9]/10 hover:bg-[#2D1B69]/20">
                  <TableCell className="text-purple-200 font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: row.color }}></div>
                      {row.platform}
                    </div>
                  </TableCell>
                  <TableCell className="text-purple-200">{formatCurrency(row.spend)}</TableCell>
                  <TableCell className="text-purple-200">{row.spendPercent}</TableCell>
                  <TableCell className="text-purple-200">{row.roi}</TableCell>
                  <TableCell className="text-purple-200">{formatCurrency(row.cpconv)}</TableCell>
                  <TableCell>
                    <Badge className={getPerformanceColor(row.status)}>
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Channel Performance Table
const EnhancedChannelTable: React.FC = () => {
  const channelData = [
    { channel: 'Paid Search', traffic: '45.2K', sessions: '89.4K', newVisitors: '67%', repeatVisitors: '33%', conversion: '2.8%', color: '#4285F4' },
    { channel: 'Organic Search', traffic: '28.7K', sessions: '56.2K', newVisitors: '72%', repeatVisitors: '28%', conversion: '1.9%', color: '#34A853' },
    { channel: 'Social Media', traffic: '15.3K', sessions: '32.1K', newVisitors: '58%', repeatVisitors: '42%', conversion: '3.2%', color: '#E4405F' },
    { channel: 'Direct', traffic: '12.8K', sessions: '25.6K', newVisitors: '45%', repeatVisitors: '55%', conversion: '4.1%', color: '#8B5CF6' },
    { channel: 'Referral', traffic: '8.9K', sessions: '18.7K', newVisitors: '63%', repeatVisitors: '37%', conversion: '2.5%', color: '#F59E0B' },
    { channel: 'Email', traffic: '6.4K', sessions: '12.8K', newVisitors: '38%', repeatVisitors: '62%', conversion: '5.8%', color: '#10B981' }
  ];

  return (
    <Card className="glass-effect metric-card-hover">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <BarChart3Icon className="w-6 h-6 text-purple-400" />
          Channel Performance Overview
        </CardTitle>
        <CardDescription className="text-purple-300">
          All channel view for traffic, sessions, new and repeat visitors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Traffic Distribution Chart */}
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.2} />
                <XAxis dataKey="channel" stroke="#E9D5FF" />
                <YAxis stroke="#E9D5FF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(45, 27, 105, 0.95)',
                    border: '1px solid rgba(109, 40, 217, 0.2)',
                    borderRadius: '12px',
                    color: '#E9D5FF'
                  }}
                />
                <Bar dataKey="traffic" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Table */}
          <Table>
            <TableHeader>
              <TableRow className="border-[#6D28D9]/20">
                <TableHead className="text-purple-200">Channel</TableHead>
                <TableHead className="text-purple-200">Traffic</TableHead>
                <TableHead className="text-purple-200">Sessions</TableHead>
                <TableHead className="text-purple-200">New Visitors</TableHead>
                <TableHead className="text-purple-200">Repeat Visitors</TableHead>
                <TableHead className="text-purple-200">Conversion Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {channelData.map((row, index) => (
                <TableRow key={index} className="border-[#6D28D9]/10 hover:bg-[#2D1B69]/20">
                  <TableCell className="text-purple-200 font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: row.color }}></div>
                      {row.channel}
                    </div>
                  </TableCell>
                  <TableCell className="text-purple-200">{formatCurrency(row.traffic)}</TableCell>
                  <TableCell className="text-purple-200">{formatCurrency(row.sessions)}</TableCell>
                  <TableCell className="text-purple-200">{row.newVisitors}</TableCell>
                  <TableCell className="text-purple-200">{row.repeatVisitors}</TableCell>
                  <TableCell className="text-purple-200">{row.conversion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Trend Chart for Key KPIs
const EnhancedTrendChart: React.FC = () => {
  const trendData = [
    { date: 'Jan', spend: 180, revenue: 650, roi: 3.6, cpconv: 45 },
    { date: 'Feb', spend: 200, revenue: 720, roi: 3.6, cpconv: 42 },
    { date: 'Mar', spend: 220, revenue: 800, roi: 3.6, cpconv: 40 },
    { date: 'Apr', spend: 240, revenue: 880, roi: 3.7, cpconv: 38 },
    { date: 'May', spend: 260, revenue: 960, roi: 3.7, cpconv: 36 },
    { date: 'Jun', spend: 280, revenue: 1040, roi: 3.7, cpconv: 35 }
  ];

  return (
    <Card className="glass-effect metric-card-hover">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <LineChartIcon className="w-6 h-6 text-purple-400" />
          Daily/Weekly/Monthly Trend of Key KPIs
        </CardTitle>
        <CardDescription className="text-purple-300">
          Separate line trends for spend vs ROI, spend vs CPConv
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Spend vs Revenue Trend */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.2} />
                <XAxis 
                  dataKey="date" 
                  stroke="#E9D5FF" 
                  tick={{ fill: '#E9D5FF', fontSize: 12 }}
                />
                <YAxis yAxisId="left" stroke="#E9D5FF" />
                <YAxis yAxisId="right" orientation="right" stroke="#E9D5FF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(45, 27, 105, 0.95)',
                    border: '1px solid rgba(109, 40, 217, 0.2)',
                    borderRadius: '12px',
                    color: '#E9D5FF'
                  }}
                />
                <Legend />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="spend" 
                  stackId="1" 
                  stroke="#8B5CF6" 
                  fill="#8B5CF6" 
                  fillOpacity={0.3}
                  name="Spend (₹K)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="Revenue (₹K)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* ROI and CPConv Trend */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.2} />
                <XAxis 
                  dataKey="date" 
                  stroke="#E9D5FF" 
                  tick={{ fill: '#E9D5FF', fontSize: 12 }}
                />
                <YAxis yAxisId="left" stroke="#E9D5FF" />
                <YAxis yAxisId="right" orientation="right" stroke="#E9D5FF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(45, 27, 105, 0.95)',
                    border: '1px solid rgba(109, 40, 217, 0.2)',
                    borderRadius: '12px',
                    color: '#E9D5FF'
                  }}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="roi" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  name="ROI (x)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="cpconv" 
                  stroke="#EF4444" 
                  strokeWidth={3}
                  name="CPConv (₹)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced CAC/CLV Comparison Chart
const EnhancedCACCLVChart: React.FC = () => {
  const cacClvData = [
    { metric: 'CAC', value: 51, target: 60, color: '#EF4444' },
    { metric: 'CLV', value: 2100, target: 1800, color: '#10B981' },
    { metric: 'Revenue per Customer', value: 192, target: 150, color: '#8B5CF6' },
    { metric: 'AOV', value: 701, target: 600, color: '#F59E0B' }
  ];

  const trendData = [
    { month: 'Jan', cac: 65, clv: 1800 },
    { month: 'Feb', cac: 58, clv: 1900 },
    { month: 'Mar', cac: 55, clv: 2000 },
    { month: 'Apr', cac: 52, clv: 2050 },
    { month: 'May', cac: 51, clv: 2100 },
    { month: 'Jun', cac: 49, clv: 2150 }
  ];

  return (
    <Card className="glass-effect metric-card-hover">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <UsersIcon className="w-6 h-6 text-purple-400" />
          Customer Acquisition Overview
        </CardTitle>
        <CardDescription className="text-purple-300">
          CAC, CLV, Revenue per Customer, AOV with trend comparison
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cacClvData.map((item, index) => (
              <div key={index} className="bg-[#2D1B69]/30 rounded-lg p-4 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-purple-300 font-medium">{item.metric}</span>
                </div>
                <p className="text-xl font-bold text-purple-200 mb-1">₹{item.value}</p>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-purple-400">Target: ₹{item.target}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CAC/CLV Trend Comparison */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.2} />
                <XAxis 
                  dataKey="month" 
                  stroke="#E9D5FF" 
                  tick={{ fill: '#E9D5FF', fontSize: 12 }}
                />
                <YAxis yAxisId="left" stroke="#E9D5FF" />
                <YAxis yAxisId="right" orientation="right" stroke="#E9D5FF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(45, 27, 105, 0.95)',
                    border: '1px solid rgba(109, 40, 217, 0.2)',
                    borderRadius: '12px',
                    color: '#E9D5FF'
                  }}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="cac" 
                  stroke="#EF4444" 
                  strokeWidth={3}
                  name="CAC (₹)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="clv" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="CLV (₹)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Top Campaigns Table with ROI Tags
const EnhancedTopCampaignsTable: React.FC = () => {
  const campaignsData = [
    { name: 'Summer Sale 2024', spend: '₹450K', conversions: '2.4K', roi: '4.2x', creativeType: 'Video', performance: 'excellent', color: '#10B981' },
    { name: 'Brand Awareness Q1', spend: '₹320K', conversions: '1.8K', roi: '3.1x', creativeType: 'Image', performance: 'good', color: '#8B5CF6' },
    { name: 'Retargeting Campaign', spend: '₹280K', conversions: '2.1K', roi: '5.8x', creativeType: 'Dynamic', performance: 'excellent', color: '#10B981' },
    { name: 'Holiday Special', spend: '₹220K', conversions: '1.2K', roi: '2.8x', creativeType: 'Carousel', performance: 'good', color: '#8B5CF6' },
    { name: 'Product Launch', spend: '₹180K', conversions: '890', roi: '3.5x', creativeType: 'Video', performance: 'good', color: '#8B5CF6' },
    { name: 'Seasonal Promotion', spend: '₹150K', conversions: '720', roi: '2.9x', creativeType: 'Image', performance: 'average', color: '#F59E0B' }
  ];

  const getROIColor = (roi: string) => {
    const roiValue = parseFloat(roi.replace('x', ''));
    if (roiValue >= 4.0) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    if (roiValue >= 3.0) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (roiValue >= 2.0) return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    return 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  return (
    <Card className="glass-effect metric-card-hover">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <TargetIcon className="w-6 h-6 text-purple-400" />
          Top Campaigns Performance
        </CardTitle>
        <CardDescription className="text-purple-300">
          Top campaigns by spend, conversions, ROI, creative type with color-coded performance tags
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* ROI Distribution Chart */}
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaignsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.2} />
                <XAxis dataKey="name" stroke="#E9D5FF" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#E9D5FF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(45, 27, 105, 0.95)',
                    border: '1px solid rgba(109, 40, 217, 0.2)',
                    borderRadius: '12px',
                    color: '#E9D5FF'
                  }}
                />
                <Bar dataKey="roi" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Table */}
          <Table>
            <TableHeader>
              <TableRow className="border-[#6D28D9]/20">
                <TableHead className="text-purple-200">Campaign</TableHead>
                <TableHead className="text-purple-200">Spend</TableHead>
                <TableHead className="text-purple-200">Conversions</TableHead>
                <TableHead className="text-purple-200">ROI</TableHead>
                <TableHead className="text-purple-200">Creative Type</TableHead>
                <TableHead className="text-purple-200">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaignsData.map((row, index) => (
                <TableRow key={index} className="border-[#6D28D9]/10 hover:bg-[#2D1B69]/20">
                  <TableCell className="text-purple-200 font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: row.color }}></div>
                      {row.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-purple-200">{formatCurrency(row.spend)}</TableCell>
                  <TableCell className="text-purple-200">{formatCurrency(row.conversions)}</TableCell>
                  <TableCell>
                    <Badge className={`${getROIColor(row.roi)} border`}>
                      {row.roi}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-purple-200">{row.creativeType}</TableCell>
                  <TableCell>
                    <Badge className={getPerformanceColor(row.performance)}>
                      {row.performance}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Geography/Region Map
const EnhancedGeographyMap: React.FC = () => {
  const regionData = [
    { region: 'Maharashtra', spend: '₹450K', conversions: '2.1K', roi: '4.2x', customers: '8.5K', color: '#10B981' },
    { region: 'Delhi NCR', spend: '₹380K', conversions: '1.8K', roi: '3.8x', customers: '7.2K', color: '#8B5CF6' },
    { region: 'Karnataka', spend: '₹320K', conversions: '1.5K', roi: '3.5x', customers: '6.1K', color: '#8B5CF6' },
    { region: 'Tamil Nadu', spend: '₹280K', conversions: '1.3K', roi: '3.2x', customers: '5.4K', color: '#F59E0B' },
    { region: 'Gujarat', spend: '₹240K', conversions: '1.1K', roi: '3.0x', customers: '4.8K', color: '#F59E0B' },
    { region: 'Others', spend: '₹730K', conversions: '3.6K', roi: '2.8x', customers: '13.2K', color: '#EF4444' }
  ];

  return (
    <Card className="glass-effect metric-card-hover">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <MapIcon className="w-6 h-6 text-purple-400" />
          Geography/Region Performance
        </CardTitle>
        <CardDescription className="text-purple-300">
          Spend, conversions, ROI, and customers by state/region with interactive visualization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Region Performance Chart */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={regionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.2} />
                <XAxis type="number" stroke="#E9D5FF" />
                <YAxis dataKey="region" type="category" stroke="#E9D5FF" width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(45, 27, 105, 0.95)',
                    border: '1px solid rgba(109, 40, 217, 0.2)',
                    borderRadius: '12px',
                    color: '#E9D5FF'
                  }}
                />
                <Legend />
                <Bar dataKey="spend" fill="#8B5CF6" name="Spend (₹K)" />
                <Bar dataKey="conversions" fill="#10B981" name="Conversions" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Region Table */}
          <Table>
            <TableHeader>
              <TableRow className="border-[#6D28D9]/20">
                <TableHead className="text-purple-200">Region</TableHead>
                <TableHead className="text-purple-200">Spend</TableHead>
                <TableHead className="text-purple-200">Conversions</TableHead>
                <TableHead className="text-purple-200">ROI</TableHead>
                <TableHead className="text-purple-200">Customers</TableHead>
                <TableHead className="text-purple-200">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regionData.map((row, index) => (
                <TableRow key={index} className="border-[#6D28D9]/10 hover:bg-[#2D1B69]/20">
                  <TableCell className="text-purple-200 font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: row.color }}></div>
                      {row.region}
                    </div>
                  </TableCell>
                  <TableCell className="text-purple-200">{formatCurrency(row.spend)}</TableCell>
                  <TableCell className="text-purple-200">{formatCurrency(row.conversions)}</TableCell>
                  <TableCell className="text-purple-200">{row.roi}</TableCell>
                  <TableCell className="text-purple-200">{formatCurrency(row.customers)}</TableCell>
                  <TableCell>
                    <Badge className={getPerformanceColor(row.roi >= '3.5x' ? 'excellent' : row.roi >= '3.0x' ? 'good' : 'average')}>
                      {row.roi >= '3.5x' ? 'excellent' : row.roi >= '3.0x' ? 'good' : 'average'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Marketing Funnel Chart
const EnhancedMarketingFunnelChart: React.FC = () => {
  const funnelData = [
    { stage: 'Impressions', value: 1000000, percentage: 100, color: '#8B5CF6' },
    { stage: 'Clicks', value: 45000, percentage: 4.5, color: '#10B981' },
    { stage: 'Landing Page Visits', value: 42000, percentage: 4.2, color: '#F59E0B' },
    { stage: 'Conversions', value: 12400, percentage: 1.24, color: '#EF4444' },
    { stage: 'Sales', value: 11800, percentage: 1.18, color: '#8B5CF6' },
    { stage: 'Repeat Customers', value: 5900, percentage: 0.59, color: '#10B981' }
  ];

  return (
    <Card className="glass-effect metric-card-hover">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <BarChart3Icon className="w-6 h-6 text-purple-400" />
          Marketing Funnel Analysis
        </CardTitle>
        <CardDescription className="text-purple-300">
          Conversion funnel from impressions to repeat customers with drop-off percentages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Funnel Chart */}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsFunnelChart data={funnelData}>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(45, 27, 105, 0.95)',
                    border: '1px solid rgba(109, 40, 217, 0.2)',
                    borderRadius: '12px',
                    color: '#E9D5FF'
                  }}
                />
                <Funnel
                  dataKey="value"
                  nameKey="stage"
                  data={funnelData}
                  isAnimationActive
                >
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Funnel>
              </RechartsFunnelChart>
            </ResponsiveContainer>
          </div>

          {/* Funnel Details Table */}
          <Table>
            <TableHeader>
              <TableRow className="border-[#6D28D9]/20">
                <TableHead className="text-purple-200">Stage</TableHead>
                <TableHead className="text-purple-200">Value</TableHead>
                <TableHead className="text-purple-200">Conversion Rate</TableHead>
                <TableHead className="text-purple-200">Drop-off</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {funnelData.map((row, index) => (
                <TableRow key={index} className="border-[#6D28D9]/10 hover:bg-[#2D1B69]/20">
                  <TableCell className="text-purple-200 font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: row.color }}></div>
                      {row.stage}
                    </div>
                  </TableCell>
                  <TableCell className="text-purple-200">{formatCurrency(row.value)}</TableCell>
                  <TableCell className="text-purple-200">{row.percentage}%</TableCell>
                  <TableCell className="text-purple-200">
                    {index < funnelData.length - 1 ? 
                      `${((funnelData[index].value - funnelData[index + 1].value) / funnelData[index].value * 100).toFixed(1)}%` : 
                      'N/A'
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Attribution Summary
const EnhancedAttributionSummary: React.FC = () => {
  const attributionData = [
    { channel: 'Facebook', firstClick: 35, lastClick: 45, linear: 15, dataDriven: 5, color: '#1877F2' },
    { channel: 'Google Ads', firstClick: 25, lastClick: 30, linear: 20, dataDriven: 8, color: '#4285F4' },
    { channel: 'TikTok', firstClick: 15, lastClick: 12, linear: 10, dataDriven: 3, color: '#000000' },
    { channel: 'Instagram', firstClick: 10, lastClick: 8, linear: 8, dataDriven: 2, color: '#E4405F' },
    { channel: 'Organic', firstClick: 15, lastClick: 5, linear: 12, dataDriven: 4, color: '#34A853' }
  ];

  return (
    <Card className="glass-effect metric-card-hover">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <PieChartIcon className="w-6 h-6 text-purple-400" />
          Attribution Summary
        </CardTitle>
        <CardDescription className="text-purple-300">
          First click, last click, linear, and data-driven contribution of each channel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Attribution Chart */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.2} />
                <XAxis dataKey="channel" stroke="#E9D5FF" />
                <YAxis stroke="#E9D5FF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(45, 27, 105, 0.95)',
                    border: '1px solid rgba(109, 40, 217, 0.2)',
                    borderRadius: '12px',
                    color: '#E9D5FF'
                  }}
                />
                <Legend />
                <Bar dataKey="firstClick" stackId="a" fill="#8B5CF6" name="First Click" />
                <Bar dataKey="lastClick" stackId="a" fill="#10B981" name="Last Click" />
                <Bar dataKey="linear" stackId="a" fill="#F59E0B" name="Linear" />
                <Bar dataKey="dataDriven" stackId="a" fill="#EF4444" name="Data-Driven" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Attribution Table */}
          <Table>
            <TableHeader>
              <TableRow className="border-[#6D28D9]/20">
                <TableHead className="text-purple-200">Channel</TableHead>
                <TableHead className="text-purple-200">First Click (%)</TableHead>
                <TableHead className="text-purple-200">Last Click (%)</TableHead>
                <TableHead className="text-purple-200">Linear (%)</TableHead>
                <TableHead className="text-purple-200">Data-Driven (%)</TableHead>
                <TableHead className="text-purple-200">Total (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attributionData.map((row, index) => (
                <TableRow key={index} className="border-[#6D28D9]/10 hover:bg-[#2D1B69]/20">
                  <TableCell className="text-purple-200 font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: row.color }}></div>
                      {row.channel}
                    </div>
                  </TableCell>
                  <TableCell className="text-purple-200">{row.firstClick}%</TableCell>
                  <TableCell className="text-purple-200">{row.lastClick}%</TableCell>
                  <TableCell className="text-purple-200">{row.linear}%</TableCell>
                  <TableCell className="text-purple-200">{row.dataDriven}%</TableCell>
                  <TableCell className="text-purple-200 font-bold">
                    {row.firstClick + row.lastClick + row.linear + row.dataDriven}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Budget Utilization Component
const EnhancedBudgetUtilization: React.FC = () => {
  const budgetData = [
    { month: 'Jan', allocated: 200, spent: 180, burnRate: 90, performance: 105 },
    { month: 'Feb', allocated: 200, spent: 190, burnRate: 95, performance: 110 },
    { month: 'Mar', allocated: 200, spent: 210, burnRate: 105, performance: 115 },
    { month: 'Apr', allocated: 200, spent: 195, burnRate: 97.5, performance: 108 },
    { month: 'May', allocated: 200, spent: 220, burnRate: 110, performance: 120 },
    { month: 'Jun', allocated: 200, spent: 240, burnRate: 120, performance: 125 }
  ];

  const budgetAllocation = [
    { platform: 'Facebook', allocated: 50, spent: 45, percentage: 50 },
    { platform: 'Google Ads', allocated: 30, spent: 28, percentage: 30 },
    { platform: 'TikTok', allocated: 15, spent: 18, percentage: 15 },
    { platform: 'Others', allocated: 5, spent: 9, percentage: 5 }
  ];

  return (
    <Card className="glass-effect metric-card-hover">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <DollarSignIcon className="w-6 h-6 text-purple-400" />
          Budget Utilization & Performance
        </CardTitle>
        <CardDescription className="text-purple-300">
          Budget allocation vs spend vs burn rate with performance delivery indicators
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Budget Allocation Donut Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="percentage"
                  >
                    {budgetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#8B5CF6', '#10B981', '#F59E0B', '#EF4444'][index]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(45, 27, 105, 0.95)',
                      border: '1px solid rgba(109, 40, 217, 0.2)',
                      borderRadius: '12px',
                      color: '#E9D5FF'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Budget Trend Line Chart */}
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={budgetData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.2} />
                  <XAxis dataKey="month" stroke="#E9D5FF" />
                  <YAxis stroke="#E9D5FF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(45, 27, 105, 0.95)',
                      border: '1px solid rgba(109, 40, 217, 0.2)',
                      borderRadius: '12px',
                      color: '#E9D5FF'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="allocated" stroke="#8B5CF6" strokeWidth={3} name="Allocated (₹K)" />
                  <Line type="monotone" dataKey="spent" stroke="#10B981" strokeWidth={3} name="Spent (₹K)" />
                  <Line type="monotone" dataKey="performance" stroke="#F59E0B" strokeWidth={3} name="Performance (%)" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Budget Details Table */}
          <Table>
            <TableHeader>
              <TableRow className="border-[#6D28D9]/20">
                <TableHead className="text-purple-200">Platform</TableHead>
                <TableHead className="text-purple-200">Allocated (₹K)</TableHead>
                <TableHead className="text-purple-200">Spent (₹K)</TableHead>
                <TableHead className="text-purple-200">Utilization (%)</TableHead>
                <TableHead className="text-purple-200">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetAllocation.map((row, index) => (
                <TableRow key={index} className="border-[#6D28D9]/10 hover:bg-[#2D1B69]/20">
                  <TableCell className="text-purple-200 font-medium">{row.platform}</TableCell>
                  <TableCell className="text-purple-200">{row.allocated}</TableCell>
                  <TableCell className="text-purple-200">{row.spent}</TableCell>
                  <TableCell className="text-purple-200">
                    {((row.spent / row.allocated) * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell>
                    <Badge className={row.spent <= row.allocated ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'}>
                      {row.spent <= row.allocated ? 'On Track' : 'Over Budget'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Forecasting View Component
const EnhancedForecastingView: React.FC = () => {
  const forecastData = [
    { month: 'Jul', actual: 280, predicted: 300, revenue: 1040, predictedRevenue: 1120, roi: 3.7, predictedRoi: 3.8 },
    { month: 'Aug', actual: 300, predicted: 320, revenue: 1120, predictedRevenue: 1200, roi: 3.8, predictedRoi: 3.9 },
    { month: 'Sep', actual: 320, predicted: 340, revenue: 1200, predictedRevenue: 1280, roi: 3.9, predictedRoi: 4.0 },
    { month: 'Oct', actual: 340, predicted: 360, revenue: 1280, predictedRevenue: 1360, roi: 4.0, predictedRoi: 4.1 },
    { month: 'Nov', actual: 360, predicted: 380, revenue: 1360, predictedRevenue: 1440, roi: 4.1, predictedRoi: 4.2 },
    { month: 'Dec', actual: 380, predicted: 400, revenue: 1440, predictedRevenue: 1520, roi: 4.2, predictedRoi: 4.3 }
  ];

  return (
    <Card className="glass-effect metric-card-hover">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <TrendingUpIcon className="w-6 h-6 text-purple-400" />
          Forecasting View (Next 30/60 Days)
        </CardTitle>
        <CardDescription className="text-purple-300">
          Predicted spend, revenue, ROI using historical trends and ML models
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Spend Forecast */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.2} />
                <XAxis dataKey="month" stroke="#E9D5FF" />
                <YAxis stroke="#E9D5FF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(45, 27, 105, 0.95)',
                    border: '1px solid rgba(109, 40, 217, 0.2)',
                    borderRadius: '12px',
                    color: '#E9D5FF'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="actual" stroke="#8B5CF6" strokeWidth={3} name="Actual Spend (₹K)" />
                <Line type="monotone" dataKey="predicted" stroke="#10B981" strokeWidth={3} strokeDasharray="5 5" name="Predicted Spend (₹K)" />
                <Area dataKey="predicted" fill="#10B981" fillOpacity={0.1} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Forecast */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.2} />
                <XAxis dataKey="month" stroke="#E9D5FF" />
                <YAxis stroke="#E9D5FF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(45, 27, 105, 0.95)',
                    border: '1px solid rgba(109, 40, 217, 0.2)',
                    borderRadius: '12px',
                    color: '#E9D5FF'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={3} name="Actual Revenue (₹K)" />
                <Line type="monotone" dataKey="predictedRevenue" stroke="#EF4444" strokeWidth={3} strokeDasharray="5 5" name="Predicted Revenue (₹K)" />
                <Area dataKey="predictedRevenue" fill="#EF4444" fillOpacity={0.1} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Forecast Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-purple-500/20">
              <h4 className="text-sm text-purple-300 mb-2">30-Day Forecast</h4>
              <p className="text-xl font-bold text-purple-200">₹320K</p>
              <p className="text-sm text-emerald-400">+7.1% vs current</p>
            </div>
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-purple-500/20">
              <h4 className="text-sm text-purple-300 mb-2">60-Day Forecast</h4>
              <p className="text-xl font-bold text-purple-200">₹400K</p>
              <p className="text-sm text-emerald-400">+14.3% vs current</p>
            </div>
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-purple-500/20">
              <h4 className="text-sm text-purple-300 mb-2">Predicted ROI</h4>
              <p className="text-xl font-bold text-purple-200">4.3x</p>
              <p className="text-sm text-emerald-400">+0.7x improvement</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Audience Insights Component
const EnhancedAudienceInsights: React.FC = () => {
  const demographicsData = [
    { segment: 'Female', conversion: 2.8, roi: 3.2, cac: 45, percentage: 58 },
    { segment: 'Male', conversion: 2.1, roi: 2.8, cac: 52, percentage: 42 }
  ];

  const ageGroupData = [
    { age: '18-24', conversion: 2.5, roi: 2.8, cac: 48, percentage: 25 },
    { age: '25-34', conversion: 3.2, roi: 4.2, cac: 42, percentage: 35 },
    { age: '35-44', conversion: 2.8, roi: 3.5, cac: 45, percentage: 22 },
    { age: '45+', conversion: 2.1, roi: 2.9, cac: 55, percentage: 18 }
  ];

  const deviceData = [
    { device: 'Mobile', conversion: 2.8, roi: 3.1, cac: 45, percentage: 68 },
    { device: 'Desktop', conversion: 2.1, roi: 2.8, cac: 67, percentage: 28 },
    { device: 'Tablet', conversion: 1.9, roi: 2.5, cac: 72, percentage: 4 }
  ];

  return (
    <Card className="glass-effect metric-card-hover">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <UsersIcon className="w-6 h-6 text-purple-400" />
          Audience Insights
        </CardTitle>
        <CardDescription className="text-purple-300">
          Conversion, ROI, and CAC by gender, age group, device, and interest segments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Demographics Pie Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={demographicsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="percentage"
                  >
                    {demographicsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#8B5CF6', '#10B981'][index]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(45, 27, 105, 0.95)',
                      border: '1px solid rgba(109, 40, 217, 0.2)',
                      borderRadius: '12px',
                      color: '#E9D5FF'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Age Group Bar Chart */}
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageGroupData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.2} />
                  <XAxis dataKey="age" stroke="#E9D5FF" />
                  <YAxis stroke="#E9D5FF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(45, 27, 105, 0.95)',
                      border: '1px solid rgba(109, 40, 217, 0.2)',
                      borderRadius: '12px',
                      color: '#E9D5FF'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="roi" fill="#8B5CF6" name="ROI (x)" />
                  <Bar dataKey="conversion" fill="#10B981" name="Conversion (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Device Usage Stacked Bar */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deviceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.2} />
                <XAxis dataKey="device" stroke="#E9D5FF" />
                <YAxis stroke="#E9D5FF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(45, 27, 105, 0.95)',
                    border: '1px solid rgba(109, 40, 217, 0.2)',
                    borderRadius: '12px',
                    color: '#E9D5FF'
                  }}
                />
                <Legend />
                <Bar dataKey="percentage" fill="#F59E0B" name="Usage (%)" />
                <Bar dataKey="cac" fill="#EF4444" name="CAC (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Audience Details Table */}
          <Table>
            <TableHeader>
              <TableRow className="border-[#6D28D9]/20">
                <TableHead className="text-purple-200">Segment</TableHead>
                <TableHead className="text-purple-200">Conversion Rate (%)</TableHead>
                <TableHead className="text-purple-200">ROI (x)</TableHead>
                <TableHead className="text-purple-200">CAC (₹)</TableHead>
                <TableHead className="text-purple-200">Percentage (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...demographicsData, ...ageGroupData, ...deviceData].map((row, index) => (
                <TableRow key={index} className="border-[#6D28D9]/10 hover:bg-[#2D1B69]/20">
                  <TableCell className="text-purple-200 font-medium">
                    {'segment' in row ? row.segment : 'age' in row ? row.age : row.device}
                  </TableCell>
                  <TableCell className="text-purple-200">{row.conversion}%</TableCell>
                  <TableCell className="text-purple-200">{row.roi}x</TableCell>
                  <TableCell className="text-purple-200">₹{row.cac}</TableCell>
                  <TableCell className="text-purple-200">{row.percentage}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Creative Performance Component
const EnhancedCreativePerformance: React.FC = () => {
  const creativeData = [
    { type: 'Video', ctr: 2.8, conversions: 1200, spend: 280, roi: 4.2, color: '#8B5CF6' },
    { type: 'Image', ctr: 1.9, conversions: 890, spend: 220, roi: 3.1, color: '#10B981' },
    { type: 'Carousel', ctr: 2.1, conversions: 650, spend: 180, roi: 3.8, color: '#F59E0B' },
    { type: 'Text Ads', ctr: 1.2, conversions: 420, spend: 150, roi: 2.8, color: '#EF4444' }
  ];

  return (
    <Card className="glass-effect metric-card-hover">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <ImageIcon className="w-6 h-6 text-purple-400" />
          Creative Performance Analysis
        </CardTitle>
        <CardDescription className="text-purple-300">
          Creative-level metrics: CTR, conversions, spend, ROI for different formats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Creative Performance Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {creativeData.map((creative, index) => (
              <div key={index} className="bg-[#2D1B69]/30 rounded-lg p-4 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: creative.color }}></div>
                  <span className="text-sm text-purple-300 font-medium">{creative.type}</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-purple-400">CTR</p>
                    <p className="text-lg font-bold text-purple-200">{creative.ctr}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-purple-400">ROI</p>
                    <p className="text-lg font-bold text-purple-200">{creative.roi}x</p>
                  </div>
                  <div>
                    <p className="text-xs text-purple-400">Spend</p>
                    <p className="text-sm font-medium text-purple-200">₹{creative.spend}K</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Creative Performance Chart */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={creativeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6D28D9" opacity={0.2} />
                <XAxis dataKey="type" stroke="#E9D5FF" />
                <YAxis yAxisId="left" stroke="#E9D5FF" />
                <YAxis yAxisId="right" orientation="right" stroke="#E9D5FF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(45, 27, 105, 0.95)',
                    border: '1px solid rgba(109, 40, 217, 0.2)',
                    borderRadius: '12px',
                    color: '#E9D5FF'
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="ctr" fill="#8B5CF6" name="CTR (%)" />
                <Line yAxisId="right" type="monotone" dataKey="roi" stroke="#10B981" strokeWidth={3} name="ROI (x)" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Creative Details Table */}
          <Table>
            <TableHeader>
              <TableRow className="border-[#6D28D9]/20">
                <TableHead className="text-purple-200">Creative Type</TableHead>
                <TableHead className="text-purple-200">CTR (%)</TableHead>
                <TableHead className="text-purple-200">Conversions</TableHead>
                <TableHead className="text-purple-200">Spend (₹K)</TableHead>
                <TableHead className="text-purple-200">ROI (x)</TableHead>
                <TableHead className="text-purple-200">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creativeData.map((row, index) => (
                <TableRow key={index} className="border-[#6D28D9]/10 hover:bg-[#2D1B69]/20">
                  <TableCell className="text-purple-200 font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: row.color }}></div>
                      {row.type}
                    </div>
                  </TableCell>
                  <TableCell className="text-purple-200">{row.ctr}%</TableCell>
                  <TableCell className="text-purple-200">{formatCurrency(row.conversions)}</TableCell>
                  <TableCell className="text-purple-200">₹{row.spend}K</TableCell>
                  <TableCell className="text-purple-200">{row.roi}x</TableCell>
                  <TableCell>
                    <Badge className={getPerformanceColor(row.roi >= 4.0 ? 'excellent' : row.roi >= 3.0 ? 'good' : 'average')}>
                      {row.roi >= 4.0 ? 'excellent' : row.roi >= 3.0 ? 'good' : 'average'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// Executive Summary Component matching the image design
const ExecutiveSummary: React.FC = () => {
  const summaryMetrics = [
    {
      label: "Total Revenue",
      value: "₹8.7M",
      change: 18.3,
      trend: 'up' as const,
      icon: DollarSignIcon,
      category: "revenue"
    },
    {
      label: "Total Spend", 
      value: "₹2.4M",
      change: 12.5,
      trend: 'up' as const,
      icon: DollarSignIcon,
      category: "spend"
    },
    {
      label: "ROI",
      value: "3.6x",
      change: -5.2,
      trend: 'down' as const,
      icon: TrendingUpIcon,
      category: "roi"
    },
    {
      label: "Total Conversions",
      value: "12.4K",
      change: 22.1,
      trend: 'up' as const,
      icon: UsersIcon,
      category: "conversions"
    },
    {
      label: "CPC",
      value: "₹2.69",
      change: -3.2,
      trend: 'down' as const,
      icon: DollarSignIcon,
      category: "cpc"
    },
    {
      label: "CPM",
      value: "₹53.10",
      change: -1.8,
      trend: 'down' as const,
      icon: DollarSignIcon,
      category: "cpm"
    },
    {
      label: "CPConv",
      value: "₹193.55",
      change: -7.8,
      trend: 'down' as const,
      icon: DollarSignIcon,
      category: "cpconv"
    },
    {
      label: "Total Customers",
      value: "45.2K",
      change: 15.7,
      trend: 'up' as const,
      icon: Users2Icon,
      category: "customers"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/20 rounded-full">
            <TargetIcon className="w-6 h-6 text-purple-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Executive Summary</h1>
            <p className="text-purple-300/80 text-sm">Critical business performance indicators at a glance</p>
          </div>
        </div>
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <ArrowUpIcon className="w-5 h-5 text-purple-300" />
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryMetrics.map((metric, index) => {
          const isPositive = metric.change >= 0;
          const isNegative = metric.change < 0;
          
          return (
            <div key={index} className="relative group bg-gradient-to-br from-[#1A0B2E]/80 to-[#2D1B69]/60 backdrop-blur-sm rounded-xl p-5 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:scale-[1.02]">
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Header with icon and title */}
              <div className="relative flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-purple-200 tracking-wide">{metric.label}</h3>
                <div className="p-1.5 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors duration-300">
                  <metric.icon className="w-4 h-4 text-purple-300" />
                </div>
              </div>
              
              {/* Main value */}
              <div className="relative mb-2">
                <p className="text-xl font-bold text-white tracking-tight">{metric.value}</p>
              </div>
              
              {/* Change indicator */}
              <div className="relative flex items-center gap-2">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  isPositive 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                    : isNegative 
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                    : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                }`}>
                  {getTrendIcon(metric.trend)}
                  <span>{Math.abs(metric.change)}%</span>
                </div>
                <span className="text-xs text-purple-400/70">vs previous period</span>
              </div>
              
              {/* Subtle glow effect */}
              <div className={`absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                isPositive ? 'bg-emerald-500' : isNegative ? 'bg-red-500' : 'bg-purple-500'
              } blur-sm`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExecutiveMetrics; 