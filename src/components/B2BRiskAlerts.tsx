import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, TrendingUpIcon, TrendingDownIcon, MinusIcon, AlertCircleIcon, CheckCircleIcon, ClockIcon, TargetIcon } from "lucide-react";
import { B2BRiskAlert } from "@/types/analytics";

interface B2BRiskAlertsProps {
  data: B2BRiskAlert[];
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

const getRiskColor = (severity: 'high' | 'medium' | 'low') => {
  switch (severity) {
    case 'high': return 'bg-red-500/20 text-red-400 border-red-500/40';
    case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40';
    case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
  }
};

const getRiskIcon = (severity: 'high' | 'medium' | 'low') => {
  switch (severity) {
    case 'high': return <AlertTriangleIcon className="w-5 h-5 text-red-400" />;
    case 'medium': return <AlertCircleIcon className="w-5 h-5 text-yellow-400" />;
    case 'low': return <ClockIcon className="w-5 h-5 text-blue-400" />;
    default: return <MinusIcon className="w-5 h-5 text-gray-400" />;
  }
};

const getTrendIcon = (trend: number) => {
  if (trend > 0) return <TrendingUpIcon className="w-4 h-4 text-green-500" />;
  if (trend < 0) return <TrendingDownIcon className="w-4 h-4 text-red-500" />;
  return <MinusIcon className="w-4 h-4 text-gray-500" />;
};

const B2BRiskAlerts: React.FC<B2BRiskAlertsProps> = ({
  data,
  title = "Risk Alerts Dashboard"
}) => {
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'resolved'>('all');

  const filteredData = data.filter(item => {
    if (filterSeverity !== 'all' && item.severity !== filterSeverity) return false;
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    return true;
  });

  const highRiskCount = data.filter(item => item.severity === 'high').length;
  const mediumRiskCount = data.filter(item => item.severity === 'medium').length;
  const lowRiskCount = data.filter(item => item.severity === 'low').length;
  const activeAlerts = data.filter(item => item.status === 'active').length;
  const resolvedAlerts = data.filter(item => item.status === 'resolved').length;

  const totalImpact = data.reduce((sum, item) => sum + item.impact, 0);
  const avgResponseTime = data.reduce((sum, item) => sum + item.responseTime, 0) / data.length;

  return (
    <Card className="bg-[#1A0B2E]/80 border-[#6D28D9]/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant={filterSeverity === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterSeverity('all')}
              className="bg-[#6D28D9]/20 text-white border-[#6D28D9]/40 hover:bg-[#6D28D9]/30"
            >
              All
            </Button>
            <Button
              variant={filterSeverity === 'high' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterSeverity('high')}
              className="bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/30"
            >
              High
            </Button>
            <Button
              variant={filterSeverity === 'medium' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterSeverity('medium')}
              className="bg-yellow-500/20 text-yellow-400 border-yellow-500/40 hover:bg-yellow-500/30"
            >
              Medium
            </Button>
            <Button
              variant={filterSeverity === 'low' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterSeverity('low')}
              className="bg-blue-500/20 text-blue-400 border-blue-500/40 hover:bg-blue-500/30"
            >
              Low
            </Button>
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
                  <p className="text-gray-400 text-sm">High Risk Alerts</p>
                  <p className="text-white font-semibold text-lg">{highRiskCount}</p>
                </div>
                <AlertTriangleIcon className="w-6 h-6 text-red-400" />
              </div>
            </div>
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-[#6D28D9]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Alerts</p>
                  <p className="text-white font-semibold text-lg">{activeAlerts}</p>
                </div>
                <AlertCircleIcon className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-[#6D28D9]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Impact</p>
                  <p className="text-white font-semibold text-lg">
                    {formatCurrency(totalImpact)}
                  </p>
                </div>
                <TargetIcon className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="bg-[#2D1B69]/30 rounded-lg p-4 border border-[#6D28D9]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg Response Time</p>
                  <p className="text-white font-semibold text-lg">
                    {avgResponseTime.toFixed(1)}h
                  </p>
                </div>
                <ClockIcon className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </div>

          {/* Risk Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-[#2D1B69]/20 rounded-lg p-4 border border-[#6D28D9]/20">
              <h4 className="text-white font-semibold mb-3">Risk Distribution</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-gray-400 text-sm">High Risk</span>
                  </div>
                  <span className="text-white font-medium">{highRiskCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="text-gray-400 text-sm">Medium Risk</span>
                  </div>
                  <span className="text-white font-medium">{mediumRiskCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-gray-400 text-sm">Low Risk</span>
                  </div>
                  <span className="text-white font-medium">{lowRiskCount}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#2D1B69]/20 rounded-lg p-4 border border-[#6D28D9]/20">
              <h4 className="text-white font-semibold mb-3">Alert Status</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircleIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-400 text-sm">Active</span>
                  </div>
                  <span className="text-white font-medium">{activeAlerts}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-400" />
                    <span className="text-gray-400 text-sm">Resolved</span>
                  </div>
                  <span className="text-white font-medium">{resolvedAlerts}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#2D1B69]/20 rounded-lg p-4 border border-[#6D28D9]/20">
              <h4 className="text-white font-semibold mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/30"
                >
                  Review High Risk
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-yellow-500/20 text-yellow-400 border-yellow-500/40 hover:bg-yellow-500/30"
                >
                  Address Active
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-blue-500/20 text-blue-400 border-blue-500/40 hover:bg-blue-500/30"
                >
                  Generate Report
                </Button>
              </div>
            </div>
          </div>

          {/* Alerts List */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Recent Alerts</h4>
            {filteredData.map((alert, index) => (
              <div key={index} className="bg-[#2D1B69]/20 rounded-lg p-4 border border-[#6D28D9]/20">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getRiskIcon(alert.severity)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h5 className="text-white font-medium">{alert.title}</h5>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getRiskColor(alert.severity)}`}
                        >
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={
                            alert.status === 'active' 
                              ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' 
                              : 'bg-green-500/20 text-green-400 border-green-500/40'
                          }
                        >
                          {alert.status}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{alert.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Impact: {formatCurrency(alert.impact)}</span>
                        <span>Response Time: {alert.responseTime}h</span>
                        <span>Detected: {alert.detectedAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(alert.trend)}
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-[#6D28D9]/20 text-white border-[#6D28D9]/40 hover:bg-[#6D28D9]/30"
                    >
                      {alert.status === 'active' ? 'Resolve' : 'View'}
                    </Button>
                  </div>
                </div>
                
                {/* Recommendations */}
                {alert.recommendations && alert.recommendations.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#6D28D9]/20">
                    <h6 className="text-white font-medium mb-2">Recommendations:</h6>
                    <ul className="space-y-1">
                      {alert.recommendations.map((rec, recIndex) => (
                        <li key={recIndex} className="text-gray-400 text-sm flex items-start space-x-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Risk Trends */}
          <div className="bg-[#2D1B69]/20 rounded-lg p-4 border border-[#6D28D9]/20">
            <h4 className="text-white font-semibold mb-3">Risk Trends</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">High Risk Trend</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-white font-medium">+15%</span>
                    <TrendingUpIcon className="w-4 h-4 text-red-500" />
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Response Time</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-white font-medium">-8%</span>
                    <TrendingDownIcon className="w-4 h-4 text-green-500" />
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Resolution Rate</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-white font-medium">+12%</span>
                    <TrendingUpIcon className="w-4 h-4 text-green-500" />
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default B2BRiskAlerts; 