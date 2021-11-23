import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer";
//el primer paso es importarme todo lo que voy a utilizar en el store

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
//exporto todas las cosas que me traje