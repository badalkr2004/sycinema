const movieName = document.getElementById("movie_name");
const poster = document.getElementById("poster");
const releaseYear = document.getElementById("release_year");
const rated = document.getElementById("rated");
const releaseDate = document.getElementById("release_date");
const genre = document.getElementById("genre");
const duration = document.getElementById("duration");
const score = document.getElementById("score");
const tagline = document.getElementById("tagline");
const overview = document.getElementById("overview");
const movieWrap = document.getElementById("movie_wrapper");

const parameters = new URLSearchParams(window.location.search);
const movieId = parameters.get("movieid");

document.addEventListener("DOMContentLoaded", async () => {
  const fetchMoiveDetails = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=ac807100099e4768223a1b4b07dfad8b&language=en-US`
  );
  const movie = await fetchMoiveDetails.json();
  let genres = "";
  movie.genres.forEach((item) => {
    genres += item.name + ", ";
  });

  //populating form here
  movieWrap.style.background = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path}) no-repeat center center/cover`;
  poster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  movieName.textContent = movie.title;
  releaseYear.textContent = movie.release_date.slice(0, 4);
  releaseDate.textContent = movie.release_date.split("-").reverse().join("-");
  genre.textContent = genres;
  duration.textContent =
    Math.floor(movie.runtime / 60) + "H " + (movie.runtime % 60) + "M";
  score.textContent = movie.vote_average.toFixed(1);
  tagline.textContent = movie.tagline;
  overview.textContent = movie.overview;
});
