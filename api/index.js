const express = require('express')
<<<<<<< HEAD
require('dotenv').config()
=======
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
const Product = require("./ProductDB")
const Category = require("./categoryDB")
const User = require("./userDB")
const Basket = require("./basketDB")
const Order = require("./orderDB")
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')
const { where } = require('sequelize')
<<<<<<< HEAD
const { Telegraf } =require("telegraf")

const MonoBankToken = process.env.MonoBankToken
const TelegramToken = process.env.TelegramToken
=======


>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
const app = express()
app.use(express.urlencoded({ extended: true })); 
app.use(express.json())
app.use(cors())

<<<<<<< HEAD
const bot = new Telegraf(TelegramToken)


function isValidName(username) {
    return /^[a-zA-Zа-яА-ЯёЁ]+$/.test(username);
}

function checkAvailability(arr, val) {
  return arr.some(function (arrVal) {
    return val === arrVal;
  });
=======
function isValid(username) {
    return /^[a-zA-Z]+$/.test(username)
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
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
<<<<<<< HEAD
=======
    console.log(id)
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
    const product = await Product.findAll({where: {category: id}});
    res.send(product);
});

app.get('/mainProduct/:id', async(req, res)=>{
    const id = req.params.id; 
<<<<<<< HEAD
=======
    console.log(id);
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
    const prod = await Product.findOne({where: {id: id}})
    res.send(prod)
})

