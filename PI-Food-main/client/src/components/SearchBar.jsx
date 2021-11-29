import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipe } from "../actions";
import styles from "../styles/SearchBar.css";

export default function SearchBar () {
    const dispatch = useDispatch()

    //vamos a crear un estado local
    const [name, setName] = useState("") //lo seteo en un string vacio

//vamos a crear las funciones
//la primera que me guarda en el estado local lo que va apareciendo en el buscador
 function handleInputChange(e){
     e.preventDefault()
     setName(e.target.value)
     console.log(name)
 }
 //y luego tengo que pasarla al input

 //y ahora tengo que crear la funcion del boton
 function handleSubmit(e) {
     e.preventDefault()
     dispatch(getNameRecipe(name))
 } //el name pasa a ser el estado local
 //es lo que esta escribiendo el usuario


    //vamos a renderizar
    return (
        <div className="buscador"> 
            <input
            className="barra"
            type = "text"
            placeholder = "Search your recipe"
            onChange = {(e) => handleInputChange(e)} 
            />
            <button 
            className="botonB"
            type = "submit"
            onClick = {(e) => handleSubmit(e)}
            >Go!</button>
        </div>
    )
}