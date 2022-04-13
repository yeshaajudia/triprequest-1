import oracledb from "oracledb"

async function connect() {

    let connection;
  
    try {
      connection = await oracledb.getConnection( {
        user          : "c##aduser",
        password      : "root",
        connectString : "localhost:1521/xe"
      });
    }
    catch(e){
        console.log(e)
    }
    return connection
}


// run()
export default connect