
import '../../styles/Recipes.css'
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteRecipe } from '../../services/recipeService'
import { editProduct } from "../../services/shoppingListService";
export default () => {
    const { user } = useSelector(state => ({ user: state.user.user, }));
    const { state } = useLocation()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let recipe = state;
    return <div>
        <div id="flex">
            <div id="m" class="ui placeholder segment recipe">
                <div class="ui one column very relaxed stackable grid">
                    <div class="column">
                        <div class="ui form">
                            <h2>{recipe.Name}</h2><br />
                            <h5>  {recipe.Description}</h5>
                            <h5><label>משך זמן הכנה: </label>{recipe.Duration} </h5>
                            <img src={recipe.Img} style={{ width: '350px', height: '16rem' }} /><br />
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
                                <p class="f"><button class="but b" onClick={() => {
                                    dispatch(editProduct({ Count: 1, UserId: user, Name: x.Name }));
                                    Swal.fire({
                                        position: "top",
                                        icon: "success",
                                        title: ` ${x.Name} נוסף לעגלת קניות 1`,
                                        showConfirmButton: false,
                                        timer: 800
                                    })
                                }}><i class="cart icon "></i></button><span class="a">{x.Count} {x.Type} {x.Name}</span>   </p>)}
                            </div>
                            <h3>הוראות הכנה:</h3>
                            <div>{recipe.Instructions.map((x) => <ul><li> {x}</li></ul>)}</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

}