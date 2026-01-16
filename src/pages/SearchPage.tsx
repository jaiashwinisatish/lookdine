import { useState } from "react";
import { Search as SearchIcon, Filter, MapPin, Star, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "restaurant", label: "Restaurants" },
    { id: "cafe", label: "Cafes" },
    { id: "bar", label: "Bars" },
    { id: "hotel", label: "Hotels" },
  ];

  const mockResults = [
    {
      id: 1,
      name: "The Garden Restaurant",
      category: "restaurant",
      rating: 4.5,
      reviews: 234,
      distance: "0.8 km",
      waitTime: "15-20 min",
      price: "$$",
      tags: ["Italian", "Outdoor Seating", "Romantic"],
    },
    {
      id: 2,
      name: "Coffee House",
      category: "cafe",
      rating: 4.2,
      reviews: 156,
      distance: "0.3 km",
      waitTime: "5-10 min",
      price: "$",
      tags: ["Coffee", "Pastries", "WiFi"],
    },
    {
      id: 3,
      name: "Sky Lounge Bar",
      category: "bar",
      rating: 4.7,
      reviews: 89,
      distance: "1.2 km",
      waitTime: "10-15 min",
      price: "$$$",
      tags: ["Cocktails", "Rooftop", "Live Music"],
    },
  ];

  const filteredResults = mockResults.filter((result) => {
    const matchesSearch = result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || result.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search</h1>
          <p className="text-gray-600">Find restaurants, cafes, bars, and hotels</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by name, cuisine, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredResults.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          ) : (
            filteredResults.map((result) => (
              <Card key={result.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{result.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{result.rating}</span>
                          <span>({result.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{result.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{result.waitTime}</span>
                        </div>
                        <span className="font-medium">{result.price}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {result.category}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap mb-3">
                    {result.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Separator className="mb-3" />
                  
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Filter Button */}
        <div className="fixed bottom-6 right-6">
          <Button size="lg" className="rounded-full shadow-lg">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
