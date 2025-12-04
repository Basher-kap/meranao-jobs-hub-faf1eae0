import { useState } from "react";
import { 
  BarChart3, Users, Briefcase, TrendingUp, Eye, UserPlus, 
  FileText, Calendar, ArrowUp, ArrowDown, Clock
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/cards/StatCard";
import { OkirPattern } from "@/components/decorative/OkirPattern";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const monthlyData = [
  { name: "Jul", jobs: 45, applications: 320 },
  { name: "Aug", jobs: 52, applications: 410 },
  { name: "Sep", jobs: 78, applications: 580 },
  { name: "Oct", jobs: 92, applications: 720 },
  { name: "Nov", jobs: 85, applications: 650 },
  { name: "Dec", jobs: 67, applications: 490 },
];

const userGrowthData = [
  { name: "Jul", students: 1200, hirers: 45 },
  { name: "Aug", students: 1450, hirers: 52 },
  { name: "Sep", students: 1680, hirers: 68 },
  { name: "Oct", students: 1920, hirers: 82 },
  { name: "Nov", students: 2150, hirers: 95 },
  { name: "Dec", students: 2380, hirers: 108 },
];

const jobCategoryData = [
  { name: "Library", value: 25, color: "hsl(348, 70%, 25%)" },
  { name: "Research", value: 30, color: "hsl(45, 85%, 50%)" },
  { name: "IT Support", value: 20, color: "hsl(145, 45%, 35%)" },
  { name: "Admin", value: 15, color: "hsl(348, 50%, 35%)" },
  { name: "Others", value: 10, color: "hsl(348, 30%, 50%)" },
];

const recentActivity = [
  { action: "New job posted", detail: "Library Assistant at MSU Main Library", time: "2 min ago", type: "job" },
  { action: "Student applied", detail: "John D. applied to IT Help Desk", time: "15 min ago", type: "application" },
  { action: "New hirer registered", detail: "College of Agriculture joined", time: "1 hour ago", type: "user" },
  { action: "Job filled", detail: "Research Assistant position filled", time: "3 hours ago", type: "success" },
  { action: "New student registered", detail: "Maria S. joined the platform", time: "5 hours ago", type: "user" },
];

export default function Admin() {
  const [dateRange, setDateRange] = useState("This Month");

  return (
    <Layout showFooter={false}>
      <div className="bg-muted/30 min-h-screen">
        {/* Header */}
        <section className="bg-gradient-maroon py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-warm/10 border border-gold-warm/30 mb-3">
                  <BarChart3 className="w-4 h-4 text-gold-bright" />
                  <span className="text-gold-bright text-sm font-medium">Admin Dashboard</span>
                </div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-gold-bright">
                  Analytics Overview
                </h1>
                <p className="text-gold-muted/80 mt-1">
                  Monitor platform performance and user engagement
                </p>
              </div>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-maroon-rich text-gold-bright border border-gold-warm/30 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-gold-warm"
              >
                <option>This Week</option>
                <option>This Month</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
              </select>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="container mx-auto px-4 -mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Students"
              value="2,380"
              change="+12.5% from last month"
              changeType="positive"
              icon={Users}
            />
            <StatCard
              title="Active Jobs"
              value="67"
              change="-8.2% from last month"
              changeType="negative"
              icon={Briefcase}
            />
            <StatCard
              title="Applications"
              value="490"
              change="+24.8% from last month"
              changeType="positive"
              icon={FileText}
            />
            <StatCard
              title="Hirers"
              value="108"
              change="+13.7% from last month"
              changeType="positive"
              icon={UserPlus}
            />
          </div>
        </section>

        {/* Charts Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Jobs & Applications Chart */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-foreground">Jobs & Applications</h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    Jobs
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary" />
                    Applications
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="jobs" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="applications" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* User Growth Chart */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-foreground">User Growth</h3>
                <TrendingUp className="w-5 h-5 text-forest-emerald" />
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="students" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="hirers" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--accent))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Bottom Section */}
        <section className="container mx-auto px-4 pb-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Job Categories */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-display font-semibold text-foreground mb-6">Job Categories</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={jobCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {jobCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {jobCategoryData.map((category) => (
                  <div key={category.name} className="flex items-center gap-2 text-sm">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }} 
                    />
                    <span className="text-muted-foreground">{category.name}</span>
                    <span className="ml-auto font-medium">{category.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-foreground">Recent Activity</h3>
                <button className="text-primary text-sm hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      activity.type === "job" ? "bg-primary/10 text-primary" :
                      activity.type === "application" ? "bg-secondary/20 text-secondary-foreground" :
                      activity.type === "success" ? "bg-forest/10 text-forest-emerald" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {activity.type === "job" && <Briefcase className="w-4 h-4" />}
                      {activity.type === "application" && <FileText className="w-4 h-4" />}
                      {activity.type === "user" && <UserPlus className="w-4 h-4" />}
                      {activity.type === "success" && <TrendingUp className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground truncate">{activity.detail}</p>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
