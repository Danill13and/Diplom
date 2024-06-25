# ChateeRidee - Ресторан французької кухні

Ласкаво просимо до репозиторію сайту "ChateeRidee", ресторану французької кухні. Цей файл містить документацію для нашого веб-сайту, який включає авторизацію, реєстрацію, сторінку продукту, категорії, меню, корзину та систему замовлень.

## Зміст

- [Опис](#опис)
- [Функціонал](#функціонал)
- [Використані технології](#використані-технології)
- [Розробники](#розробники)
- [Посилання](#посилання)
- [Зображення](#зображення)
- [Приклад коду](#приклад-коду)

## Опис

"ChateeRidee" - це ресторан французької кухні, що пропонує широкий вибір страв та напоїв. Наш сайт дозволяє користувачам переглядати меню, здійснювати замовлення та керувати своєю корзиною.

## Функціонал

- **Авторизація**: можливість входу в систему за допомогою облікового запису.
- **Реєстрація**: створення нового облікового запису для нових користувачів.
- **Сторінка продукту**: детальний опис та фото продукту.
- **Категорії**: сортування продуктів за категоріями.
- **Меню**: перегляд усіх доступних страв та напоїв.
- **Корзина**: управління продуктами, що додані до корзини.
- **Замовлення**: оформлення та перегляд статусу замовлення.

## Використані технології

- **Frontend:**
  - CSS
  - JavaScript
  - React.js

- **Backend:**
  - Node.js

- **База даних:**
  - PostgreSQL

## Розробники:
- [Андросов Данило (Тімлід)](https://github.com/Danill13and) 
- [Ярослав Марченко](https://github.com/Marchenko-YAroslav)
- [Мулько Артем](https://github.com/ArtemMulko)

## Посилання:
- [ChateeRideeApi на GitHub](https://github.com/Danill13and/ChateeRideeApi)
- [Офіційний сайт ChateeRidee](https://www.chateeridee.com)

## Зображення

## Приклад коду

### Фрагмент коду для отримання даних про замовлення

```javascript
app.get('/checkOrder', async (req, res) => {
    let products = [];
    let basket = [];
    let users = [];
    let baskets;
    const order_data = req.headers['order-data'];
    let orders = await Order.findAll({
        where:{
            success: false
        }
    });
    for (let order of orders){
        let invoiceId = order.dataValues.inVoiceId;
        const userId = order.dataValues.user;
        const user = await User.findOne({
            where:{
                id: userId
            }
        });
        users.push(user);
        if(user){
            baskets = await Basket.findAll({ where: { userID: `${userId}` } });
            console.log(`user: ${await Basket.findAll({ where: { userID: `${userId}` } })}`);
        } else {
            const userToken = req.headers["user_token"];
            baskets = await Basket.findAll({ where: { user_token: userToken } });
            console.log(`user_token: ${await Basket.findAll({ where: { user_token: userToken } })}`);
        }

        for (const item of baskets) {
            const product = await Product.findOne({ where: { id: item.productID } });
            if (product) {
                products.push(product);
                basket.push(item);
            }
        }
        fetch(`https://api.monobank.ua/api/merchant/invoice/status?invoiceId=${invoiceId}`,{
            method: "GET",
            headers: {
                'X-Token': MonoBankToken,
                "Content-Type": "application/json"
            }
        }).then((response) => {
            return response.json();
        }).then(async (data) => {
            console.log(222);
            console.log(data);
            if (data.status == 'success'){
                console.log(111);
                res.json({orderData: order_data, user: users, products: products, basket: basket});
                order.update({success : true});
            }
        });
    }
});
