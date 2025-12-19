import type { Metadata } from 'next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import './globals.css'

export const metadata: Metadata = {
  title: 'Just Fucking Use nuqs',
  description:
    'Stop fucking around with URL state. Use nuqs and be done with it.',
  openGraph: {
    title: 'Just Fucking Use nuqs',
    description:
      'Stop fucking around with URL state. Use nuqs and be done with it.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Just Fucking Use nuqs',
    description:
      'Stop fucking around with URL state. Use nuqs and be done with it.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  )
}
