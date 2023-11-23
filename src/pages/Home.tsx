import moviesAPI from '../moviesAPI';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IMovie } from './MovieDetails';

const Home = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
            const response = await moviesAPI.fetchTranding()
            setMovies(response);
            } catch (error) {
            console.log(error)
            }
        }
        fetchMovies();
    }, [])

    return (
        <ul style={{display: "flex", flexDirection: 'column', gap: "10px"}}>
            {movies && movies.map(({id, title}) => 
            (<li key={id} style={{fontSize: 15, fontWeight: 500}}>
              <Link to={`/movies/${id}`}>{title}</Link>
              </li>))}
        </ul>
    );
  };

  export default Home;