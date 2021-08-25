import React, { useEffect, useState } from "react";
import './Card.css'

function Card(props) {
  const [idofcard, setid] = useState(0)



  const buy = (e) => {
    fetch(`http://localhost:3002/update-buy?id=${props.card_id}`)
      .then((r) => r.json())
      .then((data) => {
        props.setupdate(props.update+1)
        console.log("this is props/price: "+ props.price)
        props.setTotalAllCarts(props.totalAllCarts+props.price)
      });
  };



  return (

    <div className="card">

      <img src={props.img} />
      <div className="card__data">

      <span>
      {props.title}

      </span>
      <span>
      {props.desc}
      </span>
      <span>
      {props.price}
      </span>
      </div>

      <button className="card__btn" onClick={buy}>Buy</button>
    </div>
  )
}

export default Card