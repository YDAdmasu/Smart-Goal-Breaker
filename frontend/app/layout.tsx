import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
    title: 'Smart Goal Breaker - Transform Goals into Action',
    description: 'Break down your vague goals into actionable steps using AI. Powered by Groq and Llama.',
    keywords: ['goal setting', 'AI', 'productivity', 'task management'],
    authors: [{ name: 'Smart Goal Breaker Team' }],
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#a78bfa',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
            <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
                {children}
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: 'rgb(30 41 59)',
                            color: '#fff',
                            border: '1px solid rgb(51 65 85)',
                            borderRadius: '0.5rem',
                            padding: '12px 16px',
                        },
                        success: {
                            iconTheme: {
                                primary: '#10b981',
                                secondary: '#fff',
                            },
                            style: {
                                background: 'rgb(30 41 59)',
                                border: '1px solid rgb(51 65 85)',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#fff',
                            },
                            style: {
                                background: 'rgb(30 41 59)',
                                border: '1px solid rgb(51 65 85)',
                            },
                        },
                    }}
                />
            </body>
        </html>
    )
}
