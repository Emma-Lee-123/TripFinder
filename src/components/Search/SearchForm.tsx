import React, { useState } from "react";
import { 
  Form, 
  Button, 
  ToggleButtonGroup, 
  ToggleButton, 
  Stack, 
  Alert,
  Spinner
} from "react-bootstrap";
import { 
  faBus, 
  faTrain,
  faBusAlt
} from '@fortawesome/free-solid-svg-icons';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchParams } from "../../models/transportModels";
import { searchTransport } from "../../apis/transportApi";
import TripsSection from "./TripsSection";
import { Trip } from "../../models/transportModels";
import './SearchForm.css';

export const SearchForm: React.FC = () => {
  const defaultDate = new Date().toISOString().split('T')[0];
  const defaultTime = "08:00";

  const [params, setParams] = useState<SearchParams>({
    from: "",
    to: "",
    date: defaultDate,
    startTime: defaultTime,
    transportType: "All",
  });

  const [trips, setTrips] = useState<Trip[]>([]);
  const [errors, setErrors] = useState<Partial<SearchParams>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: Partial<SearchParams> = {};
    
    if (!params.from.trim()) newErrors.from = "Departure location is required";
    if (!params.to.trim()) newErrors.to = "Destination is required";
    if (params.from.trim().toLowerCase() === params.to.trim().toLowerCase()) {
      newErrors.to = "Destination must be different from departure";
    }
    if (!params.date) newErrors.date = "Date is required";
    
    // Time validation (HH:MM format between 05:00-23:00)
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(params.startTime)) {
      newErrors.startTime = "Invalid time format (HH:MM)";
    } else {
      const [hours] = params.startTime.split(':').map(Number);
      if (hours < 5 || hours > 23) {
        newErrors.startTime = "Time must be between 05:00 and 23:00";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const results = await searchTransport(params);
      setTrips(results);
    } catch (err) {
      // setApiError(`Failed to fetch results. Please try again.${err}`);
      setApiError(err instanceof Error ? err.message : "Failed to fetch results");
      setTrips([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if form has any values (for conditional styling)
  const isFormDirty = Object.values(params).some(val => val !== "" && val !== "All");

  return (
<div className="transport-search-container">
      <Form onSubmit={handleSubmit} noValidate className="search-form">
        <Stack gap={1}>
          {/* From/To Inputs */}
          <Form.Group controlId="fromLocation">
            <Form.Control
              type="text"
              placeholder="From"
              value={params.from}
              onChange={(e) => setParams({ ...params, from: e.target.value })}
              isInvalid={!!errors.from}
              //size="lg"
              className="search-input"
            />
          </Form.Group>

          <Form.Group controlId="toLocation">
            <Form.Control
              type="text"
              placeholder="To"
              value={params.to}
              onChange={(e) => setParams({ ...params, to: e.target.value })}
              isInvalid={!!errors.to}
              //size="lg"
              className="search-input"
            />

          </Form.Group>

          {/* Date + Time in one line - ALWAYS */}
          <div className="d-flex flex-nowrap gap-2">
            <Form.Group controlId="travelDate" className="flex-grow-1">
              <Form.Control
                type="date"
                value={params.date}
                onChange={(e) => setParams({ ...params, date: e.target.value })}
                isInvalid={!!errors.date}
                min={defaultDate}
                // size="lg"
                // style={{ minWidth: '150px' }}
                className="date-input"
              />

            </Form.Group>

            <Form.Group controlId="startTime" className="flex-shrink-0" style={{ width: '120px' }}>
              <div className="time-input-container">
                <Form.Control
                  type="time"
                  value={params.startTime}
                  onChange={(e) => setParams({ ...params, startTime: e.target.value })}
                  isInvalid={!!errors.startTime}
                  //size="lg"
                  className="time-input"
                />
              </div>

            </Form.Group>
          </div>

          {/* Transport Type */}
          {/* Combined Toggle Buttons and Search Button Row */}
          <div className="toggle-search-row">
            <ToggleButtonGroup
              type="radio"
              name="transportType"
              value={params.transportType}
              onChange={(val) => setParams({ ...params, transportType: val })}
              className="transport-toggle-group"
            >
              <ToggleButton id="All" value="All" variant="outline-primary" className="transport-toggle" title="All transport types">
                <FontAwesomeIcon icon={faBusAlt} />
              </ToggleButton>
              <ToggleButton id="Bus" value="Bus" className="transport-toggle" variant="outline-primary" title="Bus only">
                <FontAwesomeIcon icon={faBus} />
              </ToggleButton>
              <ToggleButton id="Train" value="Train" className="transport-toggle" variant="outline-primary" title="Train only">
                <FontAwesomeIcon icon={faTrain} />
              </ToggleButton>
            </ToggleButtonGroup>

            <Button 
              variant="primary" 
              type="submit" 
              className="search-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" className="me-2" />
              ) : null}
              Search
            </Button>
          </div>
          {/* Validation Errors */}
          <div className="validation-errors">
            {(errors && Object.keys(errors).length > 0) && (
              <Alert variant="danger" className="mt-2">
                <div className="error-messages">
                  {errors.from && <div className="error-message">• Departure location is required</div>}
                  {errors.to && <div className="error-message">• Destination is required</div>}
                  {errors.date && <div className="error-message">• Please select a valid date</div>}
                  {errors.startTime && <div className="error-message">• {errors.startTime}</div>}
                </div>
              </Alert>
            )}
          </div>
        </Stack>
      </Form>

      {/* Error Message */}
      {apiError && (
        <Alert variant="danger" className="mt-3">
          {apiError}
        </Alert>
      )}


      {/* Results Section */}
      {isFormDirty && (
        <div className="mt-4">
          <TripsSection 
            trips={trips}
            title={trips.length > 0 
              ? `Showing ${Math.min(trips.length, 5)} of ${trips.length} trips` 
              : "No trips found"
            }
            maxDisplay={5}
          />
        </div>
      )}
    </div>
  );
};