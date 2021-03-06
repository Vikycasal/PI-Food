import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import { getDetail } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Detail.css";
//terminada la accion y el reducer, hago las importaciones correspondientes
//y comienzo con la funcion
function Detail(props) {
        
        const dispatch = useDispatch();
        useEffect(() =>{
                dispatch(getDetail(props.match.params.id))
        },[dispatch, props.match.params.id])
        //de esta forma yo accedo al id del que estoy buscando
        const recipe = useSelector((state) => state.detail)
 //ahora si, me tengo que traer la receta a mi estado

//renderizo todo
        return (
                <div className="detalle">
                        {
               recipe.length > 0 ? 
               <div>                                
                 <h1 className="nombrereceta">Detail of our Recipes</h1>
                 <h2 className="nombrereceta">{recipe[0].name}</h2>
                 <div className="img">
                 <img className="imgReceta" src={recipe[0].image} alt="" width="300px" height="300px"/>
                 </div>
                 <p className="resume">Resume: {recipe[0].resume.replace(/<[^>]*>?/g, '')}</p>
                 <h5 className="typeofdiet">Type of Diet: {!recipe[0].createdInDb ? recipe[0].diets?.map((diet) => diet) : recipe[0].DietTypes.map((diet) => diet.name)}</h5>
                 <h5 className="score">Score: {recipe[0].score}</h5>
                 <h5 className="healthylevel">Healthy Level: {recipe[0].healthylevel}</h5>
                 <p className="steps">Step by Step {!recipe[0].createdInDb ? recipe[0].stepByStep?.map((step) => step) : recipe[0].stepbystep}</p>
                 <Link to = '/home'>
                 <button className="atras">Go back</button>
                 </Link>
                </div> : <p>Loading....</p>
                        }
                </div>
        )
}

export default Detail