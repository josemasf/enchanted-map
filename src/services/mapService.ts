import type { Location } from '../types';
import { LocationCategory } from '../types';

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

export const getMarkerIcon = (category: LocationCategory | string): string => {
  if (category === LocationCategory.NATURAL) {
    return 'markers/location-natural.svg';
  }
  if (typeof category === 'string' && category.includes('legends')) {
    return 'markers/location-legends.svg';
  }
  return 'markers/location-pin.svg';
};

export function createMarkerOptions(location: Location): MarkerOptions & { popup: { content: string; offset: number } } {
  const icon = getMarkerIcon(location.category);

  return {
    element: {
      className: 'map-marker',
      style: {
        width: '32px',
        height: '32px',
        backgroundImage: `url(${icon})`,
        backgroundSize: 'cover',
        cursor: 'pointer'
      }
    },
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