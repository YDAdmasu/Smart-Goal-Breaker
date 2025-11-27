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
    
    const getComplexityColor = (complexity: number) => {
        if (complexity <= 3) return "text-green-600 dark:text-green-400";
        if (complexity <= 6) return "text-amber-600 dark:text-amber-400";
        return "text-red-600 dark:text-red-400";
    };
    
    const getComplexityBg = (complexity: number) => {
        if (complexity <= 3) return "bg-green-500";
        if (complexity <= 6) return "bg-amber-500";
        return "bg-red-500";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-xl p-6"
        >
            {/* Goal Title */}
            <div className="mb-5 pb-5 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{data.text}</h3>
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                            Complexity: <span className={`font-bold ${getComplexityColor(data.complexity)}`}>{data.complexity}/10</span>
                        </span>
                    </div>
                    <div className="flex-1 min-w-[150px] max-w-[200px]">
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(data.complexity / 10) * 100}%` }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className={`h-full ${getComplexityBg(data.complexity)}`}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={copyToClipboard}
                            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            title="Copy"
                        >
                            <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        </button>
                        <button
                            onClick={shareGoal}
                            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            title="Share"
                        >
                            <Share2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Progress Section */}
            {checkedTasks.size > 0 && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mb-5 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-200 dark:border-indigo-800"
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Progress</span>
                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                            {checkedTasks.size}/{data.tasks.length} completed
                        </span>
                    </div>
                    <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${completionPercentage}%` }}
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                            transition={{ duration: 0.4 }}
                        />
                    </div>
                </motion.div>
            )}

            {/* Tasks List */}
            <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                    Actionable Steps
                </h4>
                {data.tasks.map((task: string, i: number) => {
                    const isChecked = checkedTasks.has(i);
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.05 }}
                        >
                            <button
                                onClick={() => toggleTask(i)}
                                className="w-full flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all text-left group"
                            >
                                <div className="flex-shrink-0 mt-0.5">
                                    {isChecked ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mr-2">
                                        Step {i + 1}
                                    </span>
                                    <p className={`text-[15px] leading-relaxed mt-1 transition-all ${
                                        isChecked
                                            ? 'text-slate-400 dark:text-slate-500 line-through'
                                            : 'text-slate-700 dark:text-slate-300'
                                    }`}>
                                        {task}
                                    </p>
                                </div>
                            </button>
                        </motion.div>
                    );
                })}
            </div>

            {/* Completion Message */}
            {checkedTasks.size === data.tasks.length && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 p-5 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800"
                >
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <p className="text-base text-green-800 dark:text-green-300 font-bold">
                            🎉 Congratulations! You've completed all steps!
                        </p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
