import { useEffect, useState } from "react";
const KEY = "1a1e8f63";
export function useMovies(query) {
  const [erroeMsg, setErroeMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ResultMovies, setResultMovies] = useState([]);

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setErroeMsg("");
          setIsLoading(true);
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Some Thing Went Wrong");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie Not Found");
          setResultMovies(data.Search);
          setErroeMsg("");
        } catch (err) {
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setErroeMsg("");
        setResultMovies([]);
        return;
      }
      fetchMovies();

      return () => {
        controller.abort();
      };
    },
    [query]
  );
  return { ResultMovies, isLoading, erroeMsg };
}
