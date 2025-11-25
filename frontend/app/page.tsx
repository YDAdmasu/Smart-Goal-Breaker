"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Target, Zap } from "lucide-react";
import GoalForm from "./components/GoalForm";
import ResultCard from "./components/ResultCard";

export default function Page() {
    const [result, setResult] = useState(null);

    return (
        <div className="min-h-screen animated-gradient overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>

            <main className="relative z-10 p-6 md:p-8 max-w-4xl mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 mt-8"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium text-purple-200">AI-Powered Goal Breaking</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        <span className="gradient-text">Transform Goals</span>
                        <br />
                        <span className="text-white">Into Action</span>
                    </h1>

                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Turn your vague ideas into <span className="text-purple-400 font-semibold">5 actionable steps</span> using advanced AI.
                        Start achieving your dreams today.
                    </p>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full glass-strong"
                        >
                            <Target className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-gray-200">Smart Breakdown</span>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full glass-strong"
                        >
                            <Zap className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-gray-200">Instant Results</span>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full glass-strong"
                        >
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-gray-200">AI-Powered</span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Goal Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <GoalForm onResult={setResult} />
                </motion.div>

                {/* Result Card */}
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ResultCard data={result} />
                    </motion.div>
                )}

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-16 text-gray-400 text-sm"
                >
                    <p>Powered by Groq & Llama • Built with ❤️</p>
                </motion.div>
            </main>
        </div>
    );
}
