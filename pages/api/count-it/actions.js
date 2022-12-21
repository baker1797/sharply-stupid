import { createDb, parseInputFromRequestBody } from  './../../../lib/queries'

export default async (req, res) => {
    try {
        const db = createDb()
        const reqBody = JSON.parse(req.body)

        let fanName = parseInputFromRequestBody(reqBody, 'fan_name');

        try {
            const actions = await client.query(
                // TODO does this need a map lambda method?
                db.q.Paginate(
                    db.q.Match(
                        db.q.Index("actions_per_fan"),
                        db.q.Select('ref', db.q.Get(db.q.Match(db.q.Index('fans_by_name'), fanName)))
                    )
                )
            )
            
            // TODO - this is returning an array not an object
            // console.log(actions)

            res.status(200).json({ actions })

        } catch(error) {
            throw Error("issue fetching actions")
        }
        
    } catch (err) {
        console.log('fauna :: error')
        console.log(err)
        res.status(500).json({data: {error: err}})
    }
}