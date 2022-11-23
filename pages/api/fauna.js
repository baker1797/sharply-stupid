import faunadb from 'faunadb'

export default async (req, res) => {
    try {
        console.log('fauna :: try')
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