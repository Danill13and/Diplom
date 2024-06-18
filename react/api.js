import send from "./bot";

export default function Handler(req, res) {
    if (req.method === "POST"){
        let { body } = req
        send(body)
        res.status(201).json({data: JSON.stringify(body)})
    }
}