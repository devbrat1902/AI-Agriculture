# AI Agriculture Advisor 🌾

A modern, AI-powered farming assistance web application built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Features

### Current (Day 1)
- ✅ Beautiful landing page with animations
- ✅ Responsive header with mobile menu
- ✅ Feature showcase
- ✅ Testimonials
- ✅ FAQ accordion
- ✅ Footer with links

### Coming Soon
- 🔄 Login/Signup pages
- 🔄 Dashboard
- 🔄 AI Disease Detection
- 🔄 Weather Forecast
- 🔄 Market Price Tracker
- 🔄 AI Chatbot
- 🔄 User Profile
- 🔄 Settings & more

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📁 Project Structure

```
ai-agriculture-advisor/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Landing page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   └── Skeleton.tsx
│   └── layout/              # Layout components
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Container.tsx
├── lib/
│   ├── utils.ts             # Utility functions
│   └── constants/
│       └── design-tokens.ts # Design system tokens
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── package.json
└── tsconfig.json
```

## 🎨 Design System

### Colors
- **Primary**: Green shades (farming theme)
- **Neutral**: Gray shades for text and backgrounds
- **Semantic**: Success, Warning, Error, Info variants

### Animations
All animations respect user's `prefer s-reduced-motion` settings.

**Duration Guidelines:**
- Micro-interactions: 200-450ms
- Page transitions: 600-900ms

**Easing:**
- `smooth`: cubic-bezier(0.16, 1, 0.3, 1)
- `bounce`: cubic-bezier(0.68, -0.6, 0.32, 1.6)

### Typography
- **Display Font**: Outfit
- **Body Font**: Inter
- **Base Size**: 16px (farmer-friendly readability)

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 🧩 Components

### UI Primitives

#### Button
```tsx
import { Button } from "@/components/ui/Button";

<Button variant="primary" size="lg" loading={false}>
  Click Me
</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `ghost`, `danger`, `success`
**Sizes**: `sm`, `md`, `lg`, `xl`, `icon`

#### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

<Card hover="lift">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

#### Input
```tsx
import { Input } from "@/components/ui/Input";

<Input 
  label="Email" 
  type="email" 
  error="Invalid email"
  required 
/>
```

### Layout Components

#### Container
```tsx
import { Container } from "@/components/layout/Container";

<Container size="xl">
  {/* Your content */}
</Container>
```

**Sizes**: `sm`, `md`, `lg`, `xl`, `full`

## 🎭 Utility Functions

```tsx
import { cn, formatCurrency, formatDate, debounce } from "@/lib/utils";

// Merge classNames
const className = cn("base-class", condition && "conditional-class");

// Format currency (Indian Rupees)
formatCurrency(10000); // "₹10,000"

// Format dates
formatDate(new Date()); // "07/12/2025"
formatDateTime(new Date()); // "07 Dec 2025, 16:30"

// Debounce function
const debouncedSearch = debounce(searchFunction, 300);
```

## 🌐 Environment Variables

Create a `.env.local` file in the root directory:

```bash
# API Keys (to be added later)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
```

## 📱 Responsive Design

All components are mobile-first and fully responsive:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility

- WCAG AA compliant
- Keyboard navigation support
- Screen reader friendly
- ARIA labels on complex components
- High contrast text (4.5:1 minimum)
- Focus visible on all interactive elements

## 🧪 Testing (Coming Soon)

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Run accessibility tests
npm run test:a11y
```

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Analyze bundle
npm run analyze

# Check types
npm run type-check

# Lint code
npm run lint
```

## 🤝 Contributing

This is a learning project. Feel free to explore and modify!

## 📄 License

MIT License - feel free to use this project for learning and personal use.

## 👨‍💻 Developer Notes

**Current Progress**: Day 1/10 Complete ✅
- Project setup done
- Landing page live
- Core components ready
- Design system established

**Next**: Day 2 - Auth pages (Login/Signup)

---

Built with ❤️ for Indian farmers 🇮🇳🌾
