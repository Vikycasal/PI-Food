import React from "react";

//me traigo las propiedades del otro componente
export default function Paginado ({recipesPerPage, allRecipes, paginado}){
    const pageNumber = []
    //declaro un arreglo vacio

    for ( let i = 0; i<Math.ceil(allRecipes/recipesPerPage); i++ ){
        pageNumber.push(i + 1)
    } //lo pusheo en mi arreglo de numeros
//este va a ser el componente que me lo renderice todo
    return(
<nav>
    <ul>
       { pageNumber && pageNumber.map(number => (
           <li key={number}>
           <button onClick={() => paginado(number)}>{number}</button>
           </li>
    ))}    
    </ul>
</nav>
    )
}