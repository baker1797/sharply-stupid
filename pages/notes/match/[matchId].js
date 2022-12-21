import * as React from 'react'
import Head from 'next/head'
import Grid from '@mui/material/Grid';
import styles from '/styles/Home.module.css'
import Card from '@mui/material/Card';
import { fetchMatch, fetchNotesByTeamId } from '../../../lib/queries'
import {
	renderMatchupTimestamp,
	renderNoteBullets,
	renderNoteBody,
	renderPrimaryImage,
	renderTimestamp,
	renderTeamIcon
} from '../../../lib/render'

export default class Matchup extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			match: this.props.match,
			notes: this.props.notes
		}

	}

	renderMatchCard() {

		const matchData = this.state.match

		return (
			// <Card sx={{ pl: 2, pr: 2, position: "relative" }}>
				<Grid container>
					<Grid item xs={4} align="center" sx={{ fontSize: "small" }}>
						{renderTeamIcon(matchData.awayTeamId, 48)}
						<div>{matchData.pregameHomeSpread < 0 ? '' : matchData.pregameHomeSpread*-1}</div>
					</Grid>
					<Grid item xs={4} align="center">
						{renderMatchupTimestamp(matchData.gameTime)}
					</Grid>
					<Grid item xs={4} align="center" sx={{ fontSize: "small" }}>
						{renderTeamIcon(matchData.homeTeamId, 48)}
						<div>{matchData.pregameHomeSpread > 0 ? '' : matchData.pregameHomeSpread}</div>
					</Grid>
					<Grid item xs={12} align="center">Total: {matchData.pregameTotal}</Grid>
					<Grid item xs={12}><hr></hr></Grid>
					<Grid item xs={12} align="center">
						<h2>Notes</h2>
						{this.renderNotes()}
					</Grid>

				</Grid>
			// </Card>
		)
	}

	/**
	 * This needs to be refactored and moved to render.js
	 * @returns 
	 */
	renderNotes() {

		if (!this.state.notes || this.state.notes.length <= 0) {
			return (
				<Container>No Notes</Container>
			)
		}

		return (
			<Grid container align="left" spacing={{ xs: 2, sm: 2, md: 3 }} sx={{mb:4}}>
				{
					this.state.notes.sort((a,b) => b.data.week - a.data.week).map((note, noteIndex) => {
						return (
							<Grid item xs={12} sm={6} lg={4} key={"note_" + noteIndex}>
								<Card sx={{pl:2, pr:2, position: "relative"}}>
									<h4>
										<Grid container>
											<Grid item xs={3} sx={{fontSize: "small", fontWeight: "light"}}>
												{ renderTeamIcon(note.data.teamTags[0]) }
											</Grid>
											<Grid item xs={9}>{note.data.title}</Grid>
										</Grid>
									</h4>
									{ renderPrimaryImage(note.data.images) }
									{ renderNoteBody(note.data.body) }
									{ renderNoteBullets(note.data.bullets, noteIndex) }
									<Grid container mb={1}>
										<Grid item xs={12} align="right">
										
											<sub>
												<i>{ note.data.week ? "Week: " + note.data.week : '' } &bull; { note.data.author || "anonymous" } &bull; { renderTimestamp(note.ts/1000) }</i>
											</sub>
										</Grid>
									</Grid>
									
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
				{ this.renderMatchCard() }
			</div>
		)
	}
}

export async function getServerSideProps({ query }) {
	
	const match = await fetchMatch(query.matchId)
	
	console.log('match.awayTeamId')
	console.log(match.awayTeamId)
	const [homeNotes, awayNotes] = await Promise.all([
		fetchNotesByTeamId(match.awayTeamId),
		fetchNotesByTeamId(match.homeTeamId)
	])

	console.log('promise resolved')
	console.log(awayNotes)
	console.log(homeNotes)
	
	return {
		props: {
			match,
			notes: [
				...homeNotes,
				...awayNotes
			]
		}
	}
}