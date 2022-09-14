import React, { useEffect } from "react";


const DashboardTableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (


    <div className="intro-y flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-3">
        <nav className="w-full sm:w-auto sm:mr-auto">
            <ul className="pagination">
                {range.map((el, index) => (
                        <li
                            key={index}
                            className={`${
                                page === el ? "page-item active" : "page-item"
                            }`}
                            onClick={() => setPage(el)}
                            
                            >
                            <a className="page-link" href="#">{el}</a>
                        </li>
                ))}
                </ul>
                </nav>
                
            </div>

  );
};

export default DashboardTableFooter;