import { MapPin, Star, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export interface VenueData {
  id: string;
  name: string;
  image: string;
  distance: string;
  rating: number;
  priceLevel: string;
  crowdStatus: 'busy' | 'chill' | 'quiet';
  cuisine: string;
  peopleNow?: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface VenueCardProps {
  venue: VenueData;
  variant?: 'default' | 'featured';
}

const crowdStatusConfig = {
  busy: { label: 'Busy', variant: 'busy' as const, color: 'bg-destructive' },
  chill: { label: 'Chill', variant: 'chill' as const, color: 'bg-accent' },
  quiet: { label: 'Quiet', variant: 'quiet' as const, color: 'bg-secondary' },
};

export function VenueCard({ venue, variant = 'default' }: VenueCardProps) {
  const crowdConfig = crowdStatusConfig[venue.crowdStatus];

  return (
    <Link to={`/restaurant/${venue.id}`}>
      <Card
        className={cn(
          "overflow-hidden hover:shadow-elevated cursor-pointer transition-all duration-300",
          variant === 'featured' ? "min-w-[280px]" : "w-full"
        )}
      >
        <div className="relative">
          <img
            src={venue.image}
            alt={venue.name}
            className="h-36 w-full object-cover"
          />
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge variant={crowdConfig.variant}>
              <span className={cn("mr-1.5 h-2 w-2 rounded-full animate-pulse", crowdConfig.color)} />
              {crowdConfig.label}
            </Badge>
          </div>
          <div className="absolute bottom-3 right-3">
            <Badge variant="price" className="bg-card/90 backdrop-blur-sm">
              {venue.priceLevel}
            </Badge>
          </div>
        </div>

        <div className="p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{venue.name}</h3>
              <p className="text-xs text-muted-foreground">{venue.cuisine}</p>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium">{venue.rating}</span>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{venue.distance}</span>
            </div>
            {venue.peopleNow && (
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{venue.peopleNow} here now</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
