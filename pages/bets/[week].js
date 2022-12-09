import Head from 'next/head'
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import styles from '/styles/Home.module.css'
import MatchupCard from './components/bet'
import Container from '@mui/material/Container';
import NavBottom from './components/nav-bottom';

export default function WeeklyBets({ data }) {

	console.log('Weekly Bets :: render')
	// console.log(data)

	return (
		<div className={styles.container}>
			<Head>
				<title>Side Bets | Sharply Stupid</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Container>
				<main className={styles.main}>
					<h1 className={styles.title}>Side Bets</h1>

					<Container sx={{mb: 4}}>
						<Link href="/bets/12">12</Link> | <Link href="/bets/13">13</Link> | <Link href="/bets/14">14</Link><br></br> 
						<Link href="/bets/15">15</Link> | <Link href="/bets/16">16</Link> | <Link href="/bets/17">17</Link>
					</Container>
					
					<Grid container spacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
						{
							data.data.map((bet, betIndex) => {
								return (
									<Grid item xs={2} sm={4} md={4} key={betIndex}>
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

export async function getServerSideProps({query}) {

	console.log('bets :: getServerSideProps')

	let domain = 'http://sharply-stupid.herokuapp.com';
	let data;

	if (process.env.NODE_ENV == 'development') {
		domain = 'http://localhost:3000';
		// console.log('DEV MODE!')
	} else {
		// console.log('not dev mode :(')
	}

	const endpointUrl = `${domain}/api/fauna/bets/fetch-week`

	try {
		const res = await fetch(endpointUrl, {
            method: 'POST',
            body: JSON.stringify({
				week: parseInt(query.week)
			})
		})

		data = await res.json()
	} catch (fetchError) {
		data = {
			data: []
		}
	}

	return { props: { data } }
}