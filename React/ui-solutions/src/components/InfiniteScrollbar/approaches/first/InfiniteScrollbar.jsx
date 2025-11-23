import React, { useState } from 'react'
import '../../style.css'

const InfiniteScrollbar = () => {
    const [list, setList] = useState([...new Array(25)])
    const [isLoading, setIsLoading] = useState(false);
    const handleScroll = (e) => {
        console.log(e.target.scrollTop, e.target.scrollHeight, e.target.clientHeight)
        const {scrollTop, scrollHeight, clientHeight} = e.target;
        if(((scrollHeight - scrollTop) - clientHeight) <= 50) {
            console.log('last')
            fetchData();
        }
    }
    const fetchData = () => {
        setIsLoading(true);
        setTimeout(() => {
            let updatedList = [...list, ...new Array(30)];
            setList(updatedList)
            setIsLoading(false);
        }, 1000);
    }
    return (
        <div>
            <h1>InfiniteScrollbar</h1>
            <div className="wrapper">
                <div className="lists" onScroll={(e) => !isLoading && handleScroll(e)}>
                    {
                        list?.map((_, idx) => {
                            return <div className="list-item" key={idx}>
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