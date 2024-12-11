import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/themeProvider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'DensAIr - Condense knowledge, elevate learning',
    description: 'AI-powered PDF summarization and PowerPoint creation for educational purposes',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} dark:bg-gray-900 dark:text-gray-100`}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}