import { nearbyVenues, nearbyPeople } from '@/data/mockData';
import { VenueData } from '@/components/venue/VenueCard';
import { PersonData } from '@/components/social/PersonCard';

export const fetchVenues = async (): Promise<VenueData[]> => {
  return nearbyVenues;
};

export const fetchPeople = async (): Promise<PersonData[]> => {
  return nearbyPeople;
};
