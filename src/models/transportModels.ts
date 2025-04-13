export interface SearchParams {
    from: string;
    to: string;
    date: string;
    startTime: string;
    transportType: "All" | "Bus" | "Train";
}
export interface Trip {
    id: string;                    // Unique identifier for the trip
    type: "Bus" | "Train";          // Transport mode
    routeNumber: string;            // e.g. "Bus 205" or "ICE 123"
    departureTime: string;          // Format: "HH:mm" (e.g. "08:30")
    arrivalTime: string;            // Format: "HH:mm" (e.g. "12:45")
    duration: string;               // Format: "Xh Ym" (e.g. "4h 15m")
    transfers?: {                   // Optional transfers
      station: string;              // e.g. "Frankfurt Central"
      time?: string;                // e.g. "5 min"
      type?: "Bus" | "Train";      // Type of transport for the transfer
    }[];
  }