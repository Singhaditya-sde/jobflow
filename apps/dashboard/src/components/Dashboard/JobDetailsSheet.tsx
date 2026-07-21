import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { StatusBadge } from "./StatusBadge";
import type { Job } from "@/types/job";

interface Props {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JobDetailsSheet({
  job,
  open,
  onOpenChange,
}: Props) {
  if (!job) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Job Details</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6 px-5">
          <Info label="Job ID" value={job.id} />
          <Info label="Type" value={job.type} />

          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Status
            </p>

            <StatusBadge status={job.status} />
          </div>

          <Info label="Priority" value={String(job.priority)} />
          <Info label="Worker" value={job.worker ?? "Not Assigned"} />
          <Info label="Created" value={job.createdAt} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}