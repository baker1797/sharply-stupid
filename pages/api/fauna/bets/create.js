import faunadb from 'faunadb'
import hash from 'object-hash'

const parseProp = (reqBody) => {
    return reqBody ? reqBody.betProp : null
}

export default async (req, res) => {
    try {
        const q = faunadb.query;

        const client = new faunadb.Client({
            // Replace YOUR_FAUNA_SECRET with the secret for the database that
            // should contain your Todo documents.
            secret: process.env.FAUNA_SECRET,
            domain: 'db.us.fauna.com',
            scheme: 'https',
        });

        console.log(Object.keys(req.body))

        const reqBody = JSON.parse(req.body)
        console.log(reqBody)
        
        let bet = {
            week: 13,
            prop: parseProp(reqBody),
            bet_id: null,
            date_created: new Date() + "",
            // prop_side: "under",
            // prop_value: 1.5,
            // prop_juice: -145,
            // maker: "Reid",
            // taker: "Jody"
        }


        bet.bet_id = hash(bet)
        
        await client.query(
            q.If(
                q.Exists(q.Collection('bets')),
                null,
                q.CreateCollection({ name: 'bets' })
            )
        )
        .then((qResponse) => {
            console.log('Bets Collection')
        })
        .catch((err) => {
            console.log(err)
        });

        // Store the bet in Fauna
        await client.query(
            // q.If(
            //     q.Exists(q.Collection('bets')),
            //     null,
            //     q.CreateCollection({ name: 'bets' })
            // )
          q.Create(
            q.Collection('bets'),
            { data: bet }
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
        console.log('fauna :: error')
        console.log(err)
        res.status(500).json({data: {error: err}})
    }
}