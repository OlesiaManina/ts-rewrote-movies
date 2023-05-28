import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDEzM2IxYjZmYjFlNTlkN2IxNjNjYWE0ZWVjNTBhZSIsInN1YiI6IjY0NzIxMzk2OWFlNjEzMDEyNTdiYzY1MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tcNdIoje0HBWD-U1jl32B-4ZQW7MTvc6gqKuda04J_Q';

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: API_KEY
    }
  };
  
 async function fetchTranding () {
    const response = await axios.get(`${BASE_URL}/trending/movie/day?language=en-US`, options);
    return response.data.results;
}

async function fetchDetailInfo (movie_id) {
    const response = await axios.get(`${BASE_URL}/movie/${movie_id}?language=en-US`, options);
    return response;
}

async function fetchCastInfo (movie_id) {
  const response = await axios.get(`${BASE_URL}/movie/${movie_id}/credits?language=en-US`, options);
  return response;
}

async function fetchReviews (movie_id) {
  const response = await axios.get(`${BASE_URL}/movie/${movie_id}/reviews?language=en-US`, options);
  return response;
}

async function fetchBySearch (value) {
  const response = await axios.get(`${BASE_URL}/search/movie?query=${value}`, options);
  return response;
}

const api = {fetchTranding, fetchDetailInfo, fetchCastInfo, fetchReviews, fetchBySearch};

export default api;