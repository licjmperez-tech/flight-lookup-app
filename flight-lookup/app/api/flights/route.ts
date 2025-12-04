import { NextRequest, NextResponse } from 'next/server';
import { fetchFlightsFromApi } from '@/lib/aviation-stack';

// Mock flight data (fallback)
const mockFlights = [
    {
        id: '1',
        flightNumber: 'AA123',
        airline: 'American Airlines',
        departureTime: '2025-12-04T08:00:00',
        arrivalTime: '2025-12-04T11:30:00',
        departureTimezone: 'EST',
        arrivalTimezone: 'PST',
        departureLocation: 'New York (JFK)',
        arrivalLocation: 'Los Angeles (LAX)',
        departureCity: 'New York',
        arrivalCity: 'Los Angeles',
    },
    {
        id: '2',
        flightNumber: 'UA456',
        airline: 'United Airlines',
        departureTime: '2025-12-04T14:00:00',
        arrivalTime: '2025-12-04T16:45:00',
        departureTimezone: 'CST',
        arrivalTimezone: 'EST',
        departureLocation: 'Chicago (ORD)',
        arrivalLocation: 'Miami (MIA)',
        departureCity: 'Chicago',
        arrivalCity: 'Miami',
    },
    {
        id: '3',
        flightNumber: 'DL789',
        airline: 'Delta Airlines',
        departureTime: '2025-12-04T09:30:00',
        arrivalTime: '2025-12-04T18:15:00',
        departureTimezone: 'PST',
        arrivalTimezone: 'GMT',
        departureLocation: 'San Francisco (SFO)',
        arrivalLocation: 'London (LHR)',
        departureCity: 'San Francisco',
        arrivalCity: 'London',
    },
    {
        id: '4',
        flightNumber: 'BA100',
        airline: 'British Airways',
        departureTime: '2025-12-04T20:00:00',
        arrivalTime: '2025-12-05T08:30:00',
        departureTimezone: 'GMT',
        arrivalTimezone: 'EST',
        departureLocation: 'London (LHR)',
        arrivalLocation: 'New York (JFK)',
        departureCity: 'London',
        arrivalCity: 'New York',
    },
    {
        id: '5',
        flightNumber: 'SW555',
        airline: 'Southwest Airlines',
        departureTime: '2025-12-04T12:00:00',
        arrivalTime: '2025-12-04T14:30:00',
        departureTimezone: 'MST',
        arrivalTimezone: 'PST',
        departureLocation: 'Denver (DEN)',
        arrivalLocation: 'Seattle (SEA)',
        departureCity: 'Denver',
        arrivalCity: 'Seattle',
    },
];

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const flightNumber = searchParams.get('flightNumber');

    if (!flightNumber) {
        return NextResponse.json({ flights: [] });
    }

    // Try fetching from real API first
    const realFlights = await fetchFlightsFromApi(flightNumber);

    if (realFlights && realFlights.length > 0) {
        const mappedFlights = realFlights.map((flight, index) => ({
            id: `real-${index}`,
            flightNumber: flight.flight.iata,
            airline: flight.airline.name,
            departureTime: flight.departure.scheduled,
            arrivalTime: flight.arrival.scheduled,
            departureTimezone: flight.departure.timezone,
            arrivalTimezone: flight.arrival.timezone,
            departureLocation: `${flight.departure.airport} (${flight.departure.iata})`,
            arrivalLocation: `${flight.arrival.airport} (${flight.arrival.iata})`,
            departureCity: flight.departure.airport, // API doesn't always provide city directly in this endpoint, using airport name as fallback
            arrivalCity: flight.arrival.airport,
        }));

        return NextResponse.json({ flights: mappedFlights });
    }

    // Fallback to mock data if no real flights found or API fails
    const results = mockFlights.filter((flight) =>
        flight.flightNumber.toLowerCase().includes(flightNumber.toLowerCase())
    );

    // Simulate network delay for mock data
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json({ flights: results });
}
