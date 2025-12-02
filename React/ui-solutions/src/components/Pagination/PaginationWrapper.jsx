import React, { useEffect, useState } from 'react'
import Pagination from './Pagination'

const PaginationWrapper = () => {

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const totalRecords = Array.from({length: 67}, (_, idx) => idx + 1);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = pageNumber * pageSize;
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            const data = totalRecords?.slice(startIndex, endIndex);
            setFilteredRecords(data);
            setIsLoading(false);
        }, 500);       
    }, [startIndex, endIndex]);


    const onPageNumberChange = (pageNumber) => {
        setPageNumber(pageNumber);
    }

    const onPageSizeChange = (pageSize, pageNumber) => {
        setPageSize(pageSize);
        setPageNumber(pageNumber);
    }

    return (
        <div>
            <div className="records">
                <Data data={filteredRecords} isLoading={isLoading}/>
            </div>
            <Pagination totalNumberOfRecords={67} pageSize={10} onPageNumberChange={onPageNumberChange} onPageSizeChange={onPageSizeChange} />
        </div>
    )
}

const Loader = () => {
        return <div className="loading-indicator">
            <span>loading...</span>
        </div>
}

const Data = ({data, isLoading}) => {
    if(isLoading) {
        return <Loader />
    }
    return <div className="records-list">
        {
            data?.map((value, idx) => {
                return <div className="records-list-item" key={idx}>
                    {value}
                </div>
            })
        }
    </div>
}

export default PaginationWrapper