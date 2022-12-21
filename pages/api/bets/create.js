import hash from 'object-hash'
import { createDb, parseInputFromRequestBody } from './../../../lib/queries'

export default async (req, res) => {
    try {
        const db = createDb(process.env.FAUNA_SECRET_BETS)
        const reqBody = JSON.parse(req.body)
        
        const bet = {
            week: parseInt(parseInputFromRequestBody(reqBody, 'week')),
            away_team: parseInputFromRequestBody(reqBody, 'away_team'),
            home_team: parseInputFromRequestBody(reqBody, 'home_team'),
            line: parseInputFromRequestBody(reqBody, 'line'),
            bet_id: null,
            date_created: new Date() + ''
        }

        // todo - remove this and fix the rendered keys
        bet.bet_id = hash(bet)

        // Store the bet in Fauna
        await client.query(
            db.q.Create(
                db.q.Collection('bets'),
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