import type { Location } from '../types';

interface MapOptions {
  style: string;
  zoom: number;
  center: [number, number];
  interactive: boolean;
}

interface MarkerStyle {
  width: string;
  height: string;
  backgroundImage: string;
  backgroundSize: string;
  cursor: string;
}

interface MarkerOptions {
  element: {
    className: string;
    style: MarkerStyle;
  };
}

export const DEFAULT_MAP_OPTIONS: MapOptions = {
  style: 'streets',
  zoom: 13,
  center: [37.8899116,-4.8005364], // Center on Córdoba, Spain
  interactive: true
};

export const DEFAULT_MARKER_OPTIONS: MarkerOptions = {
  element: {
    className: 'map-marker',
    style: {
      width: '32px',
      height: '32px',
      backgroundImage: 'url(/markers/location-pin.svg)',
      backgroundSize: 'cover',
      cursor: 'pointer'
    }
  }
};

export function createMarkerOptions(location: Location): MarkerOptions & { popup: { content: string; offset: number } } {
  return {
    ...DEFAULT_MARKER_OPTIONS,
    popup: {
      content: `<h3>${location.name}</h3>`,
      offset: 25
    }
  };
}

export function getMapCenterForLocation(location: Location, zoom = 15): { center: [number, number]; zoom: number; animationOptions: { duration: number } } {
  return {
    center: [location.latitude, location.longitude],
    zoom,
    animationOptions: {
      duration: 1000
    }
  };
}