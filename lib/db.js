// db.js
import { Pool } from "pg";

export default () => {

  this.db = new Pool({
    connectionString: process.env.PGSQL_DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  this.connect = () => {
    console.log(process.env)
    
    this.db.connect();
  }
  
  
  // let conn;
  
  // if (!conn) {
  //   conn = new Pool({
  //     user: process.env.PGSQL_USER,
  //     password: process.env.PGSQL_PASSWORD,
  //     host: process.env.PGSQL_HOST,
  //     port: process.env.PGSQL_PORT,
  //     database: process.env.PGSQL_DATABASE, // postgres://wubldpvqcoclgs:2a6e7694f3c05f2aeedb2a38571c5878ae9a480c87fe88349e11e46dc5b1fd08@ec2-18-208-55-135.compute-1.amazonaws.com:5432/d1h9qqudj0mg3
  //   });
  // }
    
}
