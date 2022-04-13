import oracledb from "oracledb"

async function connect(query) {
  let connection;
  try {
    connection = await oracledb.getConnection( {
      user          : "c##btr",
      password      : "root",
      connectString : "localhost:1521/xe"
    });
   let sol = connection.execute(query)
   connection.commit()
   return sol
     }
     catch(e){
         console.log(e)
     }
  }

export default connect