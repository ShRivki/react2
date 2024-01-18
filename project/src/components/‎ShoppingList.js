
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getShoppingList, editProduct, deleteProduct } from "../services/shoppingListService";
import { Button, Divider, Form, FormField, Header } from 'semantic-ui-react';
import '../App.css'
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
   return (<div style={{marginTop:'80px'}}>
      <Button onClick={() => {
         window.print()
      }}>להדפסה</Button>
      <div  >

         <div class="ui horizontal divider header">רשימת קניות </div>
         <table class="ui celled definition table ">
            <thead>
               <tr><th class="collapsing"></th>
                  <th class="r">שם</th>
                  <th class="r">כמות</th>
                  <th class="single line r ">הוספה</th>
                  <th class="single line r">הפחתה</th>
                  <th class="single line r">הסרה</th>
               </tr></thead>
         
         <tbody>
            
               {shoppingList.length>0&&
               <>{shoppingList?.map((product) =>
                  <tr>
                     <th></th>
                     <th class="r">{product.Name}</th>
                     <th class="r">{product.Count}</th>
                     <th class="r"> <button onClick={() => {
                        newProduct = { ...product };
                        newProduct.Count = -1;
                        dispatch(editProduct(newProduct));
                        if ((newProduct.Count + product.Count) == 0) {
                           dispatch(deleteProduct(product))
                        }
                     }}> <i class="minus icon"></i></button></th>
                     <th class="r"><button onClick={() => {
                        newProduct = { ...product };
                        newProduct.Count = 1;
                        dispatch(editProduct(newProduct));
                     }}> <i class="plus icon"></i></button></th>
                     <th class="r"> <button onClick={() => {
                        dispatch(deleteProduct(product));
                        // dispatch(getShoppingList(user));
                     }}> <i class="trash icon"></i></button></th>
                  </tr>
               )}</>}
         </tbody>
         </table>
{/* 
         {shoppingList.length > 1 && <div class="ui placeholder segment">

            <div class="column">
               <div class="ui form">

                  <Form>
                     {shoppingList?.map((product) =>
                        <div class="product">

                           <label> כמות: </label>
                           {product.Count}
                           <label> מוצר: </label>
                           {product.Name}
                           <button onClick={() => {
                              newProduct = { ...product };
                              newProduct.Count = -1;
                              dispatch(editProduct(newProduct));
                              if ((newProduct.Count + product.Count) == 0) {
                                 dispatch(deleteProduct(product))
                              }
                           }}> <i class="minus icon"></i></button>
                           <button onClick={() => {
                              newProduct = { ...product };
                              newProduct.Count = 1;
                              dispatch(editProduct(newProduct));
                           }}> <i class="plus icon"></i></button>
                           <button onClick={() => {
                              dispatch(deleteProduct(product));
                              // dispatch(getShoppingList(user));
                           }}> <i class="trash icon"></i></button>
                        </div>
                     )}
                  </Form>
               </div>
            </div>
         </div>} */}

      </div>
      </div>
   )
}