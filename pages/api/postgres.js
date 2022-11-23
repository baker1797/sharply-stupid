import { Pool } from "pg";

// TODO: import a function
// import client from '../../lib/db'

export default async (req, res) => {
    try {
        
        const db = new Pool({
            connectionString: process.env.PGSQL_DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
        
        db.connect();
        
        let responseData;

        db.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, dbResponse) => {
            if (err) {
                throw err;
            }
            
            responseData = dbResponse.rows;

            // for (let row of dbResponse.rows) {
            //     console.log(row)
            // }

            res.status(200).json({rows: dbResponse.rows})

            db.end();
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}