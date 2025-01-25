/**
 * @author Healium Digital
 * Funnel Chart Component
 * Visualizes conversion funnel with stages and metrics
 */

import React from 'react';
import { ResponsiveFunnel } from '@nivo/funnel';

interface FunnelData {
  id: string;
  value: number;
  label: string;
}

interface TooltipProps {
  part: {
    data: FunnelData;
    formattedValue: string | number;
    color: string;
  };
}

const CustomTooltip = ({ part }: TooltipProps): JSX.Element | null => {
  if (!part || !part.data) return null;
  
  const maxValue = part.data.value;
  const percentage = ((part.data.value / maxValue) * 100).toFixed(1);
  
  return (
    <div className="bg-[#1A0B2E] text-white p-3 rounded-lg shadow-lg border border-[#4A148C]">
      <p className="font-bold text-base">{part.data.label} ({percentage}%)</p>
      <p className="text-sm mt-1">Value: {part.data.value.toLocaleString()}</p>
    </div>
  );
};

interface FunnelChartProps {
  data?: FunnelData[];
  colors?: string[];
  margin?: { top: number; right: number; bottom: number; left: number };
  direction?: 'horizontal' | 'vertical';
  interpolation?: 'smooth' | 'linear';
}

const defaultData: FunnelData[] = [
  {
    id: "Impressions",
    value: 15420,
    label: "Impressions"
  },
  {
    id: "Clicks",
    value: 8750,
    label: "Clicks"
  },
  {
    id: "Conversions",
    value: 3200,
    label: "Conversions"
  }
];

const FunnelChart: React.FC<FunnelChartProps> = ({
  data = defaultData,
  colors = ['#2D1B69', '#4C1D95', '#6D28D9'],
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
  direction = 'horizontal',
  interpolation = 'smooth'
}) => {
  const maxValue = data[0]?.value || 0;

  return (
    <div style={{ width: '100%', height: '400px', minWidth: '600px' }}>
      <ResponsiveFunnel
        data={data}
        margin={margin}
        direction={direction}
        colors={colors}
        interpolation={interpolation}
        valueFormat=">-.0f"
        beforeSeparatorLength={30}
        beforeSeparatorOffset={20}
        afterSeparatorLength={30}
        afterSeparatorOffset={20}
        motionConfig="gentle"
        borderWidth={0}
        enableLabel={true}
        labelColor="#E9D5FF"
        label={({ data: d }) => {
          const percentage = ((d.value / maxValue) * 100).toFixed(1);
          return `${d.label} (${percentage}%)`;
        }}
        theme={{
          labels: {
            text: {
              fontSize: 14,
              fill: '#E9D5FF',
              fontWeight: 600
            }
          }
        }}
        tooltip={CustomTooltip}
      />
    </div>
  );
};

export default FunnelChart;