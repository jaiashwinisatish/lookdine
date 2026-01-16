import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PersonData {
  id: string;
  name: string;
  avatar: string;
  age: number;
  distance: string;
  interests: string[];
  connectionType: 'dating' | 'friendship';
  isBlurred?: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface PersonCardProps {
  person: PersonData;
  onConnect?: () => void;
}

export function PersonCard({ person, onConnect }: PersonCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-elevated transition-all duration-300 cursor-pointer">
      <div className="relative">
        <img
          src={person.avatar}
          alt={person.name}
          className={cn(
            "h-48 w-full object-cover",
            person.isBlurred && "blur-sm"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-lg font-semibold text-card">
                {person.name}, {person.age}
              </h3>
              <div className="flex items-center gap-1 text-xs text-card/80">
                <MapPin className="h-3 w-3" />
                <span>{person.distance}</span>
              </div>
            </div>
            <Badge
              variant={person.connectionType === 'dating' ? 'dating' : 'friendship'}
            >
              {person.connectionType === 'dating' ? '💖 Dating' : '👋 Friendship'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-3">
        <div className="flex flex-wrap gap-1.5">
          {person.interests.slice(0, 3).map((interest) => (
            <Badge key={interest} variant="secondary" className="text-xs">
              {interest}
            </Badge>
          ))}
          {person.interests.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{person.interests.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
