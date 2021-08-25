import React, { useEffect, useState } from "react";
import "./Admin.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { v4 as uuidv4 } from "uuid";
import Option from "./Option"
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display:"grid",
  },
}));
function Admin() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const { v4: uuidv4 } = require("uuid");

  const [prudocts,setproducts] = useState([])

  const [title, setTtile] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [img, setImg] = React.useState("");

  useEffect(() => {
    fetch('http://localhost:3002/get-prudocts')
      .then(r => r.json())
      .then(data => {
        console.log(data)
        setproducts(data.prudocts);
      });
   
  }, [])

  const AddProd = () => {
    if (title != "" && price != "" && img != "" && desc != "") {
      const newid = uuidv4();
      fetch(
        `http://localhost:3002/add_product?img=${img}&&id=${newid}&&title=${title}&&desc=${desc}&&price=${price}`
      )
        .then((r) => r.json())
        .then((data) => {
         setproducts([...prudocts,{title:title,price:price,desc:desc,img:img,card_id:newid}])
          setTtile("");
          setPrice("");
          setDesc("");
          setImg("");
          setOpen(false)
        });
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTtile("");
    setPrice("");
    setDesc("");
    setImg("");
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <label>Title (name):</label>
      <input type="text" onChange={(e) => setTtile(e.target.value)} />

      <label>Price :</label>
      <input type="text" onChange={(e) => setPrice(e.target.value)} />

      <label>Description :</label>
      <input type="text" onChange={(e) => setDesc(e.target.value)} />

      <label>Image :</label>
      <input type="text" onChange={(e) => setImg(e.target.value)} />

      <button className="card__btn btn__width" onClick={AddProd}>
        Add
      </button>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <button onClick={handleOpen} className="card__btn btn__width">
        Add
      </button>
     
      <table>
      <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Description</th>
          <th>Image</th>
          <th>Option</th>
        </tr>
        
      {prudocts.map((list, index) => {
            return ( <tr>
                
                <td>{list.title}</td>
                <td>{list.price}</td>
                <td>{list.desc}</td>
                <td><img className="imgadmin" src={list.img} /></td>
                <td><Option id={list.card_id}  prudocts={prudocts} setProducts={setproducts} title_p={list.title} price_p={list.price} desc_p={list.desc} img_p={list.img}/></td>

              </tr>)
          })}
        
          
      </table>
    </div>
  );
}

export default Admin;
