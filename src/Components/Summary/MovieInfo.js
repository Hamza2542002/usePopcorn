import { useEffect } from "react";
import { useMovie } from "../../Hooks/useMovie";
import { useKey } from "../../Hooks/useKey";
import Loader from "../Assets/Loader";
import Card from "../Assets/Card";
import Description from "../Assets/Description";
import RateSection from "./RateSection";
export default function MovieInfo({
  movie,
  handleBackClick,
  MovieAddition,
  watchedtMovies,
}) {
  const isWatched = watchedtMovies.map((m) => m.imdbID).includes(movie.imdbID);
  const newMovie = useMovie(movie);
  const movieUserRating = watchedtMovies.find(
    (m) => m.imdbID === movie.imdbID
  )?.userRating;

  useEffect(
    function () {
      if (!newMovie) return;
      document.title = `Movie | ${newMovie?.Title}`;

      return () => {
        document.title = `usePopcorn`;
      };
    },
    [newMovie]
  );

  useKey("Escape", handleBackClick);

  function handleCloseClick(e) {
    e.target.parentElement.style.display = "none";
    handleBackClick();
  }
  function handleAddtoWatched(newMovie) {
    MovieAddition(newMovie);
  }
  return (
    <div className="movie-info">
      {newMovie ? (
        <>
          {" "}
          <Card movie={newMovie} />
          <RateSection
            movie={newMovie}
            userRating={movieUserRating}
            movieExist={isWatched}
            movieRate={newMovie?.userRating}
            watchedtMovies={watchedtMovies}
            onMovieAddition={handleAddtoWatched}
          />
          <Description movie={newMovie} />
          <button className="btn-back" onClick={(e) => handleCloseClick(e)}>
            {"←"}
          </button>{" "}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
