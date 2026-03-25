# Hospital Management System: Enterprise Healthcare Platform

![Medical Dashboard](https://via.placeholder.com/1200x600?text=HMS+Enterprise+Dashboard)

## 🏥 The Moat: Complexity & Scale

**HMS** is more than a CRUD app; it's a full-scale healthcare administrative tool designed for multi-tenant environments.

### Technical Deep-Dive:
1.  **Multi-Role Access Control (RBAC)**: Implemented complex middleware to handle 3 distinct personas: **Admins** (system-wide), **Doctors** (patient-focused), and **Patients** (self-service).
2.  **FHIR-Inspired Schema**: Designed the MongoDB schema with healthcare interoperability in mind, ensuring data integrity across 10,000+ potential patient records.
3.  **Real-Time Bed Tracking**: Integrated WebSockets to provide live updates on ward availability and emergency admissions.
4.  **Analytics Dashboard**: Uses `Chart.js` to provide administrators with real-time visualizations of ward occupancy, revenue trends, and staff performance.

## 🛠️ Tech Stack

- **Frontend**: React, Chart.js, Tailwind.
- **Backend**: Node.js, Express.
- **Database**: MongoDB (Mongoose).
- **Authentication**: JWT & Role-based Middleware.

## 📦 Core Features

- **Patient Registration**: End-to-end patient onboarding and record management.
- **Appointment Lifecycle**: Scheduling, cancellation, and automated reminders.
- **Billing Engine**: Automated invoice generation based on services rendered.
- **Admin Control Panel**: Advanced auditing and system configuration.

## 🚀 Getting Started

1.  **Backend Setup**:
    ```bash
    cd backend && npm install && npm start
    ```
2.  **Frontend Setup**:
    ```bash
    cd frontend && npm install && npm run dev
    ```

---
*Efficient healthcare management through technology.*
