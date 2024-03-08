import { useEffect, useState } from "react";
import Navbar from "./Navbar Component/Navbar";
import Logo from "./Navbar Component/Logo";
import Search from "./Navbar Component/Search";
import NumResults from "./Navbar Component/NumResults";
import Main from "./Utitlity Component/Main";
import Box from "./Utitlity Component/Box";
import ErrorMessage from "./Utitlity Component/ErrorMessage";
import Loader from "./Utitlity Component/Loader";
import MovieList from "./Movies Components/MovieList";
import MovieDetails from "./Movies Components/MovieDetails";
import WatchedSummary from "./Movies Components/WatchedSummary";
import WatchedList from "./Movies Components/WatchedList";

const KEY = "424312f9";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // const tempQuery = "interstellar";

  /*
  useEffect(()=>{
     console.log("After initial render")
  }, [])

  useEffect(()=>{
    console.log("After every render")
  });

  useEffect(()=>{
    console.log("Render only when 'query' state changes")
  }, [query])

  console.log("During render because it is a render logic");
  */

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatchMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      const controller = new AbortController();
      // fetch(
      //   `https://api.themoviedb.org/3/movie/11?api_key=cc9082a29bfa2acfc1e4878bc61066d1`
      // )
      //   .then((res) => res.json())
      //   .then((data) => setMovies(data));
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?&apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }

      handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatchMovie}
              watched={watched}
              KEY={KEY}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

/* 

function WatchedBox() {
  
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          
        </>
      )}
    </div>
  );
}

*/
