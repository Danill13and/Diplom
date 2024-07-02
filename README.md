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

- Авторизація: можливість входу в систему за допомогою облікового запису.
- Реєстрація: створення нового облікового запису для нових користувачів.
- Сторінка продукту: детальний опис та фото продукту.
- Категорії: сортування продуктів за категоріями.
- Меню: перегляд усіх доступних страв та напоїв.
- Корзина: управління продуктами, що додані до корзини.
- Замовлення: оформлення та перегляд статусу замовлення.

## Дякуємо цим технологіям!
| Технології      | Опис                                                                                     |
|-----------------|--------------------------------------------------------------------------------------------|
| ![JS]      | **JavaScript** — Універсальна мова програмування, що використовується головним чином для веб-розробки, створення інтерактивного та динамічного контенту. |
| ![React]   | **React** — JavaScript бібліотека для створення користувацьких інтерфейсів, що зазвичай використовується для односторінкових додатків.                                                               |
| ![Figma]    | **Figma** — Спільний веб-інструмент для дизайну, що використовується для UI/UX дизайну, прототипування та систем дизайну.                                                                                     |
| ![Android]      | **Android Studio** — Офіційне інтегроване середовище розробки (IDE) для розробки додатків на Android, яке надає інструменти для кодування, тестування та налагодження додатків на Android.                              |
| ![NPM]   | **NPM** — Менеджер пакетів для JavaScript, що дозволяє розробникам встановлювати, ділитися та керувати залежностями в їхніх проектах.                                                     |
| ![GITHUB]    | **GitHub** — Веб-платформа, що використовує Git для контролю версій та надає хостинг для розробки програмного забезпечення і співпраці.                                                                                     |
| ![GIT]      | **Git** — Розподілена система контролю версій, яка допомагає відслідковувати зміни у вихідному коді під час розробки програмного забезпечення.                |


## Посилання:
- [ChateeRideeApi на GitHub](https://github.com/Danill13and/ChateeRideeApi)
- [Офіційний сайт ChateeRidee](https://chateerideenext.onrender.com)
- [ChateeRideeNext не GitHub](https://github.com/Danill13and/ChateeRideeNext)
- [FigJam](https://www.figma.com/board/DZvY6S7bTmC2VGfLkGLbnq/Untitled?node-id=0-1&t=BGfJ7JayoCYhX5MB-0)
- [Figma](https://www.figma.com/design/KdVGG744zLgVvt9n2zp7fQ/Untitled?node-id=0-1&t=udfoOUD8fnrdfE3m-0)

## Встановлення

1. Клонуйте репозиторій:
```bash
 git clone https://github.com/Danill13and/Diplom

2.Перейдіть у папку проекту

3. Встановіть модулі для роботи Next.js:
  cd nextJs
  npm install

4. Запустіть Next.js:
  npm run

5. Встановіть модулі для роботи Expo:

6. Запустіть Expo:

## Приклад коду
"use client";

import { useState, useEffect } from 'react';
import styles from '../styles/auth.module.css';
import { useCookies } from 'react-cookie'
require('dotenv').config()

export function AuthModal({ isOpen, onClose }) {
  const url = process.env.url

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [animate, setAnimate] = useState(false);
  const [cookies, setCookies] = useCookies(['apiKey'])

  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
    }
  }, [isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const userData = {
      name: firstName,
      surName: lastName,
      password
    };

    try {
      const response = await fetch(`https://chateerideeapi.onrender.com/userLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const user = await response.json();
      setSuccess(`Welcome, ${user.name}!`);
      setCookies("apiKey", user.apikey)
    } catch (error) {
      setError(error.message);
    }
  };

  const closeModal = () => {
    setAnimate(false);
    setTimeout(onClose, 300);
    location.reload()
  };

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
            baskets = await Basket.findAll({ where: { userID: ${userId} } });
            console.log(user: ${await Basket.findAll({ where: { userID: `${userId} } })}`);
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



## Розробники:
- [Андросов Данило](https://github.com/Danill13and) 
- [Ярослав Марченко](https://github.com/Marchenko-YAroslav)
- [Мулько Артем](https://github.com/ArtemMulko)
