import { NextResponse } from 'next/server';

const AVIATIONSTACK_API_KEY = process.env.AVIATIONSTACK_API_KEY;
const BASE_URL = 'https://api.aviationstack.com/v1';

export interface AviationStackFlight {
    flight_date: string;
    flight_status: string;
    departure: {
        airport: string;
        timezone: string;
        iata: string;
        icao: string;
        terminal: string;
        gate: string;
        scheduled: string;
        estimated: string;
        actual: string;
        estimated_runway: string;
        actual_runway: string;
    };
    arrival: {
        airport: string;
        timezone: string;
        iata: string;
        icao: string;
        terminal: string;
        gate: string;
        baggage: string;
        scheduled: string;
        estimated: string;
        actual: string;
        estimated_runway: string;
        actual_runway: string;
    };
    airline: {
        name: string;
        iata: string;
        icao: string;
    };
    flight: {
        number: string;
        iata: string;
        icao: string;
        codeshared: any;
    };
}

export async function fetchFlightsFromApi(flightNumber: string) {
    if (!AVIATIONSTACK_API_KEY) {
        console.warn('AVIATIONSTACK_API_KEY is not set');
        return null;
    }

    try {
        const response = await fetch(
            `${BASE_URL}/flights?access_key=${AVIATIONSTACK_API_KEY}&flight_iata=${flightNumber}`
        );

        if (!response.ok) {
            console.error('AviationStack API error:', response.statusText);
            return null;
        }

        const data = await response.json();
        return data.data as AviationStackFlight[];
    } catch (error) {
        console.error('Error fetching from AviationStack:', error);
        return null;
    }
}
