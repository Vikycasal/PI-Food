//creo el estado inicial
const initialState = {
   recipes : [],
   allRecipes : []
}

//1
function rootReducer (state = initialState, action){
  switch(action.type) {
    case "GET_RECIPES":
        return{
                ...state,
                recipes: action.payload,
                allRecipes : action.payload
          }
          default:
            return state;
  }
}

export default rootReducer;