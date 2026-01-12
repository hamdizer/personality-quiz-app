# Personality Quiz - Backend API

NestJS REST API for the Personality Quiz application with PostgreSQL database, Prisma ORM, and AutoMapper.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- ✅ RESTful API endpoints
- ✅ PostgreSQL database with Prisma ORM
- ✅ AutoMapper for DTO/Entity mapping
- ✅ Input validation with class-validator
- ✅ Weighted scoring algorithm
- ✅ Repository pattern
- ✅ Modular architecture
- ✅ CORS enabled
- ✅ Error handling
- ✅ Database seeding

## 🛠 Tech Stack

- **Framework**: NestJS 10.x
- **Database**: PostgreSQL
- **ORM**: Prisma 5.x
- **Validation**: class-validator, class-transformer
- **Mapping**: AutoMapper
- **Language**: TypeScript

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (v14.x or higher)

## 🚀 Installation

1. **Clone the repository**

```bash
   cd backend
```

2. **Install dependencies**

```bash
   npm install
```

3. **Create environment file**

```bash
   cp .env.example .env
```

4. **Configure environment variables**

   Edit `.env` file:

```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/personality_quiz"

   # Server
   PORT=5000

   # CORS (optional)
   CORS_ORIGIN=http://localhost:3000
```

## 💾 Database Setup

1. **Create PostgreSQL database**

```bash
   # Using psql
   psql -U postgres
   CREATE DATABASE personality_quiz;
   \q
```

2. **Generate Prisma client**

```bash
   npm run prisma:generate
```

3. **Run database migrations**

```bash
   npm run prisma:migrate
```

4. **Seed the database**

```bash
   npm run prisma:seed
```

This will create:

- 4 personality types
- 10 questions with weighted scoring
- 4 options per question
- Scoring mappings for each option

## 🏃 Running the Application

### Development Mode

```bash
npm run start:dev
```

Server will start at `http://localhost:5000`

### Production Mode

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

### Watch Mode

```bash
npm run start:watch
```

## 📚 API Documentation

### Base URL

```
http://localhost:5000
```

### Endpoints

#### **Personalities**

**GET** `/personalities`

- Description: Get all personality types
- Response: Array of personalities

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

- Description: Get personality by ID
- Parameters: `id` (number)
- Response: Single personality object

#### **Questions**

**GET** `/questions`

- Description: Get all questions with options and scoring
- Response: Array of questions

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

- Description: Get question by ID
- Parameters: `id` (number)
- Response: Single question object

#### **Quiz**

**POST** `/quiz/submit`

- Description: Submit quiz answers and get results
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

- Response:

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
      "personality": { ... },
      "score": 145,
      "percentage": 42
    }
  ]
}
```

**GET** `/quiz/statistics`

- Description: Get quiz statistics
- Response:

```json
{
  "totalQuestions": 10,
  "totalPersonalities": 4,
  "totalWeight": 40
}
```

## 📁 Project Structure

```
backend/                      # NestJS backend application
├── src/
│   ├── main.ts               # Application entry point
│   ├── app.module.ts         # Root module
│
│   ├── prisma/               # Prisma module
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│
│   ├── personalities/        # Personalities module
│   │   ├── repositories/     # Repositories for personalities
│   │   │   └── personality.repository.ts
│   │   ├── personalities.module.ts
│   │   ├── personalities.controller.ts
│   │   ├── personalities.controller.spec.ts
│   │   ├── personalities.service.ts
│   │   ├── personalities.service.spec.ts
│   │   ├── mapper/
│   │   │   └── personality.mapper.ts
│   │   ├── dto/
│   │   │   └── personality.dto.ts
│   │   └── entities/
│   │       └── personality.entity.ts
│
│   ├── questions/            # Questions module
│   │   ├── repositories/     # Repositories for questions
│   │   │   └── question.repository.ts
│   │   ├── questions.module.ts
│   │   ├── questions.controller.ts
│   │   ├── questions.controller.spec.ts
│   │   ├── questions.service.ts
│   │   ├── questions.service.spec.ts
│   │   ├── mapper/
│   │   │   └── question.mapper.ts
│   │   ├── dto/
│   │   │   ├── question.dto.ts
│   │   │   └── option.dto.ts
│   │   └── entities/
│   │       ├── question.entity.ts
│   │       └── option.entity.ts
│
│   └── quiz/                 # Quiz module
│       ├── repositories/     # Repositories for quiz
│       │   └── quiz.repository.ts
│       ├── quiz.module.ts
│       ├── quiz.controller.ts
│       ├── quiz.controller.spec.ts
│       ├── quiz.service.ts
│       ├── quiz.service.spec.ts
│       ├── mapper/
│       │   └── quiz.mapper.ts
│       ├── dto/
│       │   ├── submit-answer.dto.ts
│       │   └── quiz-result.dto.ts
│       └── entities/
│           └── quiz-result.entity.ts
│
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Database seeder
│
├── .env                      # Backend environment variables
├── .env.local              # Backend env template
├── Dockerfile                # Production Dockerfile
├── Dockerfile.dev            # Development Dockerfile
├── docker-compose.yml        # Production compose
├── docker-compose-dev.yml    # Development compose
├── package.json
└── tsconfig.json

