import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const MyFavorites = () => {
  const favorites = [
    {
      id: 1,
      hotel: 'The Plaza',
      location: 'New York, NY',
    },
    {
      id: 2,
      hotel: 'The Beverly Hills Hotel',
      location: 'Beverly Hills, CA',
    },
  ];

  return (
    <AppLayout title="My Favorites">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
        <div className="space-y-4">
          {favorites.map((favorite) => (
            <Card key={favorite.id}>
              <CardHeader>
                <CardTitle>{favorite.hotel}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{favorite.location}</p>
                <Button variant="outline" className="mt-2">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default MyFavorites;
