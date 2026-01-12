# Personality Quiz Application

A full-stack personality quiz application that helps users discover their personality type through a series of weighted questions. Built with Next.js, NestJS, and PostgreSQL.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red)](https://nestjs.com/)
[![Material-UI](https://img.shields.io/badge/MUI-5-blue)](https://mui.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Docker Deployment](#docker-deployment)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

The Personality Quiz application allows users to discover their personality type by answering 10 carefully designed questions. Each question has a weight (1-5) and multiple options that contribute points toward different personality types.

### Personality Types

1. **The Architect** - Logical, analytical, and strategic thinker
2. **The Adventurer** - Spontaneous, creative, and free-spirited
3. **The Guardian** - Responsible, caring, and dependable
4. **The Visionary** - Innovative, ambitious, and forward-thinking

---

## ✨ Features

### Frontend

- 🎨 Modern, responsive Material-UI design
- 📱 Mobile-first approach
- 🎭 Smooth animations and transitions
- 🔄 Real-time form validation
- 📊 Interactive results visualization
- 🎯 SEO optimized
- ♿ Accessibility compliant
- 🌐 Share results functionality

### Backend

- 🏗️ RESTful API architecture
- 🔐 Input validation with class-validator
- 🗄️ PostgreSQL database with Prisma ORM
- 🔄 AutoMapper for DTO/Entity mapping
- 📝 Comprehensive error handling
- 🎯 Weighted scoring algorithm
- 🏥 Health checks
- 📚 Database seeding

---

## 🛠 Tech Stack

### Frontend

- **Framework:** Next.js 14 (Pages Router)
- **UI Library:** Material-UI (MUI) 5
- **Language:** TypeScript
- **HTTP Client:** Axios
- **Styling:** Emotion (CSS-in-JS)
- **Icons:** Material Icons

### Backend

- **Framework:** NestJS 10
- **Database:** PostgreSQL 15
- **ORM:** Prisma 5
- **Validation:** class-validator, class-transformer
- **Mapping:** AutoMapper
- **Language:** TypeScript

### DevOps

- **Containerization:** Docker, Docker Compose
- **Version Control:** Git

---

## 📁 Project Structure

```
personality-quiz-app/                  # Root folder
├── backend/                           # NestJS backend application
│   ├── src/
│   │   ├── main.ts                    # Application entry point
│   │   ├── app.module.ts              # Root module
│   │   ├── prisma/                    # Prisma module
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   │
│   │   ├── personalities/             # Personalities module
│   │   │   ├── repositories/          # Module repository folder
│   │   │   │   └── personality.repository.ts
│   │   │   ├── personalities.module.ts
│   │   │   ├── personalities.controller.ts
│   │   │   ├── personalities.controller.spec.ts
│   │   │   ├── personalities.service.ts
│   │   │   ├── personalities.service.spec.ts
│   │   │   ├── mapper/
│   │   │   │   └── personality.mapper.ts
│   │   │   ├── dto/
│   │   │   │   └── personality.dto.ts
│   │   │   └── entities/
│   │   │       └── personality.entity.ts
│   │   │
│   │   ├── questions/                 # Questions module
│   │   │   ├── repositories/          # Module repository folder
│   │   │   │   └── question.repository.ts
│   │   │   ├── questions.module.ts
│   │   │   ├── questions.controller.ts
│   │   │   ├── questions.controller.spec.ts
│   │   │   ├── questions.service.ts
│   │   │   ├── questions.service.spec.ts
│   │   │   ├── mapper/
│   │   │   │   └── question.mapper.ts
│   │   │   ├── dto/
│   │   │   │   ├── question.dto.ts
│   │   │   │   └── option.dto.ts
│   │   │   └── entities/
│   │   │       ├── question.entity.ts
│   │   │       └── option.entity.ts
│   │   │
│   │   └── quiz/                      # Quiz module (all singular)
│   │       ├── repositories/          # Module repository folder
│   │       │   └── quiz.repository.ts
│   │       ├── quiz.module.ts
│   │       ├── quiz.controller.ts
│   │       ├── quiz.controller.spec.ts
│   │       ├── quiz.service.ts
│   │       ├── quiz.service.spec.ts
│   │       ├── mapper/
│   │       │   └── quiz.mapper.ts
│   │       ├── dto/
│   │       │   ├── submit-answer.dto.ts
│   │       │   └── quiz-result.dto.ts
│   │       └── entities/
│   │           └── quiz-result.entity.ts
│   │
│   ├── prisma/
│   │   ├── schema.prisma              # Database schema
│   │   └── seed.ts                    # Database seeder
│   ├── .env                           # Backend environment variables
│   ├── .env.example                   # Backend env template
│   ├── Dockerfile                     # Production Dockerfile
│   ├── Dockerfile.dev                 # Development Dockerfile
│   ├── docker-compose.yml             # Docker Compose file
│   ├── docker-compose-dev.yml         # Development Docker Compose file
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                           # Next.js frontend application
│   ├── pages/                          # Next.js pages
│   │   ├── api/                        # API utilities
│   │   │   └── api.ts                  # API client
│   │   ├── _app.tsx                     # App wrapper with providers
│   │   ├── _document.tsx                # HTML document structure
│   │   ├── index.tsx                    # Landing page
│   │   ├── quiz.tsx                     # Quiz page
│   │   └── result.tsx                   # Results page
│   │
│   ├── components/                      # React components
│   │   ├── QuizPageContent.tsx
│   │   ├── ResultPageContent.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   │
│   ├── styles/                          # Global styles
│   │   └── globals.css
│   │
│   ├── types/                           # TypeScript type definitions
│   │   └── quiz.ts
│   │
│   ├── public/                          # Static assets
│   ├── Dockerfile                        # Production Dockerfile
│   ├── Dockerfile.dev                    # Development Dockerfile
│   ├── docker-compose.yml                # Docker Compose file
│   ├── docker-compose-dev.yml            # Development Docker Compose
│   ├── package.json
│   ├── next.config.ts
│   ├── .env                              # Production environment variables
│   └── .env.local                        # Local environment variables
│
├── .env                                  # Root environment variables (optional / shared)
├── .env.local                            # Root env template
├── Dockerfile                            # Multi-service Dockerfile (optional)
├── docker-compose.yml                    # Root Docker Compose
├── docker-compose-dev.yml                # Root Dev Compose
└── README.md                             # Project documentation


---

## 📦 Prerequisites

### For Local Development

- **Node.js** 18.x or higher
- **npm** or **yarn**
- **PostgreSQL** 14.x or higher

### For Docker Deployment

- **Docker** 20.10+
- **Docker Compose** 2.0+

---

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/personality-quiz.git
cd personality-quiz

# 2. Setup environment variables
cp .env.local .env

# 3. Start all services
docker-compose up -d

# 4. Run database migrations and seed
docker-compose exec backend npx prisma migrate deploy
docker-compose exec backend npx prisma db seed

# 5. Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# Database: localhost:5432
```

### Using Make (Alternative)

```bash
# Quick start everything
make quick-start

# View logs
make logs

# Stop services
make down
```

---

## 💻 Installation

### Local Development Setup

#### Backend Setup

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.local .env

# Edit .env with your configuration:
# DB_USER=postgres
# DB_PASSWORD=postgres
# DB_NAME=personality_quiz
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/personality_quiz"
# BACKEND_PORT=5000

# 4. Create PostgreSQL database
createdb personality_quiz

# 5. Run migrations
npm run prisma:migrate

# 6. Generate Prisma Client
npm run prisma:generate

# 7. Seed the database
npm run prisma:seed

# 8. Start development server
npm run start:dev

# Backend will run on http://localhost:5000
```

#### Frontend Setup

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.local .env

# Edit .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:5000

# 4. Start development server
npm run dev

# Frontend will run on http://localhost:3000
```

---

## ⚙️ Configuration

### Environment Variables

#### Root Level (`.env`)

```env
# Database
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=personality_quiz
DB_PORT=5432

# Backend
BACKEND_PORT=5000
NODE_ENV=production

# Frontend
FRONTEND_PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:5000

# CORS
CORS_ORIGIN=http://localhost:3000
```

#### Backend (`.env`)

```env
# Database Connection
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/personality_quiz?schema=public"

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=debug
```

#### Frontend (`.env.local`)

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000

# Environment
NODE_ENV=development
```

---

## 🏃 Running the Application

### Development Mode

#### Option 1: Docker Compose (Recommended)

```bash
# Start all services in development mode
docker-compose -f docker-compose.dev.yml up

# Or with detached mode
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.dev.yml down
```

#### Option 2: Manual (Two Terminals)

**Terminal 1 - Backend:**

```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

### Production Mode

```bash
# Using Docker Compose
docker-compose up -d

# Or build first
docker-compose build
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

---

## 🐳 Docker Deployment

### Production Deployment

```bash
# 1. Configure environment
cp .env.local .env
# Edit .env with production values

# 2. Build images
docker-compose build --no-cache

# 3. Start services
docker-compose up -d

# 4. Run migrations
docker-compose exec backend npx prisma migrate deploy

# 5. Seed database (optional)
docker-compose exec backend npx prisma db seed

# 6. Check health
docker-compose ps
```

### Service Ports

| Service       | Port | Description                    |
| ------------- | ---- | ------------------------------ |
| Frontend      | 3000 | Next.js application            |
| Backend       | 5000 | NestJS API                     |
| PostgreSQL    | 5432 | Database                       |
| Prisma Studio | 5555 | Database GUI (dev only)        |
| pgAdmin       | 5050 | Database management (dev only) |

### Docker Commands

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Restart services
docker-compose restart

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Access container shell
docker-compose exec backend sh
docker-compose exec frontend sh
docker-compose exec postgres psql -U postgres -d personality_quiz
```

---

## 📚 API Documentation

### Base URL

```
http://localhost:5000
```

### Endpoints

#### **Personalities**

**GET** `/personalities`

- Get all personality types
- Response: `200 OK`

```json
[
  {
    "id": 1,
    "name": "The Architect",
    "description": "Logical, analytical, and strategic thinker",
    "color": "#3b82f6"
  }
]
```

**GET** `/personalities/:id`

- Get personality by ID
- Response: `200 OK`

---

#### **Questions**

**GET** `/questions`

- Get all questions with options and scoring
- Response: `200 OK`

```json
[
  {
    "id": 1,
    "text": "How do you prefer to spend your weekend?",
    "weight": 5,
    "order": 1,
    "options": [
      {
        "id": 1,
        "text": "Reading books or learning something new",
        "scores": {
          "1": 5,
          "2": 1,
          "3": 2,
          "4": 3
        }
      }
    ]
  }
]
```

**GET** `/questions/:id`

- Get question by ID
- Response: `200 OK`

---

#### **Quiz Submission**

**POST** `/quiz/submit`

- Submit quiz answers and get personality result
- Request Body:

```json
{
  "answers": [
    {
      "questionId": 1,
      "optionId": 2
    },
    {
      "questionId": 2,
      "optionId": 5
    }
  ]
}
```

- Response: `200 OK`

```json
{
  "personality": {
    "id": 1,
    "name": "The Architect",
    "description": "Logical, analytical, and strategic thinker",
    "color": "#3b82f6"
  },
  "scores": [
    {
      "personality": {
        "id": 1,
        "name": "The Architect",
        "description": "Logical, analytical, and strategic thinker",
        "color": "#3b82f6"
      },
      "score": 145,
      "percentage": 42
    }
  ]
}
```

**GET** `/quiz/statistics`

- Get quiz statistics
- Response: `200 OK`

```json
{
  "totalQuestions": 10,
  "totalPersonalities": 4,
  "totalWeight": 40
}
```

---

## 💾 Database

### Schema Overview

The application uses PostgreSQL with Prisma ORM. The schema includes:

- **personalities** - The 4 personality types
- **questions** - Quiz questions with weights
- **options** - Answer options for each question
- **option_personalities** - Scoring mappings (points per personality per option)

### Database Operations

```bash
# Generate Prisma Client
npm run prisma:generate

# Create migration
npm run prisma:migrate

# Deploy migrations
npx prisma migrate deploy

# Seed database
npm run prisma:seed

# Open Prisma Studio
npm run prisma:studio

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset
```

### Using Docker

```bash
# Run migrations
docker-compose exec backend npx prisma migrate deploy

# Seed database
docker-compose exec backend npx prisma db seed

# Open Prisma Studio
docker-compose exec backend npx prisma studio

# Access database shell
docker-compose exec postgres psql -U postgres -d personality_quiz
```

### Database Backup & Restore

```bash
# Backup
docker-compose exec -T postgres pg_dump -U postgres personality_quiz > backup.sql

# Restore
docker-compose exec -T postgres psql -U postgres personality_quiz < backup.sql
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

### Frontend Tests

```bash
cd frontend

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Using Docker

```bash
# Backend tests
docker-compose exec backend npm run test

# Frontend tests
docker-compose exec frontend npm run test
```

---

## 🚢 Deployment

### Deploy to Vercel (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Configure environment variables in Vercel dashboard:
# NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

### Deploy to Railway/Render (Backend)

1. **Create a new project**
2. **Connect your repository**
3. **Configure build settings:**
   - Build Command: `npm install && npm run build && npx prisma generate`
   - Start Command: `npm run start:prod`
4. **Add environment variables:**
   - `DATABASE_URL`
   - `PORT=5000`
   - `NODE_ENV=production`
   - `CORS_ORIGIN=https://your-frontend-domain.com`
5. **Deploy**

### Deploy with Docker

```bash
# Build production images
docker-compose -f docker-compose.yml build

# Push to registry
docker tag personality-quiz-frontend your-registry/frontend:latest
docker tag personality-quiz-backend your-registry/backend:latest
docker push your-registry/frontend:latest
docker push your-registry/backend:latest

# Deploy on server
docker-compose -f docker-compose.yml up -d
```

---

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::3000` or `:::5000`

**Solution:**

```bash
# Find process using the port
lsof -ti:3000  # or :5000
lsof -ti:5000

# Kill the process
kill -9 <PID>

# Or change port in .env file
FRONTEND_PORT=3001
BACKEND_PORT=5001
```

---

#### Database Connection Error

**Problem:** `Error: Can't reach database server`

**Solution:**

```bash
# Check PostgreSQL is running
docker-compose ps

# Verify DATABASE_URL in .env
# Ensure database exists
docker-compose exec postgres psql -U postgres -l

# Restart database
docker-compose restart postgres
```

---

#### Prisma Client Not Generated

**Problem:** `Error: @prisma/client did not initialize yet`

**Solution:**

```bash
cd backend
npm run prisma:generate

# Or in Docker
docker-compose exec backend npx prisma generate
```

---

#### CORS Errors

**Problem:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**

- Verify `CORS_ORIGIN` in backend `.env` matches frontend URL
- Check backend is running on correct port (5000)
- Ensure frontend is calling correct API URL

```env
# Backend .env
CORS_ORIGIN=http://localhost:3000

# Frontend .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

#### Docker Build Fails

**Problem:** Docker build errors

**Solution:**

```bash
# Clean Docker cache
docker system prune -af

# Rebuild with no cache
docker-compose build --no-cache

# Check Docker logs
docker-compose logs
```

---

#### Frontend Can't Connect to Backend

**Problem:** API calls failing from frontend

**Solution:**

1. Check backend is running: `curl http://localhost:5000/api/personalities`
2. Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local`
3. Check CORS configuration in backend
4. Ensure both services are on same network (if using Docker)

---

#### Database Migrations Fail

**Problem:** Migration errors

**Solution:**

```bash
# Reset database (WARNING: Deletes data)
cd backend
npx prisma migrate reset

# Or in Docker
docker-compose exec backend npx prisma migrate reset

# Then run migrations again
npm run prisma:migrate
```

---

### Debug Mode

```bash
# Enable Next.js debug
DEBUG=* npm run dev

# Enable NestJS debug
npm run start:debug

# View Docker logs
docker-compose logs -f

# Check container health
docker-compose ps
```

---

## 📖 Additional Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- [API Documentation](./docs/API.md)
- [Database Schema](./docs/SCHEMA.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**

```bash
   git checkout -b feature/amazing-feature
```

3. **Commit your changes**

```bash
   git commit -m 'Add some amazing feature'
```

4. **Push to the branch**

```bash
   git push origin feature/amazing-feature
```

5. **Open a Pull Request**

### Code Style

- Follow existing code patterns
- Use TypeScript types
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Backend powered by [NestJS](https://nestjs.com/)
- UI components from [Material-UI](https://mui.com/)
- Database with [PostgreSQL](https://www.postgresql.org/) and [Prisma](https://www.prisma.io/)

---

## 📊 Project Status

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-85%25-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

---

**Made using Next.js, NestJS, and Material-UI**

---

## 🔗 Quick Links

- [Frontend](https://personality-app-2zna.vercel.app) - User interface
- [Backend API](https://personality-app-l1r0.onrender.com) - REST API
- [Prisma Studio](http://localhost:5555) - Database GUI
- [pgAdmin](http://localhost:5050) - Database management
- [API Documentation](http://localhost:5000/api) - Swagger docs (if configured)

---

**Last Updated:** January 2026
