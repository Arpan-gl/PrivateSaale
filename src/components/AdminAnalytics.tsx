import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Briefcase, 
  FileText, 
  DollarSign, 
  Activity,
  PieChart,
  LineChart,
  BarChart,
  Target,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Download,
  Filter
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import axios from '../axios';
import { DemoService, analyticsData } from '../services/demoData';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface AnalyticsData {
  userGrowth: Array<{ date: string; count: number; role: string }>;
  lawyerApplications: Array<{ status: string; count: number }>;
  legalIssues: Array<{ category: string; count: number; avgBudget: number }>;
  systemUsage: Array<{ metric: string; value: number; change: number }>;
  topLawyers: Array<{ username: string; rating: number; cases: number; revenue: number }>;
  recentActivity: Array<{ type: string; description: string; timestamp: string; impact: 'positive' | 'negative' | 'neutral' }>;
}

interface ReportConfig {
  type: string;
  startDate: string;
  endDate: string;
  format: 'pdf' | 'csv' | 'excel';
}

const AdminAnalytics = () => {
  const { toast } = useToast();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('month');
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    type: 'user-registration',
    startDate: '',
    endDate: '',
    format: 'pdf'
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      // Use demo data instead of API call
      const data = await DemoService.getAnalyticsData();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch analytics data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create demo report data
      const reportData = `Analytics Report - ${new Date().toLocaleString()}\n\n` +
        `Total Users: ${analyticsData?.systemUsage.find(u => u.metric === 'totalUsers')?.value || 0}\n` +
        `Total Lawyers: ${analyticsData?.systemUsage.find(u => u.metric === 'totalLawyers')?.value || 0}\n` +
        `Verified Lawyers: ${analyticsData?.systemUsage.find(u => u.metric === 'verifiedLawyers')?.value || 0}\n` +
        `Active Issues: ${analyticsData?.systemUsage.find(u => u.metric === 'activeIssues')?.value || 0}\n` +
        `Total Revenue: $${analyticsData?.systemUsage.find(u => u.metric === 'totalRevenue')?.value?.toLocaleString() || 0}\n\n` +
        `This is a demo report generated in demo mode.`;
      
      const blob = new Blob([reportData], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report-${reportConfig.type}-${new Date().toISOString().split('T')[0]}.${reportConfig.format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast({
        title: "Success",
        description: "Report generated successfully (Demo Mode)",
      });
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive",
      });
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive system analytics and reporting dashboard</p>
        </div>
        <div className="flex gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={generateReport}>
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      {analyticsData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.systemUsage.find(u => u.metric === 'totalUsers')?.value || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">
                  +{analyticsData.systemUsage.find(u => u.metric === 'totalUsers')?.change || 0}%
                </span> from last period
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Lawyers</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.systemUsage.find(u => u.metric === 'totalLawyers')?.value || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">
                  +{analyticsData.systemUsage.find(u => u.metric === 'totalLawyers')?.change || 0}%
                </span> from last period
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.systemUsage.find(u => u.metric === 'activeIssues')?.value || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">
                  +{analyticsData.systemUsage.find(u => u.metric === 'activeIssues')?.change || 0}%
                </span> from last period
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${analyticsData.systemUsage.find(u => u.metric === 'totalRevenue')?.value?.toLocaleString() || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">
                  +{analyticsData.systemUsage.find(u => u.metric === 'totalRevenue')?.change || 0}%
                </span> from last period
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="lawyers">Lawyer Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle>User Growth Over Time</CardTitle>
                <CardDescription>Monthly user and lawyer registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData?.userGrowth.filter(item => item.role === 'user')}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} name="Users" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue & User Growth</CardTitle>
                <CardDescription>Monthly revenue vs user count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData?.revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Area yAxisId="left" type="monotone" dataKey="revenue" stackId="1" stroke="#8884d8" fill="#8884d8" name="Revenue ($)" />
                      <Area yAxisId="right" type="monotone" dataKey="users" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Users" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Legal Issues by Category */}
          <Card>
            <CardHeader>
              <CardTitle>Legal Issues by Category</CardTitle>
              <CardDescription>Distribution of legal issues and average budgets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData?.legalIssues}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="count" fill="#8884d8" name="Issue Count" />
                    <Bar yAxisId="right" dataKey="avgBudget" fill="#82ca9d" name="Avg Budget ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Demographics */}
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>Distribution of user types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Regular Users', value: analyticsData?.systemUsage.find(u => u.metric === 'totalUsers')?.value || 0, fill: '#8884d8' },
                          { name: 'Lawyers', value: analyticsData?.systemUsage.find(u => u.metric === 'totalLawyers')?.value || 0, fill: '#82ca9d' },
                          { name: 'Verified Lawyers', value: analyticsData?.systemUsage.find(u => u.metric === 'verifiedLawyers')?.value || 0, fill: '#ffc658' }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          { name: 'Regular Users', value: analyticsData?.systemUsage.find(u => u.metric === 'totalUsers')?.value || 0, fill: '#8884d8' },
                          { name: 'Lawyers', value: analyticsData?.systemUsage.find(u => u.metric === 'totalLawyers')?.value || 0, fill: '#82ca9d' },
                          { name: 'Verified Lawyers', value: analyticsData?.systemUsage.find(u => u.metric === 'verifiedLawyers')?.value || 0, fill: '#ffc658' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* User Engagement */}
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>User and lawyer growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData?.userGrowth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} name="Users" />
                      <Line type="monotone" dataKey="count" stroke="#82ca9d" strokeWidth={2} name="Lawyers" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Lawyers Tab */}
        <TabsContent value="lawyers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lawyer Applications Status */}
            <Card>
              <CardHeader>
                <CardTitle>Lawyer Applications Status</CardTitle>
                <CardDescription>Current status of lawyer applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analyticsData?.lawyerApplications}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {analyticsData?.lawyerApplications.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658', '#ff7300'][index % 4]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Lawyers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Lawyers</CardTitle>
                <CardDescription>Revenue and case count by lawyer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData?.topLawyers}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="username" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="cases" fill="#8884d8" name="Cases" />
                      <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system activities and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData?.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      {getImpactIcon(activity.impact)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.description}</p>
                      <p className={`text-sm ${getImpactColor(activity.impact)}`}>
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalytics;