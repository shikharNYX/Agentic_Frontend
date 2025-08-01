/**
 * @author Healium Digital
 * Main dashboard page component
 * Handles tab navigation and date range selection
 */

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import CustomerAnalytics from '@/components/CustomerAnalytics';
import ExecutiveMetrics from '@/components/ExecutiveMetrics';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 11, 31)
  });

  const [viewMode, setViewMode] = useState<'b2c' | 'b2b'>('b2c');

  const metrics = ['Impressions', 'Clicks', 'Conversions'];
  const [selectedMetrics, setSelectedMetrics] = useState(['Impressions']);

  const toggleMetric = (metric) => {
    if (selectedMetrics.includes(metric)) {
      setSelectedMetrics(selectedMetrics.filter((m) => m !== metric));
    } else {
      setSelectedMetrics([...selectedMetrics, metric]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B14] p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col">
          {/* Title and Export */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">
              Analytics Command Center
            </h1>
            <button className="px-4 py-2 text-sm font-medium text-purple-300 bg-[#2D1B69]/30 rounded-lg border border-[#6D28D9]/20 hover:bg-[#2D1B69]/50 transition-all duration-200">
              Export Report
            </button>
          </div>

          {/* Navigation and Filters */}
          <div className="flex flex-col gap-6">
            {/* Tab Navigation */}
            <Tabs defaultValue="campaign" className="w-full">
              <TabsList className="flex w-fit space-x-8 mb-6 bg-transparent border-b border-[#6D28D9]/20 h-auto p-0">
                <TabsTrigger 
                  value="campaign" 
                  className="relative px-4 py-2 text-lg font-medium text-purple-300/60 hover:text-purple-300 data-[state=active]:text-purple-300 data-[state=active]:shadow-none bg-transparent border-0 transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#6D28D9] after:to-[#4F46E5] after:opacity-0 data-[state=active]:after:opacity-100"
                >
                  Campaign Analytics
                </TabsTrigger>
                <TabsTrigger 
                  value="customer" 
                  className="relative px-4 py-2 text-lg font-medium text-purple-300/60 hover:text-purple-300 data-[state=active]:text-purple-300 data-[state=active]:shadow-none bg-transparent border-0 transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#6D28D9] after:to-[#4F46E5] after:opacity-0 data-[state=active]:after:opacity-100"
                >
                  Customer Analytics
                </TabsTrigger>
                              <TabsTrigger 
                value="executive" 
                className="relative px-4 py-2 text-lg font-medium text-purple-300/60 hover:text-purple-300 data-[state=active]:text-purple-300 data-[state=active]:shadow-none bg-transparent border-0 transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#6D28D9] after:to-[#4F46E5] after:opacity-0 data-[state=active]:after:opacity-100"
              >
                Executive Dashboard
              </TabsTrigger>
              </TabsList>

              {/* Filters */}
              <div className="flex items-center gap-4">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[200px] bg-[#2D1B69]/30 text-purple-300 border-[#6D28D9]/20 hover:bg-[#2D1B69]/50 transition-all duration-200">
                    <SelectValue>All Channels</SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A0B2E] border-[#6D28D9]/20">
                    <SelectItem value="all" className="text-purple-300 focus:bg-[#2D1B69]/30 focus:text-purple-300">All Channels</SelectItem>
                    <SelectItem value="google" className="text-purple-300 focus:bg-[#2D1B69]/30 focus:text-purple-300">Google</SelectItem>
                    <SelectItem value="meta" className="text-purple-300 focus:bg-[#2D1B69]/30 focus:text-purple-300">Meta</SelectItem>
                    <SelectItem value="linkedin" className="text-purple-300 focus:bg-[#2D1B69]/30 focus:text-purple-300">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="last30">
                  <SelectTrigger className="w-[160px] bg-[#2D1B69]/30 text-purple-300 border-[#6D28D9]/20 hover:bg-[#2D1B69]/50 transition-all duration-200">
                    <SelectValue>Last 30 Days</SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A0B2E] border-[#6D28D9]/20">
                    <SelectItem value="last7" className="text-purple-300 focus:bg-[#2D1B69]/30 focus:text-purple-300">Last 7 Days</SelectItem>
                    <SelectItem value="last30" className="text-purple-300 focus:bg-[#2D1B69]/30 focus:text-purple-300">Last 30 Days</SelectItem>
                    <SelectItem value="last90" className="text-purple-300 focus:bg-[#2D1B69]/30 focus:text-purple-300">Last 90 Days</SelectItem>
                    <SelectItem value="custom" className="text-purple-300 focus:bg-[#2D1B69]/30 focus:text-purple-300">Custom Range</SelectItem>
                  </SelectContent>
                </Select>

                {/* B2B/B2C Toggle */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="view-mode" className={`text-purple-300 ${viewMode === 'b2c' ? 'font-semibold text-purple-200' : ''}`}>B2C</Label>
                    <Switch
                      id="view-mode"
                      checked={viewMode === 'b2b'}
                      onCheckedChange={(checked) => setViewMode(checked ? 'b2b' : 'b2c')}
                    />
                    <Label htmlFor="view-mode" className={`text-purple-300 ${viewMode === 'b2b' ? 'font-semibold text-purple-200' : ''}`}>B2B</Label>
                  </div>
                  <Badge variant="outline" className={`border-purple-500/30 ${viewMode === 'b2b' ? 'bg-purple-500/20 text-purple-200' : 'bg-blue-500/20 text-blue-200'}`}>
                    {viewMode === 'b2b' ? 'B2B Mode' : 'B2C Mode'}
                  </Badge>
                </div>
              </div>

              <TabsContent value="campaign">
                <AnalyticsDashboard dateRange={dateRange} viewMode={viewMode} />
              </TabsContent>
              
              <TabsContent value="customer">
                <CustomerAnalytics dateRange={dateRange} viewMode={viewMode} />
              </TabsContent>

              <TabsContent value="executive">
                <ExecutiveMetrics dateRange={dateRange} viewMode={viewMode} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;