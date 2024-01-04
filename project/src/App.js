import './App.css';
import LogIn from './components/Login.js';
import About from './components/About.js';
import HomePage from './components/HomePage.js';
import SignIn from './components/SignIn.js';
import RecipeDetails from './components/RecipeDetails.js';
import SignUp from './components/SignUp.js';
import AddRecipes from './components/AddRecipes.js';
import Recipes from './components/Recipes.js';
import Error from './components/Error.js';
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ShoppingList from './components/‎ShoppingList.js'
import Header from './components/Header.js'
import Actions from './Store/actions.js';

function App() {
  const userId = useSelector(state => (state.userId));
  return (
    <body>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/About" element={<About />} />
        <Route path="/HomePage" element={<HomePage />} />
        {userId && <Route path="/AddRecipes" element={<AddRecipes />} />}
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Login" element={<LogIn />} />
        {userId && <Route path="/SignUp" element={<SignUp />} />}
        {userId && <Route path="/Recipes" element={<Recipes />}>
          {/* {userId && <Route path='RecipeDetails' element={<RecipeDetails />}></Route>} */}
        </Route>}
        {userId && <Route path="/ShopingList" element={<ShoppingList userId={userId} />} />}
        {userId && <Route path="/*" element={<Error />} />}
      </Routes>
    </body>
  );
}

export default App;
