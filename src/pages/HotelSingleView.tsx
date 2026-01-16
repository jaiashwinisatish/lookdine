import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Clock, 
  Phone, 
  Globe, 
  Wifi, 
  Car,
  CreditCard,
  Coffee,
  Utensils,
  Wine,
  Music,
  Calendar,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface Hotel {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  distance: string;
  waitTime: string;
  price: string;
  tags: string[];
  images: string[];
  description: string;
  address: string;
  phone: string;
  website?: string;
  hours: string;
  amenities: string[];
  menu?: {
    category: string;
    items: { name: string; price: string; description: string }[];
  }[];
  reviews_list?: {
    id: string;
    user: { name: string; avatar: string };
    rating: number;
    date: string;
    comment: string;
  }[];
}

const HotelSingleView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setLoading(true);
        // Mock data - in real app, this would be an API call
        const mockHotel: Hotel = {
          id: id!,
          name: "The Garden Restaurant",
          category: "restaurant",
          rating: 4.5,
          reviews: 234,
          distance: "0.8 km",
          waitTime: "15-20 min",
          price: "$$",
          tags: ["Italian", "Outdoor Seating", "Romantic"],
          images: [
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4a?w=800",
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db2?w=800"
          ],
          description: "Experience authentic Italian cuisine in a beautiful garden setting. Our restaurant offers a romantic atmosphere with outdoor seating, perfect for special occasions or intimate dinners.",
          address: "123 Garden Street, Downtown, NY 10001",
          phone: "+1 (555) 123-4567",
          website: "www.gardenrestaurant.com",
          hours: "Mon-Sun: 11:00 AM - 10:00 PM",
          amenities: ["WiFi", "Outdoor Seating", "Parking", "Credit Cards", "Full Bar"],
          menu: [
            {
              category: "Appetizers",
              items: [
                { name: "Bruschetta", price: "$12", description: "Toasted bread with tomatoes, basil, and garlic" },
                { name: "Caprese", price: "$14", description: "Fresh mozzarella, tomatoes, and basil" }
              ]
            },
            {
              category: "Main Courses",
              items: [
                { name: "Spaghetti Carbonara", price: "$24", description: "Classic pasta with eggs, bacon, and parmesan" },
                { name: "Margherita Pizza", price: "$22", description: "Fresh mozzarella, tomatoes, and basil" }
              ]
            }
          ],
          reviews_list: [
            {
              id: "1",
              user: { name: "Sarah Johnson", avatar: "https://ui-avatars.com/api/?name=Sarah&background=random" },
              rating: 5,
              date: "2024-01-15",
              comment: "Amazing atmosphere and delicious food! Perfect for date night."
            },
            {
              id: "2",
              user: { name: "Mike Chen", avatar: "https://ui-avatars.com/api/?name=Mike&background=random" },
              rating: 4,
              date: "2024-01-10",
              comment: "Great Italian food, love the outdoor seating area."
            }
          ]
        };
        
        setHotel(mockHotel);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load restaurant details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHotel();
    }
  }, [id, toast]);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (hotel?.images.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (hotel?.images.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handleBookNow = () => {
    navigate(`/book?restaurant=${id}`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: hotel?.name
    });
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'parking': return <Car className="h-4 w-4" />;
      case 'credit cards': return <CreditCard className="h-4 w-4" />;
      case 'coffee': return <Coffee className="h-4 w-4" />;
      case 'full bar': return <Wine className="h-4 w-4" />;
      case 'music': return <Music className="h-4 w-4" />;
      default: return <Utensils className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Restaurant Not Found</h1>
          <p className="text-gray-600 mb-4">The restaurant you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/search')}>Back to Search</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header with Book Now Button */}
      <div className="sticky top-0 z-40 bg-white border-b px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm font-medium">
              {hotel.price}
            </Badge>
            <Button size="sm" onClick={handleBookNow} className="sticky-book-now">
              Book Now
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Image Carousel */}
        <div className="relative mb-6 rounded-lg overflow-hidden h-64 md:h-96">
          <img
            src={hotel.images[currentImageIndex]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          
          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
            onClick={handlePreviousImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
            onClick={handleNextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {hotel.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>

          {/* Price Badge */}
          <Badge className="absolute top-4 right-4 text-lg font-bold px-3 py-1">
            {hotel.price}
          </Badge>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{hotel.rating}</span>
                      <span>({hotel.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{hotel.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{hotel.waitTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleFavorite}
                    className={isFavorite ? 'text-red-500' : ''}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-4">
                {hotel.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="menu" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="menu">Menu</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="menu" className="space-y-6">
                {hotel.menu?.map((category) => (
                  <Card key={category.category}>
                    <CardHeader>
                      <CardTitle className="text-xl">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-start pb-4 border-b last:border-b-0">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            </div>
                            <span className="font-medium text-gray-900 ml-4">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="info" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact & Hours</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span>{hotel.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span>{hotel.phone}</span>
                    </div>
                    {hotel.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-gray-400" />
                        <a href={`https://${hotel.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {hotel.website}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span>{hotel.hours}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {hotel.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-2">
                          {getAmenityIcon(amenity)}
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                {hotel.reviews_list?.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.user.avatar} />
                          <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{review.user.name}</h4>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">{review.date}</span>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-primary mb-2">{hotel.price}</div>
                    <p className="text-sm text-gray-600">Average price per person</p>
                  </div>
                  
                  <Separator className="mb-4" />
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rating</span>
                      <span className="font-medium">{hotel.rating} ⭐</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Distance</span>
                      <span className="font-medium">{hotel.distance}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Wait Time</span>
                      <span className="font-medium">{hotel.waitTime}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={handleBookNow} 
                    className="w-full sticky-book-now"
                    size="lg"
                  >
                    Book Now
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => navigate(`/search`)}
                  >
                    View More Options
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" onClick={toggleFavorite}>
                      <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Restaurant
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Make Reservation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSingleView;
