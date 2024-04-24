export default function Description({ movie }) {
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
