/* eslint-disable react/prop-types */
import WatchedMovie from "./WatchedMovie";

export default function WatchedList({ watched, onDeleteWatched }) {
  if (!watched) {
    return null; // Return null or a placeholder if watched is null or undefined
  }
  return (
    <ul className="list">
      {watched.map((movie, i) => (
        <WatchedMovie movie={movie} key={i} onDeleteWatched={onDeleteWatched} />
      ))}
    </ul>
  );
}
