const base = 'https://api.themoviedb.org/3'
const key = '49c9612f37df19a59fc0737a1f89a100'
const root = document.querySelector('.wrapper')
const body = document.querySelector('body')

const badge = document.querySelector('.badge')

let watchlist = localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist')) : []

badge.textContent = watchlist.length

/* GENERATE MOVIES */
function generateMovies(movie, cb) {
    div.innerHTML += `
        <div class="movie_card">
            <img 
                src=${movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'img/empty.jpg'}
                data-id=${movie.id}
                class="movie_card_image" />
            <div>
                <h4>${movie.title ? movie.title.length >= 25 ? movie.title.substring(0, 25)+'...' : movie.title : 'No title'}</h4>
                <img src="icons/add.png" class="add_video_icon" data-id=${movie.id} />
            </div>
        </div>
    `

    cb(movie)
}

function generateMovieFunctions(movie) {
    const cards = document.querySelectorAll('.movie_card .movie_card_image')
    const modalOverlay = document.querySelector('.modal-overlay')
    const modal = modalOverlay.querySelector('.modal')

    cards.forEach(card => {
        const id = card.dataset.id

        card.onclick = () => {
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`)
            .then((res) => res.json())
            .then(res => {
                modal.innerHTML = `
                    <div class="modal-left">
                        <img src=${res.poster_path ? `https://image.tmdb.org/t/p/w500/${res.poster_path}` : 'img/empty.jpg'} />
                    </div>
                    <div class="modal-right">
                        <h1>About Movie</h1>
                        <div class="modal-right-body">
                            <p>Original title: ${res.original_title && res.original_title}</p>
                            <br />
                            <p>Overview: ${res.overview && res.overview}</p>
                            <br />
                            <p>Popularity: ${res.popularity && res.popularity}</p>
                            <br />
                            <p>Release date: ${res.release_date && res.release_date}</p>
                            <br />
                            <p>Status: ${res.status && res.status}</p>
                            <br />
                            <p>Budget: ${res.budget && res.budget}$</p>
                        </div>
                    </div>
                    <img src="icons/x-mark.png" class="close-modal" />
                `

                modal.style.transform = "scale(1, 1)"
                modal.style.transition = "0.2s ease-in-out"

                body.onclick = (e) => {
                    if(e.target.classList.contains('modal-overlay') || e.target.classList.contains('close-modal')) {
                        modal.style.transform = "scale(0, 0)"
                        modal.style.transition = "0.2s ease-in-out"
                        setTimeout(() => {
                            modalOverlay.style.display = "none"
                        }, 200);
                    }
                }

            })

            modalOverlay.style.display = "flex"
        }
    })

    /* ADD TO WATCHLIST */
    
    addToWatchlist()

    function addToWatchlist() {
        const icons = document.querySelectorAll('.add_video_icon')
        icons.forEach(icon => {
            icon.onclick = () => {
                const id = icon.dataset.id
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`)
                .then((res) => res.json())
                .then(res => {
                    const item = watchlist.find((item) => item.id === res.id)
                    console.log(item)
                    if(item !== undefined) {
                        alert(`Item ${res.title} already exists!`)
                    } else {
                        watchlist.push(res)
                        localStorage.setItem('watchlist', JSON.stringify(watchlist))
                    }

                    badge.textContent = watchlist.length
                })
            }
        })
    }

    /* OPEN WATCHLIST MODAL */


    const watchlist_icon = document.querySelector('.watchlist_icon')

    watchlist_icon.onclick = () => {
        generateWatchlist(watchlistFunctions)
    }


    /* GENERATE WATCHLIST */
    function generateWatchlist() {
        modal.innerHTML = ''
        const div = document.createElement('div')
        div.classList.add('watchlist_modal_movie_container')

        if(watchlist.length) {
            watchlist.forEach(movie => {
                div.innerHTML += `
                    <div class="watchlist_modal_movie">
                        <img 
                            src=${movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'img/empty.jpg'}  
                            class="movie_card_image" 
                        />
                        <p class="delete_watchlist_movie" data-id=${movie.id}>&times;</p>
                    </div>
                `
                modal.appendChild(div)

                watchlistFunctions()
            })
        } else {
            div.innerHTML += '<h1>Watchlist is empty. Please, add some!</h1>'
            modal.appendChild(div)
        }

        modal.style.transition = "0.2s ease-in-out"
        setTimeout(() => {
            modal.style.transform = "scale(1, 1)"
        }, 200);

        body.onclick = (e) => {
            if(e.target.classList.contains('modal-overlay') || e.target.classList.contains('close-modal')) {
                modal.style.transform = "scale(0, 0)"
                modal.style.transition = "0.2s ease-in-out"
                setTimeout(() => {
                    modalOverlay.style.display = "none"
                }, 200);
            }
        }

        modalOverlay.style.display = "flex"
    }

    /* DELETING MOVIE FROM WATCHLIST */
    
    function watchlistFunctions() {
        const delete_icons = document.querySelectorAll('.delete_watchlist_movie')
        delete_icons.forEach(icon => {
            icon.onclick = () => {
                watchlist = JSON.parse(localStorage.getItem("watchlist")).filter(movie => movie.id !== parseInt(icon.dataset.id))
                localStorage.setItem("watchlist", JSON.stringify(watchlist))

                badge.textContent = watchlist.length
                
                generateWatchlist()
            }
        })
    }

}