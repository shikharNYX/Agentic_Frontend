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