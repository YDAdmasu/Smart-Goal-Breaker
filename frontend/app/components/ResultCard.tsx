"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle, Copy, Share2, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

export default function ResultCard({ data }: { data: any }) {
    const [checkedTasks, setCheckedTasks] = useState<Set<number>>(new Set());

    const toggleTask = (index: number) => {
        const newChecked = new Set(checkedTasks);
        if (newChecked.has(index)) {
            newChecked.delete(index);
        } else {
            newChecked.add(index);
        }
        setCheckedTasks(newChecked);
    };

    const copyToClipboard = () => {
        const text = `Goal: ${data.text}\n\nActionable Steps:\n${data.tasks.map((task: string, i: number) => `${i + 1}. ${task}`).join('\n')}\n\nComplexity: ${data.complexity}/10`;
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    const shareGoal = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Goal Plan',
                    text: `Check out my goal breakdown: ${data.text}`,
                });
                toast.success("Shared successfully!");
            } catch (err) {
                // User cancelled share
            }
        } else {
            copyToClipboard();
        }
    };

    const completionPercentage = (checkedTasks.size / data.tasks.length) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mt-8"
        >
            <Card className="glass-strong border-white/20 overflow-hidden">
                <CardHeader className="border-b border-white/10 pb-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <CardTitle className="text-2xl font-bold text-white mb-2">
                                {data.text}
                            </CardTitle>
                            <div className="flex items-center gap-4 flex-wrap">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-purple-400" />
                                    <span className="text-sm text-gray-300">
                                        Complexity: <span className="font-semibold text-purple-400">{data.complexity}/10</span>
                                    </span>
                                </div>
                                <div className="flex-1 max-w-xs">
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(data.complexity / 10) * 100}%` }}
                                            transition={{ duration: 1, delay: 0.3 }}
                                            className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={copyToClipboard}
                                className="p-2 rounded-lg glass hover:bg-white/10 transition-smooth"
                                title="Copy to clipboard"
                            >
                                <Copy className="w-4 h-4 text-gray-300" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={shareGoal}
                                className="p-2 rounded-lg glass hover:bg-white/10 transition-smooth"
                                title="Share"
                            >
                                <Share2 className="w-4 h-4 text-gray-300" />
                            </motion.button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pt-6">
                    {/* Progress Section */}
                    {checkedTasks.size > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mb-6 p-4 rounded-lg glass"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-300">Progress</span>
                                <span className="text-sm font-semibold text-purple-400">
                                    {checkedTasks.size}/{data.tasks.length} completed
                                </span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${completionPercentage}%` }}
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Tasks List */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                            Actionable Steps
                        </h3>
                        {data.tasks.map((task: string, i: number) => {
                            const isChecked = checkedTasks.has(i);
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.1 }}
                                    className="group"
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => toggleTask(i)}
                                        className="w-full flex items-start gap-3 p-4 rounded-xl glass hover:bg-white/10 transition-smooth text-left"
                                    >
                                        <div className="flex-shrink-0 mt-0.5">
                                            {isChecked ? (
                                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                                            ) : (
                                                <Circle className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-xs font-semibold text-purple-400">
                                                    Step {i + 1}
                                                </span>
                                            </div>
                                            <p className={`text-sm mt-1 transition-all ${isChecked
                                                    ? 'text-gray-500 line-through'
                                                    : 'text-gray-200'
                                                }`}>
                                                {task}
                                            </p>
                                        </div>
                                    </motion.button>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Completion Message */}
                    {checkedTasks.size === data.tasks.length && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                        >
                            <p className="text-center text-white font-semibold">
                                🎉 Congratulations! You've completed all steps!
                            </p>
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
