# Lakshya Grover Portfolio

A production-grade developer portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Overview

This repository contains my personal portfolio website, designed to present:

- professional experience and engineering impact
- selected projects with technical outcomes
- technology stack and system design thinking
- GitHub activity and contact workflow

The site is optimized for performance, responsive behavior, and a polished UI suitable for professional sharing.

## Live Goals

- communicate engineering depth clearly
- highlight measurable impact (performance, scale, reliability)
- provide an easy contact path for recruiters and hiring managers

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Project Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    api/
      contact/
        route.ts
  components/
    sections/
      HeroSection.tsx
      AboutSection.tsx
      TechStackSection.tsx
      ExperienceSection.tsx
      ProjectsSection.tsx
      ArchitectureSection.tsx
      GithubSection.tsx
      ContactSection.tsx
    ui/
      Navbar.tsx
      Footer.tsx
      Loader.tsx
      CustomCursor.tsx
      ScrollProgress.tsx
  hooks/
    useAnimations.ts
  lib/
    data.ts
  types/
    index.ts
public/
```

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
```

### 2. Configure environment

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_RESUME_URL=/Lakshya%20Grover.pdf
NEXT_PUBLIC_GITHUB_USERNAME=AlienAlien369
NEXT_PUBLIC_GITHUB_URL=https://github.com/AlienAlien369
NEXT_PUBLIC_PROJECT_IDS=capture-call,library-system

RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=groverlakshya.25.lg@gmail.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

Notes:

- `NEXT_PUBLIC_*` variables are exposed to the client.
- Keep `RESEND_API_KEY` private and never commit secrets.
- `CONTACT_FROM_EMAIL` should be a verified sender domain in Resend for production use.

### 3. Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Run production server
- `npm run lint` - Run ESLint

## Contact Form (Email Delivery)

The contact form posts to `POST /api/contact` and sends email via Resend.

Required env vars:

- `RESEND_API_KEY`
- `CONTACT_EMAIL`
- `CONTACT_FROM_EMAIL` (recommended)

If missing, the API returns a clear configuration error.

## Portfolio Data Customization

Core content is managed in:

- `src/lib/data.ts`

You can update:

- projects
- experience timeline
- metrics
- tech categories

Pinned project cards are controlled by:

- `NEXT_PUBLIC_PROJECT_IDS` (comma-separated project IDs)

## Deployment

### Vercel (Recommended)

1. Push this repository to GitHub.
2. Import the project in Vercel.
3. Add environment variables from `.env.local` in Vercel Project Settings.
4. Deploy.

Important:

- any change to `next.config.js` requires a fresh build/redeploy
- keep API keys only in environment settings, never in source control

## Quality

Before publishing:

```bash
npm run lint
npm run build
```

## License

This project is for personal portfolio use. If you reuse sections, please adapt content and design to avoid direct duplication.

## Author

Lakshya Grover

- GitHub: https://github.com/AlienAlien369
- LinkedIn: https://linkedin.com/in/lakshya-grover
