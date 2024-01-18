
import { useState, useEffect } from "react";
import '../styles/Recipes.css'
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button, Divider, Form, FormField, Header } from 'semantic-ui-react';
import { getCategories } from '../services/categoryService'
import { getRecipes } from '../services/recipeService'
export default () => {
  const { state } = useLocation();
  const { user, recipes, categories } = useSelector(state => ({
    user: state.user.user,
    categories: state.categories.categories,
    recipes: state.recipes.recipes
  }));
  const [category, SetCategory] = useState("0");
  const [duration, SetDuration] = useState(120);
  const [difficulty, SetDifficulty] = useState("0");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipes())
    dispatch(getCategories())
  }, []);
  useEffect(() => {


  }, [category, duration, difficulty])
  const printRecipe = (recipe) => {
    return <div class="recipe_img" style={{ width: "400px" }}>
      <div class="Enlarged_image " >
        <p class="titel_img">{recipe.Name}</p>
        <img src={recipe.Img} class="Enlarged_image_img " />
      </div>
      <div></div>
       <Button onClick={() => {
        navigate("/RecipeDetails", { state: recipe });
      }}>למתכון</Button>
    </div>
  }
  return <>
    <div id="select">
      <div class="select">
        <label>קטגוריה:</label><br />
        <select id="categories" onChange={event => {
          console.log(event.target.value);
          SetCategory(event.target.value);
        }}>
          <option value="0">בחר הכל</option>
          {categories?.map((x) =>

            <option value={x.Id}>{x.Name}</option>)}
        </select>
      </div>
      <div class="select">
        <label> :דרגת קושי</label><br />
        <select id="difficulty" onChange={event => {
          SetDifficulty(event.target.value);
        }}>
          <option value="0">בחר</option>
          <option value="1">קל</option>
          <option value="2">בנוני</option>
          <option value="3">קשה</option>
        </select>
      </div>
      <div class="select">
        <p>משך זמן הכנה:{duration} דקות</p>
        <input type="range" min="1" max="120" class="slider" style={{ color: "black" }} onChange={event => {
          SetDuration(event.target.value);
        }} />
      </div>
    </div>

    <h1 id="recipes"> -מתכונים- </h1>
    <div class="ui special cards">
      {!state ? recipes?.map((recipe) =>
        category == null || (category == "0" || recipe.CategoryId == category) && (recipe.Difficulty == difficulty || difficulty == "0") && recipe.Duration <= duration &&
        printRecipe(recipe)
      ) : recipes?.map((recipe) =>
        state == recipe.UserId && (category == null || (category == "0" || recipe.CategoryId == category) && (recipe.Difficulty == difficulty || difficulty == "0") && recipe.Duration <= duration) &&
        printRecipe(recipe)
      )}
    </div>
  </>


}  