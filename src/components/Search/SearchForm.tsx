import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  Alert,
  Spinner,
} from 'react-bootstrap';
import { faBus, faTrain, faBusAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchParams, Stop, TripStopGroup } from '../../models/transportModels';
import { searchTransport, getStopsForAutocomplete } from '../../apis/transportApi';
import './SearchForm.css';
import { debounce } from '../../utils/debounce';
import TripStopGroups from './TripStopGroups';

export const SearchForm: React.FC = () => {
  const defaultDate = new Date().toISOString().split('T')[0];
  const defaultTime = '08:00';

  const [params, setParams] = useState<SearchParams>({
    fromId: '',
    toId: '',
    from: '',
    to: '',
    date: defaultDate,
    startTime: defaultTime,
    transportType: 'All',
  });

  const [trips, setTrips] = useState<TripStopGroup[]>([]);
  const [errors, setErrors] = useState<Partial<SearchParams>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [fromSuggestions, setFromSuggestions] = useState<Stop[]>([]);
  const [toSuggestions, setToSuggestions] = useState<Stop[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  //const debouncedGetStops = debounce<string[], Stop[]>(getStopsForAutocomplete, 300);
  const debouncedFromSearch = debounce<string[], Stop[]>(async (searchTerm) => {
    try {
      return await getStopsForAutocomplete(searchTerm);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : `Failed to fetch stops by ${searchTerm}`);
      return [];
    }
  }, 300);
  const debouncedToSearch = debounce<string[], Stop[]>(async (searchTerm) => {
    try {
      return await getStopsForAutocomplete(searchTerm);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : `Failed to fetch stops by ${searchTerm}`);
      return [];
    }
  }, 300);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedFromSearch.cancel();
      debouncedToSearch.cancel();
    };
  }, []);

  // Handle From input changes
  const handleFromChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setParams({ ...params, from: value });
    setShowFromSuggestions(true);

    if (value.length < 2) {
      setFromSuggestions([]);
      return;
    }
    const stops = await debouncedFromSearch(value);
    setFromSuggestions(stops);
    // if (value.length > 1) {
    //   const suggestions = await debouncedGetStops(value);
    //   setFromSuggestions(suggestions);
    //   setShowFromSuggestions(true);
    // }
  };

  // Handle To input changes
  const handleToChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setParams({ ...params, to: value });
    setShowToSuggestions(true);
    if (value.length < 2) {
      setToSuggestions([]);
      return;
    }

    const stops = await debouncedToSearch(value);
    setToSuggestions(stops);
    // if (value.length > 1) {
    //   const suggestions = await debouncedGetStops(value);
    //   setToSuggestions(suggestions);
    //   setShowToSuggestions(true);
    // }
  };

  // Select a suggestion
  // const selectSuggestion = (field: 'from' | 'to', value: string) => {
  //   setParams({ ...params, [field]: value });
  //   if (field === 'from') {
  //     setShowFromSuggestions(false);
  //   } else {
  //     setShowToSuggestions(false);
  //   }
  // };
  // Shared suggestion render helper
  const renderSuggestions = (suggestions: Stop[], handler: (stop: Stop) => void) => (
    <ul className="suggestions-list">
      {suggestions.map((stop) => (
        <li key={stop.id} onClick={() => handler(stop)} className="suggestion-item">
          {stop.name}
        </li>
      ))}
    </ul>
  );
  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: Partial<SearchParams> = {};

    if (!params.from.trim()) newErrors.from = 'Departure location is required';
    if (!params.to.trim()) newErrors.to = 'Destination is required';
    if (params.from.trim().toLowerCase() === params.to.trim().toLowerCase()) {
      newErrors.to = 'Destination must be different from departure';
    }
    if (!params.date) newErrors.date = 'Date is required';

    // Time validation (HH:MM format between 05:00-23:00)
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(params.startTime)) {
      newErrors.startTime = 'Invalid time format (HH:MM)';
    } else {
      const [hours] = params.startTime.split(':').map(Number);
      if (hours < 5 || hours > 23) {
        newErrors.startTime = 'Time must be between 05:00 and 23:00';
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
      setApiError(err instanceof Error ? err.message : 'Failed to fetch results');
      setTrips([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if form has any values (for conditional styling)
  const isFormDirty = Object.values(params).some((val) => val !== '' && val !== 'All');

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowFromSuggestions(false);
      setShowToSuggestions(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="transport-search-container">
      <header className="search-form-header">
        <h1>Trip Finder</h1>
      </header>

      <Form onSubmit={handleSubmit} noValidate className="search-form">
        <Stack gap={1}>
          {/* From/To Inputs */}
          <div className="autocomplete-container">
            <Form.Control
              type="text"
              placeholder="From"
              value={params.from}
              onChange={handleFromChange}
              onClick={(e) => {
                e.stopPropagation();
              }}
              autoComplete="off"
              isInvalid={!!errors.from}
              //size="lg"
              className="search-input"
            />
            {showFromSuggestions &&
              fromSuggestions.length > 0 &&
              renderSuggestions(fromSuggestions, (stop) => {
                setParams({ ...params, fromId: stop.id, from: stop.name });
                setShowFromSuggestions(false);
              })}
          </div>

          <div className="autocomplete-container">
            <Form.Control
              type="text"
              placeholder="To"
              value={params.to}
              onChange={handleToChange}
              onClick={(e) => {
                e.stopPropagation(); // Prevents the click from closing the suggestions
              }}
              isInvalid={!!errors.to}
              //size="lg"
              className="search-input"
            />
            {showToSuggestions &&
              toSuggestions.length > 0 &&
              renderSuggestions(toSuggestions, (stop) => {
                setParams({ ...params, toId: stop.id, to: stop.name });
                setShowToSuggestions(false);
              })}
          </div>

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
              <ToggleButton
                id="All"
                value="All"
                variant="outline-primary"
                className="transport-toggle"
                title="All transport types"
              >
                <FontAwesomeIcon icon={faBusAlt} />
              </ToggleButton>
              <ToggleButton
                id="Bus"
                value="Bus"
                className="transport-toggle"
                variant="outline-primary"
                title="Bus only"
              >
                <FontAwesomeIcon icon={faBus} />
              </ToggleButton>
              <ToggleButton
                id="Train"
                value="Train"
                className="transport-toggle"
                variant="outline-primary"
                title="Train only"
              >
                <FontAwesomeIcon icon={faTrain} />
              </ToggleButton>
            </ToggleButtonGroup>

            <Button variant="primary" type="submit" className="search-btn" disabled={isLoading}>
              {isLoading ? <Spinner animation="border" size="sm" className="me-2" /> : null}
              Search
            </Button>
          </div>
          {/* Validation Errors */}
          <div className="validation-errors">
            {errors && Object.keys(errors).length > 0 && (
              <Alert variant="danger" className="mt-2">
                <div className="error-messages">
                  {errors.from && (
                    <div className="error-message">• Departure location is required</div>
                  )}
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
          <TripStopGroups
            groups={trips}
            title={trips.length > 0 ? `${params.from} to ${params.to}` : 'No trips found'}
          />
        </div>
      )}
    </div>
  );
};
