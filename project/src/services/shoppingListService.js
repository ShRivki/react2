import axios from "axios";
import * as actiontype from '../Store/actions'
export const getShoppingList = (user) => {
    return dispatch => axios.get(`http://localhost:8080/api/bay/${user}`).
            then((res) => {
                dispatch({ type: actiontype.SET_SHOPPING_LIST, data: res.data })

            }).catch(err => console.log(err))
}

export const deleteProduct = (product) => {
    return dispatch => axios.post(`http://localhost:8080/api/bay/delete/${product.Id}`)
        .then(() => {
            dispatch({ type: actiontype.DELETE_PRODUCT, data: product.Id })
        })
        .catch((error) => {
            console.error(error)
        })
    }


export const editProduct = (product) => {
    return dispatch =>

    axios.post(`http://localhost:8080/api/bay`,product).then(() => {
        dispatch({type:actiontype.EDIT_PRODUCT,data: product})
     }).catch(() => { console.log("error")})

}