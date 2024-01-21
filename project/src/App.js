import './App.css';
import LogIn from './components/user/Login.js';
import About from './components/other/About.js';
import HomePage from './components/other/HomePage.js';
import SignIn from './components/user/SignIn.js';
import RecipeDetails from './components/recipe/RecipeDetails.js';
import LogOut from './components/user/LogOut.js';
import AddRecipes from './components/recipe/AddRecipes.js';
import Recipes from './components/recipe/Recipes.js';
import Error from './components/other/Error.js';
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ShoppingList from './components/other/‎ShoppingList.js'
import Header from './components/other/Header.js'

function App() {
  const { userId } = useSelector(state => ({
    userId: state.user.user
  }));
  return (
    <>
      <Header />
      <body id="body" >

        <div id="body1">
          <div id="body2">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/About" element={<About />} />
              <Route path="/HomePage" element={<HomePage />} />
              {userId && <Route path="/AddRecipes" element={<AddRecipes />} />}
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/Login" element={<LogIn />} />
              {userId && <Route path="/LogOut" element={<LogOut />} />}
              {userId && <Route path='/RecipeDetails' element={<RecipeDetails />} />}
              {userId && <Route path="/Recipes" element={<Recipes />} />
                // </Route>
              }
              {userId && <Route path="/ShopingList" element={<ShoppingList userId={userId} />} />}
              {userId && <Route path="/*" element={<Error />} />}
             
            </Routes> 
            
          </div>
        </div>
      </body></>
  );
}

export default App;
