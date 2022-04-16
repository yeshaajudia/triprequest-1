import express from "express"
import sessions from "express-session"
import cookieParser from "cookie-parser"
import oracledb from "oracledb"

const app = express()
import router from "./routes/app-routes.js"
import routerAcc from "./routes/app-account.js"
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const oneDay = 1000 * 60 * 60 * 24;
let connection;
  try {
    connection = await oracledb.getConnection( {
      user          : "c##btr",
      password      : "root",
      connectString : "localhost:1521/xe"
    });}
    catch(e){
        console.log(e)
    }

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  if (!req.user) {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
  }
  next();
});


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use('/', router)
app.use('/account', routerAcc)


app.listen(1337, ()=>{
    console.log("listening at 1337")
})


export default connection