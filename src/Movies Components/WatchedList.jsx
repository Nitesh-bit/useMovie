import WatchedMovie from "./WatchedMovie";

export default function WatchedList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie, i) => (
        <WatchedMovie movie={movie} key={i} onDeleteWatched={onDeleteWatched} />
      ))}
    </ul>
  );
}
