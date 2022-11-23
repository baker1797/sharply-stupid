import { Pool } from "pg";

const DROP_TABLE_TEAMS = `DROP TABLE teams`
// const DELETE_TABLE_TEAMS = `DROP teams WHERE team_id=${id}`
const CREATE_TABLE_TEAMS = `
    CREATE TABLE teams (
        team_id SERIAL PRIMARY KEY,
        team_name varchar(80)
    )
`;
const INSERT_ENTRY = `INSERT INTO teams VALUES (456, 'ccc34abc');`
const SELECT_ALL = `SELECT * FROM teams`

// Connect

const db = new Pool({
    connectionString: process.env.PGSQL_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect();

const insertMethod = (res, dbResponse) => {
    // rows = dbResponse.rows;
    
    // for (let row of dbResponse.rows) {
    //     console.log(row)
    // }

    res.status(200).json({data: dbResponse})
}

const readMethod = (res, dbResponse) => {

    const rows = dbResponse.rows;
    
    for (let row of rows) {
        console.log(row)
    }

    res.status(200).json({
        data: {
            items: rows
        }
    })
}

const dropMethod = (res, dbResponse) => {

    console.log('handle :: dropMethod')
    console.log(dbResponse)

    res.status(200).json({data: dbResponse})
}

export default async (req, res) => {
    
    const { fn } = req.query

    let method = SELECT_ALL;
    let callback = readMethod;

    switch (fn) {
        case 'add':
            console.log('add')
            method = INSERT_ENTRY;
            callback = insertMethod;
            break;

        case 'read':
            console.log('read')
            method = SELECT_ALL;
            callback = readMethod;
            break;

        case 'drop':
            console.log('drop')
            method = DROP_TABLE_TEAMS;
            callback = dropMethod;
            break;

        case 'create':
            console.log('create')
            method = CREATE_TABLE_TEAMS;
            callback = dropMethod;
            break;

        // case 'delete':
        //     console.log('read')
        //     method = SELECT_ALL;
        //     callback = readMethod;
        //     break;

        default:
            console.log('Default Switch')
    }

    // Query
    try {
        
        db.query(method, (err, dbResponse) => {
            
            if (err) {
                console.log('FATAL :: query')
                console.log(err)
                res.status(500).json({description: 'FATAL :: query', error: err})
            } else {
                try {
                    console.log(`handler :: ${fn}`)
                    console.log(dbResponse)

                    callback(res, dbResponse)
                } catch (handlerError) {
                    console.log('FATAL :: handler')
                    console.log(handlerError)
                    res.status(500).json({description: 'FATAL :: handler', error: handlerError})
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