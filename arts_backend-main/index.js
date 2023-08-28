import express from "express"
import mysql from "mysql2"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config({ path: `.env` });

const app = express()

app.use(cors())

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
})

app.use(express.json())

app.get("/", (req, res) => {
    res.json("Hello this is backend")
})

app.get("/arts", (req, res) => {
    const q = "SELECT * FROM arts"
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/arts/:id", (req, res) => {
    const artId = req.params.id
    const q = "SELECT * FROM arts WHERE id = ?"
    db.query(q, [artId], (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/arts", (req, res) => {
    const q = "INSERT INTO arts (`title`, `desc`, `price`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("Art has been created successfully")
    })
})

app.delete("/arts/:id", (req, res) => {
    const artId = req.params.id
    const q = "DELETE FROM arts WHERE id = ?"
    db.query(q, [artId], (err, data) => {
        if(err) return res.json(err)
        return res.json("Art has been deleted successfully")
    })
})

app.put("/arts/:id", (req, res) => {
    const artId = req.params.id
    const q = "UPDATE arts SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]
    db.query(q, [...values, artId], (err, data) => {
        if(err) return res.send(err)
        return res.json(data)
    })
})

app.listen(process.env.APP_PORT, () => {
    console.log('Connected to backend')
})