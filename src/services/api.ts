import { nearbyVenues, nearbyPeople } from '@/data/mockData';
import { VenueData } from '@/components/venue/VenueCard';
import { PersonData } from '@/components/social/PersonCard';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface SignupData {
  name: string;
  email: string;
  password?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export const fetchVenues = async (): Promise<VenueData[]> => {
  return nearbyVenues;
};

export const fetchPeople = async (): Promise<PersonData[]> => {
  return nearbyPeople;
};

export const signup = async (data: SignupData): Promise<User> => {
  await delay(1500); // Simulate network request

  // Basic validation simulation
  if (!data.email || !data.password || !data.name) {
    throw new Error("Missing required fields");
  }

  // Return a mock user
  return {
    id: "user-" + Math.random().toString(36).substr(2, 9),
    name: data.name,
    email: data.email,
    avatar: "https://github.com/shadcn.png"
  };
};
