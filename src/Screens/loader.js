import React from 'react'
import { Hypnosis } from "react-cssfx-loading";
export default function User() {
    require("../styles/loader.css");
    require("../styles/Registration-login.scss");

    return (
        <body>
            <div className="backimage"></div>
            <div >
                <Hypnosis className="Hypnosis" center color="#FF0000" width="100px" height="100px" duration="2s" />
            </div>
        </body>
    )
}
