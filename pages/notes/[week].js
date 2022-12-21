import * as React from 'react'
import Head from 'next/head'
import Grid from '@mui/material/Grid';
import styles from '/styles/Home.module.css'
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import {
	renderMatchupTimestamp,
	renderNoteBody,
	renderNoteBullets,
	renderPrimaryImage,
	renderTeamIcon,
	renderWeekPicker
} from '../../lib/render'
import { fetchMatches } from '../../lib/queries'

/**
 * 
 * @param {*} matches 
 * @returns 
 */
const renderMatches = (matches) => {
	// TODO - this is nearly the same as renderMatches()

	if (!matches || matches.length <= 0) {
		return (
			<Container>No Matches</Container>
		)
	}

	return (
		<Grid container spacing={{ xs: 2, sm: 2, md: 3 }} sx={{ mb: 4 }}>
			{
				matches.sort((a, b) => a.data.gameTime - b.data.gameTime).map((note, noteIndex) => {
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
										<Grid item xs={12} align="center">Total: {note.data.pregameTotal}</Grid>
										<Grid item xs={12} align="center"><Link href={"/notes/match/" + note.ref['@ref'].id}>Details</Link></Grid>
									</Grid>
								</h4>
								{renderPrimaryImage(note.data.images)}
								{renderNoteBody(note.data.body)}
								{renderNoteBullets(note.data.bullets, noteIndex)}

							</Card>
						</Grid>
					)
				})
			}
		</Grid>
	)
}

export default class Matches extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			matches: this.props.matches,
			week: this.props.week
		}
	}

	render() {
		return (
			<div className={styles.container}>
				<Head>
					<title>Weekly Matchups | Sharply Stupid</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<h1 align="center">Week {this.state.week}</h1>
				{ renderWeekPicker(this.state.week) }
				{ renderMatches(this.state.matches) }
			</div>
		)
	}
}

export async function getServerSideProps({ query }) {
	const matches = await fetchMatches(query.week)
	
	return {
		props: {
			week: query.week,
			matches
		}
	}
}