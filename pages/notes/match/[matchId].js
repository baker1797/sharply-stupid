import * as React from 'react'
import Head from 'next/head'
import Grid from '@mui/material/Grid';
import styles from '/styles/Home.module.css'
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import {
	fetchMatch,
	renderMatchupTimestamp,
	renderNoteBullets,
	renderNoteBody,
	renderPrimaryImage,
	renderTeamIcon
} from '../../../lib/queries'
import {
	fetchMatch,
	renderMatchupTimestamp,
	renderNoteBullets,
	renderNoteBody,
	renderPrimaryImage,
	renderTeamIcon
} from '../../../lib/render'

const alertStatus = {
	PROCESSING: 'processing',
	SUCCESS: 'success',
	ERROR: 'error'
}

const editorStatus = {
	OPEN: 'open',
	CLOSED: 'closed'
}

export default class Matchup extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			status: null,
			editorStatus: editorStatus.CLOSED,
			editorButtonText: 'Add Note',
			notes: this.props.notes,
			week: this.props.week
		}

	}

	renderNotes() {

		if (!this.state.notes || this.state.notes.length <= 0) {
			return (
				<Container>No Notes</Container>
			)
		}

		return (
			<Grid container spacing={{ xs: 2, sm: 2, md: 3 }} sx={{ mb: 4 }}>
				{
					this.state.notes.sort((a, b) => a.data.gameTime - b.data.gameTime).map((note, noteIndex) => {
						return (
							<Grid item xs={12} sm={6} lg={4} key={"note_" + noteIndex}>
								<Card sx={{ pl: 2, pr: 2, position: "relative" }}>
									<h4>
										<Grid container>
											<Grid item xs={4} align="center" sx={{ fontSize: "small" }}>
												{renderTeamIcon(note.data.awayTeamId, 48)}
												<div>{note.data.pregameHomeSpread < 0 ? '' : note.data.pregameHomeSpread*-1}</div>
											</Grid>
											<Grid item xs={4} align="center">
												{renderMatchupTimestamp(note.data.gameTime)}
											</Grid>
											<Grid item xs={4} align="center" sx={{ fontSize: "small" }}>
												{renderTeamIcon(note.data.homeTeamId, 48)}
												<div>{note.data.pregameHomeSpread > 0 ? '' : note.data.pregameHomeSpread}</div>
											</Grid>
											{/* <Grid item xs={12} align="center">Home Spread</Grid>
											<Grid item xs={12} align="center" sx={{ fontSize: "small", fontWeight: "light" }}></Grid> */}
											<Grid item xs={12} align="center">Total: {note.data.pregameTotal}</Grid>
											<Grid item xs={12}><hr></hr></Grid>
											<Grid item xs={12}>Notes</Grid>
											<Grid item xs={8}>{note.data.title}</Grid>
										</Grid>
									</h4>
									{renderPrimaryImage(note.data.images)}
									{renderNoteBody(note.data.body)}
									{renderNoteBullets(note.data.bullets, noteIndex)}
									{/* <Grid container mb={1}>
										<Grid item xs={12} align="right">
											<sub>
												<i>{note.data.author || "anonymous"} &bull; {renderTimestamp(note.ts / 1000)}</i>
											</sub>
										</Grid>
									</Grid> */}

								</Card>
							</Grid>
						)
					})
				}
			</Grid>
		)
	}

	render() {
		return (
			<div className={styles.container}>
				<Head>
					<title>Matchup Notes | Sharply Stupid</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<h1 className={styles.title}>Matchup Details</h1>
				{
					/** New Note */
					this.renderNotes()
				}
			</div>
		)
	}
}

export async function getServerSideProps({ query }) {
	
	const [match, homeNotes, awayNotes] = await Promise.all([
		fetchMatch(query.matchId),
		Promise.resolve([]),
		Promise.resolve([])
	])

	console.log('promise resolved')
	console.log(match)
	console.log(homeNotes)
	console.log(awayNotes)
	
	return {
		props: {
			week: query.week,
			notes
		}
	}
}