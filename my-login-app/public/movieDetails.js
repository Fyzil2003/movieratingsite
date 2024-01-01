document.addEventListener('DOMContentLoaded', () => {
  const API_KEY = '7f28f9b8022199734a008d90a05bf3c7';
  const main = document.getElementById("movie-details-section");
  
  function displayMovieDetails(movie, isSearchResult) {


    main.innerHTML = '';
  
    // Movie Details Card
    const div_card = document.createElement('div');
    div_card.setAttribute('class', 'card');

    // Adjust image size based on isSearchResult
    const imageSize = isSearchResult ? '100%' : '20%';

    const image = document.createElement('img');
    image.setAttribute('class', 'thumbnail');
    image.style.width = imageSize;
    image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    // Title
    const title = document.createElement('h3');
    title.innerHTML = movie.title;
    title.classList.add('movie-info');

    // Release Date
    const releaseDate = document.createElement('p');
    releaseDate.innerHTML = `Release Date: ${movie.release_date}`;
    releaseDate.classList.add('movie-info');

    // Genres
    const genres = document.createElement('p');
    genres.innerHTML = `Genres: ${movie.genres.map(genre => genre.name).join(', ')}`;
    genres.classList.add('movie-info');

    // Overview
    const overview = document.createElement('p');
    overview.innerHTML = `Overview: ${movie.overview}`;
    overview.classList.add('movie-info');

    // Back Button
    const backButton = document.createElement('button');
    backButton.innerHTML = 'Back to Homepage';
    backButton.setAttribute('class', 'back-to-home');
    backButton.addEventListener('click', () => {
      window.location.href = 'index.html';
    });

    // Append elements to the card
    div_card.appendChild(image);
    div_card.appendChild(title);
    div_card.appendChild(releaseDate);
    div_card.appendChild(genres);
    div_card.appendChild(overview);
    div_card.appendChild(backButton);

    // Append card to the main section
    main.appendChild(div_card);

    // Back Button
    const buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('class', 'button-container');
    buttonContainer.appendChild(backButton);
    main.appendChild(buttonContainer);

    // Rating System
    const ratingContainer = document.createElement('div');
    ratingContainer.setAttribute('class', 'rating-container');

    // Create a common container for rating input and submit button
    const inputSubmitContainer = document.createElement('div');
    inputSubmitContainer.setAttribute('class', 'input-submit-container');

    // Rating Input
    const ratingInput = document.createElement('input');
    ratingInput.setAttribute('type', 'number');
    ratingInput.setAttribute('class', 'rating-input');
    ratingInput.setAttribute('placeholder', 'Rate (1-5)');
    ratingInput.setAttribute('min', '1');
    ratingInput.setAttribute('max', '5');

    // Submit Rating Button
    const submitRatingButton = document.createElement('button');
    submitRatingButton.innerHTML = 'Submit Rating';
    submitRatingButton.setAttribute('class', 'submit-rating');

    // Average Rating Display
    const averageRatingDisplay = document.createElement('p');
    averageRatingDisplay.setAttribute('class', 'average-rating');

    // Append rating input and submit button to the common container
    inputSubmitContainer.appendChild(ratingInput);
    inputSubmitContainer.appendChild(submitRatingButton);

    // Append all elements to the main container
    ratingContainer.appendChild(inputSubmitContainer);
    ratingContainer.appendChild(averageRatingDisplay);
    main.appendChild(ratingContainer);

    submitRatingButton.addEventListener('click', () => {
      const ratingValue = parseInt(ratingInput.value, 10);
      if (!isNaN(ratingValue) && ratingValue >= 1 && ratingValue <= 5) {
        const ratings = localStorage.getItem(`movieRatings-${movie.id}`) ? JSON.parse(localStorage.getItem(`movieRatings-${movie.id}`)) : [];
        ratings.push(ratingValue);
        localStorage.setItem(`movieRatings-${movie.id}`, JSON.stringify(ratings));
        displayRatings(averageRatingDisplay, ratings);
        ratingInput.value = '';
      }
    });

    // Review Box
    const reviewBox = document.createElement('div');
    reviewBox.setAttribute('class', 'review-box');
    const reviewTextArea = document.createElement('textarea');
    reviewTextArea.setAttribute('id', 'review-text');
    reviewTextArea.setAttribute('placeholder', 'Write your review here...');
    const submitReviewButton = document.createElement('button');
    submitReviewButton.innerHTML = 'Submit Review';
    submitReviewButton.setAttribute('class', 'submit-review');
    const reviewsContainer = document.createElement('div');
    reviewsContainer.setAttribute('id', 'reviews-container');
    reviewBox.appendChild(reviewTextArea);
    reviewBox.appendChild(submitReviewButton);
    reviewBox.appendChild(reviewsContainer);
    main.appendChild(reviewBox);

    // Event listener for the review submission
    submitReviewButton.addEventListener('click', () => {
      const reviewText = reviewTextArea.value.trim();
      if (reviewText) {
        const reviews = localStorage.getItem(`movieReviews-${movie.id}`) ? JSON.parse(localStorage.getItem(`movieReviews-${movie.id}`)) : [];
        reviews.push(reviewText);
        localStorage.setItem(`movieReviews-${movie.id}`, JSON.stringify(reviews));
        displayReviews(reviewsContainer, reviews);
        reviewTextArea.value = '';
      }
    });

    // Display existing reviews on page load
    const storedReviews = localStorage.getItem(`movieReviews-${movie.id}`);
    const initialReviews = storedReviews ? JSON.parse(storedReviews) : [];
    displayReviews(reviewsContainer, initialReviews);

    // Display existing ratings on page load
    const storedRatings = localStorage.getItem(`movieRatings-${movie.id}`);
    const initialRatings = storedRatings ? JSON.parse(storedRatings) : [];
    displayRatings(averageRatingDisplay, initialRatings);
  }

  function displayReviews(reviewsContainer, reviews) {
    reviewsContainer.innerHTML = '';
    if (reviews.length > 0) {
      const reviewsList = document.createElement('ul');
      reviewsList.setAttribute('class', 'reviews-list');
      reviews.forEach((review) => {
        const reviewItem = document.createElement('li');
        reviewItem.classList.add('review');
        reviewItem.innerHTML = `<p>${review}</p>`;
        reviewsList.appendChild(reviewItem);
      });
      reviewsContainer.appendChild(reviewsList);
    } else {
      reviewsContainer.innerHTML = '<p>No reviews yet.</p>';
    }
  }

  function displayRatings(averageRatingDisplay, ratings) {
    averageRatingDisplay.innerHTML = '';
    if (ratings.length > 0) {
      const averageRating = calculateAverageRating(ratings);
      averageRatingDisplay.innerHTML = `<i class="star-icon">★</i> Average Rating: ${averageRating.toFixed(1)}`;
    }
  }

  function calculateAverageRating(ratings) {
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return sum / ratings.length;
  }

  function displayMovies(results) {
    main.innerHTML = '';
    if (results.length > 0) {
      const moviesContainer = document.createElement('div');
      moviesContainer.setAttribute('class', 'movies-container');
      results.forEach(element => {
        const movieLink = document.createElement('a');
        movieLink.setAttribute('href', `movieDetails.html?id=${element.id}`);
        movieLink.setAttribute('class', 'movie-link');
        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');
        const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
        const title = document.createElement('h3');
        title.innerHTML = element.title;
        div_card.appendChild(image);
        div_card.appendChild(title);
        movieLink.appendChild(div_card);
        moviesContainer.appendChild(movieLink);

        movieLink.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.setItem('selectedMovieId', element.id);
          localStorage.setItem('selectedMovieTitle', element.title);
          localStorage.setItem('selectedMovieImage', `https://image.tmdb.org/t/p/w500${element.poster_path}`);
          window.location.href = `movieDetails.html?id=${element.id}`;
        });
      });
      main.appendChild(moviesContainer);
    } else {
      console.error('No search results found.');
    }
  }

  const urlSearchParams = new URLSearchParams(window.location.search);
  const movieId = urlSearchParams.get('id');
  const searchQuery = urlSearchParams.get('q');

  const form = document.getElementById("form");
  const search = document.getElementById("query");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    main.innerHTML = '';
    const searchItem = search.value;
    if (searchItem) {
      const SEARCH_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchItem}`;
      fetch(SEARCH_API_URL)
        .then((response) => response.json())
        .then((data) => {
          if (movieId) {
            displayMovies(data.results);
          } else {
            displayMovieDetails(data.results[0], true);
          }
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
    }
  });


  if (movieId) {
    const MOVIE_API_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=genres`;
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((data) => {
        displayMovieDetails(data, false);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  } else if (searchQuery) {
    const SEARCH_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
    fetch(SEARCH_API_URL)
      .then((response) => response.json())
      .then((data) => {
        displayMovieDetails(data.results[0], true);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  } else {
    console.error('No movie selected or search query.');
  }
});

