import {  useParams } from "react-router-dom";
import moviesAPI from '../moviesAPI';
import { useState, useEffect } from "react";

interface ICast {
    id: string; 
    profile_path: string;
    original_name: string;
    character: string;
}

const Cast = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [castList, setCastList] = useState<ICast[]>([])

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
        <ul style={{display: 'flex', gap: 15, flexWrap: 'wrap', justifyContent: 'center', padding: 0}}>
        {castList && castList.map(({id, profile_path, original_name, character}) => 
        (<li 
        style={{width: 160}}
        key={id}>
            <img src={profile_path && `https://image.tmdb.org/t/p/w500/${profile_path}`} 
            alt={original_name}  
            width={160}/>
            <h4>{original_name}</h4>
            <p>Character: {character}</p>
        </li>))}
        </ul>
    )
}

export default Cast;