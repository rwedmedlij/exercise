import React, {Component,useState,useEffect} from 'react'
import Card from './Card'
import Cart from './Cart'
import ShopingCart from './ShopingCart'
import "./Home.css"

function Home() {
    const [prudocts,setproducts] = useState([])
    const [carts,setcarts] = useState([])
    const [update, setupdate] = useState(1)
    const [totalAllCarts,setTotalAllCarts]=useState(0)

    useEffect(() => {
        fetch('http://localhost:3002/get-prudocts')
          .then(r => r.json())
          .then(data => {
            console.log(data)
            setproducts(data.prudocts);
          });
       
      }, [])
  
    return <div className="home">
    <h2>Home</h2>
    <div className="all__items">

    <ShopingCart update ={update} setTotalAllCarts={setTotalAllCarts} totalAllCarts={totalAllCarts}></ShopingCart>
<div className="container">
       {prudocts.map((list, index) => {
            return (<Card
            totalAllCarts={totalAllCarts}
            setTotalAllCarts={setTotalAllCarts}
              card_id ={list.card_id}
              title={list.title}
              desc={list.desc}
              img={list.img}
              price={list.price}
              update = {update}
              setupdate={setupdate}
            />)
          })} 
          
          </div>
          </div>

    </div>;
    
  }

  export default Home