import * as React from 'react';
import Head from 'next/head'
import styles from '/styles/Home.module.css'
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from 'next/link'
import AddBoxIcon from '@mui/icons-material/AddBox';

export default class Home extends React.Component {
	constructor(props) {
        super(props)

        this.state = {}
    }
	
	render() {
		return (
			<div className={styles.container}>
				<Head>
					<title>Sharply Stupid</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Container>
					<main className={styles.main}>
						<h1><i>Sharply</i> Stupid!</h1>

						<Stack spacing={2}>
							<Button variant="contained">
								<Link href="/count-it" sx={{ color: "white", textDecoration: "none" }}>
									Count It!
								</Link>
							</Button>

							<Button variant="contained">
								<Link href="/bets" sx={{ color: "white", textDecoration: "none" }}>
									Side Bets
								</Link>
							</Button>
						</Stack>
					</main>
				</Container>
			</div>
		)
	}
}
