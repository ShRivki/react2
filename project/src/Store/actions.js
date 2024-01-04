import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
export const LOG_OUT = "LOG_OUT";
export const LOG_IN = "LOG_IN";
export const GET_RECIPES = "GET_RECIPES";
export const SET_CATEGORY = "SET_CATEGORY";
export const ADD_RECIPE = "ADD_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const EDIT_RECIPE = "EDIT_RECIPE";
export const GET_SHOPPING_LIST="GET_SHOPPING_LIST";
export const ADD_SHOPPING_LIST="ADD_SHOPPING_LIST";
export const DELETE_SHOPPING_LIST="DELETE_SHOPPING_LIST";

export default () => {
    const dispach = useDispatch();
    const getRecipes = () => {
        let d=[];
        axios.get("http://localhost:8080/api/recipe")
            .then((data) => {
                d=data.data;
                dispach({ type: GET_RECIPES, recipes: d })
                //console.log(d);
            });
    }
    const getCtegory = () => {
       let d=[];
        axios.get("http://localhost:8080/api/category")
            .then((data) => {
              
                d= data.data ;
                 console.log(d);
            });
            return d;
    }
    getRecipes();
}

