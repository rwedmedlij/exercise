import React, { useEffect, useState } from "react";
import './Card.css'

function Cart(props) {
    const [idofcard, setid] = useState(0)
    const pay = (e) => {

    };
    return (

        <div className="cart">
            <span>
                {props.title}
            </span>
            <span>
                {props.amount}X
            </span>
            <span>
                {props.price}$
            </span>


        </div>
    )
}

export default Cart