const heroImg = document.getElementById("hero");
const movieSearch = document.getElementById("movie-search-box");
const searchBtn = document.getElementById("search-btn");
const searchResult = document.getElementById("search-result");
const trendingMovieList = document.getElementById("trending-movie-list");

searchBtn.addEventListener("click", () => {
  if (!movieSearch.value) {
    searchResult.classList.add("hide");
    alert("please enter movie name");
    return;
  }
  fetchMovies(movieSearch.value);
});

// movie querying
const fetchMovies = async (searchTerm) => {
  try {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=ac807100099e4768223a1b4b07dfad8b&language=en-US&query=${searchTerm}&page=1&include_adult=false`;
    const fetchMovie = await fetch(URL);
    const response = await fetchMovie.json();
    if (!response) {
      searchResult.innerHTML = "";
    }
    displayMovies(response.results);
  } catch (error) {
    console.log(error);
  }
};

// Displaying searched suggestions
const displayMovies = (searched) => {
  searchResult.innerHTML = "";
  if (searched) searchResult.classList.remove("hide");
  searched.forEach((item) => {
    let imageUrl;
    if (item.poster_path) {
      imageUrl = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
    } else {
      imageUrl = "../images/placeholder.jpg";
    }
    let newEl = document.createElement("div");
    newEl.className = "suggestion";
    newEl.dataset.imdbId = item.id;
    const htmltosugg = `
                    <div class="suggestion-img">
                       <img src="${imageUrl}" alt="No Image">
                    </div>
                    <div class="suggestion-info">
                        <p class="name">${item.title}</p>
                        <p class="year">${item.release_date}</p>
                    </div>`;
    newEl.innerHTML = htmltosugg;
    searchResult.append(newEl);
  });
  clickEvent();
};

// population on document load

document.addEventListener("DOMContentLoaded", () => {
  fetchTrendingMovies();
});

// Fetching and populating trending movies

const fetchTrendingMovies = async () => {
  const fetchTrending = await fetch(
    "https://api.themoviedb.org/3/trending/all/day?api_key=ac807100099e4768223a1b4b07dfad8b"
  );
  const res = await fetchTrending.json();
  let resMovies = res.results;
  // let filtMovies = resMovies.filter((item) => item.media_type !== "movie");
  // resMovies = filtMovies.slice(0, 10);
  heroImg.style.background = `url("https://image.tmdb.org/t/p/original/${resMovies[0].backdrop_path}") no-repeat center center/cover`;
  resMovies.forEach((tmovie, i) => {
    let imageUrl;
    if (tmovie.poster_path) {
      imageUrl = `https://image.tmdb.org/t/p/w500/${tmovie.poster_path}`;
    } else {
      imageUrl = "../images/placeholder.jpg";
    }
    let newEl = document.createElement("div");
    newEl.className = "movie-slider-item";
    newEl.dataset.imdbId = tmovie.id;
    let newHTML = ` 
                <img src="${imageUrl}" alt="">
                <p class="movie-number" id="item-num">${i + 1}</p>`;
    newEl.innerHTML = newHTML;
    trendingMovieList.append(newEl);
  });

  const trendingItems = document.querySelectorAll(".movie-slider-item");
  trendingItems.forEach((trendItem) => {
    trendItem.addEventListener("click", () => {
      let movieid = trendItem.dataset.imdbId;
      window.location.href = `movie.html?movieid=${movieid}`;
    });
  });
};

// click feature
const clickEvent = () => {
  const searchedElemets = document.querySelectorAll(".suggestion");
  searchedElemets.forEach((item) => {
    item.addEventListener("click", () => {
      window.location.href = `movie.html?movieid=${item.dataset.imdbId}`;
    });
  });
};
