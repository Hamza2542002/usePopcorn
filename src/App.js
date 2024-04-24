// import { useEffect, useState } from "react";
// import "./App.css";
// import NavBar from "./Components/NavBar.js";
// import Main from "./Components/Main.js";
// import { useKey } from "./Hooks/useKey.js";
// import { useLocalStorageState } from "./Hooks/useLocalStorageState.js";
// import { useMovie } from "./Hooks/useMovie.js";
// import { useMovies } from "./Hooks/useMovies.js";
// import RatingIcons from "./RatingIcons.js";

// export default function App() {
//   const [query, setQuery] = useState("");
//   const { ResultMovies, isLoading, erroeMsg } = useMovies(query);

//   return (
//     <div className="App">
//       <NavBar
//         resultLenght={ResultMovies.length}
//         setQuery={setQuery}
//         query={query}
//       />
//       <Main ResultMovies={ResultMovies} loading={isLoading} error={erroeMsg} />
//     </div>
//   );
// }

// function Main({ ResultMovies, loading, error }) {
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [watchedtMovies, setWatchedtMovies] = useLocalStorageState(
//     [],
//     "watched Movies"
//   );

//   function ReturnSelectedMovie(movie) {
//     setSelectedMovie(movie);
//   }

//   function handleDeleteMovie(movie) {
//     const movies = watchedtMovies.filter((m) => m !== movie);
//     setWatchedtMovies([...movies]);
//   }

//   function handleMovieAddition(movie) {
//     setWatchedtMovies([...watchedtMovies, movie]);
//     setSelectedMovie(null);
//   }

//   function handleBackClick() {
//     setSelectedMovie(null);
//   }

//   return (
//     <div className="main">
//       <Box>
//         {loading ? (
//           <Loader />
//         ) : error ? (
//           <ErrorMsg message={error} />
//         ) : (
//           <ResultList
//             movies={ResultMovies}
//             onSelectMovie={ReturnSelectedMovie}
//             currentSelectedMovie={selectedMovie}
//           />
//         )}
//       </Box>
//       <Box classname={"box-summary"}>
//         {
//           <Summary
//             watchedtMovies={watchedtMovies}
//             selectedMovie={selectedMovie}
//             handleDeleteMovie={handleDeleteMovie}
//             onMovieAddition={handleMovieAddition}
//             handleBackClick={handleBackClick}
//           />
//         }
//       </Box>
//     </div>
//   );
// }

// function Summary({
//   watchedtMovies,
//   selectedMovie,
//   handleDeleteMovie,
//   onMovieAddition,
//   handleBackClick,
// }) {
//   function handleMovieAddition(movie) {
//     onMovieAddition(movie);
//   }
//   return (
//     <>
//       {!selectedMovie && (
//         <>
//           <WatchedSummary movies={watchedtMovies} />
//           <WatchedList
//             movies={watchedtMovies}
//             handleDeleteMovie={handleDeleteMovie}
//           />
//         </>
//       )}
//       {selectedMovie && (
//         <MovieInfo
//           key={selectedMovie.imdbID}
//           watchedtMovies={watchedtMovies}
//           movie={selectedMovie}
//           MovieAddition={handleMovieAddition}
//           handleBackClick={handleBackClick}
//         />
//       )}
//     </>
//   );
// }

// function Box({ children, classname }) {
//   const [showProp, setShowProp] = useState(true);
//   return (
//     <div className={`box ${classname}`}>
//       <button className="btn" onClick={() => setShowProp((s) => !s)}>
//         {`${showProp ? "–" : "+"}`}{" "}
//       </button>
//       {showProp && children}
//     </div>
//   );
// }

// function ResultList({ movies, onSelectMovie, currentSelectedMovie }) {
//   function selectMovie(selectedMovie) {
//     onSelectMovie(selectedMovie);
//   }
//   return (
//     <ul className="result-list">
//       {movies.map((movie) => (
//         <Item
//           movie={movie}
//           key={movie.imdbID}
//           selectMovie={selectMovie}
//           currentSelectedMovie={currentSelectedMovie}
//         />
//       ))}
//     </ul>
//   );
// }

// function WatchedList({ movies, handleDeleteMovie }) {
//   return (
//     <ul className="watched-list">
//       {movies.map((movie) => (
//         <Item
//           movie={movie}
//           key={movie.imdbID}
//           handleDeleteMovie={handleDeleteMovie}
//         >
//           <Info movie={movie} />
//         </Item>
//       ))}
//     </ul>
//   );
// }

// function Item({
//   movie,
//   children,
//   selectMovie,
//   currentSelectedMovie,
//   handleDeleteMovie,
// }) {
//   function handleMovieSelection(movie) {
//     if (!selectMovie) return;
//     currentSelectedMovie === movie ? selectMovie(null) : selectMovie(movie);
//   }
//   return (
//     <li onClick={() => handleMovieSelection(movie)}>
//       <img src={movie?.Poster} alt={movie?.Title.slice(0, 10)} />
//       <div className="text">
//         <h3 className="name">{movie?.Title}</h3>
//         {children || <span className="year">🗓 {movie?.Year}</span>}
//       </div>
//       <button className="close" onClick={() => handleDeleteMovie(movie)}>
//         X
//       </button>
//     </li>
//   );
// }

// function Info({
//   movie,
//   children,
//   moviesLenght,
//   avgimdbRating,
//   avguserbRating,
// }) {
//   return (
//     <div className="info">
//       {children}
//       <span>⭐️ {movie?.imdbRating || avgimdbRating}</span>
//       <span>🌟 {movie?.userRating || avguserbRating}</span>
//       <span>⏳ {movie?.Runtime || moviesLenght + " min"}</span>
//     </div>
//   );
// }

// // calculate statistics

// function WatchedSummary({ movies }) {
//   const totalLength = movies
//     .map(
//       (m) =>
//         Number(
//           m?.Runtime?.split(" ")[0] === "N/A" ? 0 : m?.Runtime?.split(" ")[0]
//         ) ?? 0
//     )
//     .reduce((acc, cur) => acc + cur, 0);

//   const avgUserRating =
//     movies.map((m) => Number(m.userRating)).reduce((acc, cur) => acc + cur, 0) /
//     movies.length;

//   const avgImdbRating =
//     movies.map((m) => Number(m.imdbRating)).reduce((acc, cur) => acc + cur, 0) /
//     movies.length;

//   return (
//     <div className="summary">
//       <h4>MOVIES YOU WATCHED</h4>
//       <Info
//         moviesLenght={isNaN(totalLength) ? 0 : totalLength.toFixed(2)}
//         avgimdbRating={isNaN(avgImdbRating) ? 0 : avgImdbRating.toFixed(2)}
//         avguserbRating={isNaN(avgUserRating) ? 0 : avgUserRating.toFixed(2)}
//       >
//         <span>#️⃣ {movies.length} movies</span>
//       </Info>
//     </div>
//   );
// }

// function MovieInfo({ movie, handleBackClick, MovieAddition, watchedtMovies }) {
//   // const [newMovie, setNewMovie] = useState(null);
//   const isWatched = watchedtMovies.map((m) => m.imdbID).includes(movie.imdbID);
//   const newMovie = useMovie(movie);
//   const movieUserRating = watchedtMovies.find(
//     (m) => m.imdbID === movie.imdbID
//   )?.userRating;

//   useEffect(
//     function () {
//       if (!newMovie) return;
//       document.title = `Movie | ${newMovie?.Title}`;

//       return () => {
//         document.title = `usePopcorn`;
//       };
//     },
//     [newMovie]
//   );

//   useKey("Escape", handleBackClick);

//   function handleCloseClick(e) {
//     e.target.parentElement.style.display = "none";
//     handleBackClick();
//   }
//   function handleAddtoWatched(newMovie) {
//     MovieAddition(newMovie);
//   }
//   return (
//     <div className="movie-info">
//       {newMovie ? (
//         <>
//           {" "}
//           <Card movie={newMovie} />
//           <RateSection
//             movie={newMovie}
//             userRating={movieUserRating}
//             movieExist={isWatched}
//             movieRate={newMovie?.userRating}
//             watchedtMovies={watchedtMovies}
//             onMovieAddition={handleAddtoWatched}
//           />
//           <Description movie={newMovie} />
//           <button className="btn-back" onClick={(e) => handleCloseClick(e)}>
//             {"←"}
//           </button>{" "}
//         </>
//       ) : (
//         <Loader />
//       )}
//     </div>
//   );
// }

// function Card({ movie }) {
//   return (
//     <div className="card">
//       <img src={movie?.Poster} alt={movie?.Title} />
//       <div className="details">
//         <h2>{movie?.Title}</h2>
//         <span>
//           {movie?.Year} &bull; {movie?.Runtime}
//         </span>
//         <span>{movie?.Genre}</span>
//         <span>⭐️ {movie?.imdbRating} IMDb rating</span>
//       </div>
//     </div>
//   );
// }

// function RateSection({ movie, onMovieAddition, movieExist, userRating }) {
//   const [rate, setRate] = useState(movie?.userRating);

//   function handleAddtoWatched() {
//     onMovieAddition({ ...movie, userRating: rate });
//   }
//   return (
//     <section>
//       <div className="add-movie">
//         {!movieExist && (
//           <>
//             <RatingIcons
//               initialRate={movie?.userRating}
//               onSetRating={setRate}
//             />
//             {rate > 0 && (
//               <button
//                 className="btn-add-movie"
//                 onClick={() => handleAddtoWatched()}
//               >
//                 + Add to list
//               </button>
//             )}
//           </>
//         )}
//         {movieExist && (
//           <p className="rating-msg">
//             You have rated the movie with {userRating} ⭐️
//           </p>
//         )}
//       </div>
//     </section>
//   );
// }

// function Description({ movie }) {
//   return (
//     <div className="description">
//       <p className="desc">
//         <em>{movie?.Plot}</em>
//       </p>
//       <p>{movie?.Actors ?? ""}</p>
//       <p>{movie?.Writer === "N/A" ? "" : movie?.Writer}</p>
//     </div>
//   );
// }

// function Loader() {
//   return <p className="loading">LOADING ...</p>;
// }

// function ErrorMsg({ message }) {
//   return <p className="error">⛔️{message}</p>;
// }
import { useState } from "react";
import { useMovies } from "./Hooks/useMovies";
import NavBar from "./Components/NavBar.js";
import Main from "./Components/Main.js";
export default function App() {
  const [query, setQuery] = useState("");
  const { ResultMovies, isLoading, erroeMsg } = useMovies(query);

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
