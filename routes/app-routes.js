import express from "express";
const router = express.Router();
import connection from "../server.js";

let session;
router.get("/", async (req, res) => {
  session = req.session;
  if (session.userid) {
    let query = `select user_role,user_id, uname from batch1btr_user where username='${session.userid}'`;
    const sol = await connection.execute(query);
    const user_role = sol["rows"][0][0];
    const user_id = sol["rows"][0][1];
    const uname = sol["rows"][0][2];
    if (user_role == "USER") {
      let query = `select  from_city,to_city,status, date_of_journey, reason from batch1btr_tripdetails where user_id=${user_id}`;
      let trips = await connection.execute(query);
      trips = trips.rows;
      res.render("user_dashboard", { trips, message: "" });
    } else if (user_role != "ADMIN") {
      let query = `select t.trip_id, t.from_city, t.to_city, t.from_country, t.to_country, t.accomodation, t.reason, t.date_of_journey, t.amount, t.currency, t.status, u.uname, u.date_of_joining, u.nationality, u.date_of_birth, u.passport_number from batch1btr_tripdetails t natural join batch1btr_user u where t.pending_with='${user_role}'`;
      let trips = await connection.execute(query);
      trips = trips.rows;
      res.render("super_dashboard", { trips, message: "" });
    } else if (user_role == "ADMIN") {
      let query = `select t.trip_id, t.from_city, t.to_city, t.from_country, t.to_country, t.accomodation, t.reason, t.date_of_journey, t.amount, t.currency, t.status, u.uname, u.date_of_joining, u.nationality, u.date_of_birth, u.passport_number from batch1btr_tripdetails t natural join batch1btr_user u where status = 'In Process'`;
      let trips = await connection.execute(query);
      trips = trips.rows;
      res.render("admin_dashboard", { trips, message: "" });
    }
  } else res.redirect("/account/login");
});

router.get("/create", async (req, res) => {
  if (req.session.userid) {
    const query = `select uname, date_of_joining, nationality, date_of_birth, passport_number from batch1btr_user where username = '${req.session.userid}'`;
    const result = await connection.execute(query);
    const user = result.rows;
    res.render("create.ejs", { user });
  } else {
    res.redirect("/account/login");
  }
});

router.post("/create", async (req, res) => {
  if (!req.session.userid) res.redirect("/account/login");
  else {
    const {
      from_city,
      to_city,
      from_country,
      to_country,
      date_of_journey,
      accomodation,
      reason,
      amount,
      currency,
    } = req.body;
    let query = `select user_id from batch1btr_user where username='${session.userid}'`;
    const sol = await connection.execute(query);
    const user_id = sol["rows"][0][0];
    let insert_query = `INSERT INTO BATCH1BTR_TRIPDETAILS (user_id, from_city, to_city, from_country, to_country, date_of_journey, accomodation, reason, amount,currency, status, pending_with) VALUES('${user_id}','${from_city}', '${to_city}', '${from_country}', '${to_country}', to_char(to_date('${date_of_journey}','yyyy-mm-dd'),'yyyy-mm-dd'), '${accomodation}', '${reason}', '${amount}', '${currency}', 'In Process', 'L1') `;
    const solution = await connection.execute(insert_query);
    connection.commit();
    res.redirect("/");
  }
});

router.get("/approve/:trip_id/:status", async (req, res) => {
  if (!req.session.userid) res.redirect("/account/login");
  else {
    let query = `Select user_role from batch1btr_user where username ='${session.userid}'`;
    const sol = await connection.execute(query);
    const user_role = sol["rows"][0][0];
    let status = req.params.status;

    if (user_role != "USER") {
      let pending_with;
      if (user_role == "L1") {
        pending_with = "L2";
      } else if (user_role == "L2") {
        pending_with = "L3";
      } else {
        pending_with = "none";
        status = "Approved";
      }
      const trip_id = req.params.trip_id;
      query = `update batch1btr_tripdetails set status = '${status}', pending_with = '${pending_with}' where trip_id = '${trip_id}'`;
      await connection.execute(query);
      connection.commit();

      res.redirect("/");
    } else {
      res.redirect("/", { message: "You're not allowed to do this action" });
    }
  }
});

router.get("/decline/:trip_id", async (req, res) => {
  if (!req.session.userid) res.redirect("/account/login");
  else {
    let query = `Select user_role from batch1btr_user where username ='${session.userid}'`;
    const sol = await connection.execute(query);
    const user_role = sol["rows"][0][0];
    if (user_role != "USER") {
      const pending_with = "none";
      const status = "Rejected";
      const trip_id = req.params.trip_id;
      query = `update batch1btr_tripdetails set status = '${status}', pending_with = '${pending_with}' where trip_id = '${trip_id}'`;
      const sol = await connection.execute(query);
      connection.commit();
      res.redirect("/");
    } else {
      res.redirect("/", { message: "You're not allowed to do this action" });
    }
  }
});

export default router;
