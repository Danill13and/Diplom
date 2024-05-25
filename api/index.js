const express = require('express')
const Product = require("./ProductDB")
const Category = require("./categoryDB")
const User = require("./userDB")
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')

const app = express()

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
    const createCategory = await Category.build({name: `${req.body.name}`})
    res.send(createCategory)
})
 

app.get('/allProducts', async(req, res)=>{
    const users = await Product.findAll()
    res.send(users)
})

app.post('/createUsers', async(req, res)=>{
    if (req.body.name === undefined || req.body.name === " " || req.body.name === ""){
        return res.json({error: "Name is required"})
    } 
    else if (req.body.surName === undefined || req.body.surName === " " || req.body.surName === ""){
        return res.json({error: "Surname is required"})
    }
    else if (req.body.password === undefined || req.body.password === " " || req.body.password === ""){
        return res.json({error: "Password is required"})
    }
    const newUser = await User.build({name : `${req.body.name}`, surName: `${req.body.surName}`, password : `${req.body.password}`})
    res.send(newUser)
  
})