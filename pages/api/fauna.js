import faunadb from 'faunadb'

export default async (req, res) => {
    try {
        console.log('fauna :: try')
        const q = faunadb.query;

        const client = new faunadb.Client({
            secret: process.env.FAUNA_SECRET,
            domain: 'db.us.fauna.com',
            scheme: 'https',
        });

        client.query(
            q.If(
                q.Exists(q.Collection('matches')),
                null,
                q.CreateCollection({ name: 'matches' })
            )
        ).then((dbResponse)=>{
            console.log('fauna :: handling dbResponse')
            console.log(dbResponse)
            res.status(200).json({data: {test:'test'}})
        })

    } catch (err) {
        console.log('fauna :: error')
        console.log(err)
    }
}