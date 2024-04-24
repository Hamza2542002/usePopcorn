import Item from "../Item";
import Info from "../Info";

export default function WatchedList({ movies, handleDeleteMovie }) {
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
