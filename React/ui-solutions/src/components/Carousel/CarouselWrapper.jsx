import React from 'react'
import Carousel from './Carousel'
import FirstImg from './images/first.jpeg'
import SecondImg from './images/second.jpeg'
import ThirdImg from './images/third.jpeg'
import FourthImg from './images/fourth.jpeg'
import FifthImg from './images/fifth.jpeg'

const CarouselWrapper = () => {
    return (
        <div>
            <Carousel>
                <img src={FirstImg} />
                <img src={SecondImg} />
                <img src={ThirdImg} />
                <img src={FourthImg} />
                <img src={FifthImg} />
            </Carousel>

        </div>
    )
}

export default CarouselWrapper