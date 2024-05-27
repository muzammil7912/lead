import React, { useContext, useEffect, useState, useRef } from "react";
import { CSSTransition } from 'react-transition-group';
import icon from "./output-onlinegiftools.gif"

export default function Privacy() {
    const privacyPoints = [
        'Personal information: We collect personal information such as name and email address for account registration.',
        'Data collection: We may collect non-personal information such as browser type, IP address, and cookies for website analytics.',
        'Data usage: We use the collected information to provide and improve our services, personalize user experience, and communicate with users.',
        'Data sharing: We do not share personal information with third parties, except for legal purposes or with user consent.',
        'Security: We implement security measures to protect user data from unauthorized access or disclosure.',
        'Third-party links: Our website may contain links to third-party websites, and we are not responsible for their privacy practices.',
        'Cookie policy: We use cookies to enhance user experience and track website usage.',
        'Changes to policy: We reserve the right to update or modify the privacy policy. Users will be notified of any significant changes.',
        'Contact: For any privacy-related inquiries or concerns, please contact us using the provided contact information.'
    ];
    return (

        // <div className="container-fluid">
        //     <div className="privacy-page">
        //         <h1>Privacy Policy</h1>
        //         <ul className="privacy-list">
        //             <li>
        //                 <i className="fas fa-check-circle"></i> Personal information: We collect personal information such as name and email address for account registration.
        //             </li>
        //             <li>
        //                 <i className="fas fa-check-circle"></i> Data collection: We may collect non-personal information such as browser type, IP address, and cookies for website analytics.
        //             </li>
        //             <li>
        //                 <i className="fas fa-check-circle"></i> Data usage: We use the collected information to provide and improve our services, personalize user experience, and communicate with users.
        //             </li>
        //             <li>
        //                 <i className="fas fa-check-circle"></i> Data sharing: We do not share personal information with third parties, except for legal purposes or with user consent.
        //             </li>
        //             <li>
        //                 <i className="fas fa-check-circle"></i> Security: We implement security measures to protect user data from unauthorized access or disclosure.
        //             </li>
        //             <li>
        //                 <i className="fas fa-check-circle"></i> Third-party links: Our website may contain links to third-party websites, and we are not responsible for their privacy practices.
        //             </li>
        //             <li>
        //                 <i className="fas fa-check-circle"></i> Cookie policy: We use cookies to enhance user experience and track website usage.
        //             </li>
        //             <li>
        //                 <i className="fas fa-check-circle"></i> Changes to policy: We reserve the right to update or modify the privacy policy. Users will be notified of any significant changes.
        //             </li>
        //             <li>
        //                 <i className="fas fa-check-circle"></i> Contact: For any privacy-related inquiries or concerns, please contact us using the provided contact information.
        //             </li>
        //         </ul>
        //     </div>
        // </div>

        <div className="privacy-page">
            <img src={icon} alt="" />
            <h1 className="page-title">Privacy Policy</h1>

            <ul className="privacy-list">
                {privacyPoints.map((point, index) => (
                    <CSSTransition key={index} classNames="privacy-item" timeout={500}>
                        <li>{point}</li>
                    </CSSTransition>
                ))}
            </ul>
        </div>
    )
}
