import {
  BriefcaseBusiness,
  CheckCircle2,
  XCircle,
  Cpu,
  Loader2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";

export function StatsCards() {
  const { data, isLoading, isError } = useDashboardMetrics();

  const stats = [
    {
      title: "Queue Depth",
      value: data?.queued ?? 0,
      description: "Jobs waiting",
      icon: BriefcaseBusiness,
    },
    {
      title: "Completed",
      value: data?.completed ?? 0,
      description: "Successfully processed",
      icon: CheckCircle2,
    },
    {
      title: "Failed",
      value: data?.failed ?? 0,
      description: "Needs attention",
      icon: XCircle,
    },
    {
      title: "Workers",
      value: data?.workers ?? 0,
      description: "Currently active",
      icon: Cpu,
    },
  ];

  if (isError) {
    return (
      <Card>
        <CardContent className="py-6">
          <p className="text-red-500">
            Failed to load dashboard metrics.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>

                <CardDescription className="mt-1">
                  {stat.description}
                </CardDescription>
              </div>

              <div className="rounded-lg bg-primary/10 p-3">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>

            <CardContent>
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              ) : (
                <p className="text-3xl font-bold tracking-tight">
                  {stat.value.toLocaleString()}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}