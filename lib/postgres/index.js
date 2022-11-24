import { Pool } from "pg";
import { resolve } from "styled-jsx/css";
// import { CREATE_TABLE_MATCHES } from "../config";

const db = new Pool({
    connectionString: process.env.PGSQL_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect();

export default async (req, res) => {

    // Connect
    // try {
    
    // } catch (error) {
    //     console.log('FATAL :: connection')
    //     res.status(500).json({description: 'FATAL :: connection', error})
    //     db.end();
    // }

    let result;
    
    // Query
    try {
        
        db.query('SELECT * FROM matches', (err, dbResponse) => {
            
            if (err) {
                console.log('FATAL :: query')
                res.status(500).json({description: 'FATAL :: query', error: err})
                // db.end();

                // throw err;
            } else {

                // Handle
                try {
                    console.log('handle')
                    rows = dbResponse.rows;
                    
                    for (let row of dbResponse.rows) {
                        console.log(row)
                    }

                    res.status(200).json({data: result})
                } catch (error) {
                    console.log('FATAL :: handler')
                    res.status(500).json({description: 'FATAL :: handler', error})
                    // throw error
                }
            }
    
        });

    } catch (error) {
        console.log('here')
        console.log(error)
        res.status(500).json({error})
        // db.end();
    }

}
