// TODO: Prebaciti sav JS iz HTML-a ovde
const TMDB_API_KEY = "278d563fdce160e602424792006255e9"
const base_url = "http://image.tmdb.org/t/p/original"

var popular_tv = `https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
var popular_mov = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`

// TODO: Pretvoriti u 1 funkciju?
async function fetchPopularTV() {
  const response = fetch(popular_tv)
  let tv = (await response).json()
  return tv
}

async function fetchPopularMovies() {
  const response = fetch(popular_mov)
  let movies = (await response).json()
  return movies
}

$(document).ready(async function () {
    console.log(TMDB_API_KEY)
    const popular_tv_html = document.getElementById("popular-tv");
    const popular_mov_html = document.getElementById("popular-mov");
    let popular_tv_shows = await fetchPopularTV();
    let popular_movies = await fetchPopularMovies();

    (popular_tv_shows.results).forEach(show => {
        let poster_uri = base_url + show.poster_path;

        popular_tv_html.innerHTML += `              
        <div class="swiper-slide">
            <a href="${'object.html' + '?tv_id=' + show.id}">
                <img src="${poster_uri}">
            </a>
        </div>` 
    });
    (popular_movies.results).forEach(movie => {
        let poster_uri = base_url + movie.poster_path;

        popular_mov_html.innerHTML += `              
        <div class="swiper-slide">
            <a href="${'object.html' + '?mov_id=' + movie.id}">
                <img src="${poster_uri}">
            </a>
        </div>` 
    });
})

