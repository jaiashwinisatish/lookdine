import heroImage from '@/assets/hero-cafe.jpg';
import italianImg from '@/assets/restaurant-italian.jpg';
import japaneseImg from '@/assets/restaurant-japanese.jpg';
import rooftopImg from '@/assets/restaurant-rooftop.jpg';
import mexicanImg from '@/assets/restaurant-mexican.jpg';

import { VenueData } from '@/components/venue/VenueCard';
import { PersonData } from '@/components/social/PersonCard';
import { TableData } from '@/components/booking/TableLayout';

export const heroData = {
  image: heroImage,
  title: "Find Your Dining Crew",
  subtitle: "Connect with people, discover places, make memories",
};

export const featuredVenues: VenueData[] = [
  {
    id: '1',
    name: 'La Trattoria',
    image: italianImg,
    distance: '0.3 km',
    rating: 4.8,
    priceLevel: '₹₹₹',
    crowdStatus: 'chill',
    cuisine: 'Italian',
    peopleNow: 12,
  },
  {
    id: '2',
    name: 'Sakura Sushi',
    image: japaneseImg,
    distance: '0.8 km',
    rating: 4.9,
    priceLevel: '₹₹₹₹',
    crowdStatus: 'busy',
    cuisine: 'Japanese',
    peopleNow: 28,
  },
  {
    id: '3',
    name: 'Sky Lounge',
    image: rooftopImg,
    distance: '1.2 km',
    rating: 4.7,
    priceLevel: '₹₹₹',
    crowdStatus: 'chill',
    cuisine: 'Continental',
    peopleNow: 18,
  },
  {
    id: '4',
    name: 'Casa Mexicana',
    image: mexicanImg,
    distance: '0.5 km',
    rating: 4.6,
    priceLevel: '₹₹',
    crowdStatus: 'quiet',
    cuisine: 'Mexican',
    peopleNow: 6,
  },
];

export const nearbyVenues: VenueData[] = [
  ...featuredVenues,
  {
    id: '5',
    name: 'The Brew House',
    image: heroImage,
    distance: '0.2 km',
    rating: 4.5,
    priceLevel: '₹₹',
    crowdStatus: 'busy',
    cuisine: 'Café & Brewery',
    peopleNow: 15,
  },
];

export const nearbyPeople: PersonData[] = [
  {
    id: '1',
    name: 'Priya',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    age: 24,
    distance: '0.5 km',
    interests: ['Coffee', 'Art', 'Music', 'Travel'],
    connectionType: 'dating',
  },
  {
    id: '2',
    name: 'Rahul',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    age: 27,
    distance: '0.8 km',
    interests: ['Food', 'Photography', 'Hiking'],
    connectionType: 'friendship',
  },
  {
    id: '3',
    name: 'Ananya',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    age: 23,
    distance: '1.2 km',
    interests: ['Books', 'Movies', 'Yoga', 'Cooking'],
    connectionType: 'dating',
  },
  {
    id: '4',
    name: 'Arjun',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    age: 26,
    distance: '0.3 km',
    interests: ['Gaming', 'Tech', 'Startups'],
    connectionType: 'friendship',
  },
];

export const menuItems = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella, basil',
    price: 450,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    category: 'Mains',
    isVeg: true,
  },
  {
    id: '2',
    name: 'Pasta Carbonara',
    description: 'Creamy sauce, pancetta, parmesan',
    price: 520,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400',
    category: 'Mains',
    isVeg: false,
  },
  {
    id: '3',
    name: 'Bruschetta',
    description: 'Grilled bread, tomatoes, garlic, olive oil',
    price: 280,
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400',
    category: 'Starters',
    isVeg: true,
  },
  {
    id: '4',
    name: 'Tiramisu',
    description: 'Coffee-soaked ladyfingers, mascarpone',
    price: 350,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
    category: 'Desserts',
    isVeg: true,
  },
  {
    id: '5',
    name: 'Caesar Salad',
    description: 'Romaine, parmesan, croutons, caesar dressing',
    price: 320,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400',
    category: 'Starters',
    isVeg: true,
  },
];

export const decorationItems = [
  {
    id: '1',
    name: 'Birthday Cake',
    description: 'Chocolate truffle cake (1 kg)',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    category: 'Cakes',
  },
  {
    id: '2',
    name: 'Rose Bouquet',
    description: '12 premium red roses',
    price: 800,
    image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400',
    category: 'Flowers',
  },
  {
    id: '3',
    name: 'Balloon Bundle',
    description: '20 helium balloons with ribbons',
    price: 500,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400',
    category: 'Balloons',
  },
  {
    id: '4',
    name: 'Anniversary Special',
    description: 'Candles, petals, champagne setup',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400',
    category: 'Packages',
  },
];

export const sampleTables: TableData[] = [
  { id: 't1', number: 1, seats: 2, x: 20, y: 25, isAvailable: true, type: 'round' },
  { id: 't2', number: 2, seats: 2, x: 40, y: 25, isAvailable: true, type: 'round' },
  { id: 't3', number: 3, seats: 4, x: 65, y: 25, isAvailable: false, type: 'square' },
  { id: 't4', number: 4, seats: 4, x: 85, y: 25, isAvailable: true, type: 'square' },
  { id: 't5', number: 5, seats: 2, x: 20, y: 55, isAvailable: true, type: 'round' },
  { id: 't6', number: 6, seats: 6, x: 50, y: 55, isAvailable: true, type: 'rectangular' },
  { id: 't7', number: 7, seats: 4, x: 80, y: 55, isAvailable: true, type: 'square' },
  { id: 't8', number: 8, seats: 2, x: 20, y: 80, isAvailable: false, type: 'round' },
  { id: 't9', number: 9, seats: 4, x: 50, y: 80, isAvailable: true, type: 'square' },
  { id: 't10', number: 10, seats: 8, x: 80, y: 80, isAvailable: true, type: 'rectangular' },
];

export const chatConversations = [
  {
    id: '1',
    name: 'Priya',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    lastMessage: "Hey! Are you free for coffee tomorrow? ☕",
    time: '2m ago',
    unread: 2,
  },
  {
    id: '2',
    name: 'Rahul',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    lastMessage: "That place was amazing! Thanks for the recommendation.",
    time: '1h ago',
    unread: 0,
  },
  {
    id: '3',
    name: 'La Trattoria',
    avatar: italianImg,
    lastMessage: "Your table is confirmed for 7 PM tonight!",
    time: '3h ago',
    unread: 1,
    isVenue: true,
  },
];
