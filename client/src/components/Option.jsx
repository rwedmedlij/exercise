import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    display: "grid",
  },
}));

function Option({
  id,
  prudocts,
  setProducts,
  title_p,
  price_p,
  desc_p,
  img_p,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [title, setTtile] = React.useState(title_p);
  const [price, setPrice] = React.useState(price_p);
  const [desc, setDesc] = React.useState(desc_p);
  const [img, setImg] = React.useState(img_p);
  const [openSpinner, setOpenSpinner] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const edit = async () => {
    if (title != "" && price != "" && img != "" && desc != "") {
      setOpenSpinner(true);
      await fetch(
        `http://localhost:3002/edit_product?id=${id}&&img=${img}&&title=${title}&&desc=${desc}&&price=${price}`
      )
        .then((r) => r.json())
        .then((data) => {
          setOpen(false);
          console.log("this is the temp: ");
          let temp = [...prudocts];
          for (let i = 0; i < temp.length; i++) {
            if (temp[i].card_id === id) {
              temp[i].title = title;
              temp[i].price = price;
              temp[i].img = img;
              temp[i].desc = desc;
            }
          }
          setProducts([...temp]);
        });
      setOpenSpinner(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    if (title === "") 
      setTtile(title_p);
    if (price === "") 
      setPrice(price_p);
    if (desc === "") 
      setDesc(desc_p);
    if (img === "") 
      setImg(img_p);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <label>Title (name):</label>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTtile(e.target.value);
        }}
      />

      <label>Price :</label>
      <input
        type="text"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <label>Description :</label>
      <input
        type="text"
        value={desc}
        onChange={(e) => {
          setDesc(e.target.value);
        }}
      />
      <label>Image :</label>
      <input
        type="text"
        value={img}
        onChange={(e) => {
          setImg(e.target.value);
        }}
      />
      {openSpinner ? (
        <CircularProgress color="secondary" />
      ) : (
        <button className="card__btn btn__width" onClick={edit}>
          Edit
        </button>
      )}
    </div>
  );
  const deleteHandler = async () => {
    await fetch(`http://localhost:3002/delete_product?id=${id}`)
      .then((r) => r.json())
      .then((data) => {});
    setProducts(
      prudocts.filter((elm) => {
        return elm.card_id !== id;
      })
    );
  };
  return (
    <div>
      <div className="edit_delete">
        <button className="card__btn btn_20width" onClick={handleOpen}>
          Edit
        </button>
        <button className="card__btn btn_20width" onClick={deleteHandler}>
          Delete
        </button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default Option;
