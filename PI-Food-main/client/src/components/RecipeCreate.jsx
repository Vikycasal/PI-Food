import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {postRecipe, getRecipeType} from '../actions/index';
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/RecipeCreate.css";

function RecipeCreate() {
        const dispatch = useDispatch();
        const types = useSelector((state) => state.recipeTypes)
        //el history y history.push, es basicamente lo que hace para redirigirme a la ruta que yo le diga
        const history = useHistory();
        //me creo una constante para poder hacer la validacion
        const [err, setErr] = useState({});//va a ser un objeto vacio
        //al bloquear el boton, hay campos que son requeridos y si no se llenan no te deja
        //crear la receta
        //tambien para poder bloquear el boton
        const [btnSend, setBtnSend] = useState(false);
       //la validacion tmb se haria desde el back, es mas correcto hacerlo de los dos lados y que no se rompa
    //y por fuera de todo lo que vine haciendo voy a crear la validacion del formulario
        /****control de errores */
        function validar(input){
                let err = {};
                if(!input.name){
                        err.name="You must insert a name";
                        setBtnSend(false);
                }else if(!input.resume){
                        err.resume="You must insert a Resume";
                        setBtnSend(false);
                }else{
                        setBtnSend(true);
                }
                return err;
        }    //tengo que renderizar el formulario y poder guardarlo en un estado
        const [input, setInput] = useState({
                name: "",
                score:"",
                healthylevel:"",
                resume: "",
                stepbystep:"",
                image:"",
                diets:[],
        })
//vamos a empezar a aplicar logicas
//cada vez que yo cambie mis input no se vayan cambiando
//quiero ir guardando lo que el usuario va a ir escribiendo
        function handleChange(e){
                setInput({
                        ...input,
                        [e.target.name]: e.target.value,
                })
                
                setErr(validar({
                        ...input,
                        [e.target.name]: e.target.value,
                }))
                
        }

//cada vez que ejecutes esta funcion, ademas de lo que tiene agregale lo que se va modificando

//como este se porta de forma distinta tengo que usar otra funcion

        function handleSelect(e){
               
                setInput({
                        ...input,
                        diets: [...input.diets, e.target.value],
                })
        }
//es la que se utiliza para los tipos de dieta
//traeme lo que ya habia y concatenale lo que yo te estoy seleccionando ahora
//hago como una lista

//por ultimo me falta el submit
        function handleSubmit(e){
                e.preventDefault();
                if(!input.diets.length){
                        return alert("You must insert diet type")
                }else{
                    if(!input.image) input.image="https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png"
                    dispatch(postRecipe(input));
                    alert("Recipe created!")
                    setInput({
                          name: "",
                          score:"",
                          healthylevel:"",
                          resume: "",
                          stepbystep:"",
                          image:"",
                          diets:[],  
                        })
                        history.push('/home');
                }
        }
        
        useEffect(() => {
                dispatch(getRecipeType());
        },[dispatch]);

        //para poder ir eliminando si tengo ganas, con el botton X u otro hago un handleDelete
function handleDelete(el) {
    setInput({
        ...input,
        types: input.types.filter(t => t !== el)
    })
}
 //lo renderizo       
        return (
         <div className="crearReceta">
          <div>
            <h1>Create a New Recipe</h1>
            <form className="formulario" onSubmit={(e) => handleSubmit(e)}>
            <div className="form1">
            <label>Name:</label>
            <input className="casilla1" type="text" value={input.name} name="name"onChange={(e) => handleChange(e)}/>
             {
             err.name && (
             <p>{err.name}</p>
                         )
             }
             </div>
             <div className="form2">
             <label>Score:</label>
             <input className="casilla2" type="text" value={input.score} name="score"onChange={(e) => handleChange(e)}/>
             </div>
             <div className="form3">
             <label>Healthy Level:</label>
             <input className="casilla3" type="text" value={input.healthylevel} name="healthylevel"onChange={(e) => handleChange(e)}/>
             </div>
             <div className="form4">
             <label>Resume:</label>
             <input className="casilla4" type="text" value={input.resume} name="resume"onChange={(e) => handleChange(e)}/>
             {
             err.resume && (
             <p>{err.resume}</p>
                           )
             }
             </div>
             <div className="form5">
             <label>Steps:</label>
             <input className="casilla5" type="text" value={input.stepByStep} name="stepByStep" onChange={(e) => handleChange(e)}/>
             </div>
             <div className="form6">
             <label>Image:</label>
             <input className="casilla6" type="text" value={input.image} name="image" onChange={(e) => handleChange(e)}/>
             </div>
              <div className="form7">
             <label>Type of Diet:</label>
              <select className="casilla7" onChange={(e) => handleSelect(e)} name="diets">
              {
             types.map((t) => (
             <React.Fragment key={t.id}>
             <option value={t.name} key={t.id}>{t.name}</option>
             </React.Fragment>
                             ))                       
                   }
             </select>
             </div>
             <div>
             <div>
             <button className="crear" type="submit" disabled={!btnSend}>Create Recipe</button>
             </div>
             <div>
             <Link to='/home'><button className="volver">Go back</button></Link>
             </div>
             </div>
             </form>
             </div>
             </div>
        )
}

export default RecipeCreate