import * as React from 'react';
import styles from '/styles/Home.module.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import DeleteIcon from '@mui/icons-material/Delete';

const printDate = (date) => {
	let printDate = ''

	if (date) {
		const creation_date = new Date(date)
		printDate = creation_date.toLocaleString('default', { month: 'long' }) + ' ' + creation_date.getDate()
	}

	return printDate
}

export default function BetCard({ data }) {
	if (!data) {
		return 'busted';
	}

	const {
		away_team,
		home_team,
		line,
		week,
		date_created
	} = data;

	return (
		<Card className={styles.card}>
			<CardContent sx={{ minheight: 150 }}>
				<Typography variant="h5" component="div">
					{away_team}
				</Typography>
				<Typography color="text.secondary">
					vs.
				</Typography>
				<Typography variant="h5" component="div">
					{home_team} ({line})
				</Typography>

				<Typography color="text.secondary" align="left">
					<i>Week: {week}</i>
				</Typography>
				<Typography color="text.secondary" align="left">
					<i>Listed: {printDate(date_created)}</i>
				</Typography>

				<CardActions sx={{ flexFlow: "row-reverse" }}>
					<IconButton aria-label="delete">
						<DeleteIcon />
					</IconButton>
					<IconButton sx={{ mr: 1 }} edge="end" aria-label="save">
						<BookmarkAddIcon />
					</IconButton>
				</CardActions>
			</CardContent>
		</Card>
	);
}