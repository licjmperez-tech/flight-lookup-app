'use client';

import { useState } from 'react';

interface FlightSearchFormProps {
    onSearch: (flightNumber: string) => void;
    isLoading: boolean;
}

export default function FlightSearchForm({ onSearch, isLoading }: FlightSearchFormProps) {
    const [flightNumber, setFlightNumber] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (flightNumber.trim()) {
            onSearch(flightNumber.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
            <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                    <input
                        type="text"
                        value={flightNumber}
                        onChange={(e) => setFlightNumber(e.target.value)}
                        placeholder="Enter flight number (e.g., AA123)"
                        className="w-full rounded-xl border-2 border-zinc-200 bg-white px-6 py-4 text-lg font-medium text-zinc-900 placeholder-zinc-400 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-blue-400"
                        disabled={isLoading}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading || !flightNumber.trim()}
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none dark:from-blue-500 dark:to-blue-400"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading ? (
                            <>
                                <svg
                                    className="h-5 w-5 animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Searching...
                            </>
                        ) : (
                            <>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                    />
                                </svg>
                                Search
                            </>
                        )}
                    </span>
                    <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
                </button>
            </div>
        </form>
    );
}
