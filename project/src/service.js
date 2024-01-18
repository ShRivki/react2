import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
export const add_recipe = (recipe) => {
    axios.post(`http://localhost:8080/api/recipe`, recipe)
        .then((x) => {
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
export const delete_recipe = (recipeId) => {
    axios.post(`http://localhost:8080/api/recipe/delete/${recipeId}`).then((x) => {
        Swal.fire({
            position: "top",
            icon: "success",
            title: "המתכון נמחק",
            showConfirmButton: false,
            timer: 1000
        })
    })
        .catch(() =>
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "שגיאה במחיקת מתכון",
                footer: '<a href="#">חזרה למתכונים</a>'
            }));
}
export const edit_recipe = (recipe) => {
    axios.post(`http://localhost:8080/api/recipe/edit`, recipe)
        .then((x) => {
            Swal.fire({
                position: "top",
                icon: "success",
                title: " yey 🤤 המתכון עודכן!",
                showConfirmButton: false,
                timer: 1500
            })
        }).catch((data) => Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "שגיאה בעריכת מתכון",
            footer: '<a href="#">חזרה למתכונים</a>'
        }))
} 