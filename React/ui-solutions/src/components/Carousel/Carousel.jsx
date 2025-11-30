import React, { useEffect, useRef, useState } from 'react'
import './style.css'

const Carousel = ({children}) => {
    const [activeSliderIdx, setActiveSlideIdx] = useState(0);
    const intervalRef = useRef();
    const [totalImages, setTotalImages] = useState();
    useEffect(() => {
        const sliders_img = document.getElementsByTagName('img');
        setTotalImages(sliders_img?.length);
        startTimer(0);
    }, []);
    
    const startTimer = (initialIdx) => {
        const sliders_img = document.getElementsByTagName('img');
        sliders_img[initialIdx].setAttribute('active', true);
        intervalRef.current = setInterval(() => {
            setActiveSlideIdx(prev => {
                const newIdx = prev === sliders_img.length - 1 ? 0 : prev + 1
                Array.from(sliders_img).forEach((slider, idx) => {
                    if(newIdx === idx) {
                        slider.setAttribute('active', true);
                    } else {
                        slider.removeAttribute('active', false);
                    }
                })
                return newIdx;
            })
        }, 3000);
    }
    
    const handleOnMouseEnter = () => {
        clearInterval(intervalRef.current)
    }

    const handleOnMouseLeave = () => {
        startTimer(activeSliderIdx);
    }

    const handlePrev = () => {
        clearInterval(intervalRef.current);
        const sliders_img = document.getElementsByTagName('img');
        const prevIdx = activeSliderIdx === 0 ? sliders_img?.length - 1 : activeSliderIdx - 1;
        sliders_img[activeSliderIdx].removeAttribute('active', false);
        setActiveSlideIdx(prevIdx);
        startTimer(prevIdx);
    }
    const handleNext = () => {
        clearInterval(intervalRef.current);
        const sliders_img = document.getElementsByTagName('img');
        const nextIdx = activeSliderIdx == sliders_img?.length - 1 ? 0 : activeSliderIdx + 1;
        sliders_img[activeSliderIdx].removeAttribute('active', false);
        setActiveSlideIdx(nextIdx);
        startTimer(nextIdx);
    }
    
    const handleIndicator = (idx) => {
        return () => {
            clearInterval(intervalRef.current)
            let sliders_img = document.getElementsByTagName('img');
            sliders_img[activeSliderIdx].removeAttribute('active', false);
            setActiveSlideIdx(idx);
            startTimer(idx);
        }
    }

    return (
        <div>
            <h1>
                Carousel
            </h1>
            <div className="carousel-box">
                <div className="sliders">
                        <div className="images" onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
                            {children}
                        </div>
                    <button className="prev-btn" onClick={handlePrev}>prev</button>
                    <button className="next-btn" onClick={handleNext}>next</button>
                </div>
                <div className="indicators">
                    {
                        [...new Array(totalImages)].map((_, idx) => {
                            return <span onClick={handleIndicator(idx)}>{idx + 1}</span>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Carousel