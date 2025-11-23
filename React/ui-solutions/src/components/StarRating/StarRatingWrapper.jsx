import React from 'react'
import StarRating from './StarRating'

const StarRatingWrapper = () => {

    const handleRating = (selectedRating) => {
        console.log(selectedRating)
    }
    return (
        <div>
            <StarRating onClick={handleRating} totalStars={5}/>
        </div>
    )
}

export default StarRatingWrapper