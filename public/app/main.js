const input = document.querySelector('.search_movies')
const btn = document.querySelector('.search_movies_btn')
const div = document.querySelector('.movies')


generateTrending()
filterMovies()
searchMovies()

/* SEARCHING FOR A MOVIE */
function searchMovies() {
    input.addEventListener('keyup', (e) => {
        e.target.value.length && fetch(`${base}/search/movie?api_key=${key}&language=en-US&query=${e.target.value}&page=1&include_adult=false`)
        .then(res => res.json())
        .then((res) => {
            div.innerHTML = ''
            res.results.forEach((movie) => generateMovies(movie, generateMovieFunctions))
        })
    })
}

/* GENERATE TRENDING */
function generateTrending() {
    fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${key}`)
        .then(res => res.json())
        .then((res) => {
            div.innerHTML = ''
            res.results.forEach((movie) => generateMovies(movie, generateMovieFunctions))
        })
}

/* GENERATE POPULAR */
function generatePopular() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`)
        .then(res => res.json())
        .then((res) => {
            div.innerHTML = ''
            res.results.forEach((movie) => generateMovies(movie, generateMovieFunctions))
        })
}

/* GENERATE TOP_RATED */
function generateTopRated() {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`)
        .then(res => res.json())
        .then((res) => {
            div.innerHTML = ''
            res.results.forEach((movie) => generateMovies(movie, generateMovieFunctions))
        })
}

/* GENERATE UPCOMING */
function generateUpcoming() {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`)
        .then(res => res.json())
        .then((res) => {
            div.innerHTML = ''
            res.results.forEach((movie) => generateMovies(movie, generateMovieFunctions))
        })
}

/* FILTER MOVIES */
function filterMovies() {
    const categories = document.querySelectorAll('.categories ul li')
    categories.forEach(category => {
        category.onclick = (e) => {
            switch (e.target.textContent) {
                case 'Trending':
                    generateTrending()
                    break;
                case 'Latest':
                    generateLatest()
                    break;
                case 'Popular':
                    generatePopular()
                    break;
                case 'Top Rated':
                    generateTopRated()
                    break;
                case 'Upcoming':
                    generateUpcoming()
                    break;
                default:
                    break;
            }
        }
    })
}



