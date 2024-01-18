
import '../styles/Recipes.css'
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "semantic-ui-react";
import { deleteRecipe, editRecipe } from '../services/recipeService'
// import { delete_recipe } from "../service";
import { editProduct } from "../services/shoppingListService";
export default () => {
    const { user } = useSelector(state => ({ user: state.user.user, }));
    const { state } = useLocation()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let recipe = state;
    return <div><div id="flex">
        <div class="recipe">
            <h2>{recipe.Name}</h2><br />
            <h5>  {recipe.Description}</h5>
            <h5> {recipe.Duration} </h5>
            <img src={recipe.Img} style={{ width: '380px', height: '18rem' }} /><br />
            {user == recipe.UserId && <button class="but" onClick={() => {
                navigate("/AddRecipes", { state: recipe });
            }}> <label>עריכה</label> <i class="edit icon"></i>  </button>}
            {user == recipe.UserId && <button class="but" onClick={() => {
                dispatch(deleteRecipe(recipe.Id));
                navigate('/Recipes')
            }}><label>מחיקה</label>
                <i class="trash icon"></i>
            </button>}
            <h3>מצרכים:</h3>
            <div>{recipe.Ingrident.map((x) =>
                <p class="a"><button class="but b" onClick={() => {
                    dispatch(editProduct({ Count: 1, UserId: user, Name: x.Name }));
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: ` ${x.Name} נוסף לעגלת קניות 1`,
                        showConfirmButton: false,
                        timer: 800
                    })
                }}><i class="cart icon"></i></button>{x.Count} {x.Type} {x.Name}   </p>)}
            </div>
            <h3>הוראות הכנה:</h3>
            <div>{recipe.Instructions.map((x) => <ul><li> {x}</li></ul>)}</div>
        </div>

    </div>
        <Button id="button" onClick={() => {
            navigate("/Recipes");
        }}>חזרה למתכונים</Button>
    </div>

}