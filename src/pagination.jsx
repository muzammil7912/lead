
import React, { useState, useEffect } from "react";
import { Pagination } from 'antd';



const Pagination2 = ({ postsPerpage, totalpost, paginate }) => {
    const [state, setstate] = useState(false)
    // console.log(state);
    useEffect(() => {
        setstate(totalpost)
    }, [totalpost])

    const onShowSizeChange = (pageNumber, pageSize) => {
        // console.log(pageNumber, pageSize)
        postsPerpage(pageSize)
    };


    return (
        <>

            {state && <Pagination
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                onChange={(event) => paginate(event)}
                total={state}
                defaultPageSize={15}
                pageSizeOptions={[10, 15, 20, 50, 100]}
                defaultCurrent={1}
            />}
        </>
    )
}

// const Pagination = ({ postsPerpage, totalpost, paginate }) => {
//     const [state, setState] = useState(1);
//     const pageNumber = [];

//     for (let i = 1; i <= Math.ceil(totalpost / postsPerpage); i++) {
//         pageNumber.push(i)s
//     }
//     return (
//         <nav className='pagination'>
//             {pageNumber.map(number => (
//                 <li key={number} className="page-item" onClick={() => setState(number)} >
//                     <a onClick={() => paginate(number)}
//                         style={{
//                             backgroundColor: state == number ? ' #00A9BD' : 'white',
//                             color: state == number ? "#fff" : "black"
//                         }} className='page-link'>{number}</a>
//                 </li>
//             ))}
//         </nav>
//     )
// }



export { Pagination, Pagination2 };