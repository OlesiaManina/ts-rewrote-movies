import {  useParams } from "react-router-dom";
import moviesAPI from '../moviesAPI';
import { useState, useEffect } from "react";

const Cast = () => {
    const {movieId} = useParams();
    const [castList, setCastList] = useState([])

    useEffect(()=> {
        if (!movieId) return;
        const fetchCast = async () => {
            try {
            const response = await moviesAPI.fetchCastInfo(movieId);
            setCastList(response.data.cast);
            } catch (error) {
            console.log(error)
            }
        }
        fetchCast();
    }, [movieId])

    return (
        <ul>
        {castList && castList.map(({id, profile_path, original_name, character}) => (<li key={id}>
            <img src={profile_path && `https://image.tmdb.org/t/p/w500/${profile_path}`} alt={original_name}  width={100}/>
            <h3>{original_name}</h3>
            <h4>Character: {character}</h4>
        </li>))}
        </ul>
    )
}

export default Cast;