import express from "express"
const router = express.Router()
import connect from "../connect.js"

import sessions from    "express-session"
import cookieParser from "cookie-parser"
let session
router.get('/', async(req,res)=>{
     session=req.session;
    if(session.userid){
        let query = `select user_role,user_id from batch1btr_user where username='${session.userid}'`
        const sol = await connect(query)
        const user_role = sol['rows'][0][0]
        const user_id = sol['rows'][0][1] 
        if(user_role == 'USER')
        {
            let query = `select * from batch1btr_tripdetails where user_id=${user_id}`
            let trips = await connect(query)
            res.render('user_dashboard', trips)
        } 
        else {
            let query = `select * from batch1btr_tripdetails where status=${user_role}`
            let trips = await connect(query)
            res.render('super_dashboard', trips)
        }
    }
    else res.redirect('/account/login')
})

router.get('/create', (req,res)=>{
    res.render('create.ejs')
})

router.post('/create', async (req,res)=>{
    const from_city = req.body.from_city;
    const to_city = req.body.to_city;
    const from_country = req.body.from_country;
    const to_country = req.body.to_country;
    const date_of_journey = req.body.date_of_journey;
    const accomodation = req.body.accomodation;
    const reason = req.body.reason;
    const amount = req.body.amount;
    const currency = req.body.currency;
    let query = `select user_id from batch1btr_user where username='${session.userid}'`
    const sol = await connect(query)
    const user_id = sol['rows'][0][0]
    let insert_query = `INSERT INTO BATCH1BTR_TRIPDETAILS (user_id, from_city, to_city, from_country, to_country, date_of_journey, accomodation, reason, amount,currency, status) VALUES('${user_id}','${from_city}', '${to_city}', '${from_country}', '${to_country}', to_char(to_date('${date_of_journey}','yyyy-mm-dd'),'yyyy-mm-dd'), '${accomodation}', '${reason}', '${amount}', '${currency}', 'L1') `
    const solution = await connect(insert_query)
    res.redirect('/')   
})




export default router