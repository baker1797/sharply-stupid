import { createDb } from '../../../lib/queries'

// TODO: this collection param isn't configured from "fetch" in /bets/index
export default async (req, res) => {
	const db = createDb(process.env.FAUNA_SECRET_NOTES)
	const reqBody = JSON.parse(req.body)

	await db.client.query(
		db.q.Map(
			db.q.Paginate(
				db.q.Match(
					db.q.Index('notes_by_team'),
					reqBody.teamId
				),
				{ size: 100 }
			),
			db.q.Lambda('ref', db.q.Get(db.q.Var('ref')))
		)
	)
		.then((dbRes) => {
			console.log('returning')
			// console.log(dbRes)
			res.status(200).json(dbRes)
		})
		.catch((err) => {
			console.log('fauna :: fetch all - catch')
			console.log(err)
			res.status(500).json(err)
		})
}