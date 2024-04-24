export default function Card({ movie }) {
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
