import axios from "axios";
import { apiKey } from "../config";

const apiBaseurl = `https://api.themoviedb.org/3`;
const trendingMoviesEndpoint = `${apiBaseurl}/trending/movie/day?language=en-US&api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseurl}/movie/upcoming?language=en-US&api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseurl}/movie/top_rated?language=en-US&api_key=${apiKey}`;


//dynamic endpoints

const movieDetialEndpoint = id => `${apiBaseurl}/movie/${id}?language=en-US&api_key=${apiKey}`;
const movieCreditsEndpoint = id => `${apiBaseurl}/movie/${id}/credits?language=en-US&api_key=${apiKey}`;
const similarMovieEndpoint = id => `${apiBaseurl}/movie/${id}/similar?language=en-US&api_key=${apiKey}`;
const personDetailsEndpoint = (id) => `${apiBaseurl}/person/${id}?language=en-US&api_key=${apiKey}`;
const personMoviesEndpoint = (id) =>
  `${apiBaseurl}/person/${id}/movie_credits?language=en-US&api_key=${apiKey}`;

const searchMoviesEndpoint = `${apiBaseurl}/search/movie?api_key=${apiKey}&language=en-US&query=`;


export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w352${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null;


const apiCall = async (endpoint, params) => {
 const option = {
  method: "GET",
  url: endpoint,
  params: params ? params : {}, // ✅ correct key
};

  try {
    const response = await axios.request(option);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return {};
  }
};


export const fetchTrendingMovies= () => {
return apiCall(trendingMoviesEndpoint);
}


export const upcomingTrendingMovies= () => {
return apiCall(upcomingMoviesEndpoint);
}


export const topRatedTrendingMovies= () => {
return apiCall(topRatedMoviesEndpoint);
}

export const fetchMoviesDetail = id=>{
  return apiCall(movieDetialEndpoint(id));
}

export const fetchMoviesCredits = id=>{
  return apiCall(movieCreditsEndpoint(id));
}


export const fetchMoviesSimilar = id=>{
  return apiCall(similarMovieEndpoint(id));
}

export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndpoint(id));
};

export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndpoint(id));
};


export const searchMovies = query => {
  return apiCall(`${searchMoviesEndpoint}${encodeURIComponent(query)}`);
};