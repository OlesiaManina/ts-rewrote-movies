import moviesAPI from '../moviesAPI';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [movies, setMovies] = useState([]);

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
            (<li key={id} style={{fontSize: '10px', color: 'black'}}>
              <Link to={`/movies/${id}`}>{title}</Link>
              </li>))}
        </ul>
    );
  };

  export default Home;