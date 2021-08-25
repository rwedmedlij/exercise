import React,{useState} from 'react'
import "./ShopingData.css"
import Cart from './Cart'
import { v4 as uuidv4 } from "uuid";

function ShopingData({carts,totalAllCarts,setShowShopingData}) {
    const { v4: uuidv4 } = require("uuid");

    const pay= async() => {
        let id_sale = uuidv4();
        for(let i =0;i<carts.length;i++) {
      await  fetch(`http://localhost:3002/send_carts?id_sale=${id_sale}&&totalAllCarts=${totalAllCarts}&&card_id=${carts[i].card_id}`)
          .then(r => r.json())
          .then(data => {
          }); 
        }
        setShowShopingData(false);
      }
    return (
        <div className="shoping__data">
    {carts.map((list, index) => {
            return (<Cart 
              title={list.title}
              price={list.price}
              amount={list.isbuy}
            />)
          })}
          <div className="total">
          <span>Total</span>
          <span>{totalAllCarts}$</span>
          </div> 
          <button className="card__btn btn__allwidth" onClick={pay}>Pay</button>    
           </div>
    )
}

export default ShopingData
