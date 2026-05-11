# System Architecture

## Overview

The AI Clinical Operations Platform is divided into five layers:

1. Frontend Layer - React.js
2. Backend Layer - Django REST Framework
3. Database Layer - PostgreSQL
4. AI Layer - OpenAI API / Local LLM
5. External Services - WhatsApp, Payments, PDF, Email/SMS

## Main Backend Apps

- accounts
- patients
- doctors
- appointments
- billing
- pharmacy
- labs
- ai_services
- reports

## User Roles

- Admin
- Doctor
- Receptionist
- Lab Staff
- Pharmacist
- Billing Staff
- Patient

## AI Safety

All AI-generated medical content must be reviewed and approved by a licensed doctor.