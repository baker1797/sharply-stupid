import { createDb } from '../../../lib/queries'

// TODO: this collection param isn't configured from "fetch" in /bets/index
export default async (req, res) => {
	try {
		const db = createDb(process.env.FAUNA_SECRET_NOTES)
		const reqBody = JSON.parse(req.body)

		await db.client.query(
			db.q.Get(db.q.Ref(db.q.Collection('matches'), reqBody.matchId)),
		)
			.then((dbRes) => {
				res.status(200).json(dbRes)
			})
			.catch((err) => {
				console.log('error :: fetch-match.js')
				console.log(err)
				res.status(500).json(err)
			})
	} catch(err) {
		res.status(500).json(err)
	}
}