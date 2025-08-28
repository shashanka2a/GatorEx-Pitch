# GatorEx - Next.js 14 Application

A production-ready Next.js 14 application for the GatorEx pitch deck - a secure, university-verified marketplace exclusively for UF students.

## 🚀 Features

- **Next.js 14** with App Router and static export support
- **TypeScript** for type safety
- **Tailwind CSS** for styling with custom design system
- **Framer Motion** for smooth animations
- **Radix UI** components for accessibility
- **Responsive Design** optimized for all devices
- **SEO Optimized** with proper meta tags and structure

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Charts**: Recharts

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Static Export (for hosting on GitHub Pages, Netlify, etc.)
```bash
npm run export
```

The static files will be generated in the `out/` directory.

## 📁 Project Structure

```
├── pages/                 # Next.js pages
│   ├── _app.tsx          # App component
│   ├── _document.tsx     # Document component
│   └── index.tsx         # Home page
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components
│   │   ├── PitchDeck.tsx
│   │   ├── DynamicVisuals.tsx
│   │   └── UserJourneyAnimation.tsx
│   └── styles/          # Global styles
│       └── globals.css
├── public/              # Static assets
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

## 🎨 Customization

### Colors
The app uses a custom color scheme based on UF colors:
- Orange: `#FA4616` (UF Orange)
- Blue: `#0021A5` (UF Blue)

### Fonts
- Primary: Inter (Google Fonts)

### Components
All UI components are built with Radix UI primitives and styled with Tailwind CSS. They're fully customizable and accessible.

## 🚀 Deployment

This app is configured for static export and can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- Any static hosting service

### Vercel Deployment
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Static Hosting
1. Run `npm run export`
2. Upload the `out/` directory to your hosting service

## 📱 Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion powered transitions
- **Accessibility**: WCAG compliant components
- **Performance**: Optimized for Core Web Vitals
- **SEO**: Proper meta tags and structured data

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific variables:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Static Export
The app is configured for static export by default. To disable:

```js
// next.config.js
const nextConfig = {
  // Remove or comment out these lines:
  // output: 'export',
  // trailingSlash: true,
}
```

## 📄 License

This project is private and proprietary to the GatorEx team.