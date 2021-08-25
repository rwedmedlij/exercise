const express = require("express");
app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());
var cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://high:CuSqCNZqbaeNAvqN@cluster0.7rma1.mongodb.net/datawork?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("we are connected to DB");
});

const Userschema = new mongoose.Schema({
  name: String,
  counter: String,
});

const UserLot = mongoose.model("Userschema", Userschema);

const userDB = [];

const prudoctschema = new mongoose.Schema({
  card_id: String,
  img: String,
  title: String,
  desc: String,
  price: Number,
  isbuy: Number,
  amount: Number,
  sale_count :Number,

});

const pruduct = mongoose.model("prudoctsschema", prudoctschema);

const salesschemma = new mongoose.Schema({
  id_sale: { type: String, unique: true },
  prudocts_saled: [],
  saledAt: { type: Date, default: Date.now },
  total: Number,
});

const sales = mongoose.model("salesschemma", salesschemma);

app.get("/get-prudocts", (req, res) => {
  try {
    console.log("get");
    pruduct.find({}).then((docs) => {
      res.send({ prudocts: docs });
    });
  } catch (e) {
    res.send({ error: e });
  }
});
app.get("/get-carts", (req, res) => {
  try {
    pruduct.find({ isbuy: { $gt: 0 } }).then((docs) => {
      res.send({ carts: docs });
    });
  } catch (e) {
    res.send({ error: e });
  }
});
app.get("/topFiveLast5days",async (req, res) => {
  sales.find(
    {    
        saledAt: 
        {
            $gte: new Date((new Date().getTime() - (5 * 24 * 60 * 60 * 1000))) ,
        }
        
    }
   
  ).then((docs) => {
    res.send({ data:docs});
  });

});



app.get("/send_carts",async (req, res) => {
  const { id_sale , totalAllCarts ,card_id} = req.query;
  var carts = [];
   await pruduct.find({ isbuy: { $gt: 0 } }).then( async(docs) => {
    carts.push(docs);
  });
  await sales.countDocuments({id_sale: id_sale}, function async(err, count){ 
    if(count <= 0){
      const sale = new sales({ id_sale: id_sale , prudocts_saled : carts, total : totalAllCarts });
   sale.save().then(() => {
    console.log("saved to DB");
  });
     }
}); 
 await clearByPay(card_id);
res.send({ ok: true });
});



app.get("/update-buy", async (req, res) => {
  const { id } = req.query;
  pruduct.findOneAndUpdate(
    { card_id: id },
    { $inc: { isbuy: 1, amount: 1 } },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      res.send({ ok: true });
    }
  );
});

app.get("/edit_product", async (req, res) => {
  const { id, img, title, desc, price } = req.query;
  console.log("the id is of query :" + id);
  pruduct.findOneAndUpdate(
    { card_id: id },
    { $set: { img: img, title: title, desc: desc, price: price } },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      res.send({ ok: true });
    }
  );
});

app.get("/delete_product", (req, res) => {
  const { id } = req.query;
  deleteProduct(id);
  res.send({ ok: true });
});
const clearByPay = async (id_prudoct) => {
  console.log(id_prudoct)
  await pruduct.findOneAndUpdate(
    { card_id: id_prudoct },
    {$inc :{sale_count : 1} , $set: { isbuy: 0}}
  );
};
const deleteProduct = async (id) => {
  const result = await pruduct.deleteOne({ card_id: id });
  if (result.deletedCount === 1) {
    console.dir("Successfully deleted one document.");
  } else {
    console.log("No documents matched the query. Deleted 0 documents.");
  }
};

app.get("/add_product", (req, res) => {
  const { img, id, title, desc, price } = req.query;
  const newprudoct3 = new pruduct({
    img: img,
    card_id: id,
    title: title,
    desc: desc,
    price: price,
    isbuy: 0,
    amount: 0,
    sale_count:0,
  });
  newprudoct3.save().then(() => {
    res.send({ ok: true });
  });
});

app.get("/getTopFive", (req, res) => {
  pruduct.aggregate([{ $sort: { amount: -1 } }, { $limit: 5 }]).then((data) => {
    res.send({ data: data });
  });
});

app.get("/getTopFiveUniqeServer", (req, res) => {
  pruduct.aggregate([{ $sort: { sale_count: -1 } }, { $limit: 5 }]).then((data) => {
    res.send({ data: data });
  });
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`\x1b[36m Server running on port ${port}  🔥`);
});
