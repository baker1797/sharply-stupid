import * as React from 'react';
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
		// bet_id,
		prop,
		// prop_side,
		// prop_value,
		// prop_juice,
		maker,
		taker,
		date_created
	} = data;

	return (
		<Card sx={{ minWidth: 150, mb: 1.5 }}>
			<CardContent sx={{ minheight: 150 }}>
				<Typography variant="h5" component="div">
					{prop}
				</Typography>
				<Typography color="text.secondary">
					{maker} vs. {taker}
				</Typography>
				{/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Side: {prop_side}<br></br>
          Total: {prop_value}<br></br>
          Juice: {prop_juice}<br></br>
        </Typography> */}

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