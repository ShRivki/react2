import  * as actiontype from './actions'
const initialState = {
    recipes: []
}
const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actiontype.GET_RECIPES:
            return { ...state, recipes: action.data }
        case actiontype.ADD_RECIPE: {
            const recipes = [...state.recipes];
            recipes.push(action.data);
            return { ...state, recipes}
        }
        case actiontype.EDIT_RECIPE: {
            const recipes = [...state.recipes];
            const findIndex = recipes.findIndex(x => x.Id === action.data.Id);
            recipes[findIndex] = action.data;
            return { ...state, recipes }
}
        case actiontype.DELETE_RECIPE: {
            const recipes=state.recipes.filter(x=>x.Id!==action.data)
            return { ...state ,recipes}
        }
        default: return { ...state }
    }
}

export default recipeReducer;