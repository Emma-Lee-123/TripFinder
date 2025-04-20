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
      tripHeadsign: 'Richmond Hill Center',
      routeType: 3,
      firstTripStops: [
        {
          tripId: 'trip1',
          tripHeadsign: 'Richmond Hill Center',
          routeType: 3,
          stopSequence: 1,
          arrivalTime: '07:05',
          departureTime: '07:05',
          stopId: '001',
          stopName: 'Stop A',
        },
        {
          tripId: 'trip1',
          tripHeadsign: 'Richmond Hill Center',
          routeType: 3,
          stopSequence: 2,
          arrivalTime: '08:00',
          departureTime: '07:45',
          stopId: '002',
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
          tripId: 'trip1',
          tripHeadsign: 'U of Waterloo',
          routeType: 3,
          stopSequence: 1,
          arrivalTime: '',
          departureTime: '08:15',
          stopId: '003',
          stopName: 'Square One',
        },
        {
          tripId: 'trip1',
          tripHeadsign: 'U of Waterloo',
          routeType: 3,
          stopSequence: 2,
          arrivalTime: '08:55',
          departureTime: '09:00',
          stopId: '004',
          stopName: 'Stop C',
        },
        {
          tripId: 'trip1',
          tripHeadsign: 'U of Waterloo',
          routeType: 3,
          stopSequence: 3,
          arrivalTime: '09:35',
          departureTime: '',
          stopId: '005',
          stopName: 'Stop D',
        }
      ],
    },
    {
      id: 'trip2',
      departureTime: '06:15',
      arrivalTime: '08:00',
      tripHeadsign: 'Union Station',
      routeType: 2,
      firstTripStops: [
        {
          tripId: 'trip2',
          tripHeadsign: 'Union Station',
          routeType: 2,
          stopSequence: 1,
          arrivalTime: '06:15',
          departureTime: '06:15',
          stopId: '006',
          stopName: 'Stop X',
        },
        {
          tripId: 'trip2',
          tripHeadsign: 'Union Station',
          routeType: 2,
          stopSequence: 2,
          arrivalTime: '08:00',
          departureTime: '07:30',
          stopId: '007',
          stopName: 'Stop Y',
        },
      ],
      // No transfer or second trip
    },
    {
      id: '20250408-11-11061',
      departureTime: '06:11:00',
      arrivalTime: '06:23:00',
      tripHeadsign: '11 - Brock University',
      routeType: 3,
      firstTripStops: [
        {
          tripId: '20250408-11-11061',
          tripHeadsign: '11 - Brock University',
          routeType: 0,
          stopId: '00180',
          stopSequence: 1,
          arrivalTime: '06:11:00',
          departureTime: '06:11:00',
          stopName: 'Aldershot GO Bus',
        },
        {
          tripId: '20250408-11-11061',
          tripHeadsign: '11 - Brock University',
          routeType: 0,
          stopId: '01010',
          stopSequence: 2,
          arrivalTime: '06:19:00',
          departureTime: '06:19:00',
          stopName: 'Main St. W. @ Paisley Ave. S.',
        },
        {
          tripId: '20250408-11-11061',
          tripHeadsign: '11 - Brock University',
          routeType: 0,
          stopId: '00732',
          stopSequence: 3,
          arrivalTime: '06:19:00',
          departureTime: '06:19:00',
          stopName: 'Main St. W. @ Longwood Rd. S.',
        },
        {
          tripId: '20250408-11-11061',
          tripHeadsign: '11 - Brock University',
          routeType: 0,
          stopId: '01009',
          stopSequence: 4,
          arrivalTime: '06:20:00',
          departureTime: '06:20:00',
          stopName: 'Main St. W. @ Macklin St. S.',
        },
        {
          tripId: '20250408-11-11061',
          tripHeadsign: '11 - Brock University',
          routeType: 0,
          stopId: '01008',
          stopSequence: 5,
          arrivalTime: '06:21:00',
          departureTime: '06:21:00',
          stopName: 'Main St. W. @ Dundurn St. S.',
        },
        {
          tripId: '20250408-11-11061',
          tripHeadsign: '11 - Brock University',
          routeType: 0,
          stopId: '01013',
          stopSequence: 6,
          arrivalTime: '06:22:00',
          departureTime: '06:22:00',
          stopName: 'Main St. W. @ Poulette St.',
        },
        {
          tripId: '20250408-11-11061',
          tripHeadsign: '11 - Brock University',
          routeType: 0,
          stopId: '01011',
          stopSequence: 7,
          arrivalTime: '06:22:00',
          departureTime: '06:22:00',
          stopName: 'Main St. W. @ Pearl St. S.',
        },

      ],
      transfer: null,
      secondTripStops: [],
    },
    {
      id: '20250408-17-17030',
      departureTime: '06:45:00',
      arrivalTime: '07:07:00',
      tripHeadsign: '17 - Hamilton GO',
      routeType: 3,
      firstTripStops: [
        {
          tripId: '20250408-17-17030',
          tripHeadsign: '17 - Hamilton GO',
          routeType: 0,
          stopId: '00180',
          stopSequence: 16,
          arrivalTime: '06:45:00',
          departureTime: '06:45:00',
          stopName: 'Aldershot GO Bus',
        },
        {
          tripId: '20250408-17-17030',
          tripHeadsign: '17 - Hamilton GO',
          routeType: 0,
          stopId: '02185',
          stopSequence: 17,
          arrivalTime: '06:58:00',
          departureTime: '06:58:00',
          stopName: 'Main St. W. @ Haddon Ave. S.',
        },
        {
          tripId: '20250408-17-17030',
          tripHeadsign: '17 - Hamilton GO',
          routeType: 0,
          stopId: '00310',
          stopSequence: 18,
          arrivalTime: '07:00:00',
          departureTime: '07:00:00',
          stopName: 'McMaster University',
        },
        {
          tripId: '20250408-17-17030',
          tripHeadsign: '17 - Hamilton GO',
          routeType: 0,
          stopId: '01010',
          stopSequence: 19,
          arrivalTime: '07:03:00',
          departureTime: '07:03:00',
          stopName: 'Main St. W. @ Paisley Ave. S.',
        },
        {
          tripId: '20250408-17-17030',
          tripHeadsign: '17 - Hamilton GO',
          routeType: 0,
          stopId: '00732',
          stopSequence: 20,
          arrivalTime: '07:04:00',
          departureTime: '07:04:00',
          stopName: 'Main St. W. @ Longwood Rd. S.',
        },
        {
          tripId: '20250408-17-17030',
          tripHeadsign: '17 - Hamilton GO',
          routeType: 0,
          stopId: '01009',
          stopSequence: 21,
          arrivalTime: '07:04:00',
          departureTime: '07:04:00',
          stopName: 'Main St. W. @ Macklin St. S.',
        },
        {
          tripId: '20250408-17-17030',
          tripHeadsign: '17 - Hamilton GO',
          routeType: 0,
          stopId: '01008',
          stopSequence: 22,
          arrivalTime: '07:05:00',
          departureTime: '07:05:00',
          stopName: 'Main St. W. @ Dundurn St. S.',
        },
        {
          tripId: '20250408-17-17030',
          tripHeadsign: '17 - Hamilton GO',
          routeType: 0,
          stopId: '01013',
          stopSequence: 23,
          arrivalTime: '07:06:00',
          departureTime: '07:06:00',
          stopName: 'Main St. W. @ Poulette St.',
        },
        {
          tripId: '20250408-17-17030',
          tripHeadsign: '17 - Hamilton GO',
          routeType: 0,
          stopId: '01011',
          stopSequence: 24,
          arrivalTime: '07:06:00',
          departureTime: '07:06:00',
          stopName: 'Main St. W. @ Pearl St. S.',
        },
        {
          tripId: '20250408-17-17030',
          tripHeadsign: '17 - Hamilton GO',
          routeType: 0,
          stopId: '01012',
          stopSequence: 25,
          arrivalTime: '07:07:00',
          departureTime: '07:07:00',
          stopName: 'Main St. W. @ Ray St. S.',
        },
        {
          tripId: '20250408-17-17030',
          tripHeadsign: '17 - Hamilton GO',
          routeType: 0,
          stopId: '01007',
          stopSequence: 26,
          arrivalTime: '07:07:00',
          departureTime: '07:07:00',
          stopName: 'Main St. W. @ Caroline St. S.',
        },
      ],
      transfer: null,
      secondTripStops: [],
    }
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
  

