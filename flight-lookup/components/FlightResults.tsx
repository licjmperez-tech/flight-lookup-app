'use client';

interface Flight {
    id: string;
    flightNumber: string;
    airline: string;
    departureTime: string;
    arrivalTime: string;
    departureTimezone: string;
    arrivalTimezone: string;
    departureLocation: string;
    arrivalLocation: string;
    departureCity: string;
    arrivalCity: string;
}

interface FlightResultsProps {
    flights: Flight[];
    isSearched: boolean;
}

export default function FlightResults({ flights, isSearched }: FlightResultsProps) {
    if (!isSearched) {
        return null;
    }

    if (flights.length === 0) {
        return (
            <div className="w-full max-w-2xl rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-12 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mx-auto mb-4 h-16 w-16 text-zinc-400"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                </svg>
                <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    No flights found
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Try searching with a different flight number
                </p>
            </div>
        );
    }

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="w-full max-w-2xl space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Found {flights.length} {flights.length === 1 ? 'flight' : 'flights'}
            </h2>
            {flights.map((flight) => (
                <div
                    key={flight.id}
                    className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
                >
                    {/* Header */}
                    <div className="border-b border-zinc-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 dark:border-zinc-800 dark:from-blue-950/30 dark:to-indigo-950/30">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                                    {flight.flightNumber}
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">{flight.airline}</p>
                            </div>
                            <div className="rounded-full bg-blue-100 px-4 py-2 dark:bg-blue-900/50">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-6 w-6 text-blue-600 dark:text-blue-400"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Flight Route */}
                    <div className="px-6 py-6">
                        <div className="flex items-center justify-between">
                            {/* Departure */}
                            <div className="flex-1">
                                <div className="mb-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                    Departure
                                </div>
                                <div className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                                    {formatTime(flight.departureTime)}
                                </div>
                                <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    {flight.departureLocation}
                                </div>
                                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                    {formatDate(flight.departureTime)} • {flight.departureTimezone}
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="flex-shrink-0 px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-8 w-8 text-zinc-400 transition-transform duration-300 group-hover:translate-x-1"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                                    />
                                </svg>
                            </div>

                            {/* Arrival */}
                            <div className="flex-1 text-right">
                                <div className="mb-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                    Arrival
                                </div>
                                <div className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                                    {formatTime(flight.arrivalTime)}
                                </div>
                                <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    {flight.arrivalLocation}
                                </div>
                                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                    {formatDate(flight.arrivalTime)} • {flight.arrivalTimezone}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
