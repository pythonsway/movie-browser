export const fetchMovies = async (title, page) => {
  const SearchString = title.replace(/\s/g, '+').toLowerCase();
  // Browser cannot access local or server .env,
  // in production use server-side API for secrets
  const ReqUrl = `https://omdbapi.com/?apikey=41e9e2dd&s=${SearchString}&page=${page}`;
  const response = await fetch(ReqUrl);
  const movies = await response.json();
  return movies;
};

export const fetchMovieDetails = async (movieID) => {
  const ReqUrl = `https://omdbapi.com/?apikey=41e9e2dd&i=${movieID}&plot=full`;
  const response = await fetch(ReqUrl);
  const movieDetails = await response.json();
  return movieDetails;
};
