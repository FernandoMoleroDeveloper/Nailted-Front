import { useEffect, useState } from "react";

export const useFetch = <T,>(url: string): [T | null, boolean, boolean] => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch(url);
        const jsonData: T = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(true);
      }

      setLoading(false);
    };

    void fetchData();
  }, [url]);

  return [data, loading, error];
};
