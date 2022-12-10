import faunadb from 'faunadb'
import { parseInputFromRequestBody } from  './../../helpers'

export default async (req, res) => {
    try {
        const q = faunadb.query; // todo - remove this in favor of functions
        const {
            Select,
            Get,
            Match,
            Index,
            Create,
            Collection
        } = faunadb.query

        const client = new faunadb.Client({
            secret: process.env.FAUNA_SECRET_COUNT_IT,
            domain: 'db.us.fauna.com',
            scheme: 'https',
        });

        const reqBody = JSON.parse(req.body)

        
        let fan;

        try {
            const fanName = parseInputFromRequestBody(reqBody, 'fan_name')
            fan = Select('ref', Get(Match(Index('fans_by_name'), fanName)))
            console.log(fan)
        } catch(error) {
            throw Error("invalid user name")
        }

        const actionData = {
            fan,
            action_type: parseInputFromRequestBody(reqBody, 'action_type'),
            away_name: parseInputFromRequestBody(reqBody, 'away_name'),
            home_name: parseInputFromRequestBody(reqBody, 'home_name'),
            away_score: parseInputFromRequestBody(reqBody, 'away_score'),
            home_score: parseInputFromRequestBody(reqBody, 'home_score')
            // TODO - week
        }
        
        await client.query(
            q.If(
                q.Exists(q.Collection('actions')),
                null,
                q.CreateCollection({ name: 'actions' })
            )
        )
        .then((qResponse) => {
            console.log('Actions Collection')
        })
        .catch((err) => {
            console.log(err)
        });

        // Store the data in Fauna
        await client.query(
          Create(
            Collection('actions'),
            { data: actionData }
          )
        )
        .then((qResponse) => {
            console.log('Action added')
            res.status(200).json({data: qResponse })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ err })
        })

    } catch (err) {
        console.log('fauna :: error')
        console.log(err)
        res.status(500).json({data: {error: err}})
    }
}