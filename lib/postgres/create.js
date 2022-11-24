// URL: /api/lines/create
// import conn from '../../../lib/db'
// const { Client } = require('pg');
import { Pool } from "pg";

export default async (req, res) => {

    try {
        // const Pool = require('pg').Pool

        const pool = new Pool({
            // user: 'jdsyqvcdvpbdiw',
            host: 'ec2-52-21-207-163.compute-1.amazonaws.com',
            database: 'dc3ru0iup0v8s9',
            // password: 'd439e93852d6ad0cc1f3ad9db1d870cbc6962138483e5b575e27784ca36238e8',
            port: 5432,
        })

        console.log("req nom", req.body)
        const query = 'CREATE TABLE matches (matchId int PK, team_id varchar(80));'
        const values = [req.body.content]
        const result = await pool.query(
            query,
            values
        );
        console.log( "ttt",result );



        // pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        //     if (error) {
        //       throw error
        //     }
        //     response.status(200).json(results.rows)
        //   })


        // db, err := sql.Open("postgres", os.Getenv("postgres://wubldpvqcoclgs:2a6e7694f3c05f2aeedb2a38571c5878ae9a480c87fe88349e11e46dc5b1fd08@ec2-18-208-55-135.compute-1.amazonaws.com:5432/d1h9qqudj0mg3"))


        // if (true) {
        //     const { Client } = require('pg');

        //     const client = new Client({
        //     connectionString: "postgres://wubldpvqcoclgs:2a6e7694f3c05f2aeedb2a38571c5878ae9a480c87fe88349e11e46dc5b1fd08@ec2-18-208-55-135.compute-1.amazonaws.com:5432/d1h9qqudj0mg3", // process.env.DATABASE_URL,
        //     ssl: {
        //         rejectUnauthorized: false
        //     }
        //     });

        //     client.connect();


        //     // CREATE TABLE: matches
        //     client.query('CREATE TABLE matches (matchId int PK, team_id varchar(80));', (err, res) => {
        //     if (err) throw err;
        //     for (let row of res.rows) {
        //         console.log(JSON.stringify(row));
        //     }
        //     client.end();
        //     });
        // }
        res.status(200).json({ name: 'John Doe' })

    } catch ( error ) {
        console.log( error );
        res.status(500).json({ status: 501, error: 'Broken' })
    }
    
    //     // throw Error('test')
    //     res.status(200).json({ name: 'John Doe' })

    // } catch {
    //     res.status(501).json({ status: 501, error: 'Broken' })
    // }

}
