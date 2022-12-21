import { createDb } from '../../../lib/queries'

// TODO: this collection param isn't configured from "fetch" in /bets/index
export default async (req, res) => {
	try {
		const db = createDb(process.env.FAUNA_SECRET_NOTES)
		const reqBody = JSON.parse(req.body)
		console.log('fetch-match-api-end')
		console.log(reqBody)

		await db.client.query(
			// db.q.Map(
				db.q.Get(db.q.Ref(db.q.Collection('matches'), reqBody.matchId)),
			// 	db.q.Lambda('ref', db.q.Get(db.q.Var('ref')))
			// )
		)
			.then((dbRes) => {
				console.log('returning specific match')
				// console.log(dbRes)
				res.status(200).json(dbRes)
			})
			.catch((err) => {
				console.log('fauna :: fetch all - catch')
				console.log(err)
				res.status(500).json(err)
			})
	} catch(err) {
		res.status(500).json(err)
	}
}