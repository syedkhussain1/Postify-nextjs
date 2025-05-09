import './globals.css'
import type { Metadata } from 'next'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Analytics } from '@vercel/analytics/react';
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'Postify',
  description: 'A Post Generator that uses AI to generate posts based on a topic and style.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}