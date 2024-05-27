import React, { useContext, useEffect, useState, useRef } from "react";
import { CSSTransition } from 'react-transition-group';
import icon from "./output-onlinegiftools.gif"

export default function Conditions() {
    const termsPoints = [
        'By using this website, you agree to the terms and conditions outlined below.',
        'You must be at least 18 years old to use this website.',
        'The content on this website is for informational purposes only and should not be considered as professional advice.',
        'We reserve the right to modify or update these terms and conditions at any time.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'Any unauthorized use of this website may result in legal consequences.',
        'We do not guarantee the accuracy or completeness of the information on this website.',
        'Links to third-party websites are provided for convenience, and we are not responsible for their content or practices.',
        'Your use of this website is at your own risk.',
    ];
    return (
        <div className="privacy-page">
            <img src={icon} alt="" />
            <h1 className="page-title">Terms and Conditions</h1>
            <ul className="privacy-list">
                {termsPoints.map((point, index) => (
                    <CSSTransition key={index} classNames="privacy-item" timeout={500}>
                        <li>{point}</li>
                    </CSSTransition>
                ))}
            </ul>
        </div>
    )
}
