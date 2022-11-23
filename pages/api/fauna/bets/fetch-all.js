import faunadb from 'faunadb'

// TODO: this collection param isn't configured from "fetch" in /bets/index
export default async (req, res/*collection*/) => {
    console.log('=== fetch all ====')
    // console.log(collection)
    
    const q = faunadb.query;

    const client = new faunadb.Client({
        // Replace YOUR_FAUNA_SECRET with the secret for the database that
        // should contain your Todo documents.
        secret: 'fnAE2C-E9mAAS99SEA3YrfqU0pMby4kcNkVjHhr4',
        // Classic DB Domain = 'db.fauna.us';  US Region Domain = 'db.us.fauna.com'; 
        // See https://docs.fauna.com/fauna/current/learn/understanding/region_groups for Region domain information.
        domain: 'db.us.fauna.com',
        scheme: 'https',
    });


    const data = await client.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection('bets')), { size: 100 }),
            q.Lambda('ref', q.Get(q.Var('ref')))
        )
    )
    .then((dbRes) => {
        console.log('fetch all - then')
        console.log('bets')
        console.log(dbRes)
        
        res.status(200).json(dbRes)
        
        // return res.data
    })
    .catch((err) => {
        console.log('show all - catch')
        console.log(err)
    })

    

    // return data
};