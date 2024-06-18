const express = require('express')
const Product = require("./ProductDB")
const Category = require("./categoryDB")
const User = require("./userDB")
const Basket = require("./basketDB")
const Order = require("./orderDB")
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')
const { where } = require('sequelize')


const app = express()
app.use(express.urlencoded({ extended: true })); 
app.use(express.json())
app.use(cors())

function isValid(username) {
    return /^[a-zA-Z]+$/.test(username)
}

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
    else if(isValid(req.body.name) === false){
        return res.json({error: "Name is invalid"})
    }
    else if (req.body.lastName === undefined || req.body.lastName === " " || req.body.lastName === ""){
        return res.json({error: "Surname is required"})
    }
    else if(isValid(req.body.lastName) === false){
        return res.json({error: "Name is invalid"})
    }
    else if (req.body.password === undefined || req.body.password === " " || req.body.password === ""){
        return res.json({error: "Password is required"})
    }
    // else if (len(req.body.password) < 8){
    //     return res.json({error: "Password is smaller than 8 characters"})
    // }
    const newUser = await User.create({name : `${req.body.name}`, surName: `${req.body.lastName}`, password : `${req.body.password}`, apikey : apikey})
    res.send(newUser)
})

app.post("/addToBasket/:id", async (req, res) => {
    const apiKey = req.headers["api-key"]
    const product = req.params.id
    if(apiKey && apiKey !== undefined && apiKey !== "undefined"){
        const UsersID = await User.findOne({where: {apikey: apiKey}})
        const allBasket = await Basket.findOne({where: {userID: `${UsersID.id}`, productID: `${product}`}})
        if(!allBasket){
            const basketOfUsers = await Basket.create({userID: `${UsersID.id}`, productID: product})
            res.send(basketOfUsers)
        }else{
            allBasket.update({count: allBasket.count + 1})
            res.send(allBasket)
        }
    }else{
        const userToken = req.headers["user_token"]
        const allBasket = await Basket.findOne({where: {user_token: `${userToken}`, productID: `${product}`}})
        if(!allBasket){
            const basketOfUsers = await Basket.create({user_token: `${userToken}`, productID: product})
            res.send(basketOfUsers)
        }else{
            allBasket.update({count: allBasket.count + 1})
            res.send(allBasket)
        }
    }
    
})

