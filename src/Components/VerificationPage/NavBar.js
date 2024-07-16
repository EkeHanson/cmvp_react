import React, { useState } from "react";
import './Css/Main.css';

import Logo1 from './Img/logo1.png';
import Logo2 from './Img/logo2.png';
import Globe from './Img/Globe.svg';
import Globe1 from './Img/Globe1.svg';

export default function NavBar() {

    return (
        <nav className="Site_Nav">
            <div className="Nav-Content">
                <a href="#" className="NavLogo">
                    <img src={Logo1} className="Logo_1"></img>
                    <img src={Logo2} className="Logo_2"></img>
                </a>
                <ul className="Nav_Ul">
                    <li><a href="#"><img src={Globe} className="GlobeIcon_1"></img> <img src={Globe1} className="GlobeIcon_2"></img>  <span>Company website</span></a></li>
                    <li><a href="#" className="support_btn">Support</a></li>
                </ul>
            </div>
        </nav>
    )

}