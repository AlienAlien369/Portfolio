import type { Metadata, Viewport } from 'next'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lakshyagrover.dev'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Lakshya Grover - Full-Stack Cloud Engineer',
  description:
    'Full-Stack Engineer specializing in scalable enterprise systems, ASP.NET Core, React.js, TypeScript, and cloud architecture. Building precision-engineered software that scales.',
  keywords: [
    'Lakshya Grover',
    'Full Stack Engineer',
    'ASP.NET Core',
    'React',
    'TypeScript',
    'Cloud Engineer',
    '.NET Developer',
    'Software Engineer India',
  ],
  authors: [{ name: 'Lakshya Grover', url: 'https://lakshyagrover.dev' }],
  creator: 'Lakshya Grover',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Lakshya Grover - Full-Stack Cloud Engineer',
    description:
      'Engineering scalable systems with precision. Full-Stack Engineer with expertise in cloud architecture, .NET ecosystem, and modern frontend.',
    siteName: 'Lakshya Grover Portfolio',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Lakshya Grover Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lakshya Grover - Full-Stack Cloud Engineer',
    description: 'Engineering scalable systems with precision.',
    creator: '@lakshyagrover',
    images: ['/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#030712',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="noise antialiased">{children}</body>
    </html>
  )
}
