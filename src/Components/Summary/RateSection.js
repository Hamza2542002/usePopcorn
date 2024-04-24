import { useState } from "react";
import RatingIcons from "../../RatingIcons";
export default function RateSection({
  movie,
  onMovieAddition,
  movieExist,
  userRating,
}) {
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
