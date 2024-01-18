import './App.css';
import LogIn from './components/Login.js';
import About from './components/About.js';
import HomePage from './components/HomePage.js';
import SignIn from './components/SignIn.js';
import RecipeDetails from './components/RecipeDetails.js';
import LogOut from './components/LogOut.js';
import AddRecipes from './components/AddRecipes.js';
import Recipes from './components/Recipes.js';
import Error from './components/Error.js';
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ShoppingList from './components/‎ShoppingList.js'
import Header from './components/Header.js'
import Actions from './Store/actions.js';

function App() {
  const {userId} = useSelector(state => ({
    userId:state.user.user
  }));
  return (
    <body id="body" >
      <div id="body1">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/About" element={<About />} />
          <Route path="/HomePage" element={<HomePage />} />
          {userId && <Route path="/AddRecipes" element={<AddRecipes />} />}
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Login" element={<LogIn />} />
          {userId && <Route path="/LogOut" element={<LogOut />} />}
          {userId && <Route path='/RecipeDetails' element={<RecipeDetails />} />}
          {userId && <Route path="/Recipes" element={<Recipes />}/>
          // </Route>
          }
          {userId && <Route path="/ShopingList" element={<ShoppingList userId={userId} />} />}
          {userId && <Route path="/*" element={<Error />} />}
        </Routes>
      </div>
    </body>
  );
}

export default App;
