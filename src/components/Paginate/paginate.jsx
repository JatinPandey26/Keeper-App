import React from 'react'
import ReactPaginate from 'react-paginate'
import './paginate.css'


const Paginate = ({pageCount,changePage}) => {
    
    return (
        <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName = {"paginationBttns"}
        previousLinkClassName = {"prevBttn"}
        nextLinkClassName = {"nextBttn"}
        disabledClassName = {"paginationDisabled"}
        activeClassName = {"paginationActive"}
        >

        </ReactPaginate>
    )
}

export default Paginate