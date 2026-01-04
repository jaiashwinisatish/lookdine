import { nearbyVenues, nearbyPeople } from '@/data/mockData';
import { VenueData } from '@/components/venue/VenueCard';
import { PersonData } from '@/components/social/PersonCard';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchVenues = async (): Promise<VenueData[]> => {
  await delay(800); // 800ms simulated latency
  return nearbyVenues;
};

export const fetchPeople = async (): Promise<PersonData[]> => {
  await delay(800); // 800ms simulated latency
  return nearbyPeople;
};

export const fetchChatStatus = async (): Promise<{ cleared: string[], deleted: string[] }> => {
  await delay(300);
  const cleared = JSON.parse(localStorage.getItem('clearedChats') || '[]');
  const deleted = JSON.parse(localStorage.getItem('deletedChats') || '[]');
  return { cleared, deleted };
};

export const clearChat = async (chatId: string): Promise<void> => {
  await delay(300);
  const cleared = JSON.parse(localStorage.getItem('clearedChats') || '[]');
  if (!cleared.includes(chatId)) {
    cleared.push(chatId);
    localStorage.setItem('clearedChats', JSON.stringify(cleared));
  }
};

export const deleteChat = async (chatId: string): Promise<void> => {
  await delay(300);
  const deleted = JSON.parse(localStorage.getItem('deletedChats') || '[]');
  if (!deleted.includes(chatId)) {
    deleted.push(chatId);
    localStorage.setItem('deletedChats', JSON.stringify(deleted));
  }
};
