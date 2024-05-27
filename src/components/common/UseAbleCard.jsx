import React from "react";
import { Link } from "react-router-dom";

export default function UseAbleCard({viewLink, editLink, data  }) {
  return !data.message ? (
    data?.map((items, index) => {
      return (
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6" key={index}>
          <div className="card">
            <div className="card-body text-center ribbon">
              <div className="card_img">
                <img
                  className="rounded-circle img-thumbnail w100"
                  src={items.A}
                  alt=""
                />
              </div>
              <div className="card_heading">
                <h6 className="mt-3 mb-0">
                  <Link to={`${viewLink}${items?.id}`}>{items.fullname}</Link>
                </h6>
                <span>&nbsp;</span>
              </div>
              <div className="emailBox">
                <span>{items.email}</span>
              </div>
              <div className="emailBox">
                <span>{items.number}</span>
              </div>
              <span className="numberBox">&nbsp;</span>
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
                <Link to="mailto:SimoneJan02-1@email.com">
                  <i className="fa fa-envelope"></i>
                </Link>{" "}
                &nbsp;
                <Link to="tel:">
                  <i className="fa fa-phone"></i>
                </Link>{" "}
                &nbsp;
                <Link to="sms:&nbsp;">
                  <i className="fa fa-mobile"></i>
                </Link>{" "}
                &nbsp;
                <Link to="https://api.whatsapp.com/send?phone=" target={"_blank"}>
                  <i className="fa fa-whatsapp"></i>
                </Link>{" "}
                &nbsp;
                <Link
                  to="https://justcall.io/app/macapp/dialpad_app.php?numbers=&nbsp;"
                  target={"_blank"}
                >
                  {" "}
                  <img alt="" src="./react_lead/assets/images/justcall-logo.webp" />{" "}
                </Link>
              </div>
              <div className="editdetabtn">
                <Link
                  to={`${editLink}${items.id}`}
                  className="btn btn-default btn-sm"
                >
                  <i className="fa fa-edit"></i> Edit
                </Link>
                <div
                  className="btn btn-default btn-sm Dlt_leadid"
                  data-id="170"
                >
                  <i className="fa fa-trash-o"></i>Delete
                </div>
              </div>
              <div className="row text-center mt-4 leadbot">
                <div className="col-6 border-right">
                  <label className="mb-0">LEAD STAGE</label>
                  <h4 className="font-16">New </h4>
                </div>
                <div className="col-6">
                  <label className="mb-0">SCORE NUMBER</label>
                  <h4 className="font-16">{items.score_number}</h4>
                </div>
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
