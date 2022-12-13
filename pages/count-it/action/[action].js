import * as React from 'react';
import Head from 'next/head'
import styles from '/styles/Home.module.css'
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import NavBottom from './../components/nav-bottom';
import WatchInput from './../components/WatchInput';
import { renderStatus } from './../../../lib/helpers'

export default class CountItAction extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			actionType: props.actionType,
			status: null
		}

		this.handleActionTypeChange = this.handleActionTypeChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)

		this.actionOptions = [
			{
				type: "watch",
				label: "Watch"
			},
			{
				type: "still-watching",
				label: "Still Watching"
			},
			{
				type: "stay-informed",
				label: "Stay Informed"
			},
			{
				type: "attend",
				label: "Attend"
			},
			{
				type: "refer",
				label: "Refer"
			},
			{
				type: "gear",
				label: "Gear"
			}
		]

	}
	
	/**
	 * 
	 * @param {*} event 
	 */
	handleActionTypeChange(event) {
		console.log('handleActionTypeChange')

		const target = event.target

		this.setState({
			actionType: target.value
		})
	}

	/**
	 * 
	 * @param {*} event 
	 */
	handleSubmit(event) {
		console.log('handleSubmit')
	
		const inputs = document.querySelectorAll('.action_input input')
		let formData = {}
		const keys = Object.keys(inputs)

		for (let key in keys) {
			formData[inputs[key].name] = inputs[key].value
		}

		this.setState({
			status: 'processing'
		})

		fetch('/api/count-it/create', {
			method: 'POST',
			body: JSON.stringify(formData)
		}).then((response) => {
			// TODO - it's odd that the server error flows through "then", not "catch"
			if (response.status === 200) {
				setTimeout(() => {
					this.setState({
						status: 'success'
					})
				}, 500)
			} else {
				this.setState({
					status: 'error'
				})
			}
		}).catch((error) => {

			this.setState({
				status: 'error'
			})

			console.log('Your bet failed to submit')
			console.log(error)
		})

	}

	/**
	 * Render Action Details
	 * Determines which form elements to display for a given action
	 * 
	 * @param {actionType}
	 * @returns 
	 */
	renderActionDetails(actionType) {
		console.log('renderActionDetails')
		console.log(actionType)
	
		switch(actionType) {
			case 'watch':
				return <WatchInput></WatchInput>
			default:
				return `Unsupported <actionType>: "${actionType}"`
		}
	}

	/**
	 * 
	 * @returns 
	 */
	render() {

		return (
			<div className={styles.container}>
				<Head>
					<title>Count It!</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Container sx={{maxWidth: 400}}>
					<main>
						<h1>Count It</h1>
						<h3>Track my Action</h3>

						<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
							<Select
								labelId="Action"
								className="action_input"
								id="action-entry"
								name="action_type"
								value={this.state.actionType}
								label="Select Action"
								onChange={this.handleActionTypeChange}
							>
								{
									this.actionOptions.map((option) => {
										return <MenuItem key={option.type} value={option.type}>{option.label}</MenuItem>
									})
								}
							</Select>
							<Card className={styles.card}>
								<CardContent>
									{this.renderActionDetails(this.state.actionType)}
								</CardContent>

								<CardContent>
									{ renderStatus(this.state.status, 'Action') }
								</CardContent>
								
								<CardActions>
									<Button id="new-bet-submit" variant="contained" onClick={this.handleSubmit}>
										Count it!
									</Button>
								</CardActions>
							</Card>
						</FormControl>
					</main>
				</Container>

				<NavBottom></NavBottom>
			</div>
		)
	}
	
}

//await async?
export function getServerSideProps({query}) {
	console.log('Count It Action | getServerSideProps [action]')
	console.log(query.action)

	return { props: {
		actionType: query.action
	} }
}