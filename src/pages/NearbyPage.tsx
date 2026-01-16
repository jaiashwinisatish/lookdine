import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { VenueList } from '@/components/venue/VenueList';
import { PersonCard } from '@/components/social/PersonCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppMode } from '@/context/AppModeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Utensils, Coffee, MapPin } from 'lucide-react';
import { MapComponent } from '@/components/map/MapComponent';
import { fetchVenues, fetchPeople } from '@/services/api';
import { VenueData } from '@/components/venue/VenueCard';
import { PersonData } from '@/components/social/PersonCard';

const NearbyPage = () => {
  const { isTeenMode } = useAppMode();
  const [activeTab, setActiveTab] = useState('all');
  const [connectionFilter, setConnectionFilter] = useState<'all' | 'dating' | 'friendship'>('all');
  const [venues, setVenues] = useState<VenueData[]>([]);
  const [people, setPeople] = useState<PersonData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [venuesData, peopleData] = await Promise.all([
          fetchVenues(),
          fetchPeople()
        ]);
        setVenues(venuesData);
        setPeople(peopleData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredPeople = people.filter((person) => {
    if (connectionFilter === 'all') return true;
    return person.connectionType === connectionFilter;
  });

  if (loading) {
    return (
      <AppLayout showSearch title="Nearby">
        <div className="flex h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout showSearch title="Nearby">
      <div className="space-y-4">
        {/* Map Section */}
        <MapComponent venues={venues} people={!isTeenMode ? people : []} />

        {/* Location indicator */}
        <div className="flex items-center gap-2 rounded-xl bg-primary/5 p-3">
          <MapPin className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium">Current Location</p>
            <p className="text-xs text-muted-foreground">Koramangala, Bangalore</p>
          </div>
          <Button variant="ghost" size="sm" className="ml-auto">
            Change
          </Button>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 rounded-xl bg-muted p-1">
            <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-soft">
              All
            </TabsTrigger>
            <TabsTrigger value="places" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-soft">
              <Utensils className="h-4 w-4 mr-1" />
              Places
            </TabsTrigger>
            {!isTeenMode && (
              <TabsTrigger value="people" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-soft">
                <Users className="h-4 w-4 mr-1" />
                People
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="all" className="space-y-6 mt-4">
            {/* Cafes & Restaurants Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Coffee className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Cafés & Restaurants Nearby</h2>
              </div>
            <VenueList venues={venues} horizontal />
            </div>

            {/* People Section - Adults only */}
            {!isTeenMode && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">People Nearby</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {people.slice(0, 4).map((person) => (
                    <PersonCard key={person.id} person={person} />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="places" className="space-y-4 mt-4">
            {/* Category filters */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4">
              {['All', 'Cafés', 'Restaurants', 'Bars', 'Rooftops'].map((cat) => (
                <Badge
                  key={cat}
                  variant={cat === 'All' ? 'default' : 'secondary'}
                  className="cursor-pointer whitespace-nowrap px-3 py-1.5"
                >
                  {cat}
                </Badge>
              ))}
            </div>

            <VenueList venues={venues} />
          </TabsContent>

          {!isTeenMode && (
            <TabsContent value="people" className="space-y-4 mt-4">
              {/* Connection type filter */}
              <div className="flex gap-2">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'dating', label: '💖 Dating' },
                  { key: 'friendship', label: '👋 Friendship' },
                ].map((filter) => (
                  <Badge
                    key={filter.key}
                    variant={connectionFilter === filter.key ? 'default' : 'secondary'}
                    className="cursor-pointer px-3 py-1.5"
                    onClick={() => setConnectionFilter(filter.key as typeof connectionFilter)}
                  >
                    {filter.label}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {filteredPeople.map((person) => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default NearbyPage;
