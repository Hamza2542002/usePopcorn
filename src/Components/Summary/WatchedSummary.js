import Info from "../Info";

export default function WatchedSummary({ movies }) {
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
