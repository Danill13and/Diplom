const { Telegraf } = require('telegraf')



const bot = new Telegraf("7074928480:AAH0v0HuCHmLv9d3R292U4w22kVmGLShmyI")

function send(address) {
    const { orderData, userProds, userBasket, user } = address;

    let message = `*НОВЕ ЗАМОВЛЕННЯ!!!*\n\n*Користувач:*\n`;
    if (user && user !== "undefined") {
        message += `Ім'я: ${user[0].name}\nПрізвище: ${user[0].surName}\n`;
    } else {
        message += `Ім'я: ${orderData.name}\nПрізвище: ${orderData.sureName}\n`;
    }
    message += `Адреса: ${orderData.adress}\nНомер телефону: ${orderData.phoneNumber}\n\n*Товари які замовив користувач:*`;

    let totalPrice = 0;
    for (let i = 0; i < userProds.length; i++) {
        const product = userProds[i];
        const basket = userBasket[i];
        message += `\nНазва: ${product.name}\nЦіна: ${product.price} UAH\nКількість: ${basket.count} шт.\n`;
        totalPrice += basket.count * product.price;
    }
    message += `\nЗагальна вартість: ${totalPrice} UAH`;

    bot.telegram.sendMessage(-4260426752, message, { parse_mode: 'Markdown' });
}

export default send;