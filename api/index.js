const express = require('express')
const Product = require("./ProductDB")
const Category = require("./categoryDB")
const User = require("./userDB")
const Basket = require("./basketDB")
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')
const { where } = require('sequelize')

const app = express()
app.use(express.urlencoded({ extended: true })); 
app.use(express.json())
app.use(cors())

app.get('/AllCategory', async (req, res) => {
    const categories = await Category.findAll()
    res.send(categories)
})

app.post('/createCategory', async (req, res) => {
    if(req.body.name === undefined || req.body.name === " " || req.body.name === ""){
        return res.json({error: "name is required"})   
    }
    const createCategory = await Category.create({name: `${req.body.name}`})
    res.send(createCategory)
})

app.post('/userLogin', async (req, res) => {
    const { name, surName, password } = req.body;
    if (!name || !surName || !password) {
        return res.status(400).json({ error: "Name, surname, and password are required" });
    }
    const user = await User.findOne({ where: { name, surName, password } });
    if (!user) {
        return res.status(401).json({ error: "Invalid data" });
    }
    res.json(user);
})

app.get('/getProduct/:id', async (req, res) => {
    const id  = req.params.id;
    console.log(id)
    const product = await Product.findAll({where: {category: id}});
    res.send(product);
});

app.get('/mainProduct/:id', async(req, res)=>{
    const id = req.params.id; 
    console.log(id);
    const prod = await Product.findOne({where: {id: id}})
    res.send(prod)
})

app.post('/createUsers', async(req, res)=>{
    const apikey = uuidv4()
    if (req.body.name === undefined || req.body.name === " " || req.body.name === ""){
        return res.json({error: "Name is required"})
    } 
    else if (req.body.lastName === undefined || req.body.lastName === " " || req.body.lastName === ""){
        return res.json({error: "Surname is required"})
    }
    else if (req.body.password === undefined || req.body.password === " " || req.body.password === ""){
        return res.json({error: "Password is required"})
    }
    const newUser = await User.create({name : `${req.body.name}`, surName: `${req.body.lastName}`, password : `${req.body.password}`, apikey : apikey})
    res.send(newUser)
})

app.post("/addToBasket", async (req, res) => {
    const apiKey = req.headers["api-key"]
    const UsersId = await Basket.findOne({apikey: apiKey})
    const basketOfUsers = await Basket.create({apikey: apiKey})
    basketOfUsers.update({basket: req.body.basket})
    res.send(basketOfUsers)
})

app.get("/basket", async (req, res) => {
    const apiKey = req.headers["api-key"]
    const basketOfUsers = await Basket.findOne({apikey: apiKey})
    res.send(basketOfUsers)
})

app.listen(8000)