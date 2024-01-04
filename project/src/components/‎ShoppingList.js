import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { type } from "@testing-library/user-event/dist/type";
import * as actiontype from '../Store/actions'
export default () => {
   let newProduct;
   const user = useSelector(state => (state.userId));
   const [shoppingList, SetShoppingList] = useState([])
   const [operator, SetOperator] = useState(null);
   useEffect(() => { getShoppingList(); }, []);
   const getShoppingList = () => {
      axios.get(`http://localhost:8080/api/bay/${user}`).
         then((x) => {
            console.log(x.data);
            SetShoppingList(x.data)
         }).catch(err => console.log(err))
   }
   const editProduct = (newProduct, oldProduct) => {
      if (newProduct.Count + oldProduct.Count == 0) {
         axios.post(`http://localhost:8080/api/bay/delete/${oldProduct.Id}`).then(() => {
            getShoppingList();
         }).catch(() => { })
      }
      else {
         axios.post(`http://localhost:8080/api/bay`, newProduct).then(() => {
            getShoppingList();
         }).catch(() => { console.log("error") })
      }
   }
   return (<div>
      {shoppingList.map((product) =>
         <div class="product">
            <label>מוצר: </label>
            {product.Name}
            <label> כמות: </label>
            {product.Count}
            <button onClick={() => {
               newProduct = { ...product };
               newProduct.Count = -1;
               editProduct(newProduct, product);
               if (newProduct.Count + product.Count == 0 && shoppingList.length == 1) {
                  SetShoppingList([])
               }
            }}>-</button>
            <button onClick={() => {
               newProduct = { ...product };
               newProduct.Count = 1;
               editProduct(newProduct, product);
            }}>+</button>
         </div>
      )}
   </div>
   )
}