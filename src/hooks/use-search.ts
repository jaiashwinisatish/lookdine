import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { searchHotels } from '@/services/api';

interface SearchParams {
  query: string;
  category?: string;
  price?: string;
  rating?: number;
  location?: string;
}

interface SearchResult {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  distance: string;
  waitTime: string;
  price: string;
  tags: string[];
  image?: string;
  description?: string;
}

export const useSearch = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: '',
    category: 'all',
  });
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce the search query
  const debouncedQuery = useDebounce(searchParams.query, 300);

  const performSearch = useCallback(async () => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await searchHotels({
        query: debouncedQuery,
        category: searchParams.category,
        price: searchParams.price,
        rating: searchParams.rating,
        location: searchParams.location,
      });
      
      setResults(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, searchParams]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  const updateSearchParam = (key: keyof SearchParams, value: any) => {
    setSearchParams(prev => ({ ...prev, [key]: value }));
  };

  return {
    searchParams,
    results,
    loading,
    error,
    updateSearchParam,
    debouncedQuery,
  };
};
