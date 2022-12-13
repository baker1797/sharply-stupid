import { createDb } from  '../../../lib/helpers'

export default async (req, res) => {
    try {
        const db = createDb(process.env.FAUNA_SECRET_COUNT_IT)

        try {
            const actions = await client.query(
                Map(
                    db.q.Paginate(db.q.Documents(db.q.Collection('actions')), { size: 100 }),
                    db.q.Lambda('ref', db.q.Get(db.q.Var('ref')))
                )
            )

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