/* eslint-disable react/prop-types */
import Movie from "./Movie";

export default function MovieList({ movies, onSelectMovie }) {
  if (!movies) {
    return null; // Return null or some placeholder when movies is null or undefined
  }

  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
