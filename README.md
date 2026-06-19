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

## Project Structure

The project is split into two independent applications:

- **Backend**: Express.js API server responsible for serving application data.
- **Frontend**: Next.js application responsible for rendering the UI and managing user interactions.

### Backend Structure

```text
backend/
├── public/
│   └── images/              # Product and UI assets served statically
├── scripts/
│   └── enforce-bun.js       # Prevents usage of package managers other than Bun
├── src/
│   ├── controllers/
│   │   └── index.ts         # Request handlers and API business logic
│   ├── data/
│   │   └── index.json       # Mock data source used by the API
│   ├── middlewares/
│   │   └── error-handler.ts # Global error handling middleware
│   ├── routes/
│   │   └── index.ts         # API route definitions
│   └── app.ts               # Express application entry point
└── package.json
```

#### Backend Responsibilities

- Serves product and plan data through REST APIs.
- Hosts static assets such as camera and sensor images.
- Centralizes route registration and error handling.
- Uses a JSON file as a lightweight mock database.

---

### Frontend Structure

```text
frontend/
├── app/
│   ├── layout.tsx           # Root application layout
│   ├── page.tsx             # Main page entry
│   └── globals.css          # Global styles
├── libs/
│   └── utils.ts             # Shared utility functions
├── public/
│   ├── fonts/               # Custom fonts
│   └── images/              # Static UI assets
├── scripts/
│   └── enforce-bun.js       # Prevents usage of package managers other than Bun
├── src/
│   ├── components/
│   │   ├── accordion/       # Accordion UI components
│   │   ├── cards/           # Product and plan cards
│   │   ├── counter/         # Quantity selector component
│   │   ├── divider/         # Shared divider component
│   │   ├── providers/       # Application providers
│   │   ├── spinner/         # Loading indicator
│   │   └── summery/         # Order summary panel
│   ├── core/
│   │   ├── apis/            # API integration layer
│   │   ├── constants/       # Shared constants
│   │   └── store/           # Zustand global store
└── package.json
```

#### Frontend Responsibilities

- Implements the multi-step product selection experience.
- Fetches data from the backend API.
- Manages global application state using Zustand.
- Persists user selections in localStorage.
- Calculates and displays the final order total.
- Provides reusable and modular UI components for maintainability.

---

## Implementation Timeline

The project was completed in **3 days** out of the allocated **7-day timeline**.

### Day 1

- Implemented the backend server.
- Created API endpoint to serve application data.

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