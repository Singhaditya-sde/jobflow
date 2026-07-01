# JobFlow

## Overview

JobFlow is a production-inspired distributed background job processing platform built from scratch using Node.js, Redis, PostgreSQL, and worker threads.

It enables backend applications to execute time-consuming tasks asynchronously without blocking user requests. Applications enqueue jobs through a simple API, while distributed workers process those jobs in the background.

JobFlow is built for learning how modern job queue systems such as BullMQ, Sidekiq, AWS SQS workers, and RabbitMQ consumers work internally.

---

## Why JobFlow?

Modern applications should respond to users as quickly as possible.

Tasks such as:

- Sending emails
- Processing payments
- Generating invoices
- Image processing
- Data synchronization
- Analytics

should not execute inside the request-response lifecycle.

Instead, these tasks should execute asynchronously through a background processing system.

JobFlow provides that capability.

---

## Problem Statement

Without a background job system, backend APIs become slow because they execute long-running tasks before responding.

Example:

User places an order.

Instead of immediately returning a response, the API waits for:

- Email delivery
- Invoice generation
- Analytics update
- Restaurant notification

This increases response time and reduces scalability.

JobFlow solves this problem by decoupling task execution from request handling.

---

## Goals

- Learn distributed systems fundamentals
- Understand how production job queues work internally
- Build a queue without BullMQ or RabbitMQ libraries
- Implement retries and dead-letter queues
- Support multiple distributed workers
- Build production-grade observability
- Demonstrate scalable backend architecture

---

## Core Features

- Priority Queue
- Distributed Workers
- Automatic Retry
- Exponential Backoff
- Dead Letter Queue
- Worker Heartbeats
- Job Leasing
- PostgreSQL Audit Logs
- Prometheus Metrics
- Grafana Dashboard
- React Admin Dashboard

---

## High-Level Architecture

Developer Application

↓

JobFlow API

↓

Redis Queue

↓

Distributed Workers

↓

Job Handlers

↓

PostgreSQL

↓

Prometheus

↓

Grafana Dashboard

---

## Tech Stack

Backend

- Node.js
- Express

Queue

- Redis
- ioredis

Workers

- worker_threads

Database

- PostgreSQL

Monitoring

- Prometheus
- Grafana

Frontend

- React

Deployment

- Docker
- Docker Compose
- Nginx
- EC2

---

## System Components

API

Responsible for accepting new jobs and storing them inside Redis.

Worker

Continuously polls Redis for available jobs and executes them.

Redis

Stores queued jobs, delayed jobs, processing jobs, and dead-letter jobs.

PostgreSQL

Stores audit logs for every job lifecycle event.

Dashboard

Displays queue statistics, worker health, retries, and metrics in real time.

---

## Future Scope

- Scheduled jobs
- Job cancellation
- Rate limiting
- Queue partitioning
- Cron jobs
- Webhooks
- Multi-tenant queues
- SDK for external applications