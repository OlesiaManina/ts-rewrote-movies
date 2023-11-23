import { useParams } from "react-router-dom";
import moviesAPI from '../moviesAPI';
import { useState, useEffect } from "react";

type Author = {
    name: string;
}

interface IReview {
    id: string;
    author_details: Author; 
    content: string;
}

const Reviews = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [reviews, setCastReviews] = useState<IReview[]>([])

    useEffect(()=> {
        if (!movieId) return;
        const fetchReviews = async () => {
            try {
            const response = await moviesAPI.fetchReviews(movieId);
            setCastReviews(response.data.results);
            } catch (error) {
            console.log(error)
            }
        }
        fetchReviews();
    }, [movieId])

    return (
        <>
        {reviews.length !== 0? 
            <ul>
            {reviews.map(({id, author_details, content}) => (<li key={id}>
                {author_details.name && <h5>Autor: {author_details.name}</h5>}
                <p>Character: {content}</p>
            </li>))}
            </ul> 
            : <p>There are no reviews....</p>}
        </>
    )
}

export default Reviews;