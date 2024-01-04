import axios from "axios";
import * as actiontype from '../Store/actions'
import { useState, useEffect } from "react";
import '../styles/Recipes.css'
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
export default () => {
  const {state}=useLocation();
  const navigate = useNavigate();
  const { user, selected, allRecipes } = useSelector(state => ({ user: state.userId, selected: state.selected, allRecipes: state.recipes }));
  const [recipes, SetRecipes] = useState([]);
  const [categories, SetCategories] = useState([]);
  const [category, SetCategory] = useState("0");
  const [duration, SetDuration] = useState(120);
  const [difficulty, SetDifficulty] = useState("0");
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("http://localhost:8080/api/recipe")
      .then((data) => {
        SetRecipes(data.data)
      });
    axios.get("http://localhost:8080/api/category")
      .then((data) => {
        SetCategories(data.data)
      });
    dispatch({ type: actiontype.SET_CATEGORY, selected: { category: category, duration: duration, difficulty: difficulty } })

  }, [category, duration, difficulty]);
  const editProduct = (newProduct) => {   
       axios.post(`http://localhost:8080/api/bay`,{Name:newProduct.Name,Count:1,UserId:user}).then(() => { Swal.fire({
        position: "top",
        icon: "success",
        title: `1 ${newProduct.Name} נוסף לעגלת קניות`,
        showConfirmButton: false,
        timer: 800
      })
      
       }).catch(() => { console.log("error") })
 }
  // console.log(selected.category);
  // console.log("category"+selected.category);
  // console.log("difficulty"+selected.difficulty);
  // console.log("duration"+selected.duration);
  // console.log(allRecipes)
  const printRecipe = (recipe) => {
    return<> <div class="recipy">
      <h2>{recipe.Name}</h2><br />
      <h5>{recipe.Description}</h5>
      <img src={recipe.Img} style={{ width: '380px', height: '18rem' }} /><br />
      {user == recipe.UserId && <button class="but" onClick={()=>{
        navigate("/AddRecipes",{state:recipe});
      }}>עריכה</button>}
      {user == recipe.UserId && <button class="but" onClick={()=>{
        dispatch({ type: actiontype.DELETE_RECIPE, Id: recipe.Id});
      }}>מחיקה</button>}
      {/* <button class="but" onClick={()=>{ <Link to={"/RecipeDetails"}/>}}>למתכון</button> */}
      <div>{recipe.Ingrident.map((x) =>
          <p class="a"><button class="but b" onClick={() => {
          editProduct(x);}}>+</button>{x.Count} {x.Type} {x.Name}   </p>)}
      </div>
      <div>{recipe.Instructions.map((x) => <ul><li> {x}</li></ul>)}</div>
    </div>
    </>
  }
  return <>
    <div class="select">
      <label>קטגוריה:</label><br />
      <select id="categories" onChange={event => {
        console.log(event.target.value);
        SetCategory(event.target.value);
      }}>
        <option value="0">בחר הכל</option>
        {categories.map((x) =>
          <option value={x.Id}>{x.Name}</option>)}
      </select>
    </div>
    
        {/* {recipes.map((x) =>
          printRecipe(x))} */}
   
    <div class="select">
      <label> :דרגת קושי</label><br />
      <select id="difficulty" onChange={event => {
        //console.log(event.target.value);
        SetDifficulty(event.target.value);
      }}>
        <option value="0">בחר</option>
        <option value="1">"קל"</option>
        <option value="2">"בנוני"</option>
        <option value="3">"קשה"</option>
      </select>
    </div>
    <p>משך זמן הכנה:{duration} דקות</p>
    <input type="range" min="1" max="120" class="slider" style={{ color: "black" }} onChange={event => {
     // console.log(event.target.value);
      SetDuration(event.target.value);
    }} />
    
    <br />

    <h1 id="recipes"> -מתכונים- </h1>
    {!state?recipes.map((recipe) => 
    selected == null || (selected.category == "0" || recipe.CategoryId == selected.category) && (recipe.Difficulty == selected.difficulty || selected.difficulty == "0") && recipe.Duration <= selected.duration&&
      printRecipe(recipe)
    ): recipes.map((recipe) => 
    state ==recipe.UserId &&(selected == null || (selected.category == "0" || recipe.CategoryId == selected.category) && (recipe.Difficulty == selected.difficulty || selected.difficulty == "0") && recipe.Duration <= selected.duration) &&
      printRecipe(recipe)
    )}
    </>


}  
 //  <><h2>{recipe.Name}</h2><br />
    //   <h5>{recipe.Description}</h5>
    //   <img src={recipe.Img} style={{ width: '380px', height: '18rem' }} /><br />
    //   {/* <button class="but">מוצרים</button>
    //   <button class="but">מתכון</button> */}
    //   {user == recipe.Id && <button class="but">עריכה</button>}
    //   {user == recipe.Id && <button class="but">מחיקה</button>}
    //   <button class="but" onClick={()=> {navigate("RecipeDetails", { state: recipe })}}>למתכון</button>
    //   <Outlet/>
    //   </> 
// export const printRecipe = (recipe, user) => {
//   return <div class="recipy">
//     <h2>{recipe.Name}</h2><br />
//     <h5>{recipe.Description}</h5>
//     <img src={recipe.Img} style={{ width: '380px', height: '18rem' }} /><br />
//     {/* <button class="but">מוצרים</button>
//     <button class="but">מתכון</button> */}
//     {user == recipe.Id && <button class="but">עריכה</button>}
//     {user == recipe.Id && <button class="but" onClick={()=>{
//       dispatch({ type: actiontype.DELETE_RECIPE, id: recipe.Id});
//     }}>מחיקה</button>}
//     <button class="but" onClick={()=>{ <Link to={"/RecipeDetails"}/>}}>למתכון</button>
//     <div>{recipe.Ingrident.map((x) =>
//         <p class="a"><button class="but b" onClick={() => alert(`1 ${x.Name} נוסף לעגלה`)}>+</button>{x.Count} {x.Type} {x.Name}   </p>)}
//     </div>
//     <div>{recipe.Instructions.map((x) => <ul><li> {x}</li></ul>)}</div>
//   </div>
// }
