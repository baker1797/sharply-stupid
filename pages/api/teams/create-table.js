import { Pool } from "pg";

const DROP_TABLE_TEAMS = `DROP TABLE teams`
// const DELETE_TABLE_TEAMS = `DROP teams WHERE team_id=${id}`
const CREATE_TABLE_TEAMS = `
    CREATE TABLE teams (
        team_id SERIAL PRIMARY KEY,
        team_name varchar(80)
    )
`;

// INSERT INTO guess_lines VALUES ('Kyle', '1234abc', -6.5, 54.5);

// Connect
// try {
const db = new Pool({
    connectionString: process.env.PGSQL_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect();

export default async (req, res) => {
    
    const { fn } =req.query


    // if ()



    // Query
    try {
        
        db.query(CREATE_TABLE_TEAMS, (err, dbResponse) => {
            
            if (err) {
                console.log('FATAL :: query')
                res.status(500).json({description: 'FATAL :: query', error: err})
                // db.end();

                // throw err;
            } else {

                // Handle
                try {
                    console.log('handle')
                    console.log(dbResponse)
                    
                    // rows = dbResponse.rows;
                    
                    // for (let row of dbResponse.rows) {
                    //     console.log(row)
                    // }

                    res.status(200).json({data: dbResponse})
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