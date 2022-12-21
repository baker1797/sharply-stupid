import { createDb } from '../../../lib/queries'

export default async (req, res) => {
	const db = createDb(process.env.FAUNA_SECRET_NOTES)
	const reqBody = JSON.parse(req.body)

	await db.client.query(
		db.q.Map(
			db.q.Paginate(
				db.q.Match(
					// db.q.Index('all_matches'),
					db.q.Index(reqBody && reqBody.week ? 'matches_by_week' : 'all_matches'),
					reqBody && reqBody.week ? parseInt(reqBody.week) : null
				),
				{ size: 100 }
			),
			db.q.Lambda('ref', db.q.Get(db.q.Var('ref')))
		)
	)
		.then((dbRes) => {
			res.status(200).json(dbRes)
		})
		.catch((err) => {
			console.log('error :: fetch-matches.js')
			console.log(err)
			res.status(500).json(err)
		})
}