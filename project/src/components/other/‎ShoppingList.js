
import { useDispatch, useSelector } from "react-redux";
import {  useEffect } from "react";
import { getShoppingList, editProduct, deleteProduct } from "../../services/shoppingListService";
import { Button } from 'semantic-ui-react';
import '../../App.css'
import Table from 'react-bootstrap/Table';
export default () => {
   const dispatch = useDispatch()
   let newProduct;
   const { user, shoppingList } = useSelector(state => ({
      user: state.user.user,
      shoppingList: state.shoppingList.shoppingList,
   }));
   useEffect(() => {
      dispatch(getShoppingList(user))
   }, []);
   return (<div style={{ marginTop: '80px' }}>
      <Button onClick={() => {
         window.print()
      }}>להדפסה</Button>
      <div>
         <div  id="taitel"class="ui horizontal divider header">רשימת קניות </div>
         <table class="ui celled definition table ">
            <thead>
               <tr><th class="collapsing"></th>
                  <th id="r">שם</th>
                  <th  id="r">כמות</th>
                  <th id="r" class="single line"><i class="plus icon"></i></th>
                  <th id="r" class="single line"><i class="minus icon"></i></th>
                  <th id="r" class="single line">הסרה</th>
               </tr></thead>
            <tbody>
               {shoppingList.length > 0 &&
                  <>{shoppingList?.map((product,i) =>
                     <tr>
                        <th>{i+1}</th>
                        <th id="r">{product.Name}</th>
                        <th id="r">{product.Count}</th>
                        <th id="r"><button onClick={() => {
                           newProduct = { ...product };
                           newProduct.Count = -1;
                           dispatch(editProduct(newProduct));
                           if ((newProduct.Count + product.Count) == 0) {
                              dispatch(deleteProduct(product))
                           }
                        }}><i class="minus icon"></i></button></th>
                        <th id="r"><button onClick={() => {
                           newProduct = { ...product };
                           newProduct.Count = 1;
                           dispatch(editProduct(newProduct));
                        }}> <i class="plus icon"></i></button></th>
                        <th id="r"> <button onClick={() => {
                           dispatch(deleteProduct(product));
                           // dispatch(getShoppingList(user));
                        }}><i class="trash icon"></i></button></th>
                     </tr>
                  )}</>}
            </tbody>
         </table>

      </div>
   </div>
   )
}