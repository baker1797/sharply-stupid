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
import { Note as NoteModel, authors} from './../../lib/models'
import {
	alertStatus,
	editorStatus,
	renderNotes,
	renderStatus,
	renderTeamIcons,
	renderWeekPicker
} from './../../lib/render'
import { fetchNotes } from './../../lib/queries'
import { NflTeams as teams, weeks } from './../../lib/nfl'

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
		this.handleAuthorSelectChange = this.handleAuthorSelectChange.bind(this)
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

	handleAuthorSelectChange(event) {
		this.setState({
			newNote: {
				...this.state.newNote,
				author: [
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
					author: this.state.newNote.author,
					title: document.getElementById('new-note-title').value,
					body: document.getElementById('new-note-body').value,
					teamTags: this.state.newNote.teamTags
				})
			)
        }).then(() => {
			this.setState({
				status: alertStatus.SUCCESS
			})

			setTimeout(async () => {
				this.setState({
					editorStatus: editorStatus.CLOSED,
					editorButtonText: 'Add Note'
				})

				const updatedNotes = await fetchNotes();

				this.setState({
					notes: updatedNotes
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
									value={this.state.newNote.teamTags[0]}
									onChange={this.handleTeamTagSelectChange}
								>
									{
										teams.map((team) => {
											return (
												<MenuItem key={team.key} value={team.key}>
													{ renderTeamIcons([team.key]) } &nbsp; {team.location} {team.name}
												</MenuItem>
											)
										})
									}
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth variant="standard">
								<InputLabel id="author-label">Author</InputLabel>
								<Select
									labelId="author-label"
									id="new-note-author"
									name="author"
									value={this.state.newNote.author}
									onChange={this.handleAuthorSelectChange}
								>
									{
										authors.map((author) => {
											return (
												<MenuItem key={author.key} value={author.key}>
													{author.label}
												</MenuItem>
											)
										})
									}
								</Select>
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

	render () {
		return (
			<div className={styles.container}>
				<Head>
					<title>Notes | Sharply Stupid</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<h1 align="center">NFL Insights</h1>

				<Grid container align="center" direction="row" alignItems="center" sx={{mt:2, mb: 2}}>
					<Grid item xs={6}>
						<Button variant="outlined" endIcon={<PostAddIcon />} onClick={this.handleAddNoteToggle}>
							{this.state.editorButtonText}
						</Button>
					</Grid>

					{ renderWeekPicker("16") }
				</Grid>

				{ this.renderEditor() }

				{ renderNotes(this.state.notes, 'ts') }
			</div>
		)
	}
}

export async function getServerSideProps() {

	const notes = await fetchNotes()

	return {
		props: {
			notes
		}
	}
}