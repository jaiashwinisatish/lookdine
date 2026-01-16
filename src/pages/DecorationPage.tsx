import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { decorationItems, featuredVenues } from '@/data/mockData';
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react';

interface CartItem {
  id: string;
  quantity: number;
}

const DecorationPage = () => {
  const [searchParams] = useSearchParams();
  const venueId = searchParams.get('venue');
  const venue = featuredVenues.find((v) => v.id === venueId) || featuredVenues[0];

  const [cart, setCart] = useState<CartItem[]>([]);

  const categories = [...new Set(decorationItems.map((item) => item.category))];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const addToCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === itemId);
      if (existing) {
        return prev.map((c) => (c.id === itemId ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { id: itemId, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((c) => (c.id === itemId ? { ...c, quantity: c.quantity - 1 } : c));
      }
      return prev.filter((c) => c.id !== itemId);
    });
  };

  const getQuantity = (itemId: string) => cart.find((c) => c.id === itemId)?.quantity || 0;

  const total = cart.reduce((sum, cartItem) => {
    const item = decorationItems.find((i) => i.id === cartItem.id);
    return sum + (item?.price || 0) * cartItem.quantity;
  }, 0);

  const filteredItems = decorationItems.filter((item) => item.category === selectedCategory);

  return (
    <AppLayout title="Table Decoration">
      <div className="space-y-5">
        {/* Venue Info */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎉</span>
            <div>
              <p className="font-semibold">Decorating for {venue.name}</p>
              <p className="text-sm text-muted-foreground">Make your celebration special!</p>
            </div>
          </div>
        </Card>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'secondary'}
              className="cursor-pointer whitespace-nowrap px-4 py-2 text-sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredItems.map((item) => {
            const quantity = getQuantity(item.id);
            return (
              <Card key={item.id} className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-28 w-full object-cover"
                />
                <div className="p-3 space-y-2">
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-semibold text-primary">₹{item.price}</span>
                    {quantity > 0 ? (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="iconSm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-4 text-center font-medium">{quantity}</span>
                        <Button
                          variant="outline"
                          size="iconSm"
                          onClick={() => addToCart(item.id)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="soft"
                        size="sm"
                        onClick={() => addToCart(item.id)}
                      >
                        Add
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <Card className="fixed bottom-24 left-4 right-4 max-w-md mx-auto p-4 shadow-elevated bg-card border-primary/20 z-40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">₹{total.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {cart.reduce((sum, c) => sum + c.quantity, 0)} items
                  </p>
                </div>
              </div>
              <Button variant="hero">
                Add to Booking
              </Button>
            </div>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default DecorationPage;
