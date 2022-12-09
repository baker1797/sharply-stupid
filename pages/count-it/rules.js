import * as React from 'react';
import Head from 'next/head'
import styles from '/styles/Home.module.css'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import NavBottom from './components/nav-bottom';

export default class CountItLeaderboard extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className={styles.container}>
                <Head>
                    <title>Count It!</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Container>
                    <main className={styles.main}>
                        <h1 className={styles.title}>Count It!</h1>

                        <h3>Ways to Earn Points</h3>
                        <Grid container>
                            <Grid item xs={2}><b>Action</b></Grid>
                            <Grid item xs={4}><b>Description</b></Grid>
                            <Grid item xs={2}><b>Points</b></Grid>
                            <Grid item xs={2}><b>Max</b></Grid>
                            <Grid item xs={2}><b>Notes</b></Grid>

                            <Grid item xs={2}>Watch</Grid>
                            <Grid item xs={4}>Text me the score of the game and the quarter (or a picture/screenshot of you watching the game)</Grid>
                            <Grid item xs={2}>3</Grid>
                            <Grid item xs={2}>1/game</Grid>
                            <Grid item xs={2}></Grid>
                        </Grid>
                    </main>
                </Container>
                <NavBottom></NavBottom>
            </div>
        )
    }
}
