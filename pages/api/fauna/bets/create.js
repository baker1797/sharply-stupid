import faunadb from 'faunadb'
import hash from 'object-hash'

const parseBody = (reqBody, key) => {
    let value
    
    switch (key) {
        case 'away_team':
            value = reqBody ? reqBody.away_team : null
            break
        case 'home_team':
            value = reqBody ? reqBody.home_team : null
            break
        case 'line':
            value = reqBody ? reqBody.line : null
            break
    }
    
    return value
}

export default async (req, res) => {
    try {
        const q = faunadb.query

        const client = new faunadb.Client({
            secret: process.env.FAUNA_SECRET,
            domain: 'db.us.fauna.com',
            scheme: 'https',
        });

        const reqBody = JSON.parse(req.body)
        // console.log(reqBody)
        
        const bet = {
            week: 13,
            away_team: parseBody(reqBody, 'away_team'),
            home_team: parseBody(reqBody, 'home_team'),
            line: parseBody(reqBody, 'line'),
            bet_id: null,
            date_created: new Date() + ''
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