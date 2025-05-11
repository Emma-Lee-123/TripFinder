import { SearchParams, Stop, TripStopGroup } from '../models/transportModels';
import { appendParameterToUrl } from '../utils/Util';
//import { mockStops, mockTrips } from '../data/mockData';

const formatDate = (date: string) => {
  return date.replace(/-/g, '');
};
const formatTime = (time: string) => {
  return time.replace(/:/g, '');
};

export const searchTransport = async (params: SearchParams): Promise<TripStopGroup[]> => {
  const func_url_base: string = import.meta.env.VITE_OPENDATA_TRIPS_SEARCH_URL;
  const date = formatDate(params.date);
  const startTime = formatTime(params.startTime);

  const func_url = appendParameterToUrl(func_url_base, 'from', params.fromId);
  const func_url2 = appendParameterToUrl(func_url, 'to', params.toId);
  const func_url3 = appendParameterToUrl(func_url2, 'date', date);
  const func_url4 = appendParameterToUrl(func_url3, 'startTime', startTime);
  const url = appendParameterToUrl(func_url4, 'transportType', params.transportType);

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Network response was not ok');
  const data: TripStopGroup[] = await response.json();
  return data;
  // Simulate API delay
  // await new Promise((resolve) => setTimeout(resolve, 500));
  // // Mock data based on search parameters
  // if (!params.from || !params.to) {
  //   return [];
  // }
  // return mockTrips;
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
  const func_url_base: string = import.meta.env.VITE_OPENDATA_STOP_SUGGESTION_URL;

  //const func_url = func_url_base + '?pattern=' + encodeURIComponent(searchTerm) + '&maxResults=5';
  const func_url = appendParameterToUrl(func_url_base, 'pattern', searchTerm);
  const url = appendParameterToUrl(func_url, 'maxResults', '5');

  console.log('func_url:', url);
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Network response was not ok');
  const data: Stop[] = await response.json();
  return data;
};
