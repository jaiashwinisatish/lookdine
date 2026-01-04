import { VenueCard, VenueData } from './VenueCard';

interface VenueListProps {
  venues: VenueData[];
  horizontal?: boolean;
  title?: string;
}

export function VenueList({ venues, horizontal = false, title }: VenueListProps) {
  return (
    <div className="space-y-3">
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">{title}</h2>
          <button className="text-sm text-primary font-medium">See all</button>
        </div>
      )}

      {horizontal ? (
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar -mx-4 px-4">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} variant="featured" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      )}
    </div>
  );
}
