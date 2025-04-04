import type React from "react"
export const metadata = {
  title: "Sanity Studio",
  description: "Content management for your portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
