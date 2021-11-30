import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; //uso hooks
import { getAllRecipes, orderByScore, orderByAlphabetics, setFilterByDietTypes } from "../actions";
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import Card from "./Card";
import Paged from "./Paged";
import SearchBar from "./SearchBar"
import styles from "../styles/Home.css"

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

    //creo una constante para el uso de los filtros
const [order, setOrder] = useState("");

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

//ahora voy a ver los filtros
//el primero filtro es el ascendente y descendente en este caso por score
function handleOrderByScore(e){
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
}

//vamos a poner el segundo filtro, que me ordene alfabeticamente
function handleOrderByAlpha(e){
    e.preventDefault();
    dispatch(orderByAlphabetics(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
}

//por ultimo hago el filtro que me hace por tipo de dieta
function handleFilterByDietType(e){
                
    dispatch(setFilterByDietTypes(e.target.value));
}

//renderizamos la pagina
  return(//empezamos con un div que envuelva todo
      <div className="home">
       <div className="principal"> 
      <h1 className="tituloHome">App. Food!</h1>
      <img className="imgPrincipal" src="https://i.pinimg.com/originals/ca/3c/2c/ca3c2c184846ed27a5637476b3977087.png" alt=""/>
     <SearchBar className="busqueda"/> 
       </div>
       <div className="secundaria1">
      <div className="secundaria">
      <button className="refresh" onClick={e => {handleClick(e)}}>
          Refresh all Recipes
      </button>    
      <Link to = "./recipe">Create Recipe</Link>
      </div>
      </div>
      <div className="Filtros1">
      <div className="Filtros">
      <select className="filtro1" onChange={e => handleOrderByScore(e)}>
                  <option value="all">Order by Score</option>
                  <option value="asc">Ascendente</option>
                  <option value="desc">Descendente</option>
      </select> 
      <select className="filtro2" onChange={e => handleOrderByAlpha(e)}>
                  <option value="all">Order Alphabetically</option>
                  <option value="A-Z">Order from A to Z</option>
                  <option value="Z-A">Order from Z to A</option>
      </select> 
      <select className="filtro3" onChange={e => handleFilterByDietType(e)}>
                  <option value="all">Order by Diet Type</option>
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
      </div>  
      <nav className="inicio">
          <img className="fotoInicio"
           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Hr5bn_7abkxYEC66gzGJPipt8eqIUC548A&usqp=CAU" alt=""/>
        <h4 className="tituloInicio">It can be said that healthy eating is one that provides the nutrients that the body 
        needs to maintain the proper functioning of the body, preserve or restore health, minimize the risk of diseases,
        guarantee reproduction, pregnancy, lactation, development and proper growth.</h4>
        <img className="logo"
           src="https://i.pinimg.com/originals/ca/3c/2c/ca3c2c184846ed27a5637476b3977087.png" alt=""/>
      </nav>   
      <nav>
        <img className="imagenRight" src="https://st2.depositphotos.com/7781012/46757/v/1600/depositphotos_467570020-stock-illustration-vegan-food-concept-flat-groceries.jpg" alt=""/>
          </nav>  
      <span className="fotos">
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
      <Paged className="paged"
              recipesPerPage={recipesPerPage} 
              allRecipes={allRecipes.length} 
              paginado={paginado} />
      </div>
  )
}
