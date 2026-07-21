import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type JobStatus =
  | "QUEUED"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "RETRYING";

interface StatusBadgeProps {
  status: JobStatus;
}

const statusStyles: Record<JobStatus, string> = {
  QUEUED:
    "bg-slate-100 text-slate-700 hover:bg-slate-100",

  PROCESSING:
    "bg-blue-100 text-blue-700 hover:bg-blue-100",

  COMPLETED:
    "bg-green-100 text-green-700 hover:bg-green-100",

  FAILED:
    "bg-red-100 text-red-700 hover:bg-red-100",

  RETRYING:
    "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "rounded-full px-3 py-1 font-medium",
        statusStyles[status]
      )}
    >
      {status}
    </Badge>
  );
}