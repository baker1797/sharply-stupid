import faunadb from 'faunadb'
import showAll from './fetch-all'

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

        // showAll(client, 'players')

        // const value = document.getElementById('todo').value
        let bet_id = new Date();
        let prop = "Cousins ints";
        let prop_side = "over";
        let prop_value = 0.5;
        let prop_juice = -120;
        let maker = "stu";
        let taker = null;
        
        await client.query(
            q.If(
                q.Exists(q.Collection('bets')),
                null,
                q.CreateCollection({ name: 'bets' })
            )
        )
        .then((qResponse) => {
            console.log('Bets Collection')
            res.status(200).json({data: qResponse })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({err })
        });

        // Store the todo in Fauna
        await client.query(
            // q.If(
            //     q.Exists(q.Collection('bets')),
            //     null,
            //     q.CreateCollection({ name: 'bets' })
            // )
          q.Create(
            q.Collection('bets'),
            { data: {
                bet_id,
                prop,
                prop_side,
                prop_value,
                prop_juice,
                maker,
                taker
            } }
          )
        )
        .then((qResponse) => {
            console.log('Bet added')
            res.status(200).json({data: qResponse })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({err })
        })

    } catch (err) {
        console.log('error - fauna')
        console.log(err)
        res.status(500).json({data: {test:'test'}})
    }
}