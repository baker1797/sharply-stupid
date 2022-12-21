import * as React from 'react';
import Head from 'next/head'
import styles from '/styles/Home.module.css'
import Container from '@mui/material/Container';
import NavBottom from './../components/nav-bottom';
import { createApiRoute } from './../../../lib/queries'

export default class CountItLeaderboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            week: 10,
            actions: props.actions.data
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <Head>
                    <title>Count It! Leaderboard</title>
                </Head>
                <Container>
                    <main>
                        <h1>Count It!</h1>
                        <h3>Week {this.state.week}</h3>
                        <ol>
                            {console.log(this.state.actions)}
                            {
                                this.state.actions.map((action) => {
                                    return <li key={action.ts}>{action.data.fan['@ref'].id} ({action.data.away_name},{action.data.home_name},{action.data.away_score},{action.data.home_score})</li>
                                })
                            }
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
    
    let data;
	const endpointUrl = createApiRoute('count-it/all-actions')

	try {
		const res = await fetch(endpointUrl, {
            method: 'POST'
            // body: JSON.stringify({
			// 	fan_name: "Jason Kwok"
			// })
		})

		data = await res.json()

	} catch (fetchError) {
		data = {
			data: []
		}
	}

	return {
        props: data
    }
}