import express from "express";
const router = express.Router();
import connect from "../connect.js";

import sessions from "express-session";
import cookieParser from "cookie-parser";
let session;
router.get("/", async (req, res) => {
  session = req.session;
  if (session.userid) {
    let query = `select user_role,user_id, uname from batch1btr_user where username='${session.userid}'`;
    const sol = await connect(query);
    const user_role = sol["rows"][0][0];
    const user_id = sol["rows"][0][1];
    const uname = sol["rows"][0][2];
    if (user_role == "USER") {
      let query = `select * from batch1btr_tripdetails where user_id=${user_id}`;
      let trips = await connect(query);
      trips = trips.rows;
      console.log(trips);
      res.render("user_dashboard", { trips });
    } else {
      let query = `select * from batch1btr_tripdetails where pending_with = '${uname}'`;
      let trips = await connect(query);
      trips = trips.rows;

      res.render("super_dashboard", { trips });
    }
  } else res.redirect("/account/login");
});

router.get("/create", async (req, res) => {
  if(req.session.userid){
    const query = `select * from batch1btr_user where username = '${req.session.userid}'`
    const result = await connect(query)
    const user =  result.rows
    // console.log(user)
    res.render("create.ejs", { user });
  }
  else{
    res.redirect('/account/login')
  }
 } )
;

router.post("/create", async (req, res) => {
  if(!req.session.userid) res.redirect("/account/login")
  else{
  const from_city = req.body.from_city;
  const to_city = req.body.to_city;
  const from_country = req.body.from_country;
  const to_country = req.body.to_country;
  const date_of_journey = req.body.date_of_journey;
  const accomodation = req.body.accomodation;
  const reason = req.body.reason;
  const amount = req.body.amount;
  const currency = req.body.currency;
  let query = `select user_id from batch1btr_user where username='${session.userid}'`;
  const sol = await connect(query);
  const user_id = sol["rows"][0][0];
  let insert_query = `INSERT INTO BATCH1BTR_TRIPDETAILS (user_id, from_city, to_city, from_country, to_country, date_of_journey, accomodation, reason, amount,currency, status) VALUES('${user_id}','${from_city}', '${to_city}', '${from_country}', '${to_country}', to_char(to_date('${date_of_journey}','yyyy-mm-dd'),'yyyy-mm-dd'), '${accomodation}', '${reason}', '${amount}', '${currency}', 'In Process') `;
  const solution = await connect(insert_query);
  res.redirect("/");
}});


router.get("/approve/:trip_id/:status", async (req, res) => {
  if(!req.session.userid) res.redirect("/account/login")
  else{
  let query = `Select user_role from batch1btr_user where username ='${session.userid}'`;
  const sol = await connect(query);
  const user_role = sol["rows"][0][0];
  let status = req.params.status;

  if (user_role != 'USER') {
    let pending_with;
    if (user_role == "L1") {
      pending_with = "depthead";
    } else if (user_role == "L2") {
      pending_with = "prochead"
    } else {
      pending_with = "none";
      status = "Approved"
    }
    const trip_id = req.params.trip_id;
    query = `update batch1btr_tripdetails set status = '${status}', pending_with = '${pending_with}' where trip_id = '${trip_id}'`
    await connect(query);
    res.redirect('/')
  } else {
    res.send("You're not allowed to do this action")
  }
}})

router.get("/decline/:trip_id", async (req, res) => {
  if(!req.session.userid) res.redirect("/account/login")
  else{
  let query = `Select user_role from batch1btr_user where username ='${session.userid}'`;
  const sol = await connect(query);
  // console.log(sol["rows"])
  const user_role = sol["rows"][0][0];
  // let status = req.body.status;
  if (user_role != 'USER') {
    const pending_with = "none"
    const status = "Rejected"
    const trip_id = req.params.trip_id
    query = `update batch1btr_tripdetails set status = '${status}', pending_with = '${pending_with}' where trip_id = '${trip_id}'`
    const sol = await connect(query);
    res.redirect('/')
  }
  else {
    res.send("You're not allowed to do this action")
  }

}})



export default router;
