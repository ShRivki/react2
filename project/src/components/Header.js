import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import 'semantic-ui-css/semantic.min.css';
import React from 'react'
import { ButtonContent, Button, Icon } from 'semantic-ui-react'
const App = () => {
    const navigate = useNavigate();
    const {user }= useSelector(state => ({
        user:state.user.user
    }));
    return <div>
        <div id="header">
         {user ? <Button id="button" onClick={() => { navigate('/LogOut')}}>התנתקות</Button> : <><Button id="button" onClick={() => navigate('/LogIn')}>התחברות</Button>
        <Button id="button"  onClick={() => navigate('/SignIn')}>הרשמה</Button> </>}
        {user && <Button  id="button" onClick={() => navigate('/HomePage')}>דף הבית </Button>}
        {user && <Button id="button" onClick={() => navigate('/Recipes')}>מתכונים</Button>}
       
        {user && <Button id="button" onClick={() => navigate('/Recipes', { state: user })}>מתכונים שלי</Button>}
        {user && <Button id="button" onClick={() => navigate('/AddRecipes')}>הוספת מתכון</Button>}
        {user && <Button id="button" onClick={() => navigate('/ShopingList')}>רשימת קניות</Button>} 
        { <Button id="button" onClick={() => navigate('/About')}>אודות</Button>}
       </div>
        
    </div>
}
export default App;