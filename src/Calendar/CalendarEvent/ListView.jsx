import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import config from "../../services/config.json";
import ReactPaginate from 'react-paginate';
function Items({deletes, currentItems}) {
  const navigate = useNavigate();
  const handleClick = (e,item,item2,item3) => {
    e.preventDefault()
    localStorage.setItem("parentId", item3 ?? "00" )
    localStorage.setItem("ChildId", "00")
    navigate(`${item === "meeting" ? `/${config.ddemoss}meeting/edit/${item2}` : `/${config.ddemoss}calendar/editevent/${item2}`}`);
  }
  return (
    <div className="row clearfix cl-li calendar_eventslist">
      <div className="eventtop">
        <div></div>
        <div>TITLE</div>
        <div>OWNER</div>
        <div>TYPE</div>
        <div>PIPELINE</div>
        <div>START DATE</div>
        <div></div>
      </div>

      {currentItems.message ? <h4>No Data</h4> : currentItems.map((item, index) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const months2 = {"Jan":"01", "Feb":"02", "Mar":"03", "Apr":"04", "May":"05", "Jun":"06", "Jul":"07", "Aug":"08", "Sep":"09", "Oct":"10", "Nov":"11", "Dec":"12"};
        let start_date = new Date(item?.start_date)
        let signDay = "";
        let signMonth = "";
        let signYear = "";
        if (start_date) {
          signMonth = months[start_date.getMonth()]
          signDay = start_date.getDate()
          signYear = start_date.getFullYear()
        }
        let dat = item.start_date.split(" ")
        return (
          <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <div className="card _projects_">
              <div className="card-body">
                <div className="eventbottom">
                  <div className="avimg">
                    <span className="avatar avatar-sm" style={{ "background": "#00aabb" }}></span>
                  </div>
                  <div className="avtitle"><div>{item.event_title}</div></div>


                  <div className="row calendar_eventslistBox">
                    <div className="col-5 py-1 calendar_eventslistBox1">
                      <strong>OWNER:</strong>
                    </div>
                    <div className="col-7 py-1">
                      {item?.username && item?.username.split('_')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </div>
                  </div>
                  <div className="row calendar_eventslistBox">
                    <div className="col-5 py-1 calendar_eventslistBox1">
                      <strong>TYPE:</strong>
                    </div>
                    <div className="col-7 py-1">
                      {item?.event_type && item?.event_type.split('_')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </div>
                  </div>
                  <div className="row calendar_eventslistBox">
                    <div className="col-5 py-1 calendar_eventslistBox1">
                      <strong>PIPELINE:</strong>
                    </div>
                    <div className="col-7 py-1">
                      {item?.pipeline_title}
                    </div>
                  </div>
                  <div className="row calendar_eventslistBox">
                    <div className="col-5 py-1 calendar_eventslistBox1">
                      <strong>START DATE:</strong>
                    </div>
                    <div className="col-7 py-1">
                      {item?.start_date && `${signMonth} ${signDay > 9 ? signDay : `0${signDay}`}, ${signYear}`}
                    </div>
                  </div>
                  <nav aria-label="Page navigation  example" className="calendar_eventslistBox_nav float-right">
                    <ul className="pagination mb-0">
                      <li className="page-item"><Link className="page-link" to={`/${config.ddemoss}${item.event_type === "meeting" ? `meeting/edit/${item?.event_db_id}` : `view/event/${item?.event_db_id}`}`} data-toggle="tooltip" title=""><i className="fa fa-eye"></i></Link></li>
                      <li className="page-item">
                        <Link className="page-link"
                       onClick={(e) => handleClick(e,`${item.event_type}`,`${item?.event_db_id}`,`${dat[2]+months2[dat[1]]+dat[0]}`)}
                      data-toggle="tooltip" title=""><i className="fa fa-pencil"></i></Link></li>
                      <li className="page-item"><Link className="page-link" onClick={() => deletes(item)} data-toggle="tooltip" title="Delete"><i className="fa fa-trash"></i></Link></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )
      })
      }
    </div>
  )

}

export default function ListView({ dataa, deletes }) {

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  // const [currentItems, setCurrentItems] = useState('')
  // const [pageCount, setPageCount] = useState('');

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)



  const endOffset = itemOffset + 6;
  const setCurrentItems = Array.isArray(dataa) && dataa?.slice(itemOffset, endOffset);
  const setPageCount = Array.isArray(dataa) && Math?.ceil(dataa?.length / 6);

  // Invoke when user click to request another page.



  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % dataa?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    // setCurrentItems(newOffset)
  };

  return (
    <>
      <Items
        currentItems={setCurrentItems}
        deletes={deletes}
      />
      {/* <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={setPageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        activeClassName={'active'} /> */}
    </>
  );
}