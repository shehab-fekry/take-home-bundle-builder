# Project Setup & Overview

## Quick Start

### Prerequisites

This project uses **Bun** as the package manager and runtime for both the frontend and backend applications.

### Install Dependencies

```bash
bun install
```

### Start Development Server

```bash
bun run dev
```

---

## Implementation Timeline

The project was completed in **3 days** out of the allocated **7-day timeline**.

### Day 1

- Implemented the backend server.
- Created API endpoints to serve application data.

### Day 2

- Built the frontend user interfaces.
- Implemented responsive layouts and user interactions.

### Day 3

- Configured API integration between frontend and backend.
- Implemented application business logic and state management.

---

## Key Implementations

### Backend

- Built an **Express.js** server to provide API endpoints.
- Served mock data for frontend integration and testing.

### State Management

- Used **Zustand** for global state management.
- Persisted application state using **localStorage** to maintain user selections across page refreshes.

### Business Logic

Implemented dynamic price calculation based on user selections, including:

- Cameras
- Sensors
- Accessories
- Subscription Plan

### User Experience

- Cached system state to improve continuity during page reloads.
- Synchronized user selections and pricing updates throughout the application.