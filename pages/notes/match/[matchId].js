import * as React from 'react'
import Head from 'next/head'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import styles from '/styles/Home.module.css'
import { fetchMatch, fetchNotesByTeamId } from '../../../lib/queries'
import {
	renderMatchupTimestamp,
	renderNotes,
	renderTeamIcon
} from '../../../lib/render'

const renderMatch = (matchData) => {
	return (
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
		</Grid>
	)
}

export default class Matchup extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			match: this.props.match,
			notes: this.props.notes
		}

	}

	render() {
		return (
			<div className={styles.container}>
				<Head>
					<title>Matchup Notes | Sharply Stupid</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<h2 align="center" style={{padding: "20px 0"}}>Matchup Details</h2>

				<Container>
					{ renderMatch(this.state.match) }
				</Container>

				<Grid container>
					<Grid item xs={12}><hr></hr></Grid>
					<Grid item xs={12} align="center">
						<h2>Insights</h2>
						{ renderNotes(this.state.notes) }
					</Grid>
				</Grid>
			</div>
		)
	}
}

export async function getServerSideProps({ query }) {
	
	const match = await fetchMatch(query.matchId)
	
	const [awayNotes, homeNotes] = await Promise.all([
		fetchNotesByTeamId(match.awayTeamId),
		fetchNotesByTeamId(match.homeTeamId)
	])

	return {
		props: {
			match,
			notes: [
				...awayNotes,
				...homeNotes
			]
		}
	}
}