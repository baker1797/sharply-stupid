import * as React from 'react';
import Head from 'next/head'
import styles from '/styles/Home.module.css'
import Container from '@mui/material/Container';
import NavBottom from './../components/nav-bottom';

export default class CountItLeaderboard extends React.Component {

    constructor(props) {
        super(props)
        console.log('props')
        console.log(props)
        this.state = {
            leader: "Kyle Baker",
            week: 10,
            // leaders: props.leaders
            actions: props.actions
        }
    }

    // GET all leaders
    // GET all action by Leader
    // JOIN all leaders & SUM(actions.each(return action.points))
    // return Name & Points
    // render Leaders.sort(points).map()

    render() {
        return (
            <div className={styles.container}>
                <Head>
                    <title>Count It! Leaderboard</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Container>
                    <main>
                        <h1>Count It!</h1>
                        <h3>Week {this.state.week}</h3>
                        <ol>
                            {this.state.actions.data.map((action) => (
                                <li key={action.ts}>{action.data.fan['@ref'].id} ({action.data.away_name},{action.data.home_name},{action.data.away_score},{action.data.home_score})</li>
                            ))}
                        </ol>
                    </main>
                </Container>
                <NavBottom></NavBottom>
            </div>
        )
    }
}

export async function getServerSideProps() {

    // GET all leaders
    // GET all action by Leader
    // JOIN all leaders & SUM(actions.each(return action.points))
    // return Name & Points
    // render Leaders.sort(points).map()
    
    let domain = 'http://sharply-stupid.herokuapp.com';
	let data;
    
	if (process.env.NODE_ENV == 'development') {
		domain = 'http://localhost:3000';
		// console.log('DEV MODE!')
	} else {
		// console.log('not dev mode :(')
	}

	const endpointUrl = `${domain}/api/count-it/all-actions`

	try {
		const res = await fetch(endpointUrl, {
            method: 'POST',
            body: JSON.stringify({
				fan_name: "Jason Kwok"
			})
		})

        // TODO - this is returning an array not an object
		data = await res.json()
        console.log(data)

	} catch (fetchError) {
		data = {
			data: []
		}
	}

	return {
        props: data
    }
}