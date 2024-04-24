import { useEffect, useState } from "react";
const KEY = "1a1e8f63";
export function useMovie(movie) {
  const [newMovie, setNewMovie] = useState(null);
  useEffect(
    function () {
      async function fetchMovie() {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${movie?.imdbID}`
        );
        const data = await res.json();
        setNewMovie({ ...data, userRating: 0 });
      }
      fetchMovie();

      return () => {};
    },
    [movie]
  );
  return newMovie;
}
