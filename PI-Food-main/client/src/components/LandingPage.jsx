import React from "react";
import { Link } from "react-router-dom";

//importo lo que voy a utilizar

export default function LandingPage(){
    return(
        <div>
            <h1>Enjoy our Menu-Food</h1>
            <Link to = "/home">
                <button>Go on!</button>
            </Link>
        </div>
    )
}