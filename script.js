const API_KEY = "api_key=55a8762565c43673adaf6e0da7e3ecbc";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovie(API_URL);

function getMovie(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        // console.log(data);
        showMovie(data.results);
    })
}

function showMovie(data){
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, release_date} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_URL+poster_path}" alt="${title}">

                <div class="movie-info">
                    <h2>${title}</h2>
                    <span class="${getColor(vote_average)}">${vote_average}</span>
                </div>

                <div class="releaseDate">
                    ${release_date}
                </div>

        `

        main.appendChild(movieEl);
    })
}

// warna rating
function getColor(vote){
    if (vote >= 7.5){
        return "green"
    }
    else if (vote >= 5){
        return "orange"
    }
    else{
        return "red";
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm){
        getMovie(searchURL+'&query='+searchTerm)
    }
    else{
        getMovie(API_URL)
    }
})