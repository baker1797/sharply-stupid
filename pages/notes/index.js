import * as React from 'react'
import Head from 'next/head'
import Grid from '@mui/material/Grid';
import styles from '/styles/Home.module.css'
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PostAddIcon from '@mui/icons-material/PostAdd'
import SendIcon from '@mui/icons-material/Send'
import { Note as NoteModel } from './../../lib/models'
import { renderStatus } from './../../lib/helpers'

const notes = [
	{
		week: 19,
		category: "gambling",
		title: "KC playoff Props",
		// thumbnail: "https://"
		body: "Slam these props when the playoffs roll around",
		teamTags: [
			'kc'
		],
		bullets: [
			{
				body: "Kelce receptions"
			},
			{
				body: "Mahomes over rushing yards"
			}
		]
	},
	{
		week: 19,
		category: "gambling",
		title: "Buffalo",
		// thumbnail: "https://"
		body: "Slam these props when the playoffs roll around",
		teamTags: [
			'buf'
		],
		bullets: [
			{
				body: "Gabe Davis bombs"
			}
		]
	},
	{
		week: 20,
		category: "gambling",
		title: "Conference Finals Props",
		// thumbnail: "https://"
		body: "Sometimes you just need to trust history",
		teamTags: [],
		bullets: [
			{
				body: "Shortest TD u1.5"
			}
		]
	},
	{
		week: 19,
		category: "gambling",
		title: "General",
		// thumbnail: "https://"
		body: "",
		bullets: [
			{
				body: "Beware the .500 division winner"
			},
			{
				body: "Purdy looked good but he's still a rookie QB. Shannan managed to hide Jimmy G in the playoffs, so maybe not overly signficant rookie history."
			}
		]
	},
	{
		week: 19,
		category: "gambling",
		title: "Bengals",
		// thumbnail: "https://"
		body: "Slam these props when the playoffs roll around",
		teamTags: [
			'cin'
		],
		bullets: [
			{
				body: "Burrow rushing"
			},
			{
				body: "Irwin over yards"
			},
			{
				body: "Chase is special"
			},
		]
	},
];

const weeks = [{
	value: 15,
	label: "15"
},{
	value: 16,
	label: "16"
},{
	value: 17,
	label: "17"
},{
	value: 18,
	label: "18"
},{
	value: 19,
	label: "Wild Card"
},{
	value: 20,
	label: "Divisional"
},{
	value: 21,
	label: "Conference"
},{
	value: 22,
	label: "Super Bowl"
}]

const categories = [
	{
		value: "gambling",
		label: "Gambling"
	},
	{
		value: "fantasy",
		label: "Fantasy"
	},
	{
		value: "insights",
		label: "Insights"
	},
]


export default class Notes extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
			status: null, // processing, success, error
			editorStatus: "closed", // closed, open, pending, success, error
			notes: [
				// ...this.props.notes,
				...notes
			],
			// week: 15,
			category: "gambling",
			newPost: NoteModel()
		}

		this.handleSelectChange = this.handleSelectChange.bind(this)
		this.handleNewPostToggle = this.handleNewPostToggle.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSelectChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleNewPostToggle(event) {
		this.setState({
			editorStatus: "open"
		})
	}

    handleSubmit(event) {
        console.log('/pages/notes/create: handleSubmit')

        if (!this.state.status === 'processing') {
            return
        }

        this.setState({
            status: 'processing'
        })
        console.log(NoteModel({
			// week: document.getElementById('new-post-week').value,
			// category: document.getElementById('new-post-category').value,
			title: document.getElementById('new-post-title').value,
			body: document.getElementById('new-post-body').value
		}))

        fetch('/api/notes/create', {
            method: 'POST',
            body: JSON.stringify(
				NoteModel({
					// week: document.getElementById('new-post-week').value,
					// category: document.getElementById('new-post-category').value,
					title: document.getElementById('new-post-title').value,
					body: document.getElementById('new-post-body').value
				})
			)
        }).then(() => {
			setTimeout(() => {
				this.setState({
					status: 'success',
					line: null
				})
			}, 1000)
        }).catch((error) => {

            this.setState({
                status: 'fail',
                line: null
            })

            console.log('Your bet failed to submit')
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

	renderEditor() {
		if (this.state.editorStatus === 'open') {

			return (
				<Card sx={{mb: 2, p: 2}}>
					<Grid container align="center" spacing={2}>
						{/* <Grid item xs={12} md={6}>
							<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
								<InputLabel id="week-label">Week</InputLabel>
								<Select
									labelId="week-label"
									// className="action_input"
									id="new-post-week"
									name="new_post_week"
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
						</Grid> */}
	
						{/* <Grid item xs={12} md={6}>
							<FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
								<InputLabel id="category-label">Category</InputLabel>
								<Select
									labelId="category-label"
									// className="action_input"
									id="new-post-category"
									name="category"
									value={this.state.category}
									onChange={this.handleSelectChange}
								>
									{
										categories.map((category) => {
											return <MenuItem key={category.value} value={category.value}>{category.label}</MenuItem>
										})
									}
								</Select>
							</FormControl>
						</Grid> */}

						<Grid item xs={12}>
							<FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
								<TextField
									id="new-post-title"
									label="Title"
									name="title"
									fullWidth
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
								<TextField
									id="new-post-body"
									label="Description"
									name="body"
									fullWidth
									multiline
									rows={5}
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<Button id="new-post-submit" variant="contained" endIcon={<SendIcon />} onClick={this.handleSubmit}>
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

		// todo - loop

		if (teamTags && teamTags.length > 0) {
			const imgSrc = `./images/${teamTags[0]}.png`

			return (
				<img src={imgSrc} width={24} />
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
			<Grid container spacing={{ xs: 2, sm: 2, md: 3 }} sx={{mb:4}}>
				{
					this.props.notes.map((post, postIndex) => {
						return (
							<Grid item xs={12} key={"post_" & postIndex}>
								<Card sx={{pl:2, pr:2, position: "relative"}}>
									<h3>{ this.renderTeamIcons(post.teamTags) } {post.title}</h3>
									<p>{post.body}</p>
									
									<ul>
										{
											post.bullets.map((bullet, bulletIndex) => {
												return (
													<li key={postIndex & "_" & bulletIndex}>{bullet.body}</li>
												)
											})
										}
									</ul>
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

				<h1 className={styles.title}>Notes</h1>

				<Container align="center" sx={{mt:2}}>
					<Button variant="outlined" endIcon={<PostAddIcon />} onClick={this.handleNewPostToggle}>
						New Post
					</Button>
				</Container>

				{
					/** Week Picker */
					this.renderWeekPicker() 
				}

				{
					/** New Note */
					this.renderEditor() 
				}

				{
					/** New Note */
					// this.renderNotes()
				}
			</div>
		)
	}
}

export async function getServerSideProps() {

	// console.log('bets :: getServerSideProps')

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

		console.log(data)
	} catch (fetchError) {
		console.log(fetchError)
	}

	return { props: { notes } }
}