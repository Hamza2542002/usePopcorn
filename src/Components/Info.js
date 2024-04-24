export default function Info({
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
