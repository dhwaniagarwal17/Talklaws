# TALKLAWS

A modern full-stack corporate law firm website built for **TALKLAWS**, featuring professional legal services, knowledge articles, client engagement, and an integrated administration panel.

## Overview

TALKLAWS is a responsive web platform designed for a corporate law firm. The application combines a modern frontend with a secure backend to manage legal insights, articles, subscribers, and administrative operations.

## Features

### Public Website

- Responsive modern UI
- Service showcase
- Meet the Team
- Founder message
- Client testimonials
- Knowledge articles
- Article categories
- Frequently Asked Questions
- Contact section
- Newsletter subscription
- Privacy Policy
- Terms & Conditions
- Disclaimer

### Admin Dashboard

- Secure authentication
- Dashboard analytics
- Article management
- Subscriber management
- Publish article updates
- Email notifications
- Newsletter management

### Email Integration

- Subscriber management
- Email notifications using Resend
- One-click unsubscribe
- HTML branded email templates

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Resend Email API

## Project Structure

```
TALKLAWS
│
├── talklaws-frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   └── ...
│
├── talklaws-backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── ...
│
└── README.md
```

## Getting Started

### Clone the repository

```bash
git clone <repository-url>
cd TALKLAWS
```

### Frontend

```bash
cd talklaws-frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:3000
```

### Backend

```bash
cd talklaws-backend
npm install
npm run dev
```

Runs on:

```
http://localhost:5000
```

## Environment Variables

The backend uses environment variables stored in `.env`.

An example configuration is available in:

```
.env.example
```

The frontend uses:

```
.env.local
```

## Deployment

### Frontend

Deploy using **Vercel**.

### Backend

Deploy using **Render**.

### Database

MongoDB Atlas

### Email Service

Resend

## Security

Sensitive information such as:

- API keys
- JWT secrets
- Database credentials
- Environment variables

are intentionally excluded from version control using `.gitignore`.

## Author

**Dhwani Agarwal**

Built as a production-ready full-stack web application for TALKLAWS.

---

© TALKLAWS. All rights reserved.