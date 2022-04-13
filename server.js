import express from "express"
const app = express()
import connect from "./connect.js"

app.listen(1337, ()=>{
    console.log("listening at 1337")
})

app.get("/", async (req,res)=>{
    const query = "select * from batch1btr_user"
    const sol = await connect(query)
    res.send(sol)
})
