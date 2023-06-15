const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");


getMovies(APIURL);

// async => sincronizar
async function getMovies(url) {
    // espera pela busca em tal url
    const resp = await fetch(url);
    // transformando em um "arquivo" JSON
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    main.innerHTML = "";

    movies.forEach(movie => {

        const {
            poster_path, title, vote_average
        } = movie;
        const movieElement = document.createElement("div");
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
            <img 
            src="${IMGPATH + movie.poster_path}"
            alt="${movie.title}"
            >
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span class="${visualRate(movie.vote_average)}">
                ${movie.vote_average}</span>
            </div>
        `;
        main.appendChild(movieElement);
    });
}

function visualRate(vote) {
    if (vote >= 7) {
        return "green";
    } else if (vote >= 5) {
        return "yellow";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchText = search.value;
    if (searchText) {
        getMovies(SEARCHAPI + searchText);
        search.value = "";
    }
});