```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database Connection
DATABASE_URL="postgresql://username:password@localhost:5432/personality_quiz"

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration (optional)
CORS_ORIGIN=http://localhost:3000

# Application Settings (optional)
API_PREFIX=api
```

### Environment Variables Explanation

| Variable       | Description                          | Default     | Required |
| -------------- | ------------------------------------ | ----------- | -------- |
| `DATABASE_URL` | PostgreSQL connection string         | -           | ✅       |
| `PORT`         | Server port                          | 5000        | ❌       |
| `NODE_ENV`     | Environment (development/production) | development | ❌       |
| `CORS_ORIGIN`  | Allowed CORS origins                 | \*          | ❌       |

## 📜 Scripts

```bash
# Development
npm run start          # Start application
npm run start:dev      # Start with watch mode
npm run start:debug    # Start with debug mode

# Build
npm run build          # Build for production

# Production
npm run start:prod     # Start production server

# Prisma
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:seed      # Seed database with sample data
npm run prisma:studio    # Open Prisma Studio (DB GUI)

# Linting
npm run lint           # Run ESLint
npm run format         # Format code with Prettier

# Testing
npm run test           # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Run tests with coverage
npm run test:e2e       # Run end-to-end tests
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🚀 Deployment

### Using Docker

1. **Create Dockerfile**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start:prod"]
```

2. **Build and run**

```bash
docker build -t personality-quiz-backend .
docker run -p 5000:5000 personality-quiz-backend
```

### Deploying to Render

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install && npm run build && npm run prisma:generate`
   - **Start Command**: `npm run start:prod`
   - **Environment**: Add `DATABASE_URL` and other env variables
4. Deploy

### Deploying to Railway

1. Create account on [Railway](https://railway.app)
2. Create new project from GitHub repo
3. Add PostgreSQL database
4. Configure environment variables
5. Deploy

### Deploying to Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create personality-quiz-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Deploy
git push heroku main

# Run migrations
heroku run npm run prisma:migrate

# Seed database
heroku run npm run prisma:seed
```

## 🐛 Troubleshooting

### Common Issues

**1. Database Connection Error**

```
Error: Can't reach database server
```

**Solution**:

- Check PostgreSQL is running
- Verify DATABASE_URL in `.env`
- Ensure database exists

**2. Prisma Client Not Generated**

```
Error: @prisma/client did not initialize yet
```

**Solution**:

```bash
npm run prisma:generate
```

**3. Port Already in Use**

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution**:

- Change PORT in `.env`
- Or kill process using port 5000:

```bash
# Linux/Mac
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**4. Migration Fails**

```
Error: Migration failed
```

**Solution**:

```bash
# Reset database (WARNING: deletes all data)
npm run prisma:migrate:reset

# Or create new migration
npx prisma migrate dev --name fix_migration
```

## 📝 Database Schema

### Tables

- **personalities**: Personality types (Architect, Adventurer, Guardian, Visionary)
- **questions**: Quiz questions with weights
- **options**: Answer options for each question
- **option_personalities**: Scoring mappings (option → personality → points)

### Scoring Algorithm

```
Final Score = Σ (Question Weight × Option Points for Personality)

Example:
Question 1 (weight: 5) → Option A selected → Architect: 5 points
Question 2 (weight: 3) → Option C selected → Architect: 4 points

Architect Total = (5 × 5) + (3 × 4) = 37 points
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For issues and questions:

- Create an issue on GitHub
- Email: support@example.com

## 🔗 Related

- [Frontend Repository](../frontend)
- [API Documentation](./docs/API.md)
- [Database Schema](./docs/SCHEMA.md)
