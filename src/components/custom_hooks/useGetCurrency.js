import { useState, useEffect } from "react";

function useGetCurrency(apiUrl) {
  const [conversionRate, setConversionRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchConversionRate() {
      try {
        const response = await fetch(apiUrl, {
          headers: {
            apikey: "jpCY8q36V6jQZ9rAhsiKrgDWeoqZg5JQ",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch conversion rate");
        }

        const data = await response.json();
        setConversionRate(data.result);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchConversionRate();
  }, [apiUrl]);

  return { conversionRate, loading, error };
}

export default useGetCurrency;
