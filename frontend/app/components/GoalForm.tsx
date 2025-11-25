"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function GoalForm({ onResult }: { onResult: (v: any) => void }) {
    const [goal, setGoal] = useState("");
    const [loading, setLoading] = useState(false);
    const maxChars = 500;

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (!goal.trim()) {
            toast.error("Please enter a goal first!");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/goals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: goal })
            });

            if (!res.ok) {
                throw new Error(`API error: ${res.status}`);
            }

            const data = await res.json();
            onResult(data);
            toast.success("Goal broken down successfully! 🎉");
            setGoal("");
        } catch (err) {
            console.error(err);
            toast.error("Failed to process goal. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const charCount = goal.length;
    const isNearLimit = charCount > maxChars * 0.8;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="glass-strong rounded-2xl p-6 md:p-8 glow"
        >
            <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="goal-input" className="text-sm font-medium text-gray-300">
                        What's your goal?
                    </label>
                    <Textarea
                        id="goal-input"
                        value={goal}
                        onChange={(e) => {
                            if (e.target.value.length <= maxChars) {
                                setGoal(e.target.value);
                            }
                        }}
                        placeholder="e.g., Launch a successful startup, Learn to play guitar, Get fit and healthy..."
                        rows={4}
                        className="resize-none bg-white/5 border-white/10 focus:border-purple-400 focus:ring-purple-400/20 text-white placeholder:text-gray-500 transition-smooth"
                        disabled={loading}
                    />
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">
                            Be as specific or vague as you like
                        </span>
                        <span className={`font-mono ${isNearLimit ? 'text-yellow-400' : 'text-gray-500'}`}>
                            {charCount}/{maxChars}
                        </span>
                    </div>
                </div>

                <motion.div
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                    <Button
                        type="submit"
                        disabled={loading || !goal.trim()}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-6 rounded-xl transition-smooth disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                AI is thinking...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5 mr-2" />
                                Break it down
                            </>
                        )}
                    </Button>
                </motion.div>
            </form>

            {/* Tips Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 pt-6 border-t border-white/10"
            >
                <p className="text-xs text-gray-400 mb-2">💡 <span className="font-semibold">Pro tips:</span></p>
                <ul className="text-xs text-gray-500 space-y-1 ml-4">
                    <li>• Be clear about what you want to achieve</li>
                    <li>• Include context if it helps (timeline, resources, etc.)</li>
                    <li>• Don't worry about being too vague - AI will help!</li>
                </ul>
            </motion.div>
        </motion.div>
    );
}
