import { useEffect, useState } from "react";
import "./App.css";
import RatingIcons from "./RatingIcons.js";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 9,
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = "1a1e8f63";

export default function App() {
  const [query, setQuery] = useState("");
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
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
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

  return (
    <div className="App">
      <NavBar
        resultLenght={ResultMovies.length}
        setQuery={setQuery}
        query={query}
      />
      <Main ResultMovies={ResultMovies} loading={isLoading} error={erroeMsg} />
    </div>
  );
}

function NavBar({ resultLenght, query, setQuery }) {
  return (
    <nav className="navbar">
      <p className="logo">🍿 usePopcorn</p>
      <input
        className="search"
        type="text"
        placeholder="Search movies ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <span>Found {resultLenght} results</span>
    </nav>
  );
}

function Main({ ResultMovies, loading, error }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchedtMovies, setWatchedtMovies] = useState([]);

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

function Summary({
  watchedtMovies,
  selectedMovie,
  handleDeleteMovie,
  onMovieAddition,
  handleBackClick,
}) {
  function handleMovieAddition(movie) {
    onMovieAddition(movie);
  }
  return (
    <>
      {!selectedMovie && (
        <>
          <WatchedSummary movies={watchedtMovies} />
          <WatchedList
            movies={watchedtMovies}
            handleDeleteMovie={handleDeleteMovie}
          />
        </>
      )}
      {selectedMovie && (
        <MovieInfo
          key={selectedMovie.imdbID}
          watchedtMovies={watchedtMovies}
          movie={selectedMovie}
          MovieAddition={handleMovieAddition}
          handleBackClick={handleBackClick}
        />
      )}
    </>
  );
}

function Box({ children, classname }) {
  const [showProp, setShowProp] = useState(true);
  return (
    <div className={`box ${classname}`}>
      <button className="btn" onClick={() => setShowProp((s) => !s)}>
        {`${showProp ? "–" : "+"}`}{" "}
      </button>
      {showProp && children}
    </div>
  );
}

function ResultList({ movies, onSelectMovie, currentSelectedMovie }) {
  function selectMovie(selectedMovie) {
    onSelectMovie(selectedMovie);
  }
  return (
    <ul className="result-list">
      {movies.map((movie) => (
        <Item
          movie={movie}
          key={movie.imdbID}
          selectMovie={selectMovie}
          currentSelectedMovie={currentSelectedMovie}
        />
      ))}
    </ul>
  );
}

function WatchedList({ movies, handleDeleteMovie }) {
  return (
    <ul className="watched-list">
      {movies.map((movie) => (
        <Item
          movie={movie}
          key={movie.imdbID}
          handleDeleteMovie={handleDeleteMovie}
        >
          <Info movie={movie} />
        </Item>
      ))}
    </ul>
  );
}

function Item({
  movie,
  children,
  selectMovie,
  currentSelectedMovie,
  handleDeleteMovie,
}) {
  function handleMovieSelection(movie) {
    if (!selectMovie) return;
    currentSelectedMovie === movie ? selectMovie(null) : selectMovie(movie);
  }
  return (
    <li onClick={() => handleMovieSelection(movie)}>
      <img src={movie?.Poster} alt={movie?.Title.slice(0, 10)} />
      <div className="text">
        <h3 className="name">{movie?.Title}</h3>
        {children || <span className="year">🗓 {movie?.Year}</span>}
      </div>
      <button className="close" onClick={() => handleDeleteMovie(movie)}>
        X
      </button>
    </li>
  );
}

function Info({
  movie,
  children,
  moviesLenght,
  avgimdbRating,
  avguserbRating,
}) {
  return (
    <div className="info">
      {children}
      <span>⭐️ {movie?.imdbRating || avgimdbRating}</span>
      <span>🌟 {movie?.userRating || avguserbRating}</span>
      <span>⏳ {movie?.Runtime || moviesLenght + " min"}</span>
    </div>
  );
}

// calculate statistics
function WatchedSummary({ movies }) {
  const totalLength = movies
    .map(
      (m) =>
        Number(
          m?.Runtime?.split(" ")[0] === "N/A" ? 0 : m?.Runtime?.split(" ")[0]
        ) ?? 0
    )
    .reduce((acc, cur) => acc + cur, 0);

  const avgUserRating =
    movies.map((m) => Number(m.userRating)).reduce((acc, cur) => acc + cur, 0) /
    movies.length;

  const avgImdbRating =
    movies.map((m) => Number(m.imdbRating)).reduce((acc, cur) => acc + cur, 0) /
    movies.length;

  return (
    <div className="summary">
      <h4>MOVIES YOU WATCHED</h4>
      <Info
        moviesLenght={isNaN(totalLength) ? 0 : totalLength.toFixed(2)}
        avgimdbRating={isNaN(avgImdbRating) ? 0 : avgImdbRating.toFixed(2)}
        avguserbRating={isNaN(avgUserRating) ? 0 : avgUserRating.toFixed(2)}
      >
        <span>#️⃣ {movies.length} movies</span>
      </Info>
    </div>
  );
}

function MovieInfo({ movie, handleBackClick, MovieAddition, watchedtMovies }) {
  const [newMovie, setNewMovie] = useState(null);
  const isWatched = watchedtMovies.map((m) => m.imdbID).includes(movie.imdbID);
  const movieUserRating = watchedtMovies.find(
    (m) => m.imdbID === movie.imdbID
  )?.userRating;
  useEffect(
    function () {
      async function fetchMovie() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${movie.imdbID}`
        );
        const data = await res.json();
        setNewMovie({ ...data, userRating: 0 });
      }
      fetchMovie();

      return () => {};
    },
    [movie]
  );

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

  useEffect(() => {
    function handlepresEscape(e) {
      if (e.code === "Escape") {
        handleBackClick();
      }
    }
    document.addEventListener("keydown", handlepresEscape);
    return () => {
      document.removeEventListener("keydown", handlepresEscape);
    };
  }, [handleBackClick]);

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

function Card({ movie }) {
  return (
    <div className="card">
      <img src={movie?.Poster} alt={movie?.Title} />
      <div className="details">
        <h2>{movie?.Title}</h2>
        <span>
          {movie?.Year} &bull; {movie?.Runtime}
        </span>
        <span>{movie?.Genre}</span>
        <span>⭐️ {movie?.imdbRating} IMDb rating</span>
      </div>
    </div>
  );
}

function RateSection({ movie, onMovieAddition, movieExist, userRating }) {
  const [rate, setRate] = useState(movie?.userRating);

  function handleAddtoWatched() {
    onMovieAddition({ ...movie, userRating: rate });
  }
  return (
    <section>
      <div className="add-movie">
        {!movieExist && (
          <>
            <RatingIcons
              initialRate={movie?.userRating}
              onSetRating={setRate}
            />
            {rate > 0 && (
              <button
                className="btn-add-movie"
                onClick={() => handleAddtoWatched()}
              >
                + Add to list
              </button>
            )}
          </>
        )}
        {movieExist && (
          <p className="rating-msg">
            You have rated the movie with {userRating} ⭐️
          </p>
        )}
      </div>
    </section>
  );
}

function Description({ movie }) {
  return (
    <div className="description">
      <p className="desc">
        <em>{movie?.Plot}</em>
      </p>
      <p>{movie?.Actors ?? ""}</p>
      <p>{movie?.Writer === "N/A" ? "" : movie?.Writer}</p>
    </div>
  );
}

function Loader() {
  return <p className="loading">LOADING ...</p>;
}

function ErrorMsg({ message }) {
  return <p className="error">⛔️{message}</p>;
}
