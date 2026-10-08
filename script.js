const API_KEY = 'YOUR_TMDB_API_KEY';
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const movieGrid = document.getElementById('movie-grid');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const sectionTitle = document.getElementById('section-title');

async function getMovies(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        showMovies(data.results);
    } catch (err) {
        movieGrid.innerHTML = `<p style="color:red">Failed to load movies. Please check API key.</p>`;
    }
}

function showMovies(movies) {
    movieGrid.innerHTML = '';

    if (!movies || movies.length === 0) {
        movieGrid.innerHTML = '<p>No results found.</p>';
        return;
    }

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, release_date } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-card');

        const poster = poster_path 
            ? IMG_PATH + poster_path 
            : 'https://via.placeholder.com/500x750?text=No+Image';

        movieEl.innerHTML = `
            <img src="${poster}" alt="${title}">
            <div class="movie-info">
                <h3 class="movie-title">${title}</h3>
                <div class="movie-details">
                    <span>${release_date ? release_date.split('-')[0] : 'N/A'}</span>
                    <span class="rating">★ ${vote_average ? vote_average.toFixed(1) : 'N/A'}</span>
                </div>
            </div>
        `;

        movieGrid.appendChild(movieEl);
    });
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();

    if (searchTerm && searchTerm !== '') {
        sectionTitle.textContent = `Search results for "${searchTerm}"`;
        getMovies(SEARCH_API + searchTerm);
        searchInput.value = '';
    } else {
        window.location.reload();
    }
});

getMovies(API_URL);