import React, { useEffect, useRef, useState } from 'react'
import '../../style.css'

const InfiniteScrollbar = () => {
    const [list, setList] = useState([...new Array(25)])
    const [isLoading, setIsLoading] = useState(false);
    const listLastItemsRef = useRef();
    useEffect(() => {
        let observer = new IntersectionObserver((entries) => {
            entries?.forEach((value) => {
                if(value.isIntersecting) {
                    fetchData();
                }
            })
        });
        let lastItemRef;
        if(listLastItemsRef.current) {
            lastItemRef = listLastItemsRef.current;
            observer.observe(lastItemRef);
        }
        return () => {
            observer.unobserve(lastItemRef);
        }
    }, [list]);
    const fetchData = () => {
        setIsLoading(true);
        setTimeout(() => {
            setList((prevList) => {
                return [...prevList, ...new Array(30)]
            })
            setIsLoading(false);
        }, 1000);
    }
    return (
        <div>
            <h1>InfiniteScrollbar</h1>
            <div className="wrapper">
                <div className="lists">
                    {
                        list?.map((_, idx) => {
                            return <div className="list-item" key={idx} ref={(element) => {
                                if(list.length === idx + 1) {
                                    listLastItemsRef.current = element
                                }
                            }}>
                                {idx + 1}
                            </div>
                        })
                    }
                    {
                        isLoading && <div className="loading">loading...</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default InfiniteScrollbar