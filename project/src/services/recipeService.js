import  * as actionType from '../Store/actions'
import axios from "axios";
import Swal from "sweetalert2";
export const getRecipes = () => {
    return dispatch => {
        axios.get('http://localhost:8080/api/recipe')
            .then((res) =>
                dispatch({ type:actionType.GET_RECIPES, data: res.data }))
            .catch((error) =>
                console.error(error)
            )
    }
}
export const deleteRecipe = (recipeId) => {
    return dispatch => {   axios.post(`http://localhost:8080/api/recipe/delete/${recipeId}`).then((x) => { 
           
            Swal.fire({
                position: "top",
                icon: "success",
                title: "המתכון נמחק",
                showConfirmButton: false,
                timer: 1000
            })
             dispatch({ type:actionType.DELETE_RECIPE, data:recipeId })
        })
            .catch(() =>
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "שגיאה במחיקת מתכון",
                    footer: '<a href="#">חזרה למתכונים</a>'
                })
                );
    }
}
export const addRecipe = (data) => {
    return dispatch => axios.post('http://localhost:8080/api/recipe',data)
            .then((x) => {
                dispatch({ type:actionType.ADD_RECIPE, data: x.data })
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: " yey 🤤 המתכון נוסף!",
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch(() => Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "הוספת מתכון נכשלה",
                footer: '<a href="#">חזרה להוספת מתכון?</a>'
            }));
}
export const editRecipe = (data) => {
    return dispatch =>  axios.post('http://localhost:8080/api/recipe/edit', { ...data})
        .then((x) => {
            Swal.fire({
                position: "top",
                icon: "success",
                title: " yey 🤤 המתכון עודכן!",
                showConfirmButton: false,
                timer: 1500
            })
            dispatch({ type: actionType.EDIT_RECIPE, data:data })
        }).catch((data) => Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "שגיאה בעריכת מתכון",
            footer: '<a href="#">חזרה למתכונים</a>'
        }))
}