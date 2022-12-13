import { createDb, parseInputFromRequestBody } from  '../../../lib/helpers'

export default async (req, res) => {
    try {
        const db = createDb(process.env.FAUNA_SECRET_COUNT_IT)
        const reqBody = JSON.parse(req.body)
        let fan;

        try {
            const fanName = parseInputFromRequestBody(reqBody, 'fan_name')
            fan = db.q.Select('ref', db.q.Get(db.q.Match(db.q.Index('fans_by_name'), fanName)))
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
        
        await db.client.query(
            db.q.If(
                db.q.Exists(db.q.Collection('actions')),
                null,
                db.q.CreateCollection({ name: 'actions' })
            )
        )
        .then((qResponse) => {
            console.log('Actions Collection')
        })
        .catch((err) => {
            console.log(err)
        });

        // Store the data in Fauna
        await db.client.query(
            db.q.Create(
                db.q.Collection('actions'),
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