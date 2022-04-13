import express from "express"
const app = express()
import router from "./routes/app-routes"
import routerAcc from "./routes/app-account"
import path from 'path';

app.use('/', router)
app.use('/account', routerAcc)
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



app.listen(1337, ()=>{
    console.log("listening at 1337")
})



// import connect from "./connect.js"
// app.get("/", async (req,res)=>{
//     const query = "select * from batch1btr_user"
//     const sol = await connect(query)
//     res.send(sol)
// })
