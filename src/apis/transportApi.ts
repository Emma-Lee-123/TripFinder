import { SearchParams, Stop, TripStopGroup } from "../models/transportModels";
import { locationData } from "../data/locationData";

export const searchTransport = async (params: SearchParams): Promise<TripStopGroup[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // Mock data based on search parameters
  const mockTrips: TripStopGroup[] = [
    {
      id: 'trip1',
      departureTime: '07:05',
      arrivalTime: '09:35',
      firstTripStops: [
        {
          tripHeadsign: 'Richmond Hill Center',
          routeType: 3,
          stopSequence: 1,
          arrivalTime: '07:05',
          departureTime: '07:05',
          stopName: 'Stop A',
        },
        {
          tripHeadsign: 'Richmond Hill Center',
          routeType: 3,
          stopSequence: 2,
          arrivalTime: '08:00',
          departureTime: '07:45',
          stopName: 'Square One',
        },
      ],
      transfer: {
        stopName: 'Square One',
        arrivalTime: '08:05',
        departureTime: '08:15',
      },
      secondTripStops: [
        {
          tripHeadsign: 'U of Waterloo',
          routeType: 3,
          stopSequence: 1,
          arrivalTime: '',
          departureTime: '08:15',
          stopName: 'Square One',
        },
        {
          tripHeadsign: 'U of Waterloo',
          routeType: 3,
          stopSequence: 2,
          arrivalTime: '08:55',
          departureTime: '09:00',
          stopName: 'Stop C',
        },
        {
          tripHeadsign: 'U of Waterloo',
          routeType: 3,
          stopSequence: 3,
          arrivalTime: '09:35',
          departureTime: '',
          stopName: 'Stop D',
        },
      ],
    },
    {
      id: 'trip2',
      departureTime: '06:15',
      arrivalTime: '08:00',
      firstTripStops: [
        {
          tripHeadsign: 'Union Station',
          routeType: 2,
          stopSequence: 1,
          arrivalTime: '06:15',
          departureTime: '06:15',
          stopName: 'Stop X',
        },
        {
          tripHeadsign: 'Union Station',
          routeType: 2,
          stopSequence: 2,
          arrivalTime: '08:00',
          departureTime: '07:30',
          stopName: 'Stop Y',
        },
      ],
      // No transfer or second trip
    },
  ];

  if (!params.from || !params.to) {
    return []; // Return empty array if from/to are not provided
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

export const getStopsForAutocomplete = async (searchTerm: string): Promise<Stop[]> => {
    // In production, replace this with actual API call:
    // const response = await fetch(`/api/stops?search=${encodeURIComponent(searchTerm)}`);
    // return await response.json();
    
    // Mock implementation:
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = locationData.filter(location =>
          location.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 5);
        resolve(results);
      }, 150); // Simulate network delay
    });
};
  

