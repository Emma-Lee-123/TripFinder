import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faTrain, faExchangeAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { FaArrowRight } from 'react-icons/fa';
import { Stack } from 'react-bootstrap';
import { Trip } from '../../models/transportModels';

// export interface Trip {
//   type: "Bus" | "Train";
//   routeNumber: string;
//   departureTime: string; // Format: "HH:mm"
//   arrivalTime: string;
//   duration: string;     // Format: "Xh Ym"
//   transfers?: {
//     station: string;
//     time?: string;
//     type?: "Bus" | "Train";
//   }[];
// }

interface TripsSectionProps {
  trips: Trip[];
  title?: string;
  maxDisplay?: number;
}

const TripsSection: React.FC<TripsSectionProps> = ({ 
  trips, 
  title = "Recommended Trips", 
  maxDisplay = 5 
}) => {
  const displayedTrips = trips.slice(0, maxDisplay);

  return (
    <div className="trips-section mt-4">
      <h5 className="section-title mb-3">
        <FontAwesomeIcon icon={faClock} className="me-2" />
        {title}
      </h5>

      {displayedTrips.length > 0 ? (
        <Stack gap={2} className="trip-list">
          {displayedTrips.map((trip) => (
            <div key={`${trip.routeNumber}-${trip.departureTime}`} className="trip-card p-3">
              {/* Main Trip Info */}
              <div className="trip-main-info d-flex justify-content-between align-items-center">
                <div className="transport-info d-flex align-items-center">
                  {trip.type === "Bus" ? (
                    <FontAwesomeIcon 
                      icon={faBus} 
                      className="text-primary me-2" 
                      title="Bus"
                    />
                  ) : (
                    <FontAwesomeIcon 
                      icon={faTrain} 
                      className="text-danger me-2" 
                      title="Train"
                    />
                  )}
                  <span className="route-number fw-medium">{trip.routeNumber}</span>
                </div>

                <div className="timeline d-flex align-items-center">
                  <span className="departure-time fw-bold">{trip.departureTime}</span>
                  <FaArrowRight className="time-arrow mx-2 text-muted" size={12} />
                  <span className="arrival-time fw-bold">{trip.arrivalTime}</span>
                </div>

                <span className="duration text-muted small">
                  {trip.duration}
                </span>
              </div>

              {/* Transfer Info */}
              {trip.transfers && trip.transfers?.length > 0 && (
                <div className="transfer-info d-flex align-items-center mt-2 small">
                  <FontAwesomeIcon 
                    icon={faExchangeAlt} 
                    className="transfer-icon me-2 text-warning" 
                    rotation={90}
                    size="xs"
                  />
                  <span className="transfer-stations text-muted">
                    {trip.transfers.map((transfer, i) => (
                      <span key={transfer.station}>
                        {i > 0 && ' • '}
                        <span className="fw-medium">
                          {transfer.station}
                          {transfer.time && ` (${transfer.time})`}
                        </span>
                      </span>
                    ))}
                  </span>
                </div>
              )}
            </div>
          ))}
        </Stack>
      ) : (
        <div className="no-trips text-muted text-center py-3">
          No trips found
        </div>
      )}
    </div>
  );
};

export default TripsSection;