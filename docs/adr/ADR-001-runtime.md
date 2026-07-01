# ADR-001: Runtime Selection

## Status

Accepted

## Context

JobFlow requires a fast development environment while maintaining compatibility with the Node.js ecosystem.

## Decision

The project will use Bun as the runtime and package manager.

All application code will follow Node.js-compatible APIs and avoid Bun-specific runtime features.

## Consequences

Pros

- Faster dependency installation
- Native TypeScript execution
- Excellent developer experience
- Reduced tooling complexity

Cons

- Some ecosystem packages may require additional testing
- Bun-specific APIs are intentionally avoided