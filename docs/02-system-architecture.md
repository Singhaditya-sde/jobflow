# JobFlow System Architecture

## Introduction

JobFlow follows the Producer–Broker–Consumer architecture.

Applications produce jobs through the JobFlow API.

Redis acts as the broker responsible for storing and distributing jobs.

Workers consume jobs from Redis and execute the corresponding background tasks.

This separation allows the system to scale horizontally while keeping the API responsive.

---

# High-Level Architecture

                   Developer Application
                           │
                           ▼
                     JobFlow SDK
                           │
                           ▼
                    JobFlow API Server
                           │
                           ▼
                      Redis Queue
          ┌─────────────────────────────────┐
          │                                 │
     Worker 1                          Worker 2
          │                                 │
          └──────────────┬──────────────────┘
                         ▼
                   Job Handlers
                         │
                         ▼
                    PostgreSQL

                         ▲
                         │
                  Prometheus Metrics
                         │
                         ▼
                      Grafana

                         ▲
                         │
                 React Dashboard

---

# Components

## API Server

Responsibilities

- Accept incoming jobs
- Validate requests
- Generate Job IDs
- Store metadata
- Push jobs into Redis

The API never executes jobs.

---

## Redis

Responsibilities

- Store queued jobs
- Prioritize jobs
- Distribute jobs atomically
- Store delayed jobs
- Track processing jobs
- Maintain the Dead Letter Queue

Redis is the communication layer between producers and workers.

---

## Workers

Responsibilities

- Poll Redis
- Claim jobs
- Execute handlers
- Retry failed jobs
- Update job status
- Send metrics

Workers are stateless and horizontally scalable.

---

## PostgreSQL

Responsibilities

- Store audit logs
- Record job lifecycle events
- Support debugging

Redis is optimized for speed.

PostgreSQL is optimized for persistence.

---

## Prometheus

Responsibilities

- Collect metrics
- Monitor worker health
- Track throughput
- Measure processing latency

---

## Grafana

Responsibilities

- Display metrics
- Visualize queue health
- Visualize failures
- Display retry statistics

---

## Dashboard

Responsibilities

- View jobs
- View workers
- View queues
- Retry failed jobs
- Inspect Dead Letter Queue

---

# Request Lifecycle

Step 1

Developer calls

JobFlow.add()

↓

Step 2

API validates request

↓

Step 3

API stores metadata

↓

Step 4

API inserts job into Redis

↓

Step 5

Worker claims job

↓

Step 6

Worker executes handler

↓

Step 7

Worker updates status

↓

Step 8

Metrics and logs are updated

---

# Engineering Decisions

### EDR-001

Redis is used as the queue because it provides in-memory performance and atomic queue operations.

---

### EDR-002

Workers communicate only with Redis.

Workers never communicate directly with each other.

---

### EDR-003

The API only produces jobs.

It never executes background work.

---

### EDR-004

Workers remain stateless.

This allows horizontal scaling by simply starting additional workers.

---

### EDR-005

Monitoring is separated from job execution.

Metrics collection should never block job processing.