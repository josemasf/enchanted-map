// Location type
export interface Location {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  category: LocationCategory;
  imageUrl?: string;
  image?: string;
  story?: string;
  createdAt: string;
  updatedAt: string;
}

// Location categories
export enum LocationCategory {
  HISTORICAL = 'historical',
  CULTURAL = 'cultural',
  NATURAL = 'natural',
  RELIGIOUS = 'religious',
  CULINARY = 'culinary',
  LEGENDS = 'legends',
}

// Map view mode
export enum MapViewMode {
  FULL = 'full',
  LIMITED = 'limited'
}

// User for auth contexts
export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  profileImageUrl?: string;
}