import { createDb, parseInputFromRequestBody } from './../../../lib/helpers'
import { Note as NoteModel } from './../../../lib/models'

export default async (req, res) => {
	try {
		const db = createDb(process.env.FAUNA_SECRET_NOTES)
		const reqBody = JSON.parse(req.body)

		// TODOs:
		// - preserve whitespace / breaks
		// - support bullets in the UI
		const note = NoteModel({
			title: parseInputFromRequestBody(reqBody, "title"),
			body: parseInputFromRequestBody(reqBody, "body"),
			// bullets: parseInputFromRequestBody(reqBody, "bullets"),
			teamTags: reqBody.teamTags
		})

		// Store the note in Fauna
		await db.client.query(
			db.q.Create(
				db.q.Collection('notes'),
				{ data: note }
			)
		)
			.then((qResponse) => {
				console.log('Note added')
				res.status(200).json({ data: qResponse })
			})
			.catch((err) => {
				console.log(err)
				res.status(500).json({ err })
			})

	} catch (err) {
		console.log('fauna :: error')
		console.log(err)
		res.status(500).json({ data: { error: err } })
	}
}