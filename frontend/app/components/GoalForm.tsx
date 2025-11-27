"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface GoalFormProps {
    onResult: (v: any) => void;
    setLoading?: (loading: boolean) => void;
}

export default function GoalForm({ onResult, setLoading: setExternalLoading }: GoalFormProps) {
    const [goal, setGoal] = useState("");
    const [loading, setLoadingState] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const maxChars = 500;

    const setLoading = (value: boolean) => {
        setLoadingState(value);
        setExternalLoading?.(value);
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [goal]);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (!goal.trim()) {
            toast.error("Please enter a goal first!");
            return;
        }

        const goalText = goal.trim();
        setLoading(true);
        
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/goals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: goalText })
            });

            if (!res.ok) {
                throw new Error(`API error: ${res.status}`);
            }

            const data = await res.json();
            onResult(data);
            setGoal("");
        } catch (err) {
            console.error(err);
            toast.error("Failed to process goal. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!loading && goal.trim()) {
                submit(e as any);
            }
        }
    };

    const charCount = goal.length;
    const isNearLimit = charCount > maxChars * 0.8;

    return (
        <form onSubmit={submit} className="relative">
            <div className="flex items-end gap-3 bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 px-5 py-4 shadow-lg hover:shadow-xl transition-shadow focus-within:border-indigo-500 dark:focus-within:border-indigo-500">
                <textarea
                    ref={textareaRef}
                    value={goal}
                    onChange={(e) => {
                        if (e.target.value.length <= maxChars) {
                            setGoal(e.target.value);
                        }
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe your goal..."
                    rows={1}
                    className="flex-1 resize-none bg-transparent border-0 focus:outline-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-[15px] leading-6 max-h-32 overflow-y-auto"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading || !goal.trim()}
                    className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:hover:shadow-lg"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Send className="w-5 h-5" />
                    )}
                </button>
            </div>
            {charCount > 0 && (
                <div className="absolute -bottom-6 right-0 text-xs text-slate-400 dark:text-slate-500">
                    {charCount}/{maxChars}
                </div>
            )}
        </form>
    );
}
