
import { Link, Outlet, useNavigate ,useLocation} from "react-router-dom";
export default () => {
    const navigate = useNavigate();
    console.log("iiiiiiiiiiiiiii");
    const { state } = useLocation();
    return <>
    {
<div>
        <div>{state.recipe.Ingrident.map((x) =>
        <p class="a"><button class="but b" onClick={() => alert(`1 ${x.Name} נוסף לעגלה`)}>+</button>{x.Count} {x.Type} {x.Name}   </p>)}
        </div>
        <div>
            {state.recipe.Instructions.map((x) => <ul><li> {x}</li></ul>)}
        </div>
        </div>}
    </>
    
}