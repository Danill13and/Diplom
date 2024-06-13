import send from "@/app/bot";

export default function handler(req, res) {
    if (req.method === "POST"){
        let { body } = req
        body = JSON.parse(body)
        send(body)
        res.status(201).json({data: JSON.stringify(body)})
    }
}