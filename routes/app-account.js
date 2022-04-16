import express from "express"
import connection from "../server.js"
const routerAcc = express.Router()
import bcrypt from 'bcrypt'

let session

routerAcc.get('/login', (req,res)=>{
    res.render('login', {"message":""})
})

routerAcc.post('/login', async (req,res)=>{
    const username= String(req.body.username)
    const password = String(req.body.password)
    const query = `select userpassword from batch1btr_user where username='${username}'`
    const sol = await connection.execute(query)
    // console.log(sol['rows'])
    const passwordHash = String(sol['rows'][0])
    const match = await bcrypt.compare(password, passwordHash);
    // console.log(match)
    if (match){
        session=req.session;
        session.userid=req.body.username;
        res.redirect('/');
    }
    else{
        res.render('login',{"message":"incorrect username or password"});
    }
    }
)

routerAcc.get('/logout',(req,res) => {
    req.session.destroy()
    res.redirect('/');
});


routerAcc.get('/register', (req,res)=>{
    res.render('register', {"message":""})
})

routerAcc.post('/register',async (req,res)=>{
    const username = req.body.username
    let query = `select username from batch1btr_user where username = '${username}'`
    let sol = await connection.execute(query)
    // console.log(sol['rows'])
    if (!sol['rows']) return res.render('register', {"message": "username already exists"})
    const password = req.body.password
    const uname  = req.body.uname
    const date_of_joining = req.body.date_of_joining
    const nationality = req.body.nationality
    const date_of_birth = req.body.date_of_birth
    const passport_number = req.body.passport_number
    const hashedPassword = bcrypt.hashSync(password,10)
    query = `INSERT INTO BATCH1BTR_USER (USERNAME, USERPASSWORD, UNAME,DATE_OF_JOINING, NATIONALITY, DATE_OF_BIRTH, PASSPORT_NUMBER, USER_ROLE) VALUES ('${username}','${hashedPassword}','${uname}', to_char(to_date('${date_of_joining}','yyyy-mm-dd'),'yyyy-mm-dd'), '${nationality}', to_char(to_date('${date_of_birth}','yyyy-mm-dd'),'yyyy-mm-dd'),'${passport_number}', 'USER')`
    sol = await connection.execute(query)
    connection.commit()
    res.render('login', {"message":""})
})

export default routerAcc