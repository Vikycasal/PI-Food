import React from "react";
import styles from "../styles/Cards.css";
//importo lo que necesito

//exporto lo que necesito mostrar
export default function Card({image, name, diet}){
    //y lo renderizo    
    return(
      <div className="cards">
              <h4>{name}</h4>
              <img className="imagen" src={image} alt="" width="200px" height="200px"/>
              <h6>{diet ? diet : <h6>Withouth categories</h6>}</h6>
              <div>
                   <h3>Show Recipe</h3>
              </div>                           
      </div>
        );
}