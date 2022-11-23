import { Pool } from "pg";
import { CREATE_TABLE_MATCHES } from "../config";

export default async (req, res) => {

    // Connect
    // try {
    const db = new Pool({
        connectionString: process.env.PGSQL_DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    
    db.connect();
    // } catch (error) {
    //     console.log('FATAL :: connection')
    //     res.status(500).json({description: 'FATAL :: connection', error})
    //     db.end();
    // }
    
    // Query
    try {
        let responseData;

        // The stuff
        db.query('CREATE TABLE matches (match_id int, team_id varchar(80))', (err, dbResponse) => {
            
            if (err) {
                console.log('FATAL :: query')
                res.status(500).json({description: 'FATAL :: query', error: err})
                db.end();

                throw err;
            }

            // Handle
            try {
                console.log('handle')
            } catch (error) {
                console.log('FATAL :: handler')
                res.status(500).json({description: 'FATAL :: handler', error})
                throw error
            }

            responseData = dbResponse.rows;

            res.status(200).json({response: dbResponse})

            db.end();
        });
        
    } catch (error) {
        console.log('here')
        console.log(error)
        res.status(500).json({error})
        db.end();
    }
}