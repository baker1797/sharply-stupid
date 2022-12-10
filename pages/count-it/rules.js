import * as React from 'react';
import Head from 'next/head'
import styles from '/styles/Home.module.css'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import NavBottom from './components/nav-bottom';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import StadiumIcon from '@mui/icons-material/Stadium';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import StorefrontIcon from '@mui/icons-material/Storefront';

export default class CountItRules extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {

		return (
			<div className={styles.container}>
				<Head>
					<title>Count It! Rules</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Container sx={{mb:10}}>
					<main>
						<h1>Count It!</h1>
						<h3>Ways to Earn Points</h3>
						<Grid container>
							
							<Grid item xs={3} sx={{textAlign:"center"}}><b>Action</b></Grid>
							<Grid item xs={5} sx={{textAlign:"center"}}><b>Description</b></Grid>
							<Grid item xs={2} sx={{textAlign:"center"}}><b>Points</b></Grid>
							<Grid item xs={2} sx={{textAlign:"center"}}><b>Max</b></Grid>

							{/** TODO: pull from a static json file and loop */}
							{/** TODO: relocate json into an app config */}

							<Grid item xs={3} sx={{textAlign:"center"}}>
								<IconButton aria-label="watch">
									<LiveTvIcon />
								</IconButton>
							</Grid>
							<Grid item xs={5} sx={{fontSize: "smaller"}}>Text me the score of the game and the quarter (or a picture/screenshot of you watching the game)</Grid>
							<Grid item xs={2} sx={{textAlign: "center"}}>3</Grid>
							<Grid item xs={2} sx={{textAlign: "center"}}>1/game</Grid>
							<Grid item xs={12} sx={{pt: 1, pb: 2, mb:2, fontSize: "smaller", borderBottom: "1px #3c3c3c solid"}}></Grid>

							<Grid item xs={3} sx={{textAlign:"center"}}>
								<IconButton aria-label="still-watching">
									<LiveTvIcon />
								</IconButton>
							</Grid>
							<Grid item xs={5} sx={{fontSize: "smaller"}}>Text me the score (or picture, or screenshot) of the same game in a later quarter to get 1 additional point per quarter (total 6 points/game)</Grid>
							<Grid item xs={2} sx={{textAlign: "center"}}>1</Grid>
							<Grid item xs={2} sx={{textAlign: "center"}}>3/game</Grid>
							<Grid item xs={12} sx={{pt: 1, pb: 2, mb:2, fontSize: "smaller", borderBottom: "1px #3c3c3c solid"}}></Grid>

							<Grid item xs={3} sx={{textAlign:"center"}}>
								<IconButton aria-label="stay-informed">
									<NewspaperIcon />
								</IconButton>
							</Grid>
							<Grid item xs={5} sx={{fontSize: "smaller"}}>Text me an article, podcast, or YouTube video</Grid>
							<Grid item xs={2} sx={{textAlign: "center"}}>1</Grid>
							<Grid item xs={2} sx={{textAlign: "center"}}>N/A</Grid>
							<Grid item xs={12} sx={{pt: 1, pb: 2, mb:2, fontSize: "smaller", borderBottom: "1px #3c3c3c solid"}}></Grid>

							<Grid item xs={3} sx={{textAlign:"center"}}>
								<IconButton aria-label="attend">
									<StadiumIcon />
								</IconButton>
							</Grid>
							<Grid item xs={5} sx={{fontSize: "smaller"}}>Text me a picture of you and the scoreboard at a game</Grid>
							<Grid item xs={2} sx={{textAlign: "center"}}>10</Grid>
							<Grid item xs={2} sx={{textAlign: "center"}}>1/game</Grid>
							<Grid item xs={12} sx={{pt: 1, pb: 2, mb:2, fontSize: "smaller", borderBottom: "1px #3c3c3c solid"}}>Can be combined with pre-tipoff and post-buzzer; can't be combined with watching on TV</Grid>

							<Grid item xs={3} sx={{textAlign:"center"}}>
								<IconButton aria-label="attend">
									<StadiumIcon />
								</IconButton>
							</Grid>
							<Grid item xs={5} sx={{fontSize: "smaller"}}>The picture from the game is before tipoff</Grid>
							<Grid item xs={2} sx={{textAlign: "center"}}>4</Grid>
							<Grid item xs={2} sx={{textAlign: "center"}}>1/game</Grid>
							<Grid item xs={12} sx={{pt: 1, pb: 2, mb:2, fontSize: "smaller", borderBottom: "1px #3c3c3c solid"}}>Bonus on top of 10 for attending; can get a max of 18/game for attending</Grid>

							<Grid item xs={3} sx={{textAlign:"center"}}>
								<IconButton aria-label="attend">
									<StadiumIcon />
								</IconButton>
							</Grid>
							<Grid item xs={5} sx={{fontSize: "smaller"}}>Text me a picture of you and the scoreboard after the final buzzer (0:00/Final on the scoreboard)</Grid>
							<Grid item xs={2} sx={{textAlign: "center"}}>4</Grid>
							<Grid item xs={2} sx={{textAlign: "center"}}>1/game</Grid>
							<Grid item xs={12} sx={{pt: 1, pb: 2, mb:2, fontSize: "smaller", borderBottom: "1px #3c3c3c solid"}}>Bonus on top of 10 for attending; can get a max of 18/game for attending</Grid>

							<Grid item xs={3} sx={{textAlign:"center"}}>
								<IconButton aria-label="attend">
									<StadiumIcon />
								</IconButton>
							</Grid>
							<Grid item xs={5} sx={{fontSize: "smaller"}}>Text me a receipt of you purchasing tickets for a future game</Grid>
							<Grid item xs={2} sx={{textAlign: "center"}}>30</Grid>
							<Grid item xs={2} sx={{textAlign: "center"}}>N/A</Grid>
							<Grid item xs={12} sx={{pt: 1, pb: 2, mb:2, fontSize: "smaller", borderBottom: "1px #3c3c3c solid"}}></Grid>

							<Grid item xs={3} sx={{textAlign:"center"}}>
								<IconButton aria-label="refer">
									<GroupAddIcon />
								</IconButton>
							</Grid>
							<Grid item xs={5} sx={{fontSize: "smaller"}}>Refer someone to join / Get referred</Grid>
							<Grid item xs={2} sx={{textAlign: "center"}}>6</Grid>
							<Grid item xs={2} sx={{textAlign: "center"}}>N/A</Grid>
							<Grid item xs={12} sx={{pt: 1, pb: 2, mb:2, fontSize: "smaller", borderBottom: "1px #3c3c3c solid"}}></Grid>

							<Grid item xs={3} sx={{textAlign:"center"}}>
								<IconButton aria-label="gear">
									<StorefrontIcon />
								</IconButton>
							</Grid>
							<Grid item xs={5} sx={{fontSize: "smaller"}}>Text me a picture/screenshot of a receipt that shows you bought Warriors gear</Grid>
							<Grid item xs={2} sx={{textAlign: "center"}}>0.2 * dollars spent</Grid>
							<Grid item xs={2} sx={{textAlign: "center"}}>20/week</Grid>
						</Grid>
					</main>
				</Container>

				<NavBottom></NavBottom>
			</div>
		)
	}
}
