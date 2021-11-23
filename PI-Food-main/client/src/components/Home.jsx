import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; //uso hooks
import { getAllRecipes } from "../actions";
import { Link } from "react-router-dom";
import { Card } from "./Card";
import {NavLink} from 'react-router-dom';

export default function Home () {

    const dispatch = useDispatch(); //esto lo hago basicamente para ir despachando mis acciones y usarlas
    // const allRecipes = useSelector((state) => state.recipe)


    //vamos a traernos las recetas del estado
    //para eso utilizamos un useEffect
    useEffect (() => {
        dispatch(getAllRecipes()); //esto es lo mismo que hacer el map.dispatch.toprops
    }, [dispatch]) //lo que se incluye en el arreglo lo que depende el componente de arriba
  //fijarse si va o no lleno el array

   //para que el boton de Refresh all Recipe ande tengo que pasarle un handleClick
   //sino no puede devolverme la accion que le estoy pidiendo
   function handleClick(e) {
       e.preventDefault(); //le paso un evento para que no se rompa
       dispatch(getAllRecipes());
    }

//renderizamos la pagina
  return(//empezamos con un div que envuelva todo
      <div>
      <h1>All of Our Recipes!</h1>
      <div className="Filtros">
      <select>
                  <option value="asc">Ascendente</option>
                  <option value="desc">Descendente</option>
      </select> 
      <select>
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
      </select> 
      <select>
                  <option value="gluten free">Gluten Free</option>
                  <option value="dairy free">Dairy Free</option>
                  <option value="lacto ovo vegetarian">Lacto ovo Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="paleolithic">Paleolithic</option>
                  <option value="primal">Primal</option>
                  <option value="pescatarian">Pescatarian</option>
                  <option value="fodmap friendly">Fodmap Friendly</option>
                  <option value="whole 30">Whole 30</option>
      </select>
      </div>
      <Link to = "./recipe">Create Recipe</Link>
      <button onClick={e => {handleClick(e)}}>
          Refresh all Recipes
      </button>
      </div>
  )

}