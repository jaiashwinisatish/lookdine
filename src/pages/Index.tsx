import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { VenueList } from '@/components/venue/VenueList';
import { heroData, featuredVenues, nearbyPeople } from '@/data/mockData';
import { PersonCard } from '@/components/social/PersonCard';
import { ChevronRight, Sparkles, Users, MapPin, Utensils } from 'lucide-react';
import { useAppMode } from '@/context/AppModeContext';
import { Link } from 'react-router-dom';

const Index = () => {
  const { isTeenMode } = useAppMode();

  return (
    <AppLayout showSearch>
      <div className="space-y-6 md:space-y-8">
        {/* Hero Section */}
        <div className="relative -mx-4 -mt-4 md:mx-0 md:mt-0 md:rounded-2xl overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-transparent z-10" />
          <img
            src={heroData.image}
            alt="LookDine Hero"
            className="h-56 md:h-[400px] w-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 md:p-8">
            <h1 className="text-2xl md:text-4xl font-bold text-card mb-1">
              {heroData.title}
            </h1>
            <p className="text-sm md:text-lg text-card/80 mb-4 md:mb-6">
              {heroData.subtitle}
            </p>
            <div className="flex gap-2">
              <Link to="/nearby">
                <Button variant="hero" size="sm" className="md:h-10 md:px-6">
                  <MapPin className="h-4 w-4 mr-2" />
                  Explore Nearby
                </Button>
              </Link>
              <Link to="/book">
                <Button variant="glass" size="sm" className="md:h-10 md:px-6">
                  <Utensils className="h-4 w-4 mr-2" />
                  Book a Table
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          {[
            { icon: Utensils, label: 'Restaurants', value: '150+' },
            { icon: Users, label: 'People Nearby', value: '48' },
            { icon: Sparkles, label: 'Events Today', value: '12' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-xl bg-card p-3 shadow-soft hover:shadow-lg transition-all"
            >
              <stat.icon className="h-5 w-5 md:h-8 md:w-8 text-primary mb-1 md:mb-2" />
              <span className="text-lg md:text-2xl font-bold">{stat.value}</span>
              <span className="text-[10px] md:text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8 space-y-6">
            {/* Featured Venues */}
            <VenueList
              venues={featuredVenues}
              horizontal
              title="Popular Near You"
            />
             {/* Trending Cafes */}
             <VenueList
              venues={featuredVenues.slice(0, 3)}
              title="Trending Cafés"
            />
          </div>

          <div className="md:col-span-4 space-y-6">
            {/* People Nearby Section - Only for Adults */}
            {!isTeenMode && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">People Nearby</h2>
                  <Link to="/nearby" className="flex items-center text-sm text-primary font-medium">
                    See all <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                  {nearbyPeople.slice(0, 4).map((person) => (
                    <PersonCard key={person.id} person={person} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
