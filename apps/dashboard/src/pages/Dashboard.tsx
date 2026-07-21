import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { StatsCards } from "@/components/Dashboard/StatsCards";
import { JobsTable } from "@/components/Dashboard/JobsTable";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <StatsCards />
        <JobsTable />
      </div>
    </DashboardLayout>
  );
}