app.get("/basket", async (req, res) => {
    try {
        const apiKey = req.headers["api-key"];
        let basketItems;
        let products = [];
        let basket = [];

        if (apiKey && apiKey !== "undefined") {
            // Проверка наличия и валидности apiKey
            const user = await User.findOne({ where: { apikey: apiKey } });

            if (!user) {
                return res.status(404).json({ error: "Пользователь не найден" });
            }

            // Поиск товаров в корзине по userID
            basketItems = await Basket.findAll({ where: { userID: user.id } });

        } else {
            const userToken = req.headers["user_token"];

            if (!userToken || userToken === "undefined") {
                return res.status(400).json({ error: "Отсутствует пользовательский токен" });
            }

            // Поиск товаров в корзине по user_token
            basketItems = await Basket.findAll({ where: { user_token: userToken } });
        }

        // Проверка наличия товаров в корзине
        if (!basketItems || basketItems.length === 0) {
            return res.status(404).json({ error: "Корзина пользователя пуста" });
        }

        // Получение всех товаров в корзине
        for (const item of basketItems) {
            
            const product = await Product.findOne({ where: { id: item.productID } });
            if (product) {
                products.push(product);
                basket.push(item)
            }
        }

        res.json({prod: products, basket: basket});
    } catch (error) {
        console.error("Ошибка при получении товаров из корзины:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
})

app.delete("/deleteBasket", async (req, res) => {
    const product = req.body.id
    const deleteProduct = await Basket.destroy({where: {productID: `${product}`}})
    res.send("delete product")
})

app.post("/productPlus", async (req, res) => {
    const product = req.body.id
    console.log(product)
    const apiKey = req.headers["api-key"]
    if (apiKey && apiKey !== "undefined") {
        const UsersID = await User.findOne({apikey: apiKey})
        const productPlus = await Basket.findOne({where: {id: product}})
        console.log(productPlus)
        if(productPlus.count <= 9){
            console.log(productPlus.count)
            productPlus.update({count: productPlus.count + 1})
            res.send(productPlus)
        }else{
            res.send("Ай яй яй)")
        }
    }else{
        const userToken = req.headers["user_token"]
        const productPlus = await Basket.findOne({where: {user_token: userToken }})
        if(productPlus.count <= 9){
            console.log(productPlus.count)
            productPlus.update({count: productPlus.count + 1})
            res.send(productPlus)
        }else{
            res.send("Ай яй яй)")
        }
    }
})

app.post("/productMinus", async (req, res) => {
    const product = req.body.id
    const apiKey = req.headers["api-key"]
    if (apiKey && apiKey !== "undefined") {
        const UsersID = await User.findOne({apikey: apiKey})
        const productMinus = await Basket.findOne({where: {id: product}})
        if(productMinus.count > 1){
            console.log(productMinus.count)
            productMinus.update({count: productMinus.count - 1})
            res.send(productMinus)
        }else{
            res.send("Ай яй яй)")
        }
    }else{
        const userToken = req.headers["user_token"]
        const productMinus = await Basket.findOne({where: {user_token: userToken }})
        if(productMinus.count > 1){
            console.log(productMinus.count)
            productMinus.update({count: productMinus.count - 1})
            res.send(productMinus)
        }else{
            res.send("Ай яй яй)")
        }
    }
})

app.get("/getUser", async (req, res) => {
    const user = req.headers["api-key"]
    const getUser = await User.findOne({where: {apikey: `${user}`}})
    res.send(getUser)
})

app.get("/getProductFromBasket", async (req, res) => {
    try {
        const apiKey = req.headers["api-key"];
        let products = [];
        let basketItems
        let basket = [];
        let users = [];

        if (apiKey && apiKey !== "undefined") {
            // Проверка наличия и валидности apiKey
            const user = await User.findOne({ where: { apikey: apiKey } });
            if (!user) {
                return res.status(404).json({ error: "Пользователь не найден" });
            }
            users.push(user)
            // Поиск товаров в корзине по userID
            basketItems = await Basket.findAll({ where: { userID: `${user.id}` } });
        } else {
            const userToken = req.headers["user_token"];

            // Поиск товаров в корзине по user_token
            basketItems = await Basket.findAll({ where: { user_token: userToken } });
        }

        // Проверка наличия товаров в корзине
        if (!basketItems || basketItems.length === 0) {
            return res.status(404).json({ error: "Корзина пользователя пуста" });
        }

        // Получение всех товаров в корзине
        for (const item of basketItems) {
            
            const product = await Product.findOne({ where: { id: item.productID } });
            if (product) {
                products.push(product);
                basket.push(item)
            }
        }

        res.json({prod: products, basket: basket, user: users});
    } catch (error) {
        console.error("Ошибка при получении товаров из корзины:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
});

app.post('/order', async (req, res) => {
    const price = req.body.totalPrice;
    const order_data = req.body.orderData
    let redirect;

    fetch("https://api.monobank.ua/api/merchant/invoice/create", {
        method: "POST",
        headers: {
            'X-Token': 'uigkesLKd3ssnxM06KdCtEuf7qO7GEzXKoirkn2vtLIE',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "amount": Number(`${price}00`),
            "ccy": 840
        })
    })
    .then((response) => {
        // console.log(response);
        return response.json();
    })
    .catch(error =>{
        res.send(error)
    })
    .then(async (data) => {
        const order = await Order.create({
            inVoiceId: data.invoiceId,
            success: false,
            orderData: order_data
        })
        res.send(data)
    });
});

app.get('/checkOrder', async (req, res) => {
    let orders = await Order.findAll({
        where:{
            success: false
        }
    })
    for (let order of orders){
        let invoiceId = order.dataValues.inVoiceId
        console.log(invoiceId)
        fetch(`https://api.monobank.ua/api/merchant/invoice/status?invoiceId=${invoiceId}`,{
            method: "GET",
            headers: {
                'X-Token': 'uigkesLKd3ssnxM06KdCtEuf7qO7GEzXKoirkn2vtLIE',
                "Content-Type": "application/json"
            }
        }).then((response)=>{
            return response.json()
        }).then(async (data) =>{
            console.log(222)
            console.log(data)
            if (data.status == 'success'){
                console.log(111)
                res.send(data)
                order.update({success : true})
            }
        })
    }
})

app.get('/getOrders', async (req, res) => {
    try {
        // Получение значения заголовка, проверка наличия и логирование
        const invoiceId = req.headers["invoice-id"];
        console.log(`Received invoiceId: ${invoiceId}`);

        // Проверка наличия invoiceId в заголовках
        if (!invoiceId) {
            return res.status(400).send({ error: "Invoice ID is required" });
        }

        // Поиск заказа по invoiceId
        const orders = await Order.findOne({
            where: {
                inVoiceId: invoiceId
            }
        });

        // Проверка, был ли найден заказ
        if (!orders) {
            return res.status(404).send({ error: "No orders found for the provided invoice ID" });
        }

        // Отправка найденного заказа клиенту
        res.status(200).send(orders);
    } catch (error) {
        console.error(`Error fetching orders: ${error.message}`);
        res.status(500).send({ error: "An error occurred while fetching the orders" });
    }
});


app.listen(8000)