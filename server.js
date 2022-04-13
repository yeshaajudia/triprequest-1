import oracledb from "oracledb"
import express from "express"
const app = express()

app.listen(1337, ()=>{
    console.log("listening at 1337")
})

app.get("/", (req,res)=>{
    const query = "select * from emp"
    res.send(connect(query))
})

async function connect(query) {

    let connection;
  
    try {
      connection = await oracledb.getConnection( {
        user          : "c##aduser",
        password      : "root",
        connectString : "localhost:1521/xe"
      });
      connection.execute(
        `SELECT *
         FROM emp`,
        [],  
       function(err, result) {
          if (err) {
            console.error(err.message);
            return;
          }
          console.log(result.rows);
          return result.rows
       });
       
       }
       catch(e){
           console.log(e)
       }}