import React, { useMemo, useState } from 'react'
import './style.css'

const Pagination = ({totalNumberOfRecords, pageSize = 10, onPageNumberChange = () => {}, onPageSizeChange = () => {}}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const [pageSize_, setPageSize] = useState(pageSize);

    const totalPages = Math.ceil(totalNumberOfRecords / pageSize_);

    const handleOnPageChange = (pageNumber) => {
        return () => {
            setCurrentPage(pageNumber)
            onPageNumberChange(pageNumber);
        }
    }

    const handleFirstPage = () => {
        setCurrentPage(1);
        onPageNumberChange(1);
    }
    const handleLastPage = () => {
        setCurrentPage(totalPages);
        onPageNumberChange(totalPages);
    }

    const handlePrevPage = (pageNumber) => {
        return () => {
            setCurrentPage(pageNumber);
            onPageNumberChange(pageNumber);
        }
    }

    const handleNextPage = (pageNumber) => {
        return () => {
            setCurrentPage(pageNumber);
            onPageNumberChange(pageNumber);
        }
    }

    const handlePageSizes = (pageSize) => {
        setPageSize(pageSize);
        onPageSizeChange(pageSize, 1);
        setCurrentPage(1);
    }

    const getPaginationRange = (totalPages, currentPage, windowSize = 5) => {
        const half = Math.floor(windowSize / 2);
        let start = currentPage - half;
        let end = currentPage + half;

        if(start < 1) {
            end = end + (1 - start);
            start = 1;
        }
        if(end > totalPages) {
            start = start - (end - totalPages);
            end = totalPages;
        }

        start = Math.max(1, start);
        const pages = [];
        console.log(start, end)
        for(let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }
    const maxPagesList = useMemo(() => {
        return getPaginationRange(totalPages, currentPage);
    }, [totalPages, currentPage]);
    console.log(currentPage)

    return (
        <div>
            <h1>
                Pagination
            </h1>
            <div className="pagination">
                <div className="page-sizes">
                    <select name="pagesizes" onChange={(e) => {
                        handlePageSizes(Number(e.target.value));
                    }}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                    </select>
                </div>
                <div className="btns">
                    <button onClick={handleFirstPage} className={currentPage == 1 ? 'disabled' : ''}>First</button>
                </div>
                <div className="btns">
                    <button onClick={handlePrevPage(currentPage - 1)} className={currentPage == 1 ? 'disabled' : ''}>Prev</button>
                </div>
                <div className="pages-list">
                    {
                        maxPagesList?.map((value, idx) => {
                            return <div className={`page-item ${currentPage == value ? 'selected': ''}`} key={idx} onClick={handleOnPageChange(value)}>
                                {value}
                            </div>
                        })
                    }
                </div>
                <div className="btns">
                    <button onClick={handleNextPage(currentPage + 1)} className={currentPage == totalPages ? 'disabled': ''}>Next</button>
                </div>
                <div className="btns">
                    <button onClick={handleLastPage} className={currentPage == totalPages ? 'disabled': ''}>Last</button>
                </div>
            </div>
            


        </div>
    )
}

export default Pagination