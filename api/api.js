// "Search": [
//   {
//       "Title": "American Pie",
//       "Year": "1999",
//       "imdbID": "tt0163651",
//       "Type": "movie",
//       "Poster": "https://m.media-amazon.com/images/M/MV5BMTg3ODY5ODI1NF5BMl5BanBnXkFtZTgwMTkxNTYxMTE@._V1_SX300.jpg"
//   },

// const processMovies = movie => ({
//   name: `${contact.name.first} ${contact.name.last}`,
//   phone: contact.phone,
// })


export const fetchMovies = async ({ title }, page) => {
  try {
    const SearchString = title.replace(/\s/g, '+').toLowerCase();
    // Browser cannot access local or server .env,
    // in production use server-side API for secrets
    const ReqUrl = `https://omdbapi.com/?apikey=41e9e2dd&s=${SearchString}&page=${page}`;
    const response = await fetch(ReqUrl);
    const movies = await response.json();
    return movies;
  } catch (err) {
    // return { 'Search': err };
    console.log(err);
  }
};
export const fetchMovieDetails = async (movieID) => {
  try {
    const ReqUrl = `https://omdbapi.com/?apikey=41e9e2dd&i=${movieID}&plot=full`;
    const response = await fetch(ReqUrl);
    const movieDetails = await response.json();
    return movieDetails;
  } catch (err) {
    // return { 'Error': err };
    console.log(err);
  }
};
