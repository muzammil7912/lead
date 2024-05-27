import React,{useEffect,useContext} from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Link, useParams } from "react-router-dom";
import Tooltip from 'react-bootstrap/Tooltip';
import Loader from "./components/common/Loading";
import useFetch from "./customHooks/useFetch";
import { MainHeadingContext } from "./context/MainHeadingContext";
import Item from "antd/es/list/Item";

function UserView() {
    const { id } = useParams();
    const { addHeading } = useContext(MainHeadingContext)
    const { data: UserData, loading, error } = useFetch("", `getViewUserContact/${id}`);
    useEffect(() => {
        addHeading(`User`);
      }, []);
    
    if(loading) return <Loader />;
    let userdatas = UserData[0]
  return (
    <div className="section-body mt-4">
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12">
            <div className="card card-profile box_shadow">
              <div className="card-body text-center">
                <img
                  className="card-profile-img"
                  src="./media/https://s.gravatar.com/avatar/9e3ab2e77194b18efb03f07e8a540ec0?s=200&amp;r=pg&amp;d=identicon"
                  alt=""
                />
                <h4 className="mb-0">{userdatas?.f_name} {userdatas?.l_name}</h4>
                <p>({userdatas?.role_name})</p>
                <div>
                  <p>
                    <i className="fa fa-envelope"></i> {userdatas?.email}
                  </p>
                </div>
                <ul className="social-links list-inline mb-3 mt-2">
                  <li className="list-inline-item">
                    <OverlayTrigger
                      placement={"top"}
                      overlay={<Tooltip id={`tooltip-top`}>Facebook</Tooltip>}
                    >
                      <Link>
                        <i className="fa fa-facebook"></i>
                      </Link>
                    </OverlayTrigger>
                  </li>
                  <li className="list-inline-item">
                  <OverlayTrigger
                      placement={"top"}
                      overlay={<Tooltip id={`tooltip-top`}>Twitter</Tooltip>}
                    >
                      <Link>
                        <i className="fa fa-twitter"></i>
                      </Link>
                    </OverlayTrigger>
                  </li>
                  <li className="list-inline-item">
                  <OverlayTrigger
                      placement={"top"}
                      overlay={<Tooltip id={`tooltip-top`}>Phone</Tooltip>}
                    >
                      <Link>
                        <i className="fa fa-phone"></i>
                      </Link>
                    </OverlayTrigger>
                  </li>
                  <li className="list-inline-item">
                  <OverlayTrigger
                      placement={"top"}
                      overlay={<Tooltip id={`tooltip-top`}>@skypename</Tooltip>}
                    >
                      <Link>
                        <i className="fa fa-skype"></i>
                      </Link>
                    </OverlayTrigger>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserView;
