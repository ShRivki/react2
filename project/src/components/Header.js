import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import 'semantic-ui-css/semantic.min.css';
import React from 'react'
import Swal from "sweetalert2";
import { ButtonGroup } from "semantic-ui-react";
import { ButtonContent, Button, Icon } from 'semantic-ui-react'
const App = () => {
    const navigate = useNavigate();
    const user = useSelector(state => (state.userId));
    return <div>
        {/* {<ButtonGroup widths='6'>
        </ButtonGroup>}.catch() */}
         {user ? <Button onClick={() => { navigate('/SignUp');Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "להתנתק?????",
              })}}>התנתקות</Button> : <><Button class="button" onClick={() => navigate('/LogIn')}>התחברות</Button>
        <Button class="button" onClick={() => navigate('/SignIn')}>הרשמה</Button> </>}
        {user && <Button onClick={() => navigate('/HomePage')}>דף הבית </Button>}
        {user && <Button onClick={() => navigate('/Recipes')}>מתכונים</Button>}
       
        {user && <Button onClick={() => navigate('/Recipes', { state: user })}>מתכונים שלי</Button>}
        {user && <Button onClick={() => navigate('/AddRecipes')}>הוספת מתכון</Button>}
        {user && <Button onClick={() => navigate('/ShopingList')}>רשימת קניות</Button>} 
        {user &&<Button animated='vertical'>
            <ButtonContent hidden onClick={() => navigate('/ShopingList')}> <Icon name='shop' /></ButtonContent>
            <ButtonContent visible >קניות</ButtonContent>
        </Button>}
        { <Button onClick={() => navigate('/About')}>אודות</Button>}
       
        
    </div>
}
export default App;