app.post('/createUsers', async(req, res)=>{
    const apikey = uuidv4()
    if (req.body.name === undefined || req.body.name === " " || req.body.name === ""){
        return res.json({error: "Name is required"})
    } 
<<<<<<< HEAD
    else if(isValidName(req.body.name) === false){
=======
    else if(isValid(req.body.name) === false){
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
        return res.json({error: "Name is invalid"})
    }
    else if (req.body.lastName === undefined || req.body.lastName === " " || req.body.lastName === ""){
        return res.json({error: "Surname is required"})
    }
<<<<<<< HEAD
    else if(isValidName(req.body.lastName) === false){
        return res.json({error: "SurName is invalid"})
=======
    else if(isValid(req.body.lastName) === false){
        return res.json({error: "Name is invalid"})
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
    }
    else if (req.body.password === undefined || req.body.password === " " || req.body.password === ""){
        return res.json({error: "Password is required"})
    }
<<<<<<< HEAD
    else if (req.body.password.length < 8){
        return res.json({error: "Password is smaller than 8 characters"})
    }
    else if (req.body.password != req.body.rePassword){
        return res.json({error: "Password mismatch"})
    }
    else if (req.body.phoneNumber === undefined || req.body.phoneNumber === " " || req.body.phoneNumber === ""){
        return res.json({error: "Phone number is required"})
    }
    else if (req.body.phoneNumber.length < 10){
        return res.json({error: "Phone number is invalid"})
    }
    const newUser = await User.create({name : `${req.body.name}`, surName: `${req.body.lastName}`, password : `${req.body.password}`, apikey : apikey, phoneNumber : `${req.body.phoneNumber}`})
=======
    // else if (len(req.body.password) < 8){
    //     return res.json({error: "Password is smaller than 8 characters"})
    // }
    const newUser = await User.create({name : `${req.body.name}`, surName: `${req.body.lastName}`, password : `${req.body.password}`, apikey : apikey})
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
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
<<<<<<< HEAD
=======
        console.log(productPlus)
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
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
<<<<<<< HEAD
=======
            console.log(productPlus.count)
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
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
<<<<<<< HEAD
=======
            console.log(productMinus.count)
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
            productMinus.update({count: productMinus.count - 1})
            res.send(productMinus)
        }else{
            res.send("Ай яй яй)")
        }
    }else{
        const userToken = req.headers["user_token"]
        const productMinus = await Basket.findOne({where: {user_token: userToken }})
        if(productMinus.count > 1){
<<<<<<< HEAD
=======
            console.log(productMinus.count)
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
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
<<<<<<< HEAD
    const apiKey = req.headers["api-key"];
    let products = [];
    let basketItems
    let basket = [];
    let users = [];
    
    try {
        if (apiKey && apiKey !== "undefined") {
            // Проверка наличия и валидности apiKey
            const user = await User.findOne({ where: { apikey: apiKey } });
            if (!user) {
                return res.status(404).json({ error: "Пользователь не найден" });
            }
            console.log(user.id)
            users.push(user.id)
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
                products.push(product.id);
                basket.push(item.id)
            }
        }

        fetch("https://api.monobank.ua/api/merchant/invoice/create", {
            method: "POST",
            headers: {
                'X-Token': MonoBankToken,
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
                orderData: order_data,
                user: users,
                prod: products,
                basket: basket
            })
            res.send(data)
        });
    } catch (error) {
        console.error("Ошибка при получении товаров из корзины:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
});

app.get('/checkOrder', async (req, res) => {
    // const orderData = req.headers['order-data'];
    // console.log(orderData);
    let products = [];
    let baskets = [];
    let basketItems
    let user
    try {
        const orders = await Order.findAll({ where: { success: false } });

        

        for (let order of orders) {
            const invoiceId = order.dataValues.inVoiceId;
            const userId = order.dataValues.user;
            const orderData = order.dataValues.orderData

            user = await User.findOne({ where: { id: userId } });
            if (user) {
                basketItems = await Basket.findAll({ where: { userID: `${userId[0]}` } });
            }else{
                const userToken = req.headers["user_token"];

                basketItems = await Basket.findAll({ where: { user_token: userToken } });
            }
            for (const item of basketItems) {
                const product = await Product.findOne({ where: { id: item.productID } });
                if (product) {
                    products.push(product);
                    baskets.push(item)
                }
            }
            
            fetch(`https://api.monobank.ua/api/merchant/invoice/status?invoiceId=${invoiceId}`, {
                method: "GET",
                headers: {
                    'X-Token': MonoBankToken,
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                return response.json();
            })
            .catch(error =>{
                res.send(error)
            })
            .then(async (data) => {
                console.log(baskets)
                if (data.status === 'success') {
                    await order.update({ success: true });
                    let message = `*НОВЕ ЗАМОВЛЕННЯ!!!*\n\n*Користувач:*\n`;
                    if (user && user !== "undefined") {
                        message += `Ім'я: ${user.name}\nПрізвище: ${user.surName}\n`;
                        message += `Адреса: ${orderData.adress}\nНомер телефону: ${user.phoneNumber}\n\n*Товари які замовив користувач:*`;
                    } else {
                        message += `Ім'я: ${orderData.name}\nПрізвище: ${orderData.sureName}\n`;
                        message += `Адреса: ${orderData.adress}\nНомер телефону: ${orderData.phoneNumber}\n\n*Товари які замовив користувач:*`;
                    }
                    
                
                    let totalPrice = 0;
                    let basketId = []
                    for (let i = 0; i < products.length; i++) {
                        const product = products[i].dataValues;
                        const basket = baskets[i].dataValues;
                        if(checkAvailability(basketId, basket.id)){
                            NaN
                        }else{
                            message += `\nНазва: ${product.name}\nЦіна: ${product.price} UAH\nКількість: ${basket.count}\n`;
                            totalPrice += basket.count * product.price;
                            basketId.push(basket.id)
                        }
                    }
                    message += `\nЗагальна вартість: ${totalPrice}`;
                
                    bot.telegram.sendMessage(-4260426752, message, { parse_mode: 'Markdown' });
                    
                }
            })
        }
    } catch (error) {
        console.error("Error in /checkOrder route:", error);
        res.status(500).json({ error: "An error occurred while checking orders" });
    }
});
=======
    let redirect;

    fetch("https://api.monobank.ua/api/merchant/invoice/create", {
        method: "POST",
        headers: {
            'X-Token': '',
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
                'X-Token': '',
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
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9

app.get('/getOrders', async (req, res) => {
    try {
        // Получение значения заголовка, проверка наличия и логирование
        const invoiceId = req.headers["invoice-id"];
<<<<<<< HEAD
=======
        console.log(`Received invoiceId: ${invoiceId}`);
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9

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

<<<<<<< HEAD
app.listen(8000)
=======

app.listen(8000)
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
