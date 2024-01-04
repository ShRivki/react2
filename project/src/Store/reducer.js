import axios from "axios";
import { getRecipes, getCtegory } from './actions'
import * as actiontype from './actions'
import Swal from "sweetalert2";
const initialState = {
    userId: null,
    recipes: [],
    selected: null,
    shoppingList:[],

}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actiontype.GET_SHOPPING_LIST:axios.get(`http://localhost:8080/api/bay/${state.userId}`).then(data=>{
          state.shoppingList=[...data.data];
        }).catch(()=>{})
        return { ...state };
        case actiontype.ADD_SHOPPING_LIST:
           return
        case actiontype.LOG_OUT: return { ...state, userId: null, selected: null, recipes: [] }
        case actiontype.LOG_IN: return { ...state, userId: action.UserId }
        case actiontype.GET_RECIPES: const recipes = [...state.recipes];
            recipes.push(action.recipe);
            return { ...state, recipes: recipes };
        case actiontype.ADD_RECIPE: axios.post(`http://localhost:8080/api/recipe`, action.add)
            .then((x) => { Swal.fire({
                position: "top",
                icon: "success",
                title: " yey 🤤 המתכון נוסף!",
                showConfirmButton: false,
                timer: 1500
              }) }).catch(() => Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "הופסת מתכון נכשלה",
                footer: '<a href="#">חזרה להוספת מתכון?</a>'
              }));
            return { ...state, recipes: [...state.recipes, action.add] }
        case actiontype.DELETE_RECIPE: axios.post(`http://localhost:8080/api/recipe/delete/${action.Id}`).then((x) => { Swal.fire({
            position: "top",
            icon: "success",
            title: "המתכון נמחק",
            showConfirmButton: false,
            timer: 1000
          })})
            .catch(() => 
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "שגיאה במחיקת מתכון",
              footer: '<a href="#">חזרה למתכונים</a>'
            })); return { ...state }
        case actiontype.EDIT_RECIPE: axios.post(`http://localhost:8080/api/recipe/edit`, action.add)
            .then((x) => { Swal.fire({
                position: "top",
                icon: "success",
                title: " yey 🤤 המתכון עודכן!",
                showConfirmButton: false,
                timer: 1500
              }) }).catch((data) => Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "שגיאה בעריכת מתכון",
                footer: '<a href="#">חזרה למתכונים</a>'
              })); return { ...state }
        case actiontype.SET_CATEGORY: return { ...state, selected: action.selected }
        default: return { ...state }
    }


}
export default reducer;