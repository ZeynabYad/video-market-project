import React, { Component } from "react";
import { getMovies } from "../services/movieService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../components/common/pagination";
import paginate from "../utils/paginate";
import ListGroup from "./common/listGroup";
class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 6,
    currentPage: 1,
    genres: [
      "All Genres",
      "Crime",
      "Drama",
      "Romance",
      "Thriller",
      "Action",
      "Adventure",
      "Animation",
      "Fantasy",
      "Documentary",
      "Sci-Fi",
      "Comedy",
    ],
  };
  genreClassSelector = (g) =>
    (g === "Crime") | (g === "War") | (g === "Horror") | (g === "Thriller")
      ? "badge bg-danger m-1 p-2"
      : g === "Comedy"
      ? "badge bg-info m-1 p-2"
      : "badge bg-secondary m-1 p-2";

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m.id !== movie.id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
    } = this.state;

    const filtered = selectedGenre
      ? allMovies.filter((m) => {
          if (selectedGenre !== "All Genres")
            return m.genre.includes(selectedGenre);
          return allMovies;
        })
      : allMovies;
    const moviesShowOnPage = paginate(filtered, pageSize, currentPage);

    if (count === 0) {
      return (
        <div className="alert alert-danger">
          There are no movies in database.
        </div>
      );
    }
    return (
      <div className="row">
        {selectedGenre ? (
          <div className="alert alert-warning">
            There are {filtered.length} movies in This Genre.
          </div>
        ) : (
          <div className="alert alert-info">
            There are {count} movies in database.
          </div>
        )}

        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItems={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {moviesShowOnPage.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.id}</td>
                  <td>{movie.title}</td>
                  <td>
                    {movie.genre.split("|").map((g) => (
                      <span id={g} className={this.genreClassSelector(g)}>
                        {g}
                      </span>
                    ))}
                  </td>
                  <td>{movie.numberInStock}</td>
                  <td>${movie.price}</td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
