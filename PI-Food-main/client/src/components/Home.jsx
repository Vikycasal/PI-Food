import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; //uso hooks
import { getAllRecipes } from "../actions";
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import Card from "./Card";
import Paged from "./Paged";

export default function Home () {
//esto lo hago basicamente para ir despachando mis acciones y usarlas
    const dispatch = useDispatch(); 
    const allRecipes = useSelector((state) => state.recipes)
//esto es lo mismo que hacer el map.state.to.props
//tener en cuenta como tengo escrito el estado asi no me cometa errores al traermelos
//vamos a crear el paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
//guardame en un estado local la pagina actual, y una que me lo setee, por eso es 1
//en otro estado local, cuantos quiero que aparezcan, quiero 9 segun readme
    const indexOfLastRecipe = currentPage * recipesPerPage // 9
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage // 0
//y lo ultimo que voy a hacer 
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
    //los personajes que van a estar en la pagina actual
    //guarda todas las recetas que tengo por paginas
    //el slice agarra un arreglo y o va cortando dependiendo lo que yo voy pasandole por parametro

 //y por ultimo creo la constante del paginado
 //esta es la que me va a ayudar al renderizado
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

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
       <Paged recipesPerPage={recipesPerPage} 
              allRecipes={allRecipes.length} 
              paginado={paginado} />
      <Link to = "./recipe">Create Recipe</Link>
      <button onClick={e => {handleClick(e)}}>
          Refresh all Recipes
      </button>
      <span>
        {currentRecipes?.map(element => {
            return(   
         <div>
          <NavLink to={'/recipes/' + element.id}>
               <Card image={element.image} name={element.name} diet={element.createdInDb ? element.DietTypes.map((dt) => dt.name) : element.diets}  key={element.id}/>  
          </NavLink>
         </div>
            );
         })}
      </span> 
      </div>
  )
}
