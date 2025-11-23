import React, { useState } from 'react'
import StarIcon from './StarIcon';
import './style.css'

const StarRating = ({onClick, totalStars: totalStars_}) => {
    const totalStars = Array.from({ length: totalStars_ }, (_, idx) => idx);
    const [selectedStar, setSelectedStar] = useState(-1);
    const getStarRating = (e, starIndex) => {
        // mouse position inside the star
        const { left, width } = e.target.getBoundingClientRect();
        // clientX is the exact position where clicked and left is the distance till the left edge of star
        const x = e.clientX - left;
        // from complete width checking if it's left portion then half otherwise full
        const isHalf = x < width / 2;
        return isHalf ? starIndex + 0.5 : starIndex + 1;
    }
    const handleClick = (e, idx) => {
        const starRating = getStarRating(e, idx);
        setSelectedStar(starRating);
        onClick(starRating)
    }
    return (
        <div>
            <h1>
            StarRating
            </h1>
            <div className="stars-list">
                    {
                        totalStars?.map((_, idx) => {
                            let classNames = ['star'];
                            let color = 'dark';
                            let offset;
                            if(idx < selectedStar) {
                                offset = selectedStar == -1 ? 0 : idx + 1 <= selectedStar ? 100 : idx + 0.5 <= selectedStar ? 50 : 0;
                                classNames.push('selected');
                                color = 'darkblue';
                            }
                            return <StarIcon offset={offset} color={color} key={idx} onClick={(e) => handleClick(e, idx)} className={classNames.join(' ')} />
                        })
                    }
            </div>
        </div>
    )
}

export default StarRating