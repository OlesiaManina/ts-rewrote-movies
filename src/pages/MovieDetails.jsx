import { useParams,  Link, Outlet, useLocation } from "react-router-dom";
import moviesAPI from '../moviesAPI';
import { useState, useEffect, useRef, Suspense } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';


const defaultImg = "https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700"

const MovieDetails = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState('')
    let genresToPublic = [];
    const location = useLocation();
    const backLink = useRef(location.state?.from ?? '/movies');

    useEffect(() => {
        const fetchDetailMovie = async () => {
            try {
            const response = await moviesAPI.fetchDetailInfo(movieId)
            setMovie(response.data);
            } catch (error) {
            console.log(error)
            }
        }
        fetchDetailMovie();
    }, [movieId])

    const {poster_path, title, vote_average, overview, genres} = movie;
    const userScore = `${Math.round(vote_average * 10)}%`;

    const getMoviesGenres = () => {
        if(!genres) {return}
        return genres.map(genre => genresToPublic.push(genre.name)).join(' ')
    }
    getMoviesGenres();

    return (
      <>
      <Link to={backLink.current}><button>Go back</button></Link>
      <div style={{display: "flex", gap: "20px", alignItems: "center"}}>
      <LazyLoadImage
      alt={title}
      height={250}
      src={poster_path? `https://image.tmdb.org/t/p/w500/${poster_path}` : defaultImg}
      width={200} />
        <div>
            <h2>{title}</h2>
            <p>User score: {userScore}</p>
            <h3>Overview</h3>
            <p>{overview}</p>
            <h4>Genres</h4>
            <p>{genresToPublic.join(" ")}</p>
        </div>
        </div>
        <div  style={{marginBottom: "15px"}}>
            <h4>Additional information</h4>
            <ul>
                <li><Link to="cast">Cast</Link></li>
                <li><Link to="reviews">Reviews</Link></li>
            </ul>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
        <Outlet/>
        </Suspense>
      </>
    )
}

export default MovieDetails;