import express from "express"
import connection from "../server.js"
const routerAcc = express.Router()
// import sessions from    "express-session"
// import cookieParser from "cookie-parser"
// const cookieParser = require("cookie-parser");
// const sessions = require('express-session');

let session

routerAcc.get('/login', (req,res)=>{
    res.render('login')
})

routerAcc.post('/login', async (req,res)=>{
    const username= String(req.body.username)
    const password = req.body.password
    const query = `select userpassword from batch1btr_user where username='${username}'`
    const sol = await connection.execute(query)
    if (sol['rows'][0][0]==password){
        session=req.session;
        session.userid=req.body.username;
        res.redirect('/');
    }
    else{
        res.send('Invalid username or password');
    }
    }
)

routerAcc.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});


routerAcc.get('/register', (req,res)=>{
    res.render('register')
})

routerAcc.post('/register',async (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const uname  = req.body.uname
    const date_of_joining = req.body.date_of_joining
    const nationality = req.body.nationality
    const date_of_birth = req.body.date_of_birth
    const passport_number = req.body.passport_number
    // const user_role = 'USER'
    const query = `INSERT INTO BATCH1BTR_USER (USERNAME, USERPASSWORD, UNAME,DATE_OF_JOINING, NATIONALITY, DATE_OF_BIRTH, PASSPORT_NUMBER, USER_ROLE) VALUES ('${username}','${password}','${uname}', to_char(to_date('${date_of_joining}','yyyy-mm-dd'),'yyyy-mm-dd'), '${nationality}', to_char(to_date('${date_of_birth}','yyyy-mm-dd'),'yyyy-mm-dd'),'${passport_number}', 'USER')`
    const sol = await connection.execute(query)
    connection.commit()
    res.redirect('login')
})

export default routerAcc