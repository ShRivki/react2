import axios, { all } from "axios";
import Swal from "sweetalert2"
import * as actiontype from '../Store/actions'
export const getCategories = () => {
    return dispatch =>
        axios.get("http://localhost:8080/api/category")
            .then((res) => {

                dispatch({ type: actiontype.SET_CATEGORY, data: res.data })
            }).catch((error) => {
                console.error(error);
            })
}
export const addCategory = (category) => {
    return dispatch =>
        axios.post("http://localhost:8080/api/category", { Name: category })
            .then((x) => {
                dispatch({ type: actiontype.ADD_CATEGORY, data:x.data })
                Swal.fire({
                    icon: "secss",
                    title: ` ${category}  נוספה לרשימת קטגוריה    `,
                    showConfirmButton: false,
                    timer: 1000
                })

            }).catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: ":( ההוספה נכשלה ",
                    showConfirmButton: false,
                    timer: 1000
                })
                // console.error(error);
            })
}
