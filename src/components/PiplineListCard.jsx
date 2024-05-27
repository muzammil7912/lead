import React from 'react'
import { Link } from 'react-router-dom';
import justcallLogo from '../dist/webImages/justcall-logo.webp';
import config from "../services/config.json";

function PiplineListCard({viewLink, editLink, lists,deletes }) {

  return !lists.message ? (
    lists?.map((items, index) => {
      return (
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6" key={index}>
          <div className="card">
            <div className="card-body text-center ribbon">
              <div className="card_heading">
                <h6 className="mt-3 mb-0">
                  <Link to={`/${config.ddemoss}opp_pipelines/view/${items?.op_id}`}>{items?.opportunity_title}</Link>
                </h6>
              </div>
              <div className="dateBox"><span>Forecast: {items?.forecasted_close_date}</span></div>
              <div className="contactBox"><span>Contact: {items?.opportunity_contact_name}</span></div>
             
              <div className="leadst">
                <ul className="list">
                  <li>
                    <span>New</span>
                  </li>
                  <li>
                    <div>Simone Sales Team1</div>
                  </li>
                </ul>
              </div>
              <div className="mb-1 socialBtn">
              <a href={`mailto:${items?.email}`}>
                  <i className="fa fa-envelope"></i>
                </a>
                &nbsp;
                <a to={`tel:${items?.number}`}>
                  <i className="fa fa-phone"></i>
                </a>
                &nbsp;
                <a href={`sms:${items?.number}`}>
                  <i className="fa fa-mobile"></i>
                </a>
                &nbsp;
                <a href={`https://api.whatsapp.com/send?phone=${items?.number}`} target={"_blank"}>
                  <i className="fa fa-whatsapp"></i>
                </a>
                &nbsp;
                <a
                   href={`https://justcall.io/app/macapp/dialpad_app.php?numbers=&${items?.number};`}
                  target={"_blank"}
                ><img alt="" src={justcallLogo} style={{ width: '15px' }} />
                </a>
              </div>
             
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div>No Data</div>
  );
}

export default PiplineListCard