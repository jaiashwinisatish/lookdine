import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const MyBookings = () => {
  const bookings = [
    {
      id: 1,
      hotel: 'The Grand Hyatt',
      date: '2024-07-20',
      status: 'Confirmed',
    },
    {
      id: 2,
      hotel: 'The Ritz-Carlton',
      date: '2024-08-15',
      status: 'Pending',
    },
  ];

  return (
    <AppLayout title="My Bookings">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <CardTitle>{booking.hotel}</CardTitle>
                <Badge>{booking.status}</Badge>
              </CardHeader>
              <CardContent>
                <p>Date: {booking.date}</p>
                <Button variant="outline" className="mt-2">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default MyBookings;
