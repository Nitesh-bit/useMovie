/* eslint-disable react/prop-types */
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function WatchedSummary({ watched }) {
  const avgImdbRating = watched
    ? average(watched.map((movie) => movie.imdbRating)).toFixed(2)
    : 0;
  const avgUserRating = watched
    ? average(watched.map((movie) => movie.userRating)).toFixed(2)
    : 0;
  const avgRuntime = watched
    ? average(watched.map((movie) => movie.runtime)).toFixed(2)
    : 0;

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched ? watched.length : 0} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
