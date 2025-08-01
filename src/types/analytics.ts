/**
 * @author Healium Digital
 * Analytics Types
 */

export interface DateRange {
  from: Date;
  to: Date;
}

export interface MetricData {
  label: string;
  value: string;
  percentage: string;
  trend: 'up' | 'down';
}

export interface ChartData {
  name: string;
  value: number;
  value2: number;
}

export interface RegionData {
  country: string;
  flag: string;
  metrics: {
    ctr: string;
    cpc: string;
    cpm: string;
  };
  change: {
    ctr: number;
    cpc: number;
    cpm: number;
  };
  positive: {
    ctr: boolean;
    cpc: boolean;
    cpm: boolean;
  };
}

export interface CountryPerformance {
  name: string;
  flag: string;
  value: string;
  change: number;
  positive: boolean;
  status: 'High' | 'Medium' | 'Low';
}

export interface FunnelData {
  name: string;
  value: number;
  percentage: string;
  fill: string;
}

export interface AnalyticsResponse {
  metrics: MetricData[];
  chartData: ChartData[];
  regions: RegionData[];
  countryPerformance: CountryPerformance[];
  funnelData: FunnelData[];
}

// B2B Specific Types
export interface B2BMetric {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
  format?: 'currency' | 'percentage' | 'number' | 'decimal';
}

export interface B2BSummaryMetrics {
  marketing: {
    totalSpend: B2BMetric;
    mqls: B2BMetric;
    cpl: B2BMetric;
    sqlConversionRate: B2BMetric;
  };
  sales: {
    sqls: B2BMetric;
    opportunities: B2BMetric;
    revenue: B2BMetric;
    dealWinRate: B2BMetric;
    roi: B2BMetric;
  };
}

export interface B2BPlatformData {
  platform: string;
  spend: number;
  leadsGenerated: number;
  cpl: number;
  sqlPercentage: number;
  roi: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  status: 'excellent' | 'good' | 'average' | 'poor';
}

export interface B2BFunnelStage {
  count: number;
  conversionRate: number;
  value: number;
}

export interface B2BFunnelData {
  campaign: string;
  stages: {
    mql: B2BFunnelStage;
    sql: B2BFunnelStage;
    opportunity: B2BFunnelStage;
    closedWon: B2BFunnelStage;
  };
  totalValue: number;
  overallConversionRate: number;
}

export interface B2BPipelineData {
  platform: string;
  campaign: string;
  revenue: number;
  volume: number;
  conversionRate: number;
  avgDealSize: number;
  trend: number;
}

export interface B2BLeadQualityData {
  scoreRange: string;
  volume: number;
  avgScore: number;
  conversionRate: number;
  trend: number;
}

export interface B2BAccountEngagementData {
  accountName: string;
  contactPerson: string;
  industry: string;
  companySize: string;
  engagementScore: number;
  revenue: number;
  revenueTrend: number;
  touchpoints: number;
  lastActivity: string;
  status: string;
}

export interface B2BSalesCycleData {
  segment: string;
  mqlToSql: number; // days
  sqlToOpportunity: number; // days
  opportunityToClose: number; // days;
  totalCycle: number; // days
  conversionRate: number;
  avgDealSize: number;
  trend: number;
}

export interface B2BGeographyData {
  region: string;
  country: string;
  mqls: number;
  sqls: number;
  winRate: number;
  avgDealSize: number;
  roi: number;
}

export interface B2BSegmentData {
  segment: string;
  cpl: number;
  sqlPercentage: number;
  closeRate: number;
  dealSize: number;
  roi: number;
  volume: number;
}

export interface B2BAttributionData {
  channel: string;
  firstTouch: number;
  lastTouch: number;
  multiTouch: number;
  pipelineContribution: number;
  revenueAttribution: number;
}

export interface B2BForecastData {
  date: string;
  predictedMqls: number;
  predictedSqls: number;
  predictedRevenue: number;
  confidenceLower: number;
  confidenceUpper: number;
}

export interface B2BRiskAlert {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  impact: number;
  responseTime: number;
  detectedAt: string;
  status: 'active' | 'resolved';
  trend: number;
  recommendations: string[];
}

export interface B2BContentPerformance {
  asset: string;
  type: 'webinar' | 'whitepaper' | 'case_study' | 'blog' | 'video';
  leads: number;
  engagement: number;
  conversionRate: number;
  roi: number;
}

export interface B2BABMMetrics {
  targetAccounts: number;
  penetratedAccounts: number;
  penetrationRate: number;
  avgEngagementScore: number;
  campaignRoi: number;
  pipelineValue: number;
}

export interface B2BSalesAlignment {
  leadAcceptanceRate: number;
  avgResponseTime: number;
  leadQualityScore: number;
  salesCycleLength: number;
  conversionRate: number;
}

export interface B2BCustomerSuccess {
  healthScore: number;
  nps: number;
  csat: number;
  renewalRate: number;
  upsellRevenue: number;
  expansionMrr: number;
} 