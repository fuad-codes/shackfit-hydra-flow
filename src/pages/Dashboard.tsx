
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Users, DollarSign, Calendar, Dumbbell } from "lucide-react";
import { 
  getDashboardStats, 
  getRecentPayments, 
  getRecentMembers 
} from "@/services/mockData";
import { DataTable } from "@/components/data-table/data-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const stats = getDashboardStats();
  const recentPayments = getRecentPayments();
  const recentMembers = getRecentMembers();

  const memberColumns = [
    { key: "id", title: "ID" },
    { 
      key: "name", 
      title: "Name",
      render: (_: any, record: any) => (
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2 bg-primary">
            <AvatarFallback>{record.firstname.charAt(0)}{record.lastname.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>{record.firstname} {record.lastname}</div>
        </div>
      )
    },
    { key: "email", title: "Email" },
    { key: "gender", title: "Gender" },
    { 
      key: "date_created", 
      title: "Join Date",
      render: (value: string) => new Date(value).toLocaleDateString()
    }
  ];

  const paymentColumns = [
    { key: "id", title: "ID" },
    { key: "member", title: "Member" },
    { 
      key: "amount", 
      title: "Amount",
      render: (value: number) => `₹${value.toLocaleString()}`
    },
    { key: "type", title: "Type" },
    { 
      key: "date", 
      title: "Date",
      render: (value: string) => new Date(value).toLocaleDateString()
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="bg-primary/10 px-3 py-1 rounded-md text-primary">
          ShackFitness Hyderabad
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Members"
          value={stats.totalMembers}
          icon={<Users />}
          trend={stats.memberTrend}
          className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
        />
        <StatCard
          title="Active Members"
          value={stats.activeMembers}
          icon={<Users />}
          className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
        />
        <StatCard
          title="Revenue (This Month)"
          value={`₹${stats.revenueThisMonth.toLocaleString()}`}
          icon={<DollarSign />}
          trend={stats.revenueTrend}
          className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20"
        />
        <StatCard
          title="Total Trainers"
          value={stats.totalTrainers}
          icon={<Dumbbell />}
          className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="animate-scale-in overflow-hidden">
          <CardHeader>
            <CardTitle>Recent Members</CardTitle>
            <CardDescription>Latest members who joined ShackFitness</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={memberColumns} data={recentMembers} />
          </CardContent>
        </Card>

        <Card className="animate-scale-in overflow-hidden">
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Latest payments received</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={paymentColumns} data={recentPayments} />
          </CardContent>
        </Card>
      </div>

      {/* Activity Chart */}
      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle>Member Activity</CardTitle>
          <CardDescription>Member attendance over the past 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-end gap-2 p-4">
            {Array.from({ length: 30 }).map((_, i) => {
              const height = Math.max(20, Math.floor(Math.random() * 150));
              return (
                <div 
                  key={i} 
                  className={cn(
                    "bg-primary/80 hover:bg-primary rounded-t animate-fade-in",
                    i === 29 ? "bg-shack-purple" : ""
                  )}
                  style={{ 
                    height: `${height}px`, 
                    width: "100%",
                    animationDelay: `${i * 30}ms`
                  }}
                />
              );
            })}
          </div>
          <div className="flex justify-between px-4 text-xs text-muted-foreground">
            <div>30 days ago</div>
            <div>Today</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
