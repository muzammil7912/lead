import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { MainAuthPermissionsContext } from "../../context/MainAuthPermissionsContext";
import justcallLogo from '../../dist/webImages/justcall-logo.webp';
import config from "../../services/config.json";

function CardList({viewLink, editLink, lists }) {
  const { permissions } = useContext(MainAuthPermissionsContext);
  const handleError = (e) => {
    if(permissions ["system-default-avatar-image"]?.setting_value) {
      e.target.src = `${config.baseurl2}${permissions ["system-default-avatar-image"]?.setting_value}`

    }
    else {
      e.target.src = `https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160`
    }
  } 
  return !lists.message ? (
    lists?.map((items, index) => {
      return (
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6" key={index}>
          <div className="card">
            <div className="card-body text-center ribbon">
            <div className="starBox">
             <Link  className="mail-star"><i className="fa fa-star"></i></Link>
              </div>
              <div className="card_img">
              <img  className="rounded-circle img-thumbnail w100" onError={handleError}
                src={items?.avatar && items?.avatar.includes("http") ? items?.avatar : `${config.baseurl2}${items?.avatar}`} 
                alt=""
                />
              </div>
              <div className="card_heading">
                <h6 className="mt-3 mb-0">
                  <Link to={`${viewLink}${items.leadid}`}>{items.fullname}</Link>
                </h6>
                <span>{items?.number?items?.number:""}</span>
              </div>
              <div className="emailBox">
                <span>{items?.email}</span>
              </div>
              <div className="leadst">
                <ul className="list">
                  <li>
                    <span>{items?.name}</span>
                  </li>
                  <li>
                    <span>{items?.uname}</span>
                  </li>
                </ul>
              </div>
              <div className="mb-1 socialBtn gap-2 justify-content-center">
                <a href={`mailto:${items?.email}`}>
                  <i className="fa fa-envelope"></i>
                </a>
                <a href={`tel:${items?.number}`}>
                  <i className="fa fa-phone"></i>
                </a>
                <a href={`sms:${items?.number}`}>
                  <i className="fa fa-mobile"></i>
                </a>
                <a href={`https://api.whatsapp.com/send?phone=${items.number}`} target={"_blank"}>
                  <i className="fa fa-whatsapp"></i>
                </a>
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

export default CardList;
