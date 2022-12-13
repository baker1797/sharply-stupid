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
import { Note as NoteModel } from './../../lib/models'
import { renderStatus } from './../../lib/helpers'
import { NflTeams as teams, weeks } from './../../lib/nfl'

const alertStatus = {
	PROCESSING: 'processing',
	SUCCESS: 'success',
	ERROR: 'error'
}

const editorStatus = {
	OPEN: 'open',
	CLOSED: 'closed'
}

/**
 * Fetch all notes
 * 
 * @returns 
 */
async function fetchNotes() {
	// console.log('notes :: getServerSideProps')

	let domain = 'http://sharply-stupid.herokuapp.com';
	let notes = [];

	if (process.env.NODE_ENV == 'development') {
		domain = 'http://localhost:3000';
		// console.log('DEV MODE!')
	} else {
		// console.log('not dev mode :(')
	}

	const endpointUrl = `${domain}/api/notes/fetch`

	try {
		const res = await fetch(endpointUrl)
		notes = await res.json()

		// console.log(notes.data)
	} catch (fetchError) {
		console.log(fetchError)
	}

	return { props: { notes: notes.data } }
}


export default class Notes extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
			status: null,
			editorStatus: editorStatus.CLOSED,
			editorButtonText: 'Add Note',
			notes: this.props.notes,
			week: 15,
			category: 'gambling',
			newNote: NoteModel()
		}

		this.handleSelectChange = this.handleSelectChange.bind(this)
		this.handleTeamTagSelectChange = this.handleTeamTagSelectChange.bind(this)
		this.handleAddNoteToggle = this.handleAddNoteToggle.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSelectChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleTeamTagSelectChange(event) {
		// TODO - "push" is desired, but the UI doesn't support it
		// this.state.newNote.teamTags.push(event.target.value)
		
		this.state.newNote.teamTags[0] = event.target.value
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
					week: document.getElementById('new-note-week').value,
					// category: document.getElementById('new-note-category').value,
					title: document.getElementById('new-note-title').value,
					body: document.getElementById('new-note-body').value,
					teamTags: this.state.newNote.teamTags
				})
			)
        }).then(() => {
			setTimeout(() => {
				this.setState({
					status: alertStatus.SUCCESS,
					editorStatus: editorStatus.CLOSED
				})
			}, 750)

			// fetchNotes().then((data) => {
			// 	this.setState({
			// 		notes: data.props.notes
			// 	})
			// 	console.log(this.state)
			// })
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
				<Card sx={{mb: 2, p: 2}}>
					<Grid container align="center" spacing={2}>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
								<InputLabel id="week-label">Week</InputLabel>
								<Select
									labelId="week-label"
									// className="action_input"
									id="new-note-week"
									name="week"
									value={this.state.week}
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
							<FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
								<InputLabel id="team-label">Team</InputLabel>
								<Select
									labelId="team-label"
									// className="action_input"
									id="new-note-team"
									name="teamTag"
									value={this.state.newNote.teamTags[0]}
									onChange={this.handleTeamTagSelectChange}
								>
									{
										teams.map((team) => {
											return <MenuItem key={team.key} value={team.key}>{team.label}</MenuItem>
										})
									}
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
								<TextField
									id="new-note-title"
									label="Title"
									name="title"
									fullWidth
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
								<TextField
									id="new-note-body"
									label="Description"
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
							{ renderStatus(this.state.status, 'Note') }
						</Grid>
					</Grid>
				</Card>
			)
		} else {
			return ('')
		}
	}

	renderTeamIcons(teamTags) {
		if (teamTags && teamTags.length > 0) {
			const imgSrc = `./images/${teamTags[0]}.png`

			return (
				<img src={imgSrc} width={24} />
			)
		} else {
			return ('')
		}
	}

	renderTimestamp(ts) {
		const date = new Date(ts)

		return [
			date.getMonth(),
			date.getDate(),
			date.getYear(),
		].join('/')
	}

	renderNotes() {

		if (!this.state.notes || this.state.notes.length <= 0) {
			return (
				<Container>No Notes</Container>
			)
		}

		return (
			<Grid container spacing={{ xs: 2, sm: 2, md: 3 }} sx={{mb:4}}>
				{
					this.props.notes.sort((a,b) => b.ts - a.ts).map((note, noteIndex) => {
						return (
							<Grid item xs={12} key={"note_" & noteIndex}>
								<Card sx={{pl:2, pr:2, position: "relative"}}>
									<h3>
										<Grid container>
											<Grid item xs={1}>{ this.renderTeamIcons(note.data.teamTags) }</Grid>
											<Grid item xs={11}>{note.data.title}</Grid>
										</Grid>
									</h3>
									<p>{note.data.body}</p>
									<ul>
										{
											note.data.bullets.map((bullet, bulletIndex) => {
												return (
													<li key={noteIndex & "_" & bulletIndex}>{bullet.body}</li>
												)
											})
										}
									</ul>
									{/* <i>{this.renderTimestamp(note.ts)}</i> */}
								</Card>
							</Grid>
						)
					})
				}
			</Grid>
		)
	}

	render () {
		return (
			<div className={styles.container}>
				<Head>
					<title>Notes | Sharply Stupid</title>
				</Head>

				<h1 className={styles.title}>NFL Insights</h1>

				<Container align="center" sx={{mt:2, mb: 2}}>
					<Button variant="outlined" endIcon={<PostAddIcon />} onClick={this.handleAddNoteToggle}>
						{this.state.editorButtonText}
					</Button>
				</Container>

				{
					/** Week Picker */
					// this.renderWeekPicker() 
				}

				{
					/** New Note */
					this.renderEditor() 
				}

				{
					/** New Note */
					this.renderNotes()
				}
			</div>
		)
	}
}

export async function getServerSideProps() {

	return fetchNotes()
	
}