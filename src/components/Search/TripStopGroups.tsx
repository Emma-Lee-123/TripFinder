import { faClock, faPersonWalking } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Card, Badge, Collapse } from 'react-bootstrap';
import { FaBus, FaSubway, FaTrain, FaShip } from 'react-icons/fa';
import { TripStopGroup, TripStop } from '../../models/transportModels';

type TripStopGroupsProps = {
  groups: TripStopGroup[];
  title?: string;
};

const getRouteIcon = (routeType: number, size = 20) => {
  switch (routeType) {
    case 0:
      return <FaBus size={size} />; // streetcar
    case 1:
      return <FaSubway size={size} />; // subway
    case 2:
      return <FaTrain size={size} />; // rail
    case 3:
      return <FaBus size={size} />; // bus
    case 4:
      return <FaShip size={size} />; // ferry
    default:
      return <FaBus size={size} />;
  }
};

const formatTime = (time: string) => {
  if (!time) return '';
  return time.length === 4 ? `0${time}` : time;
};

const renderStopList = (stops: TripStop[]) => {
  return (
    <div className="ps-4 pt-2">
      {stops.map((stop, idx) => {
        const isLast = idx === stops.length - 1;
        return (
          <div className="d-flex justify-content-between mb-1" key={idx}>
            <div>
              <small className="text-muted">{stop.stopName}</small>
            </div>
            <div>
              <Badge bg={isLast ? 'success' : 'secondary'} className="fs-6">
                {formatTime(isLast ? stop.arrivalTime : stop.departureTime)}
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const TripStopGroups: React.FC<TripStopGroupsProps> = ({ groups, title }) => {
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);

  return (
    <div className="trip-groups-container" style={{ padding: '0 10px' }}>
      {groups.length > 0 && (
        <div>
          <h5 className="section-title mb-3">
            <FontAwesomeIcon icon={faClock} className="me-2" />
            {title}
          </h5>
        </div>
      )}
      {groups.map((group) => {
        const isOpen = expandedGroupId === group.id;
        return (
          <Card
            key={group.id}
            className="mb-3 shadow-sm"
            onClick={() => setExpandedGroupId(isOpen ? null : group.id)}
            style={{ cursor: 'pointer' }}
          >
            <Card.Body className="p-3">
              {/* First Trip */}
              {group.firstTripStops.length > 0 && (
                <>
                  <div className="d-flex align-items-center mb-2">
                    <div className="me-2">
                      {getRouteIcon(group.routeType, 24)}
                    </div>
                    <div className="flex-grow-1">
                      <strong className="d-block">{group.tripHeadsign}</strong>
                      <small className="text-muted">{group.firstTripStops[0].stopName}</small>
                    </div>
                    <Badge bg="primary" className="fs-6">
                      {formatTime(group.firstTripStops[0].departureTime)}
                    </Badge>
                  </div>
                  {/* if no transfer, show last stop arrival */}
                  {!group.transfer && group.firstTripStops.length > 1 && (
                    <div className="d-flex align-items-center mb-2">
                      <div style={{ width: '24px', marginRight: '8px' }}></div>
                      <div className="flex-grow-1">
                        <small className="text-muted">
                          Arrives at{' '}
                          {group.firstTripStops[group.firstTripStops.length - 1].stopName}
                        </small>
                      </div>
                      <Badge bg="success" className="fs-6">
                        {formatTime(
                          group.firstTripStops[group.firstTripStops.length - 1].arrivalTime,
                        )}
                      </Badge>
                    </div>
                  )}
                </>
              )}

              {/* Transfer */}
              {group.transfer && (
                <div className="transfer-section my-2 py-2 d-flex align-items-center">
                  <FontAwesomeIcon icon={faPersonWalking} className="me-2" />
                  <div className="transfer-details">
                    <strong className="d-block">{group.transfer.stopName}</strong>
                    <small className="d-block text-muted">
                      Arrive: {formatTime(group.transfer.arrivalTime)} · Depart:{' '}
                      {formatTime(group.transfer.departureTime)}
                    </small>
                  </div>
                </div>
              )}

              {/* Second Trip */}
              {group.secondTripStops && group.secondTripStops.length > 0 && (
                <div className="trip-segment">
                  <div className="d-flex align-items-center mb-2">
                    <div className="me-2">
                      {getRouteIcon(group.secondTripStops[0].routeType, 24)}
                    </div>
                    <div className="flex-grow-1">
                      <strong className="d-block">{group.secondTripStops[0].tripHeadsign}</strong>
                      <small className="text-muted">
                        {group.secondTripStops[group.secondTripStops.length - 1].stopName}
                      </small>
                    </div>
                    <Badge bg="success" className="fs-6">
                      {formatTime(
                        group.secondTripStops[group.secondTripStops.length - 1].arrivalTime,
                      )}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Expanded Stops */}
              <Collapse in={isOpen}>
                <div>
                  <div className="mt-3 mb-2">
                    <strong>Stop Details</strong>
                  </div>
                  {group.firstTripStops.length > 0 && renderStopList(group.firstTripStops)}
                  {group.secondTripStops && group.secondTripStops.length > 0 && (
                    <>
                      <hr />
                      {renderStopList(group.secondTripStops)}
                    </>
                  )}
                </div>
              </Collapse>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default TripStopGroups;
