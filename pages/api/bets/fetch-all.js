import faunadb from 'faunadb'

// TODO: this collection param isn't configured from "fetch" in /bets/index
export default async (req, res/*collection*/) => {
    console.log('fauna :: fetch all')
    
    const q = faunadb.query;

    const client = new faunadb.Client({
        secret: process.env.FAUNA_SECRET,
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
        res.status(200).json(dbRes)
    })
    .catch((err) => {
        console.log('fauna :: fetch all - catch')
        console.log(err)
    })
};