import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Divyansh Kumar Singh | Software Engineer',
    template: '%s | Divyansh Kumar Singh',
  },
  description:
    'Portfolio of Divyansh Kumar Singh - Software Engineer & AI Enthusiast building intelligent software.',
  keywords: [
    'Divyansh Kumar Singh',
    'Software Engineer',
    'AI Enthusiast',
    'Full Stack Developer',
    'Portfolio',
  ],
  authors: [{ name: 'Divyansh Kumar Singh' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Divyansh Kumar Singh',
    title: 'Divyansh Kumar Singh | Software Engineer',
    description: 'Building intelligent software at the intersection of engineering and AI.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Divyansh Kumar Singh Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Divyansh Kumar Singh | Software Engineer',
    description: 'Building intelligent software at the intersection of engineering and AI.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-background text-text antialiased">
        {children}
      </body>
    </html>
  )
}