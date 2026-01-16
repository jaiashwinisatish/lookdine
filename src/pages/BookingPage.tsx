import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TableLayout } from '@/components/booking/TableLayout';
import { featuredVenues, sampleTables } from '@/data/mockData';
import { Calendar, Clock, Users, Minus, Plus, Check, ChevronRight, MapPin, Star } from 'lucide-react';

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const venueIdFromParams = searchParams.get('venue');
  
  // Top 3 cafes for selection
  const topCafes = featuredVenues.slice(0, 3);
  
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(venueIdFromParams);
  const [selectedTable, setSelectedTable] = useState<string>();
  const [guestCount, setGuestCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedTime, setSelectedTime] = useState('7:00 PM');
  const [step, setStep] = useState<'venue' | 'table' | 'details' | 'confirm'>(venueIdFromParams ? 'table' : 'venue');

  const venue = featuredVenues.find((v) => v.id === selectedVenueId) || topCafes[0];

  const dates = ['Today', 'Tomorrow', 'Sat, 22', 'Sun, 23', 'Mon, 24'];
  const times = ['6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'];

  const selectedTableData = sampleTables.find((t) => t.id === selectedTable);

  const handleVenueSelect = (venueId: string) => {
    setSelectedVenueId(venueId);
    setSelectedTable(undefined);
  };

  return (
    <AppLayout title="Book a Table">
      <div className="space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2">
          {['venue', 'table', 'details', 'confirm'].map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  step === s
                    ? 'bg-primary text-primary-foreground'
                    : ['venue', 'table', 'details', 'confirm'].indexOf(step) > i
                    ? 'bg-sage text-sage-dark'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {['venue', 'table', 'details', 'confirm'].indexOf(step) > i ? (
                  <Check className="h-4 w-4" />
                ) : (
                  i + 1
                )}
              </div>
              {i < 3 && (
                <div className={`mx-2 h-0.5 w-6 ${
                  ['venue', 'table', 'details', 'confirm'].indexOf(step) > i
                    ? 'bg-sage'
                    : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 0: Select Venue/Café */}
        {step === 'venue' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-semibold">Choose a Café</h2>
            <div className="space-y-3">
              {topCafes.map((cafe) => (
                <Card
                  key={cafe.id}
                  className={`flex overflow-hidden cursor-pointer transition-all duration-200 ${
                    selectedVenueId === cafe.id
                      ? 'ring-2 ring-primary shadow-glow'
                      : 'hover:shadow-soft'
                  }`}
                  onClick={() => handleVenueSelect(cafe.id)}
                >
                  <img src={cafe.image} alt={cafe.name} className="h-24 w-24 object-cover" />
                  <div className="flex flex-1 flex-col justify-center p-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{cafe.name}</h3>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                        <span className="font-medium">{cafe.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{cafe.cuisine}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{cafe.distance}</span>
                      </div>
                      <Badge variant="price" className="text-[10px]">{cafe.priceLevel}</Badge>
                      <Badge
                        variant={cafe.crowdStatus === 'busy' ? 'busy' : cafe.crowdStatus === 'chill' ? 'chill' : 'quiet'}
                        className="text-[10px]"
                      >
                        {cafe.crowdStatus}
                      </Badge>
                    </div>
                  </div>
                  {selectedVenueId === cafe.id && (
                    <div className="flex items-center pr-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
            <Button
              variant="hero"
              className="w-full"
              disabled={!selectedVenueId}
              onClick={() => setStep('table')}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Selected Venue Card (shown in later steps) */}
        {step !== 'venue' && (
          <Card className="flex overflow-hidden">
            <img src={venue.image} alt={venue.name} className="h-20 w-20 object-cover" />
            <div className="flex flex-1 flex-col justify-center p-3">
              <h3 className="font-semibold">{venue.name}</h3>
              <p className="text-xs text-muted-foreground">{venue.cuisine} · {venue.distance}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="self-center mr-2 text-primary"
              onClick={() => setStep('venue')}
            >
              Change
            </Button>
          </Card>
        )}

        {/* Step 1: Select Table */}
        {step === 'table' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-semibold">Select Your Table</h2>
            <TableLayout
              tables={sampleTables}
              selectedTableId={selectedTable}
              onSelectTable={setSelectedTable}
            />
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-card border-2 border-border" />
                  <span className="text-muted-foreground">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-muted" />
                  <span className="text-muted-foreground">Occupied</span>
                </div>
              </div>
            </div>
            {selectedTableData && (
              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Table {selectedTableData.number}</p>
                    <p className="text-sm text-muted-foreground">{selectedTableData.seats} seats · {selectedTableData.type}</p>
                  </div>
                  <Badge variant="chill">Window Seat</Badge>
                </div>
              </Card>
            )}
            <Button
              variant="hero"
              className="w-full"
              disabled={!selectedTable}
              onClick={() => setStep('details')}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Date, Time, Guests */}
        {step === 'details' && (
          <div className="space-y-5 animate-fade-in">
            {/* Date Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Select Date</h3>
              </div>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4">
                {dates.map((date) => (
                  <Button
                    key={date}
                    variant={selectedDate === date ? 'default' : 'outline'}
                    size="sm"
                    className="whitespace-nowrap"
                    onClick={() => setSelectedDate(date)}
                  >
                    {date}
                  </Button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Select Time</h3>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {times.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            {/* Guest Count */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Number of Guests</h3>
              </div>
              <div className="flex items-center justify-center gap-6">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-3xl font-bold w-12 text-center">{guestCount}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setGuestCount(Math.min(selectedTableData?.seats || 8, guestCount + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep('table')}>
                Back
              </Button>
              <Button variant="hero" className="flex-1" onClick={() => setStep('confirm')}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 'confirm' && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="font-semibold text-center">Booking Summary</h2>
            
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Restaurant</span>
                <span className="font-medium">{venue.name}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Table</span>
                <span className="font-medium">Table {selectedTableData?.number} ({selectedTableData?.seats} seats)</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{selectedDate}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Guests</span>
                <span className="font-medium">{guestCount} people</span>
              </div>
            </Card>

            {/* Decoration Add-on */}
            <Link to={`/decorate?venue=${venue.id}`}>
              <Card className="p-4 bg-primary/5 border-primary/20 cursor-pointer hover:shadow-soft transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎉</span>
                    <div>
                      <p className="font-medium">Add Table Decoration</p>
                      <p className="text-xs text-muted-foreground">Cakes, balloons, flowers & more</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
            </Link>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep('details')}>
                Back
              </Button>
              <Button variant="hero" className="flex-1">
                Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default BookingPage;
