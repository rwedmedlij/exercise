import React, {Component,useState,useEffect} from 'react'
import Card from './Card'
import Cart from './Cart'
import ShopingData from "./ShopingData"
import "./ShopingCart.css"
function ShopingCart(props) {
    const [carts,setcarts] = useState([])
    const [showShopingData,setShowShopingData]=useState(false)

    useEffect(() => {
        fetch(`http://localhost:3002/get-carts`)
          .then(r => r.json())
          .then(data => {
            setcarts(data.carts);
          });
      })
  
      const clickHandler=()=>{
        setShowShopingData(!showShopingData)
        let sumAllTotalCarts=0;
       for(let i=0;i<carts.length;i++){
           sumAllTotalCarts+=(carts[i].price*carts[i].isbuy)
       }
       props.setTotalAllCarts(sumAllTotalCarts)
      }
    return <div className="shoping__cart">
          {
              carts.length>0&&
       <button onClick={clickHandler} className="card__btn btn__width right__btn">
          Shoping Cards &nbsp; <div className="circl__carts">{carts.length}</div>
       </button>
          }

{
showShopingData&&
          <ShopingData carts={carts} totalAllCarts={props.totalAllCarts} setShowShopingData={setShowShopingData}/>
        }       
    </div>;
}


export default ShopingCart