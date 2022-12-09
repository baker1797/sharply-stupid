import * as React from 'react';
import Head from 'next/head'
import styles from '/styles/Home.module.css'
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import GavelIcon from '@mui/icons-material/Gavel';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddBoxIcon from '@mui/icons-material/AddBox';
import NavBottom from './components/nav-bottom';

export default class CountItLeaderboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {}
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
                        <Stack spacing={2}>
                            <Button variant="contained" endIcon={<AddBoxIcon />}>
                                <Link href="/count-it/action/watch" sx={{color: "white", textDecoration:"none"}}>
                                    Increase your Fandom
                                </Link>
                            </Button>

                            <Button variant="contained" endIcon={<FormatListBulletedIcon />}>
                                <Link href="/count-it/leaderboard" sx={{color: "white", textDecoration:"none"}}>
                                    View Leaderboard
                                </Link>
                            </Button>
                            
                            <Button variant="contained" endIcon={<GavelIcon />}>
                                <Link href="/count-it/rules" sx={{color: "white", textDecoration:"none"}}>
                                    Rules
                                </Link>
                            </Button>
                        </Stack>
                    </main>
                </Container>
                <NavBottom></NavBottom>
            </div>
        )
    }
}