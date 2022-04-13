import oracledb from "oracledb"

async function connect(query) {
  let connection;
  try {
    connection = await oracledb.getConnection( {
      user          : "c##btr",
      password      : "root",
      connectString : "localhost:1521/xe"
    });
   return connection.execute(query)
     }
     catch(e){
         console.log(e)
     }
  }

export default connect