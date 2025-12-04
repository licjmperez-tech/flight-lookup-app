'use client';

import { useState } from 'react';
import FlightSearchForm from '@/components/FlightSearchForm';
import FlightResults from '@/components/FlightResults';

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

export default function Home() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = async (flightNumber: string) => {
    setIsLoading(true);
    setIsSearched(false);

    try {
      const response = await fetch(`/api/flights?flightNumber=${encodeURIComponent(flightNumber)}`);
      const data = await response.json();
      setFlights(data.flights || []);
      setIsSearched(true);
    } catch (error) {
      console.error('Error fetching flights:', error);
      setFlights([]);
      setIsSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-zinc-950">
      {/* Airplane Pattern Background - Now Much More Visible */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: 'url(/airplane-hero.png)' }}
      ></div>

      {/* Lighter Gradient Overlay to Let Airplanes Show Through */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/85 via-blue-50/80 to-indigo-100/85 dark:from-zinc-950/85 dark:via-blue-950/80 dark:to-indigo-950/85"></div>

      <main className="relative flex min-h-screen flex-col items-center px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
            Flight Tracking System
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-zinc-900 via-blue-900 to-indigo-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-zinc-100 dark:via-blue-100 dark:to-indigo-100 sm:text-5xl lg:text-6xl">
            Find Your Flight
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
            Search for any flight by number to get real-time departure and arrival information
          </p>
        </div>

        {/* Search Form */}
        <div className="mb-12 w-full">
          <FlightSearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Results */}
        <FlightResults flights={flights} isSearched={isSearched} />

        {/* Footer */}

      </main>
    </div>
  );
}

