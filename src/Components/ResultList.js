import Item from "./Item";
export default function ResultList({
  movies,
  onSelectMovie,
  currentSelectedMovie,
}) {
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
