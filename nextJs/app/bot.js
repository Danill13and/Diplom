import { Telegraf } from "telegraf"

const bot = new Telegraf("7074928480:AAH0v0HuCHmLv9d3R292U4w22kVmGLShmyI")

function send(adress){
    bot.telegram.sendMessage(-1001841525416, `Нове замовленя на адрес: ${adress}`)
}

export default send