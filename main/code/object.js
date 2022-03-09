const TMDB_API_KEY = "278d563fdce160e602424792006255e9"
const base_img_url = "http://image.tmdb.org/t/p/original"
const base_url = "https://api.themoviedb.org/3/"

async function getMovieByID(id) {
    let fetch_address = base_url + 'movie/' + id + "?api_key=" + TMDB_API_KEY + "&language=en-US"
    request = (await fetch(fetch_address)).json()
    return request
}
async function getShowByID(id) {
    let fetch_address = base_url + 'tv/' + id + "?api_key=" + TMDB_API_KEY + "&language=en-US"
    request = (await fetch(fetch_address)).json()
    return request
}

// https://developers.themoviedb.org/3/movies/get-movie-details
// ^ ovo je informacija koju dobijemo od filma/serije poomcu API-a: ime, rejting, popularnost, opis, slike, itd.
// ToDo: generisati sve delove object.html pomocu toga?


$(document).ready(async function () {
    let a = document.getElementById('details')
    let searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('tv_id')) {
        let param = searchParams.get('tv_id')
        var show = await getShowByID(param)
        a.innerHTML = "<b>Sav info koji imamo o ovoj seriji:</b><br>" + JSON.stringify(show)
    }
    else if (searchParams.has('mov_id')) {
        let param = searchParams.get('mov_id')
        var movie = await getMovieByID(param)
        a.innerHTML = "<b>Sav info koji imamo o ovom filmu:</b><br>" + JSON.stringify(movie)
    }
})