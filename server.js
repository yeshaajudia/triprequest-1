import express from "express"
const app = express()
import connect from "./connect.js"

async function run(){
const con = connect()
// console.log(con)
try{
// const result = con.execute(`select * from batch1btr_user`)

const result = await con.execute(`select * from emp`)
console.log(result.rows)
}
catch(e){console.log(e)}
}
run()