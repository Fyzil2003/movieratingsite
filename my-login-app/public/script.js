// document.addEventListener('DOMContentLoaded', () => {
//   const API_KEY = '7f28f9b8022199734a008d90a05bf3c7';
//   const main = document.getElementById("movie-details-section");
//   const section = document.getElementById("section");
//   const form = document.getElementById("form");
//   const search = document.getElementById("query");
  
//   const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7f28f9b8022199734a008d90a05bf3c7&page=1';
//   const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
//   const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=7f28f9b8022199734a008d90a05bf3c7&query=";

//   const urlParams = new URLSearchParams(window.location.search);
//   const username = urlParams.get('username');

//   // Update the alert message with the username
//   if (username) {
//       alert(`Welcome, ${decodeURIComponent(username)}!`);
//   }

//   function displayMovies(url) {
//     fetch(url)
//       .then(res => res.json())
//       .then(function (data) {
//         console.log(data.results);
//         const moviesContainer = document.createElement('div');
//         moviesContainer.setAttribute('class', 'movies-container');

//         data.results.forEach(element => {
//           const movieLink = document.createElement('a');
//           movieLink.setAttribute('href', 'movieDetails.html?id=' + element.id);
//           movieLink.setAttribute('class', 'movie-link');

//           const div_card = document.createElement('div');
//           div_card.setAttribute('class', 'card');
//           const image = document.createElement('img');
//           image.setAttribute('class', 'thumbnail');
//           image.src = IMG_PATH + element.poster_path;

//           const title = document.createElement('h3');
//           title.innerHTML = `${element.title}`;

//           div_card.appendChild(image);
//           div_card.appendChild(title);
//           movieLink.appendChild(div_card);
//           moviesContainer.appendChild(movieLink);
//         });

//         section.appendChild(moviesContainer);
//       });
//   }

//   displayMovies(APILINK);

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     section.innerHTML = '';

//     const searchItem = search.value;

//     if (searchItem) {
//       displayMovies(SEARCHAPI + searchItem);
//       search.value = "";
//     }
//   });

//   // ... (Your existing code)
// });


document.addEventListener('DOMContentLoaded', () => {
  // Fetch the logged-in username from the session storage
  const loggedInUser = sessionStorage.getItem('loggedInUser');

  // Display an alert with the username
  if (loggedInUser) {
      alert(`Welcome, ${loggedInUser}!`);
  }

  const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7f28f9b8022199734a008d90a05bf3c7&page=1';
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=7f28f9b8022199734a008d90a05bf3c7&query=";
  const main = document.getElementById("section");
  const form = document.getElementById("form");
  const search = document.getElementById("query");

  function displayMovies(url) {
      fetch(url)
          .then(res => res.json())
          .then(function (data) {
              console.log(data.results);
              const moviesContainer = document.createElement('div');
              moviesContainer.setAttribute('class', 'movies-container');

              data.results.forEach(element => {
                  const movieLink = document.createElement('a');
                  movieLink.setAttribute('href', 'movieDetails.html?id=' + element.id);
                  movieLink.setAttribute('class', 'movie-link');

                  const div_card = document.createElement('div');
                  div_card.setAttribute('class', 'card');
                  const image = document.createElement('img');
                  image.setAttribute('class', 'thumbnail');
                  image.src = IMG_PATH + element.poster_path;

                  const title = document.createElement('h3');
                  title.innerHTML = `${element.title}`;

                  div_card.appendChild(image);
                  div_card.appendChild(title);
                  movieLink.appendChild(div_card);
                  moviesContainer.appendChild(movieLink);
              });

              main.appendChild(moviesContainer);
          });
  }

  displayMovies(APILINK);

  form.addEventListener("submit", (e) => {
      e.preventDefault();
      main.innerHTML = '';

      const searchItem = search.value;

      if (searchItem) {
          displayMovies(SEARCHAPI + searchItem);
          search.value = "";
      }
  });
});