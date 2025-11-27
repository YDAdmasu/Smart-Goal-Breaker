"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Bot } from "lucide-react";
import GoalForm from "./components/GoalForm";
import ResultCard from "./components/ResultCard";

interface Message {
    id: string;
    type: 'user' | 'ai';
    content: string;
    result?: any;
}

export default function Page() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleResult = (result: any) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: result.text
        };
        
        const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: '',
            result: result
        };

        setMessages(prev => [...prev, userMessage, aiMessage]);
    };

    return (
        <div className="flex flex-col h-screen bg-white dark:bg-slate-950">
            {/* Header */}
            <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Goal Breaker
                        </h1>
                    </div>
                </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-5xl mx-auto px-6 py-12">
                    {messages.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
                        >
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mb-8 shadow-2xl">
                                <Bot className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                                What's your goal?
                            </h2>
                            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-md leading-relaxed">
                                I'll break it down into actionable steps and help you achieve it.
                            </p>
                        </motion.div>
                    ) : (
                        <div className="space-y-8">
                            {messages.map((message, idx) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                >
                                    {message.type === 'user' ? (
                                        <div className="flex justify-end">
                                            <div className="max-w-[75%] rounded-3xl rounded-tr-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 shadow-xl">
                                                <p className="text-[15px] leading-relaxed font-medium">{message.content}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                                                <Sparkles className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex-1 max-w-[80%]">
                                                {message.result && <ResultCard data={message.result} />}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-4"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex items-center gap-2 pt-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6">
                <div className="max-w-5xl mx-auto px-6">
                    <GoalForm onResult={handleResult} setLoading={setLoading} />
                </div>
            </div>
        </div>
    );
}
