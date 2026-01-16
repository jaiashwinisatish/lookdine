import { useState } from "react";
import { Search as SearchIcon, Filter, MapPin, Star, Clock, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@/hooks/use-search";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const {
    searchParams,
    results,
    loading,
    error,
    updateSearchParam,
    debouncedQuery,
  } = useSearch();

  const categories = [
    { id: "all", label: "All" },
    { id: "restaurant", label: "Restaurants" },
    { id: "cafe", label: "Cafes" },
    { id: "bar", label: "Bars" },
    { id: "hotel", label: "Hotels" },
  ];

  const priceRanges = [
    { id: "all", label: "All Prices" },
    { id: "$", label: "$" },
    { id: "$$", label: "$$" },
    { id: "$$$", label: "$$$" },
    { id: "$$$$", label: "$$$$" },
  ];

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
              value={searchParams.query}
              onChange={(e) => updateSearchParam('query', e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
            {loading && (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 animate-spin" />
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={searchParams.category === category.id ? "default" : "outline"}
                onClick={() => updateSearchParam('category', category.id)}
                className="rounded-full"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Price Filters */}
        <div className="mb-6">
          <div className="flex gap-2 flex-wrap">
            {priceRanges.map((price) => (
              <Button
                key={price.id}
                variant={searchParams.price === price.id ? "default" : "outline"}
                onClick={() => updateSearchParam('price', price.id)}
                className="rounded-full"
                size="sm"
              >
                {price.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <Skeleton className="h-6 w-48 mb-2" />
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <div className="flex gap-2 mb-3">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Separator className="mb-3" />
                  <div className="flex justify-between">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : error ? (
            <Card>
              <CardContent className="py-8 text-center">
                <SearchIcon className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Search Error</h3>
                <p className="text-gray-600">{error}</p>
              </CardContent>
            </Card>
          ) : results.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          ) : (
            results.map((result) => (
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
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/restaurant/${result.id}`}>View Details</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link to={`/book?restaurant=${result.id}`}>Book Now</Link>
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
