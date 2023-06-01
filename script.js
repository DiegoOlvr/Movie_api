const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const main = document.getElementById("main");

// async => sincronizar
async function getMovies() {
    // espera pela busca em tal url
    const resp = await fetch(APIURL);
    // transformando em um "arquivo" JSON
    const respData = await resp.json();

    console.log(respData);
    main.innerHTML = "";
    respData.results.forEach(movie => {

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
                <span>${movie.vote_average}</span>
            </div>
        `;
        main.appendChild(movieElement);
    })


    // respData.results.forEach(movie => {
    //     const img = document.createElement("img");
    //     img.src = IMGPATH + movie.poster_path;

    //     // document.body.appendChild(img);

    // });

    return respData;
}

getMovies();