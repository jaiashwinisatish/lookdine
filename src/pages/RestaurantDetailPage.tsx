import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { featuredVenues, menuItems, sampleTables } from '@/data/mockData';
import { TableLayout } from '@/components/booking/TableLayout';
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Users,
  Phone,
  Share2,
  Heart,
  ChevronRight,
  Leaf,
} from 'lucide-react';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const [selectedTable, setSelectedTable] = useState<string>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('menu');

  // Find venue
  const venue = featuredVenues.find((v) => v.id === id);

  if (!venue) {
    return <NotFound />;
  }

  const categories = [...new Set(menuItems.map((item) => item.category))];

  return (
    <AppLayout showHeader={false}>
      {/* Hero Image with Overlay */}
      <div className="relative -mx-4 -mt-4">
        <img
          src={venue.image}
          alt={venue.name}
          className="h-64 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-foreground/20" />

        {/* Top Navigation */}
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="glass" size="icon" aria-label="Go back">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="glass" size="icon" aria-label="Share venue">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="glass"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? 'fill-destructive text-destructive' : ''}`}
              />
            </Button>
          </div>
        </div>

        {/* Venue Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-card">
          <Badge variant="chill" className="mb-2">
            <span className="mr-1.5 h-2 w-2 rounded-full bg-sage animate-pulse" />
            {venue.crowdStatus.charAt(0).toUpperCase() + venue.crowdStatus.slice(1)} · {venue.peopleNow} here now
          </Badge>
          <h1 className="text-2xl font-bold mb-1">{venue.name}</h1>
          <p className="text-sm opacity-90">{venue.cuisine}</p>
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-4 gap-2 py-4 border-b border-border">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-primary">
            <Star className="h-4 w-4 fill-primary" />
            <span className="font-bold">{venue.rating}</span>
          </div>
          <span className="text-[10px] text-muted-foreground">Rating</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-primary">{venue.priceLevel}</span>
          <span className="text-[10px] text-muted-foreground">Price</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">{venue.distance}</span>
          <span className="text-[10px] text-muted-foreground">Away</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">30 min</span>
          <span className="text-[10px] text-muted-foreground">Delivery</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 py-4">
        <Link to={`/book?venue=${venue.id}`} className="flex-1">
          <Button variant="hero" className="w-full">
            Book a Table
          </Button>
        </Link>
        <Link to={`/decorate?venue=${venue.id}`}>
          <Button variant="outline" size="icon" className="h-11 w-11" aria-label="Decorate table">
            🎉
          </Button>
        </Link>
        <Button variant="outline" size="icon" className="h-11 w-11" aria-label="Call venue">
          <Phone className="h-5 w-5" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 rounded-xl bg-muted p-1">
          <TabsTrigger value="menu" className="rounded-lg">
            Menu
          </TabsTrigger>
          <TabsTrigger value="photos" className="rounded-lg">
            Photos
          </TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-lg">
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="menu" className="mt-4 space-y-4">
          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4">
            {categories.map((cat) => (
              <Badge key={cat} variant="secondary" className="cursor-pointer whitespace-nowrap px-3 py-1.5">
                {cat}
              </Badge>
            ))}
          </div>

          {/* Menu Items */}
          <div className="space-y-3">
            {menuItems.map((item) => (
              <Card key={item.id} className="flex overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 object-cover"
                />
                <div className="flex flex-1 flex-col justify-between p-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{item.name}</h3>
                      {item.isVeg && (
                        <Leaf className="h-3 w-3 text-sage-dark" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary">₹{item.price}</span>
                    <Button variant="soft" size="sm">
                      Add
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="photos" className="mt-4">
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <img
                key={i}
                src={venue.image}
                alt={`Gallery ${i}`}
                className="aspect-square rounded-lg object-cover"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-4 space-y-3">
          {[
            { name: 'Priya S.', rating: 5, text: 'Amazing ambiance and delicious food! The pasta was to die for.' },
            { name: 'Rahul M.', rating: 4, text: 'Great place for dates. Slightly pricey but worth it.' },
            { name: 'Ananya K.', rating: 5, text: 'Best Italian in the city! Love the outdoor seating.' },
          ].map((review, i) => (
            <Card key={i} className="p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{review.name}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-accent text-accent" />
                  <span className="text-sm">{review.rating}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{review.text}</p>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Table Layout Preview */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Table Layout</h2>
          <Link to={`/book?venue=${venue.id}`} className="flex items-center text-sm text-primary">
            Book Now <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <TableLayout
          tables={sampleTables}
          selectedTableId={selectedTable}
          onSelectTable={setSelectedTable}
        />
        {selectedTable && (
          <p className="text-sm text-center text-muted-foreground">
            Table {sampleTables.find((t) => t.id === selectedTable)?.number} selected
          </p>
        )}
      </div>
    </AppLayout>
  );
};

export default RestaurantDetailPage;
