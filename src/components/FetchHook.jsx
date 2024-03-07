import { useState } from "react";

export const useFetchWithState = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, param) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        ...param,
        headers: {
          'Content-Type': 'application/json' // 设置Content-Type为application/json
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetch: fetchData
  };
}