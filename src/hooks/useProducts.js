import { useState, useEffect, useRef } from 'react';

const createUseProducts = () => {
  const cache = new Map();
  let lastFetchTime = 0;

  return () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const requestIdRef = useRef(0);

    const fetchProducts = async () => {
      const now = Date.now();
      if (cache.has('products') && (now - lastFetchTime) < 60000) { // cache for 1 min
        setProducts(cache.get('products'));
        setLoading(false);
        return;
      }

      const currentRequestId = ++requestIdRef.current;
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();

        // Check if this is the latest request
        if (currentRequestId === requestIdRef.current) {
          cache.set('products', data.products);
          lastFetchTime = now;
          setProducts(data.products);
          setLoading(false);
        }
      } catch (err) {
        if (currentRequestId === requestIdRef.current) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    useEffect(() => {
      fetchProducts();
    }, []);

    return { products, loading, error, refetch: fetchProducts };
  };
};

export const useProducts = createUseProducts();