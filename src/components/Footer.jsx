import React from 'react';
import { Link }  from 'react-router-dom';

function Footer() {
  return (
    <footer id='footer-sec' className="footer">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 col-sm-12">The Sales Journey</div>
                <div className="col-md-6 col-sm-12 text-right">
                    <ul className="list-inline mb-0">
					    <li className="list-inline-item"><Link to={"/"}>Privacy</Link></li>
                        <li className="list-inline-item"><Link to={"/"}>About us</Link></li>                        
                    </ul>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer