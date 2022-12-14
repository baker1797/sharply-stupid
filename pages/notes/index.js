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
import { renderStatus, createApiRoute } from './../../lib/helpers'
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
	let notes = [];
	const endpointUrl = createApiRoute('notes/fetch')

	try {
		const res = await fetch(endpointUrl)
		notes = await res.json()
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
				<Card sx={{mb: 2, p: 2}}>
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
											return <MenuItem key={team.key} value={team.key}>{this.renderTeamIcons([team.key])}&nbsp;{team.location} {team.name}</MenuItem>
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
				// TODO - replace with <Image/>
				<img src={imgSrc} width={24} />
			)
		} else {
			return ('')
		}
	}

	renderTimestamp(ts) {
		const date = new Date(ts)
		let timestamp = [
			date.getMonth() + 1,
			date.getDate(),
			date.getFullYear()
		].join('/')
		
		let hours = date.getHours() % 12
		
		if (hours === 0) {
			hours = 12
		}

		let minutes = date.getMinutes()

		if ((minutes + "").length === 1) {
			minutes = "0" + minutes
		}

		timestamp += " " + hours + ":" + minutes
		timestamp += (date.getHours() / 12 > 0) ? "pm" : "am"
		
		return timestamp
	}

	renderPrimaryImage(images) {
		if (images && images[0]) {
			const imgSrc = `./uploads/${images[0]}`

			return (
				<a href={imgSrc} target="_blank" rel="noreferrer">
					<img src={imgSrc} width="100%"/>
				</a>
			)
		}
	}

	renderNoteBody(body) {
		if (body && body.length) {
			return <p style={{whiteSpace: "pre-line"}}>{body}</p>
		}
	}

	renderNoteBullets(bullets, noteIndex) {
		if (bullets && bullets.length > 0) {
			return (
				<ul>
					{
						bullets.map((bullet, bulletIndex) => {
							return (
								<li key={noteIndex + "_" + bulletIndex}>{bullet.body}</li>
							)
						})
					}
				</ul>
			)
		}
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
							<Grid item xs={12} sm={6} lg={4} key={"note_" + noteIndex}>
								<Card sx={{pl:2, pr:2, position: "relative"}}>
									<h4>
										<Grid container>
											<Grid item xs={1}>{ this.renderTeamIcons(note.data.teamTags) }</Grid>
											<Grid item xs={8}>{note.data.title}</Grid>
											<Grid item xs={3} align="right" sx={{fontSize: "small", fontWeight: "light"}}>
												{ note.data.week ? "Week: " + note.data.week : '' }
												{
													// TODO render playoff week titles
												}
											</Grid>
										</Grid>
									</h4>
									{ this.renderPrimaryImage(note.data.images) }
									{ this.renderNoteBody(note.data.body) }
									{ this.renderNoteBullets(note.data.bullets, noteIndex) }
									<Grid container mb={1}>
										<Grid item xs={12} align="right">
											<sub>
												<i>{ note.data.author || "anonymous" } &bull; { this.renderTimestamp(note.ts/1000) }</i>
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

	render () {
		return (
			<div className={styles.container}>
				<Head>
					<title>Notes | Sharply Stupid</title>
					<link rel="icon" href="/favicon.ico" />
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