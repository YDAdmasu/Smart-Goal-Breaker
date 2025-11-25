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
            <body>
                {children}
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            color: '#fff',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                        },
                        success: {
                            iconTheme: {
                                primary: '#a78bfa',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
            </body>
        </html>
    )
}
