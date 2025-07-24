import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAIAnalytics } from '@/hooks/useAI';
import {
  BarChart, 
  LineChart, 
  PieChart,
  Bar, 
  Line, 
  Pie, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Loader2, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  UtensilsCrossed 
} from 'lucide-react';

export const PredictiveAnalyticsDashboard: React.FC = () => {
  const { data: analytics, isLoading, error } = useAIAnalytics();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading Analytics...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Error loading analytics data.</p>;
  }

  if (!analytics) {
    return <p>No analytics data available.</p>;
  }

  const { customerBehavior, menuPerformance, demandForecast, inventoryInsights } = analytics;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Average Order Value" 
          value={`$${customerBehavior.averageOrderValue.toFixed(2)}`}
          icon={<DollarSign />} 
        />
        <MetricCard 
          title="New Customers" 
          value={customerBehavior.newCustomers.toString()}
          icon={<Users />} 
        />
        <MetricCard 
          title="Customer Retention" 
          value={`${(customerBehavior.retentionRate * 100).toFixed(1)}%`}
          icon={<TrendingUp />} 
        />
        <MetricCard 
          title="Expected Customers Today" 
          value={demandForecast.expectedCustomers.toString()}
          icon={<Users />} 
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Menu Performance" icon={<UtensilsCrossed />}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={menuPerformance.topDishes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#8884d8" name="Orders" />
              <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Demand Forecast" icon={<Clock />}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={demandForecast.predictedBusyHours.map(h => ({ name: h, customers: Math.floor(Math.random() * 50) + 10}))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="customers" stroke="#ff7300" name="Predicted Customers" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Insights */}
      <div className="grid gap-6 md:grid-cols-2">
        <InsightCard 
          title="Underperforming Dishes" 
          icon={<TrendingDown />} 
          items={menuPerformance.underperforming.map(d => `${d.name} (Last ordered: ${d.lastOrdered})`)}
        />
        <InsightCard 
          title="Inventory Insights" 
          icon={<TrendingUp />} 
          items={inventoryInsights.lowStock.map(i => `${i.item} - Low stock, recommend ordering ${i.recommendedOrder}`)}
        />
      </div>
    </motion.div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="text-muted-foreground">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

interface ChartCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, icon, children }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

interface InsightCardProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
}

const InsightCard: React.FC<InsightCardProps> = ({ title, icon, items }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);
