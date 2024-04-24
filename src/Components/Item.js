export default function Item({
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
