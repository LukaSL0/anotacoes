import { useState } from "react";

export default function Pagination({ children }) {
    const [currentPage, setCurrentPage] = useState(1);
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    if  (window.innerWidth > "550") {
        var itemsPerPage = 5;
    } else if (window.innerWidth < "550") {
        // eslint-disable-next-line
        var itemsPerPage = 10;
    }
  
    return (
      <>
        {children.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )}
        <div className="pagination-controls">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          ><i className="fa-solid fa-angle-left" /></button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(children.length / itemsPerPage)}
          ><i className="fa-solid fa-angle-right" /></button>
        </div>
      </>
    );
}