import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useJobs } from "@/hooks/useJobs";
import { type Job } from "@/types/job";

import { StatusBadge } from "./StatusBadge";
import { JobDetailsSheet } from "./JobDetailsSheet";

export function JobsTable() {
  const { data: jobs, isLoading, isError } = useJobs();

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Jobs</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground">
            Loading jobs...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Jobs</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-red-500">
            Failed to load jobs.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Recent Jobs</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Attempts</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {jobs?.map((job) => (
                <TableRow
                  key={job.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => {
                    setSelectedJob(job);
                    setOpen(true);
                  }}
                >
                  <TableCell className="font-medium">
                    {job.id}
                  </TableCell>

                  <TableCell>{job.type}</TableCell>

                  <TableCell>
                    <StatusBadge status={job.status} />
                  </TableCell>

                  <TableCell>{job.priority}</TableCell>

                  <TableCell>{job.attempts ?? 0}</TableCell>

                  <TableCell>
                    {new Date(Number(job.createdAt)).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {jobs?.length === 0 && (
            <div className="py-10 text-center text-muted-foreground">
              No jobs found.
            </div>
          )}
        </CardContent>
      </Card>

      <JobDetailsSheet
        job={selectedJob}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}