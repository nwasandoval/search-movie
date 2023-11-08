import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [movieSelected, setMovieSelected] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();
    getMovies();
  }

  function handleChangePage(numberPage) {
    setPage(numberPage);
    getMovies();
  }

  function getMovies() {
    setLoading(true);

    axios
      .get(
        `https://www.omdbapi.com/?s=${searchText}&page=${page}&apikey=57a9875e`
      )
      .then((response) => {
        setMovies(response.data.Search);

        const totalResults = parseInt(response.data.totalResults);
        setTotalPages(Math.ceil(totalResults / 10));
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getMovieDetail(imdbID) {
    axios
      .get(`https://www.omdbapi.com/?i=${imdbID}&apikey=57a9875e`)
      .then((response) => {
        setMovieSelected(response.data);
      });
  }

  return (
    <div className="page-content">
      <form className="form-search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar pelicula"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <button type="submit">
          <i className="bi bi-search"></i>
        </button>
      </form>

      <div>
        {/* Paginacion */}
        <ul className="list-pagination">
          {Array.from({ length: totalPages }).map((_, index) => {
            return (
              <li 
                key={index}
                className={page === index + 1 ? "active" : ""}
              >
                <button onClick={() => handleChangePage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            );
          })}
        </ul>

        {loading && (
          <div className="loader-wrapper">
            <span className="loader"></span>
          </div>
        )}

        {/* Lista de peliculas */}
        {!loading && (
          <ul className="list-movies">
            {movies.map((movie) => {
              return (
                <li
                  key={movie.imdbID}
                  onClick={() => getMovieDetail(movie.imdbID)}
                >
                  <div className="card-movie">
                    <img
                      src={movie.Poster}
                      alt=""
                      className="card-movie__img"
                      width="100%"
                      height="100%"
                    />

                    <div className="card-movie__body">
                      <h3 className="card-movie__title">{movie.Title}</h3>
                    </div>

                    <div className="card-movie__footer">
                      <span>{movie.Type}</span>

                      <span>{movie.Year}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Modal de detalle de pelicula seleccionada */}
      {movieSelected && (
        <div className="modal">
          <div className="modal__content">
            <header className="modal__header">
              <h2 className="modal__title">
                {movieSelected.Title} ({movieSelected.Year})
              </h2>

              <button
                className="modal__close"
                onClick={() => setMovieSelected(null)}
              >
                X
              </button>
            </header>

            <div className="modal__body">
              <div className="modal__img">
                <img src={movieSelected.Poster} alt="" width="100%" />
              </div>

              <div className="modal__info">
                <p>
                  <strong>Genero: </strong>
                  {movieSelected.Genre}
                </p>

                <p>
                  <strong>Actores: </strong>
                  {movieSelected.Actors}
                </p>

                <p>
                  <strong>Director: </strong>
                  {movieSelected.Director}
                </p>

                <p>
                  <strong>Escritor: </strong>
                  {movieSelected.Writer}
                </p>

                <p>
                  <strong>Idioma: </strong>
                  {movieSelected.Language}
                </p>

                <p>
                  <strong>Pais: </strong>
                  {movieSelected.Country}
                </p>

                <p>
                  <strong>Premios: </strong>
                  {movieSelected.Awards}
                </p>

                <p>
                  <strong>Produccion: </strong>
                  {movieSelected.Production}
                </p>

                <p>
                  <strong>Fecha de estreno: </strong>
                  {movieSelected.Released}
                </p>

                <p>
                  <strong>Duracion: </strong>
                  {movieSelected.Runtime}
                </p>

                <p>
                  <strong>Clasificacion: </strong>
                  {movieSelected.Rated}
                </p>

                <p>
                  <strong>IMDB: </strong>
                  {movieSelected.imdbRating}
                </p>

                <p>
                  <strong>IMDB Votes: </strong>
                  {movieSelected.imdbVotes}
                </p>

                <p>
                  <strong>IMDB ID: </strong>
                  {movieSelected.imdbID}
                </p>

                <p>
                  <strong>Tipo: </strong>
                  {movieSelected.Type}
                </p>

                <p>
                  <strong>Resumen: </strong>
                  {movieSelected.Plot}
                </p>

                <p>
                  <strong>Fecha de lanzamiento en DVD: </strong>
                  {movieSelected.DVD}
                </p>

                <p>
                  <strong>BoxOffice: </strong>
                  {movieSelected.BoxOffice}
                </p>

                <p>
                  <strong>Website: </strong>
                  {movieSelected.Website}
                </p>

                <p>
                  <strong>Metascore: </strong>
                  {movieSelected.Metascore}
                </p>

                <p>
                  <strong>Rating: </strong>
                </p>

                <ul>
                  {movieSelected.Ratings.map((rating) => {
                    return (
                      <li key={rating.Source}>
                        <strong>{rating.Source}: </strong>
                        {rating.Value}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
