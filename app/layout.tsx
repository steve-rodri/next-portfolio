import type React from "react"
import type { Metadata } from "next"
import { Instrument_Sans, Geist_Mono } from "next/font/google"
import "./globals.css"

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Steve Rodriguez · Portfolio",
  description:
    "Portfolio of Steve Rodriguez, senior full-stack software engineer. Featured work, projects, and how to get in touch.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-surface font-sans text-ink antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-50 focus:rounded-[3px] focus:bg-blueprint focus:px-3.5 focus:py-[9px] focus:text-sm focus:font-medium focus:text-blueprint-foreground focus:no-underline"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
