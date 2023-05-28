import { useSearchParams, useLocation, Link } from "react-router-dom";
import moviesAPI from '../moviesAPI';
import { useState, useEffect } from "react";


const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") ?? '';
    const location = useLocation();
    

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        const value = form.elements.query.value;
        if (value === '') {
            return setSearchParams({});
        }
        setSearchParams({ query: value });
        form.reset();
      };


      useEffect(() => {
        if (!query) return;

        const fetchMovies = async () => {
            try {
            const response = await moviesAPI.fetchBySearch(query)
            setMovies(response.data.results);
            
            } catch (error) {
            console.log(error)
            }
        }
        fetchMovies();
    }, [query])

    return (
        <>
        <form onSubmit={handleSubmit}>
        <input type="text" name="query" />
        <button type="submit" style={{marginLeft: "8px"}}>Search</button>
      </form>

      <ul style={{display: "flex", flexDirection: 'column', gap: "10px"}}>
        {movies && query && movies.map(({id, title}) => 
        (<li key={id} style={{fontSize: '10px', color: 'black'}}>
          <Link to={`/movies/${id}`} state={{ from: location }}>{title}</Link>
          </li>))}
    </ul>
        </>
    )
}

export default Movies;