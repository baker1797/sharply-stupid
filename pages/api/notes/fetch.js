import { createDb } from './../../../lib/helpers'

// TODO: this collection param isn't configured from "fetch" in /bets/index
export default async (req, res) => {    
    const db = createDb(process.env.FAUNA_SECRET_NOTES)
        
    const data = await db.client.query(
        db.q.Map(
            db.q.Paginate(db.q.Documents(db.q.Collection('notes')), { size: 100 }),
            db.q.Lambda('ref', db.q.Get(db.q.Var('ref')))
        )
    )
    .then((dbRes) => {
        res.status(200).json(dbRes)
    })
    .catch((err) => {
        console.log('fauna :: fetch all - catch')
        console.log(err)
        res.status(500).json(err)
    })
};