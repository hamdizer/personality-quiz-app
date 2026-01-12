# Personality Quiz - Frontend

Modern Next.js application with Material UI for the Personality Quiz.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Routing](#routing)
- [Components](#components)
- [API Integration](#api-integration)
- [Styling](#styling)
- [Deployment](#deployment)
- [Browser Support](#browser-support)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Material UI components
- ✅ Server-side rendering (SSR)
- ✅ Type-safe API client
- ✅ Loading states & error handling
- ✅ Smooth animations
- ✅ SEO optimized
- ✅ Progressive Web App ready
- ✅ Accessibility compliant

## 🛠 Tech Stack

- **Framework**: Next.js 14.x (Pages Router)
- **UI Library**: Material UI (MUI) 5.x
- **Language**: TypeScript
- **HTTP Client**: Axios
- **Icons**: Material Icons
- **Styling**: Emotion (CSS-in-JS)

## 📦 Prerequisites

Before you begin, ensure you have:

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Backend API running (see [Backend README](../backend/README.md))

## 🚀 Installation

1. **Navigate to frontend directory**

```bash
   cd frontend
```

2. **Install dependencies**

```bash
   npm install
```

3. **Create environment file**

```bash
   cp .env.example .env.local
```

4. **Configure environment variables**

   Edit `.env.local`:

```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

Application will start at `http://localhost:3000`

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Development with HTTPS

```bash
# For testing features that require HTTPS (like Web Share API)
npm run dev -- --experimental-https
```

## 📁 Project Structure

```
frontend/                      # Next.js frontend application
├── pages/                     # Next.js pages
│   ├── api/                   # API utilities
│   │   └── api.ts             # API client
│   ├── _app.tsx               # App wrapper with providers
│   ├── _document.tsx          # HTML document structure
│   ├── index.tsx              # Landing page
│   ├── quiz.tsx               # Quiz page
│   └── result.tsx             # Results page
├── components/                # React components
│   ├── QuizPageContent.tsx
│   ├── ResultPageContent.tsx
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx
├── styles/                    # Global styles
│   └── globals.css
├── types/                     # TypeScript type definitions
│   │   └── quiz.ts
├── public/                    # Static assets
├── Dockerfile                 # Production Dockerfile
├── Dockerfile.dev             # Development Dockerfile
├── docker-compose.yml         # Docker Compose file
├── docker-compose-dev.yml     # Development Docker Compose
├── package.json
├── next.config.ts
├── .env                       # Production environment variables
└── .env.local                 # Local environment variables
```

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000

# Optional: Analytics
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Feature Flags
# NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### Environment Variables Explanation

| Variable              | Description     | Default               | Required |
| --------------------- | --------------- | --------------------- | -------- |
| `NEXT_PUBLIC_API_URL` | Backend API URL | http://localhost:5000 | ✅       |

**Important**: Variables with `NEXT_PUBLIC_` prefix are exposed to the browser.

## 📜 Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:https        # Start with HTTPS (experimental)

# Build
npm run build            # Build for production
npm run start            # Start production server

# Linting
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues

# Type Checking
npm run type-check       # Run TypeScript compiler check

# Testing (if configured)
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

## 🗺 Routing

The application uses Next.js Pages Router:

| Route     | Page               | Description                                |
| --------- | ------------------ | ------------------------------------------ |
| `/`       | `pages/index.tsx`  | Landing page with quiz introduction        |
| `/quiz`   | `pages/quiz.tsx`   | Quiz interface with questions              |
| `/result` | `pages/result.tsx` | Results display with personality breakdown |

### Navigation Flow

```
Landing Page (/)
    ↓
    [Start Quiz Button]
    ↓
Quiz Page (/quiz)
    ↓
    [Submit Answers]
    ↓
Result Page (/result)
    ↓
    [Take Quiz Again] → Back to /quiz
```

## 🧩 Components

### Core Components

**QuizPageContent**

- Displays questions one at a time
- Handles answer selection
- Manages quiz state
- Submits answers to API

**ResultPageContent**

- Shows personality type result
- Displays score breakdown
- Animated progress bars
- Share functionality

**LoadingSpinner**

- Shown during API calls
- Configurable size and message

**ErrorMessage**

- Displays error states
- Retry functionality
- User-friendly error messages

### Component Props

```typescript
// QuizPageContent
interface QuizPageContentProps {
  onComplete: (result: QuizResult) => void;
}

// ResultPageContent
interface ResultPageContentProps {
  result: QuizResult;
  onRestart: () => void;
}

// LoadingSpinner
interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "medium" | "large";
}

// ErrorMessage
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  title?: string;
}
```

## 🔌 API Integration

### API Client (`@/pages/api`)

```typescript
import QuizAPI from "@/pages/api";

// Get all questions
const questions = await QuizAPI.getQuestions();

// Submit answers
const result = await QuizAPI.submitAnswers({ answers });

// Get personalities
const personalities = await QuizAPI.getPersonalities();
```

### Error Handling

The API client automatically handles:

- Network errors
- Timeout errors
- HTTP error responses
- JSON parsing errors

### Request/Response Flow

```
Frontend → API Client → Backend API
         ←             ←
    Loading State   Response Data
         ↓
    Success/Error Handling
         ↓
    Update UI State
```

## 🎨 Styling

### Material UI Theme

Custom theme configured in `lib/theme.ts`:

```typescript
- Primary Color: Indigo (#4f46e5)
- Secondary Color: Purple (#8b5cf6)
- Custom gradients
- Responsive breakpoints
- Custom component styles
```

### Customizing Theme

Edit `lib/theme.ts`:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: "#your-color",
    },
  },
  typography: {
    fontFamily: "Your Font",
  },
});
```

### Responsive Design

Uses MUI breakpoints:

- `xs`: 0px+
- `sm`: 600px+
- `md`: 900px+
- `lg`: 1200px+
- `xl`: 1536px+

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**

```bash
   npm i -g vercel
```

2. **Deploy**

```bash
   vercel
```

3. **Configure Environment Variables**

   - Go to Vercel Dashboard
   - Add `NEXT_PUBLIC_API_URL` with production API URL

4. **Auto-deploy**
   - Connect GitHub repository
   - Enable automatic deployments

### Netlify

1. **Build settings**

   - Build Command: `npm run build`
   - Publish Directory: `.next`

2. **Environment Variables**

```
   NEXT_PUBLIC_API_URL=https://personality-app-y03w.onrender.com
```

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build --build-arg NEXT_PUBLIC_API_URL=http://localhost:5000 -t quiz-frontend .
docker run -p 3000:3000 quiz-frontend
```

### Static Export (Optional)

For static hosting:

```typescript
// next.config.ts
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};
```

Then:

```bash
npm run build
# Output will be in 'out' directory
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Progressive Enhancement

- Core functionality works without JavaScript
- Enhanced experience with JavaScript enabled
- Graceful degradation for older browsers

## 🐛 Troubleshooting

### Common Issues

**1. API Connection Error**

```
Error: Network error. Please check your internet connection.
```

**Solution**:

- Verify backend is running
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure CORS is configured on backend

**2. Build Errors**

```
Error: Cannot find module '@/lib/api'
```

**Solution**:

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

**3. Hydration Errors**

```
Error: Text content does not match server-rendered HTML
```

**Solution**:

- Check for browser-only APIs (localStorage, window)
- Use `useEffect` for client-side only code
- Ensure consistent rendering on server and client

**4. Environment Variables Not Working**

```
Warning: process.env.NEXT_PUBLIC_API_URL is undefined
```

**Solution**:

- Restart dev server after changing `.env.local`
- Ensure variable starts with `NEXT_PUBLIC_`
- Check for typos in variable name

**5. Material UI Styles Missing**

```
Error: MUI styles not loading
```

**Solution**:

- Verify emotion packages are installed
- Check `_document.tsx` setup
- Clear `.next` cache

### Debug Mode

```bash
# Enable Next.js debug mode
DEBUG=* npm run dev

# TypeScript type checking
npm run type-check

# Check build output
npm run build -- --debug
```

## 📊 Performance

### Optimization Tips

1. **Image Optimization**

```tsx
import Image from "next/image";

<Image src="/image.jpg" width={500} height={300} alt="Description" />;
```

2. **Code Splitting**

```tsx
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <LoadingSpinner />,
});
```

3. **Lazy Loading**
   - Images load on scroll
   - Components load when needed
   - API calls on demand

## 🧪 Testing (Future)

```bash
# Unit tests with Jest
npm run test

# E2E tests with Playwright
npm run test:e2e

# Component tests with React Testing Library
npm run test:components
```

## 📱 PWA Support (Optional)

To enable PWA features:

1. **Install next-pwa**

```bash
   npm install next-pwa
```

2. **Configure next.config.ts**

```typescript
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA(nextConfig);
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Style

- Follow existing patterns
- Use TypeScript types
- Write meaningful commit messages
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License.

## 🔗 Related

- [Backend API](../backend)
- [Design System](./docs/DESIGN.md)
- [API Integration Guide](./docs/API_INTEGRATION.md)

## 👥 Support

- GitHub Issues: [Report bugs](https://github.com/your-repo/issues)
- Email: support@example.com
- Documentation: [Full docs](./docs)

---

**Made with ❤️ using Next.js and Material UI**
