import { useState } from "react";
import { useLocalStorageState } from "../Hooks/useLocalStorageState";
import ResultList from "./ResultList";
import Box from "./Box";
import Summary from "./Summary/Summary";
import Loader from "./Assets/Loader";
import ErrorMsg from "./Assets/ErrorMsg";

export default function Main({ ResultMovies, loading, error }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchedtMovies, setWatchedtMovies] = useLocalStorageState(
    [],
    "watched Movies"
  );

  function ReturnSelectedMovie(movie) {
    setSelectedMovie(movie);
  }

  function handleDeleteMovie(movie) {
    const movies = watchedtMovies.filter((m) => m !== movie);
    setWatchedtMovies([...movies]);
  }

  function handleMovieAddition(movie) {
    setWatchedtMovies([...watchedtMovies, movie]);
    setSelectedMovie(null);
  }

  function handleBackClick() {
    setSelectedMovie(null);
  }

  return (
    <div className="main">
      <Box>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMsg message={error} />
        ) : (
          <ResultList
            movies={ResultMovies}
            onSelectMovie={ReturnSelectedMovie}
            currentSelectedMovie={selectedMovie}
          />
        )}
      </Box>
      <Box classname={"box-summary"}>
        {
          <Summary
            watchedtMovies={watchedtMovies}
            selectedMovie={selectedMovie}
            handleDeleteMovie={handleDeleteMovie}
            onMovieAddition={handleMovieAddition}
            handleBackClick={handleBackClick}
          />
        }
      </Box>
    </div>
  );
}
