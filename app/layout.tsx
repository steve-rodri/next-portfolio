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
        {children}
      </body>
    </html>
  )
}
