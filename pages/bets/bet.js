import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

export default function BetCard({data}) {
  if (!data) {
    return 'busted';
  }

  const {
    bet_id,
    prop,
    prop_side,
    prop_value,
    prop_juice,
    maker,
    taker
  } = data;

  var date = new Date(bet_id)
  var datePrint = date.toLocaleString('default', { month: 'long' }) + ' ' + date.getDate()
  
  console.log(data)

  return (
    <Card sx={{ minWidth: 150 }}>
      <CardContent sx={{ minheight: 150 }}>
        <CardActions sx={{flexFlow: "row-reverse"}}>
          <IconButton edge="end" aria-label="comments">
            <BookmarkAddIcon />
          </IconButton>
        </CardActions>

        <Typography variant="h5" component="div">
          {prop}
        </Typography>
        <Typography color="text.secondary">
          {maker} vs. {taker}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <br></br>
          Side: {prop_side}<br></br>
          Total: {prop_value}<br></br>
          Juice: {prop_juice}<br></br>
        </Typography>

        <Typography color="text.secondary" align="right">
          <i>Listed: {datePrint}</i>
        </Typography>
      </CardContent>
    </Card>
  );
}