<div align="center">

# 🚀 JobFlow

### Distributed Background Job Processing Platform Built From Scratch

<p align="center">
A production-inspired distributed job processing platform that demonstrates how modern background task systems work internally without relying on BullMQ or similar libraries.
</p>

<p align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-Runtime-black?style=for-the-badge&logo=bun)
![Redis](https://img.shields.io/badge/Redis-Queue-red?style=for-the-badge&logo=redis)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Grafana](https://img.shields.io/badge/Grafana-Monitoring-orange?style=for-the-badge&logo=grafana)
![Prometheus](https://img.shields.io/badge/Prometheus-Metrics-E6522C?style=for-the-badge&logo=prometheus)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</p>

</div>

---

# 📖 About

JobFlow is a distributed background job processing platform built completely from scratch using **Node.js, Bun, TypeScript, Redis, PostgreSQL, React, Prometheus, and Grafana**.

Instead of using existing job queue libraries like **BullMQ**, JobFlow implements the core building blocks internally to understand how production-grade background processing systems are designed.

The project demonstrates concepts commonly used in companies such as Uber, Swiggy, Razorpay, Amazon, and Netflix.

---

# ✨ Features

- 🚀 Priority-based Job Scheduling using Redis Sorted Sets
- 👷 Distributed Background Workers
- 🔄 Automatic Retry with Exponential Backoff
- 💀 Dead Letter Queue (DLQ)
- 📦 PostgreSQL Audit Logging
- 📊 React Dashboard for Job Monitoring
- 📈 Prometheus Metrics Collection
- 📉 Grafana Monitoring Dashboard
- ⚡ Bun Workspace Monorepo
- 🏗️ Modular Architecture

---

# 🛠 Tech Stack

| Layer | Technology |
|--------|------------|
| Runtime | Bun |
| Backend | Node.js + Express |
| Language | TypeScript |
| Queue | Redis Sorted Sets |
| Database | PostgreSQL |
| Frontend | React + Vite |
| UI | Tailwind CSS + shadcn/ui |
| Monitoring | Prometheus |
| Visualization | Grafana |
| Package Management | Bun Workspaces |

---

# 🏗 System Architecture

```mermaid
flowchart LR

Client --> API

API --> Redis

Redis --> Worker

Worker --> PostgreSQL

API --> Dashboard

API --> Prometheus

Prometheus --> Grafana
```

---

# 🔄 Job Lifecycle

```text
               Create Job
                    │
                    ▼
              REST API Server
                    │
                    ▼
          Redis Priority Queue
                    │
                    ▼
          Background Worker
          ┌─────────┴─────────┐
          │                   │
          ▼                   ▼
     Completed           Processing Failed
                              │
                              ▼
                    Retry with Backoff
                              │
                              ▼
                  Dead Letter Queue (DLQ)
```

---

# 📂 Project Structure

```text
jobflow/
│
├── apps/
│   ├── api/
│   ├── worker/
│   └── dashboard/
│
├── packages/
│   ├── shared/
│   └── sdk/
│
├── infrastructure/
│   ├── grafana/
│   ├── prometheus/
│   └── postgres/
│
├── docs/
│   ├── architecture/
│   └── adr/
│
├── docker/
│
├── scripts/
│
└── README.md
```

---

# 📸 Dashboard

## Dashboard Overview

![Dashboard Overview](docs/images/dashboard.png)

---

## Grafana Dashboard

![Grafana Dashboard Overview](docs/images/grafana.png)

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/jobs` | Create a Job |
| GET | `/jobs` | Get All Jobs |
| GET | `/jobs/:id` | Get Job by ID |
| GET | `/dashboard/metrics` | Dashboard Metrics |
| GET | `/metrics` | Prometheus Metrics |

---

# 📊 Monitoring

JobFlow provides built-in observability.

Metrics collected include:

- Total Jobs
- Completed Jobs
- Failed Jobs
- Retry Count
- Queue Size
- Processing Time
- Worker Throughput

Visualized using:

- Prometheus
- Grafana

---

# 🚀 Getting Started

## Prerequisites

- Bun
- Redis
- PostgreSQL

---

## Clone Repository

```bash
git clone https://github.com/<your-username>/jobflow.git

cd jobflow
```

---

## Install Dependencies

```bash
bun install
```

---

## Configure Environment

Create

```bash
.env
```

Example

```env
PORT=3000

REDIS_URL=redis://localhost:6379

DATABASE_URL=postgres://jobflow:jobflow@localhost:5432/jobflow
```

---

## Start API

```bash
bun run dev:api
```

---

## Start Worker

```bash
bun run dev:worker
```

---

## Start Dashboard

```bash
bun run dev:dashboard
```

---

# 🧪 Build

```bash
bun run build
```

---

# 📈 Future Roadmap

## v1.1

- Docker Compose
- Retry Job
- Search & Filters
- Pagination

---

## v1.2

- Server-Sent Events (SSE)
- Authentication
- Role-Based Access Control

---

## v2

- Kubernetes Deployment
- Horizontal Worker Scaling
- Multi-Tenant Queue Support
- Rate Limiting
- Worker Autoscaling

---

# 📚 Lessons Learned

Building JobFlow provided practical experience with:

- Distributed Systems
- Redis Data Structures
- Worker-based Architectures
- Priority Scheduling
- Retry Strategies
- Dead Letter Queues
- Monitoring & Observability
- Monorepo Management
- Production-ready Backend Design

---

# 🎯 Why This Project?

Most background job systems rely on libraries like BullMQ.

The goal of JobFlow was to understand how these systems actually work internally by implementing the core components from scratch, including queue management, worker processing, retries, monitoring, and observability.

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

If you have suggestions for improvements, feel free to open an issue or submit a pull request.

---

# 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

### ⭐ If you found this project interesting, consider giving it a star!

Built with ❤️ using Bun, TypeScript, Redis, PostgreSQL, React, Prometheus & Grafana.

</div>