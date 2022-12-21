import * as React from 'react'
import Head from 'next/head'
import Grid from '@mui/material/Grid';
import styles from '/styles/Home.module.css'
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import PostAddIcon from '@mui/icons-material/PostAdd'
import SendIcon from '@mui/icons-material/Send'
import { Note as NoteModel } from '../../lib/models'
import {
	renderStatus,
	fetchMatches,
	renderMatchupTimestamp,
	renderNoteBullets,
	renderNoteBody,
	renderPrimaryImage,
	renderTeamIcon
} from '../../lib/helpers'
import { NflTeams as teams, weeks } from '../../lib/nfl'

const alertStatus = {
	PROCESSING: 'processing',
	SUCCESS: 'success',
	ERROR: 'error'
}

const editorStatus = {
	OPEN: 'open',
	CLOSED: 'closed'
}

export default class Notes extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			status: null,
			editorStatus: editorStatus.CLOSED,
			editorButtonText: 'Add Note',
			notes: this.props.notes,
			// category: 'gambling',
			week: this.props.week,
			newNote: NoteModel({
				week: this.props.week
			})
		}

		this.handleSelectChange = this.handleSelectChange.bind(this)
		this.handleTeamTagSelectChange = this.handleTeamTagSelectChange.bind(this)
		this.handleAddNoteToggle = this.handleAddNoteToggle.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSelectChange(event) {
		this.setState({
			newNote: {
				...this.state.newNote,
				week: event.target.value
			}
		})
	}

	handleTeamTagSelectChange(event) {
		// TODO - "push" is desired, but the UI doesn't support it
		// this.state.newNote.teamTags.push(event.target.value)

		this.setState({
			newNote: {
				...this.state.newNote,
				teamTags: [
					event.target.value
				]
			}
		})
	}

	/**
	 * Handle new Note UI enablement
	 * 
	 * @param {*} event 
	 */
	handleAddNoteToggle(event) {
		if (editorStatus.OPEN === this.state.editorStatus) {
			this.setState({
				editorStatus: editorStatus.CLOSED,
				editorButtonText: 'Add Note'
			})
		} else {
			this.setState({
				editorStatus: editorStatus.OPEN,
				editorButtonText: 'Cancel'
			})
		}
	}

	/**
	 * Handle new Note submission
	 * Posts to Next API, then Fauna DB. Triggers status indicator
	 * 
	 * @param {*} event 
	 * @returns 
	 */
	async handleSubmit(event) {
		console.log('/pages/notes/create: handleSubmit')

		if (alertStatus.PROCESSING === this.state.status) {
			return
		}

		this.setState({
			status: alertStatus.PROCESSING
		})

		fetch('/api/notes/create', {
			method: 'POST',
			body: JSON.stringify(
				NoteModel({
					week: this.state.newNote.week,
					author: document.getElementById('new-note-author').value,
					title: document.getElementById('new-note-title').value,
					body: document.getElementById('new-note-body').value,
					teamTags: this.state.newNote.teamTags
				})
			)
		}).then(() => {
			this.setState({
				status: alertStatus.SUCCESS
			})

			setTimeout(() => {
				this.setState({
					editorStatus: editorStatus.CLOSED,
					editorButtonText: 'Add Note'
				})
			}, 750)

		}).catch((error) => {

			this.setState({
				status: alertStatus.ERROR
			})

			console.log('Your note failed to submit')
			console.log(error)
		})

	}

	/**
	 * Filter Notes by a given week
	 * 
	 * @returns 
	 */
	renderWeekPicker() {
		return ('')
	}

	/**
	 * Render the new Note entry form
	 * 
	 * @returns 
	 */
	renderEditor() {
		if (this.state.editorStatus === editorStatus.OPEN) {

			return (
				<Card sx={{ mb: 2, p: 2 }}>
					<Grid container align="center" spacing={1.5}>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth variant="standard">
								<InputLabel id="week-label">Week</InputLabel>
								<Select
									labelId="week-label"
									id="new-note-week"
									name="week"
									value={this.state.newNote.week}
									onChange={this.handleSelectChange}
								>
									{
										weeks.map((week) => {
											return <MenuItem key={week.value} value={week.value}>{week.label}</MenuItem>
										})
									}
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={12} md={6}>
							<FormControl fullWidth variant="standard">
								<InputLabel id="team-label">Team</InputLabel>
								<Select
									labelId="team-label"
									id="new-note-team"
									name="teamTag"
									onChange={this.handleTeamTagSelectChange}
								>
									{
										teams.map((team) => {
											return <MenuItem key={team.key} value={team.key}>{renderTeamIcon(team.key)}&nbsp;{team.location} {team.name}</MenuItem>
										})
									}
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth variant="standard">
								<TextField
									id="new-note-author"
									label="Author"
									name="author"
									fullWidth
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth variant="standard">
								<TextField
									id="new-note-title"
									label="Title"
									name="title"
									fullWidth
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth variant="standard">
								<TextField
									id="new-note-body"
									label="Notes"
									name="body"
									fullWidth
									multiline
									rows={5}
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<Button id="new-note-submit" variant="contained" endIcon={<SendIcon />} onClick={this.handleSubmit}>
								Submit
							</Button>
						</Grid>

						<Grid item xs={12}>
							{renderStatus(this.state.status, 'Note')}
						</Grid>
					</Grid>
				</Card>
			)
		} else {
			return ('')
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
					<title>Notes | Sharply Stupid</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<h1 className={styles.title}>Week {this.state.week}</h1>

				{/* <Container align="center" sx={{ mt: 2, mb: 2 }}>
					<Button variant="outlined" endIcon={<PostAddIcon />} onClick={this.handleAddNoteToggle}>
						{this.state.editorButtonText}
					</Button>
				</Container> */}

				{
					/** Week Picker */
					// this.renderWeekPicker()
				}

				{
					/** New Note */
					// this.renderEditor()
				}

				{
					/** New Note */
					this.renderNotes()
				}
			</div>
		)
	}
}

export async function getServerSideProps({ query }) {

	console.log('getServerSideProps==')
	
	const notes = await fetchMatches(query.week)

	console.log(notes)
	
	return {
		props: {
			week: query.week,
			notes
		}
	}
}