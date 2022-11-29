import Head from 'next/head'
import Grid from '@mui/material/Grid';
import styles from '../../styles/Home.module.css'
import MatchupCard from './bet'
import Container from '@mui/material/Container';

export default function Bets({ data }) {

	console.log('Bets :: render')
	console.log(data)

	return (
		<div className={styles.container}>
			<Head>
				<title>JHBC: Side Bets | Sharply Stupid</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Container>
				<main className={styles.main}>
					<h1 className={styles.title}>JHBC: Side Bets</h1>

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
		</div>
	)
}

export async function getStaticProps() {

	// console.log('bets :: getStaticProps')

	let domain = 'http://sharply-stupid.herokuapp.com';
	let data;

	if (process.env.NODE_ENV == 'development') {
		domain = 'http://localhost:3000';
		// console.log('DEV MODE!')
	} else {
		// console.log('not dev mode :(')
	}

	const endpointUrl = `${domain}/api/fauna/bets/fetch-all`

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