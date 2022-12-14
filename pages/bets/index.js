import * as React from 'react'
import Head from 'next/head'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import styles from '/styles/Home.module.css'
import MatchupCard from './components/bet'
import Container from '@mui/material/Container'
import NavBottom from './components/nav-bottom'
import { createApiRoute } from './../../lib/helpers'


export default class CountItLeaderboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
			data: props.data
		}
    }

    render() {

		// console.log('Bets :: render')
		// console.log(data)

		// TODO: merge this index file with [week] or extract the main render components

		return (
			<div className={styles.container} style={{background: "#6c6c6c"}}>
				<Head>
					<title>Side Bets | Sharply Stupid</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<Container sx={{mb:4}}>
					<main className={styles.main}>
						<h1 className={styles.title}>Side Bets</h1>

						<Container sx={{background: "white", mb: 2}}>
							<Link href="/bets/12">12</Link> | <Link href="/bets/13">13</Link> | <Link href="/bets/14">14</Link> | <Link href="/bets/15">15</Link> | <Link href="/bets/16">16</Link> | <Link href="/bets/17">17</Link>
						</Container>

						<Grid container>
							{
								this.state.data.data.map((bet, betIndex) => {
									return (
										<Grid item xs={12} key={betIndex}>
											<MatchupCard {...bet} key={betIndex}></MatchupCard>
										</Grid>
									)
								})
							}
						</Grid>
					</main>
				</Container>

				<NavBottom></NavBottom>
			</div>
		)
	}
}

export async function getServerSideProps() {

	let data;
	const endpointUrl = createApiRoute('bets/fetch-all')

	try {
		const res = await fetch(endpointUrl)
		data = await res.json()

		// console.log(data)
	} catch (fetchError) {
		// console.log(fetchError)
		data = {
			data: []
		}
	}

	return { props: { data } }
}