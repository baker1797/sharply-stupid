import faunadb, { Paginate } from 'faunadb'
import { parseInputFromRequestBody } from  '../../../lib/helpers'

export default async (req, res) => {
    try {
        const q = faunadb.query; // todo - remove this in favor of functions
        const {
            Select,
            Get,
            Match,
            Index,
            Map
        } = faunadb.query

        const client = new faunadb.Client({
            secret: process.env.FAUNA_SECRET_COUNT_IT,
            domain: 'db.us.fauna.com',
            scheme: 'https',
        });

        // const reqBody = JSON.parse(req.body)

        try {
            const actions = await client.query(
                Map(
                    q.Paginate(q.Documents(q.Collection('actions')), { size: 100 }),
                    q.Lambda('ref', q.Get(q.Var('ref')))
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