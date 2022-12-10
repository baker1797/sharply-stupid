import * as React from 'react';
import Head from 'next/head'
import styles from '/styles/Home.module.css'
import Container from '@mui/material/Container';
import NavBottom from './../components/nav-bottom';

export default class CountItLeaderboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            leader: "Kyle Baker",
            week: 10,
            leaders: props.leaders
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
                            {this.state.leaders.map((leader) => (
                                <li key={leader.name}>{leader.name} ({leader.points})</li>
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


	// let domain = 'http://sharply-stupid.herokuapp.com';
	// let data;

	// if (process.env.NODE_ENV == 'development') {
	// 	domain = 'http://localhost:3000';
	// 	// console.log('DEV MODE!')
	// } else {
	// 	// console.log('not dev mode :(')
	// }

	// const endpointUrl = `${domain}/api/fauna/bets/fetch-all`

	// try {
	// 	const res = await fetch(endpointUrl)
	// 	data = await res.json()

	// 	// console.log(data)
	// } catch (fetchError) {
	// 	// console.log(fetchError)
	// 	data = {
	// 		data: []
	// 	}
	// }

	return { props: {
        leaders: [{
            name: "Kyle Baker",
            points: 100
        },{
            name: "Jason Kwok",
            points: 94
        },{
            name: "JC",
            points: 49
        }]
    } }
}