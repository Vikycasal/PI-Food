//vamos a ir creando mi archivo de acciones

import axios from "axios";


//vamos a poner las acciones que voy a necesitar para mi home

//la primera funcion que creo la hago para traerme todas las recetas desde el back
//genero la primera conexion entre el back y el front
//1
export function getAllRecipes(){
    return async function(dispatch) {
        var json = await axios.get("http://localhost:3002/recipes");
        return dispatch({
            type: "GET_RECIPES",
            payload: json.data
    })
    }
}

