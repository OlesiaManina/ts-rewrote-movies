import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/';
const API_KEY = '24133b1b6fb1e59d7b163caa4eec50ae';

async function fetchTranding () {
    const response = await axios.get(`3/trending/movie/day?api_key=${API_KEY}`);
    return response.data.results;
}

async function fetchDetailInfo (movie_id: string) {
  const response = await axios.get(`3/movie/${movie_id}?api_key=${API_KEY}`);
  return response;
}

async function fetchCastInfo (movie_id: string) {
  const response = await axios.get(`3/movie/${movie_id}/credits?api_key=${API_KEY}`);
  return response;
}

async function fetchReviews (movie_id: string) {
  const response = await axios.get(`3/movie/${movie_id}/reviews?api_key=${API_KEY}`);
  return response;
}

async function fetchBySearch (value: string) {
  const response = await axios.get(`3/search/movie?api_key=${API_KEY}&query=${value}`);
  return response;
}

const api = {fetchTranding, fetchDetailInfo, fetchCastInfo, fetchReviews, fetchBySearch};

export default api;