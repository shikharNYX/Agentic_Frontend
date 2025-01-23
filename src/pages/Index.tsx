/**
 * @author Healium Digital
 * Main dashboard page component
 * Handles tab navigation and date range selection
 */

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 11, 31)
  });

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
              Analytics Dashboard
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
              </div>

              <TabsContent value="campaign">
                <AnalyticsDashboard dateRange={dateRange} />
              </TabsContent>
              
              <TabsContent value="customer">
                <div className="grid gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Insights</CardTitle>
                      <CardDescription>
                        View detailed customer behavior and demographics data.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Customer data visualization coming soon...</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;