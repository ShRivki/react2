import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './userReducer'
import shoppingListReducer from './shoppingListReducer'
import { thunk } from 'redux-thunk'
import recipeReducer from "./recipeReducer"
import categoryReducer from './categoryReducer'

const reducers = combineReducers({

    shoppingList: shoppingListReducer,
    user: userReducer,
    categories: categoryReducer,
    recipes: recipeReducer
})
export const store = createStore(reducers, applyMiddleware(thunk));