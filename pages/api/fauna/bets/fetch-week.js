import faunadb from 'faunadb'

// TODO: this collection param isn't configured from "fetch" in /bets/index
export default async (req, res/*collection*/) => {
    console.log('fauna :: fetch by week')
    
    const reqBody = JSON.parse(req.body)
    const q = faunadb.query;

    const client = new faunadb.Client({
        secret: process.env.FAUNA_SECRET,
        domain: 'db.us.fauna.com',
        scheme: 'https',
    });

    const data = await client.query(
        q.Map(
            q.Paginate(
                q.Match(
                    q.Index('bets_by_week'),
                    parseInt(reqBody.week)
                ),
                { size: 100 }
            ),
            q.Lambda('ref', q.Get(q.Var('ref')))
        )
    )
    .then((dbRes) => {
        res.status(200).json(dbRes)
    })
    .catch((err) => {
        console.log('fauna :: fetch by week - catch')
        console.log(err)
        res.status(500).json(err)
    })
};