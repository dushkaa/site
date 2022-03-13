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

async function fetchShowTrailer(id) {
    let fetch_address = base_url + 'tv/' + id + "/videos?api_key=" + TMDB_API_KEY + "&language=en-US"
    request = (await fetch(fetch_address)).json()
    return request
}

async function fetchMovieTrailer(id) {
    let fetch_address = base_url + 'movie/' + id + "/videos?api_key=" + TMDB_API_KEY + "&language=en-US"
    request = (await fetch(fetch_address)).json()
    return request
}

function getTrailer(results) {
    for (var i = 0; i < results.length; i++) {
        var obj = results[i]
        // console.log(obj)
        if (obj.official) {
            return "https://www.youtube.com/watch?v=" + (obj.key)
        } else if (i+1 == results.length && trailer_link == "") {
            return "https://www.youtube.com/watch?v=" + (obj.key)
        }
    }
}

// https://developers.themoviedb.org/3/movies/get-movie-details
// ^ ovo je informacija koju dobijemo od filma/serije poomcu API-a: ime, rejting, popularnost, opis, slike, itd.
// ToDo: generisati sve delove object.html pomocu toga?


$(document).ready(async function () {
    let a = document.getElementById('details')
    // videti object.html
    let header = document.getElementById('object_header')
    let info = document.getElementById('informacije')
    let pregled = document.getElementById('pregled')
    let trailer = document.getElementById('trailer')

    let searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('tv_id')) {
        let param = searchParams.get('tv_id')
        var show = await getShowByID(param)
        let second_name = ""
        if (show.name != show.original_name) {
            second_name = ` (${show.original_name})`
        }
        let trailers = await fetchShowTrailer(param);
        var trailer_link = getTrailer(trailers.results)

        // a.innerHTML += "<b>Sav info koji imamo o ovoj seriji:</b><br>" + JSON.stringify(show)
        header.innerHTML = `
        <a href=${show.homepage} class="text-center text-danger">
            <h2>${show.name + second_name}</h2>
            <h3><i>"${show.tagline}"</i></h3>
        </a>
        <hr>
        <img src="${"http://image.tmdb.org/t/p/original" + show.backdrop_path}" class="img-fluid d-block mx-auto" style="max-width: 100%; height: auto;">
        `

        pregled.innerHTML = show.overview
        info.innerHTML = `
        <br>
        <h2>Emitovanje:</h2>
        <p>
        <table>
            <li>Prva epizoda: ${show.first_air_date} (Season 1, Ep. 1)</li>
            <li>Poslednja epizoda: ${show.last_air_date} (Season ${show.last_episode_to_air.season_number}, Ep. ${show.last_episode_to_air.episode_number})</li>
            <li>Rejting: ${show.vote_average}/10 ★</li>
        </table>
        </p>`
        trailer.innerHTML = `
        <a href="${trailer_link}" target="_blank">
            <button class="col-2 btn-close-white btn-outline-info">Trejler</button>
        </a>`
    }
    else if (searchParams.has('mov_id')) {
        let param = searchParams.get('mov_id')
        var movie = await getMovieByID(param)
        // a.innerHTML += "<b>Sav info koji imamo o ovom filmu:</b><br>" + JSON.stringify(movie)
        let second_name = ""
        if (movie.name != movie.original_name) {
            second_name = ` (${movie.original_name})`
        }

        let trailers = await fetchMovieTrailer(param);
        var trailer_link = getTrailer(trailers.results)


        // a.innerHTML += "<b>Sav info koji imamo o ovoj seriji:</b><br>" + JSON.stringify(show)
        header.innerHTML = `
        <a href=${movie.homepage} class="text-center text-danger">
            <h2>${movie.name + second_name}</h2>
            <h3><i>"${movie.tagline}"</i></h3>
        </a>
        <hr>
        <img src="${"http://image.tmdb.org/t/p/original" + movie.backdrop_path}" class="img-fluid d-block mx-auto" style="max-width: 100%; height: auto;">
        `

        pregled.innerHTML = movie.overview
        zanrovi = "<br>"
        for (var k = 0; k < movie.genres.length; k++) {
            zanrovi += " > " + movie.genres[k].name
            if (k + 1 != movie.genres.length) {
                zanrovi += "<br>"
            }

        }
        info.innerHTML = `
        <br>
        <h2>Informacije:</h2>
        <p>
        <table>
            <li>Budzet: ${movie.budget} USD</li>
            <li>Zanrovi filma: ${zanrovi}</li>
            <li>Rejting: ${movie.vote_average}/10 ★</li>
        </table>
        </p>`
        trailer.innerHTML = `
        <a href="${trailer_link}" target="_blank">
            <button class="col-2 btn-close-white btn-outline-info">Trejler</button>
        </a>`
    }
})