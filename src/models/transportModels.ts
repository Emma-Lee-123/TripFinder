export interface SearchParams {
  fromId: string; 
  toId: string;
  from: string;
  to: string;
  date: string;
  startTime: string;
  transportType: 'All' | 'Bus' | 'Train';
}
export interface Trip {
  id: string; // Unique identifier for the trip
  type: 'Bus' | 'Train'; // Transport mode
  routeNumber: string; // e.g. "Bus 205" or "ICE 123"
  departureTime: string; // Format: "HH:mm" (e.g. "08:30")
  arrivalTime: string; // Format: "HH:mm" (e.g. "12:45")
  duration: string; // Format: "Xh Ym" (e.g. "4h 15m")
  transfers?: {
    // Optional transfers
    station: string; // e.g. "Frankfurt Central"
    time?: string; // e.g. "5 min"
    type?: 'Bus' | 'Train'; // Type of transport for the transfer
  }[];
}

export type Stop = {
  id: string;
  name: string;
};

export type StopDetail = Stop & {
  url: string; // URL for more information about the stop
  type: number; //0: Stop/Platform;1: station;2: entrance/exit;3:generic node;4:boarding area
  code: string;
};

export type TripStop = {
  tripId: string;
  tripHeadsign: string; //display after the route icon
  //directionId: number;
  routeType: number; //display icon based on this value(0:streetcar;1:subway;2:rail;3:bus;4:ferry;5:cable car;6:funicular;7:trolley bus;8:monorail)
  stopId: string;
  stopSequence: number;
  arrivalTime: string; //display for the last stop
  departureTime: string; //display for the first stop
  stopName: string;
  //stopUrl: string;
};

export type Transfer = {
  stopName: string;
  arrivalTime: string;
  departureTime: string;
};

export type TripStopGroup = {
  id: string;
  tripHeadsign: string; //display after the route icon
  routeType: number; //display icon based on this value(0:streetcar;1:subway;2:rail;3:bus;4:ferry;5:cable car;6:funicular;7:trolley bus;8:monorail)
  departureTime: string;
  arrivalTime: string;
  firstTripStops: TripStop[];
  transfer?: Transfer | null;
  secondTripStops?: TripStop[];
};
