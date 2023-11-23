import { useParams,  Outlet, useLocation } from "react-router-dom";
import { Link } from '../components/Layout.styled'
import moviesAPI from '../moviesAPI';
import { useState, useEffect, useRef, Suspense } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const defaultImg = "https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700"

type Genre = {
    name: string;
}

export interface IMovie {
    id: string;
    poster_path: string;
    title: string; 
    vote_average: number;
    overview: string;
    genres: Genre[];
}

const MovieDetails = () => {
    const { movieId = '' } = useParams<{ movieId: string }>();
    const [movie, setMovie] = useState<IMovie | undefined>(undefined);

    const location = useLocation();
    const backLink = useRef(location.state?.from ?? '/');

    useEffect(() => {
        if (!movieId) {
            return;
        }

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

    const {poster_path, title, vote_average, overview, genres} = movie || {};
    const userScore = vote_average && `${Math.round(vote_average * 10)}%`;

    const getMoviesGenres = () => {
        return genres?.map((genre: Genre) => genre.name).join(' ') || '';
      };

    return (
      <>
      <Link to={backLink.current}><button>Go back</button></Link>
      <div style={{display: "flex", gap: "20px", marginTop: 10}}>
      <LazyLoadImage
      alt={title || 'Movie Poster'}
      width={200}
      height={250}
      src={poster_path? `https://image.tmdb.org/t/p/w500/${poster_path}` : defaultImg}
      effect="blur"
       />
        <div>
            <h2 style={{ marginTop: 0}}>{title}</h2>
            <p>User score: {userScore}</p>
            <h3>Overview</h3>
            <p>{overview}</p>
            <h4>Genres</h4>
            <p>{getMoviesGenres()}</p>
        </div>
        </div>
        <div  style={{marginBottom: 15}}>
            <h4>Additional information</h4>
            <nav>
                <Link to="cast">Cast</Link>
                <Link to="reviews">Reviews</Link>
            </nav>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
        <Outlet/>
        </Suspense>
      </>
    )
}

export default MovieDetails;