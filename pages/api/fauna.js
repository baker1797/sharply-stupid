import faunadb from 'faunadb'

export default async (req, res) => {
    try {
        console.log('try - fauna')
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

        console.log('in the abyss')

        client.query(
            q.If(
                q.Exists(q.Collection('matches')),
                null,
                q.CreateCollection({ name: 'matches' })
            )
        ).then((dbResponse)=>{
            console.log('checking for faunadb')
            console.log(dbResponse)
            res.status(200).json({data: {test:'test'}})
        })
        console.log('out')

        

        // On first run, make sure that the Todos collection exists
        // async () => {
        //     console.log('checking for faunadb')
        //     await 
        //     res.status(200).json({data: {test:'test'}})
        // }
    } catch (err) {
        console.log('error - fauna')
        console.log(err)
    }
}