import { SearchParams, Trip } from "../models/transportModels";
import { locationData } from "../data/locationData";

export const searchTransport = async (params: SearchParams): Promise<Trip[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // Mock data based on search parameters
  const mockTrips: Trip[] = [
    {
      id: '1',
      type: 'Train',
      routeNumber: 'ICE 123',
      departureTime: '08:30',
      arrivalTime: '12:45',
      duration: '4h 15m',
    //   from: params.from,
    //   to: params.to,
      transfers: [
        { station: 'Frankfurt Central', time: '5 min', type: 'Train' }
      ]
    },
    {
      id: '2',
      type: 'Bus',
      routeNumber: 'FLIX 456',
      departureTime: '09:15',
      arrivalTime: '13:30',
      duration: '4h 15m',
    //   from: params.from,
    //   to: params.to,
      transfers: []
    },
    {
      id: '3',
      type: 'Train',
      routeNumber: 'IC 789',
      departureTime: '10:00',
      arrivalTime: '14:20',
      duration: '4h 20m',
    //   from: params.from,
    //   to: params.to,
      transfers: [
        { station: 'Hamburg Central', time: '10 min', type: 'Train' },
        { station: 'Cologne Main', time: '5 min', type: 'Bus' }
      ]
    }
  ];
  if (params.transportType !== 'All') {
    return mockTrips.filter(trip => trip.type === params.transportType);
  }
  return mockTrips;
    // try {
    //     const response = await fetch('/api/search', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(params)
    //     });
        
    //     if (!response.ok) throw new Error('Network response was not ok');
        
    //     const data: Trip[] = await response.json();
    //     return data;
    //   } catch (error) {
    //     console.error('Error fetching trips:', error);
    //     throw error; // Rethrow to handle in component
    //   }
};

export const getStopsForAutocomplete = async (searchTerm: string): Promise<string[]> => {
    // In production, replace this with actual API call:
    // const response = await fetch(`/api/stops?search=${encodeURIComponent(searchTerm)}`);
    // return await response.json();
    
    // Mock implementation:
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = locationData.filter(location =>
          location.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 5);
        resolve(results);
      }, 150); // Simulate network delay
    });
};
  

