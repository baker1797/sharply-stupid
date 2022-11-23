import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

export default function BetCard({data}) {
  const { 
    bet_id,
    prop,
    prop_side,
    prop_value,
    prop_juice,
    maker,
    taker
  } = data;

  console.log(data)

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>

        {
        /*
          List of Bets
        */
        }
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {/* {bet_id} */}
        </Typography>
        <Typography variant="h5" component="div">
        {maker}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          vs.
        </Typography>
        <Typography variant="h5" component="div">
          {taker}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {prop_side}
          {/* <li>{prop_side}</li>
          <li>{prop_value}</li>
          <li>{prop_juice}</li> */}
        </Typography>
      </CardContent>

      <CardActions>
        <IconButton edge="end" aria-label="comments">
          <VisibilityOffIcon />
        </IconButton>
        <IconButton edge="end" aria-label="comments">
          <BookmarkAddIcon />
        </IconButton>
                  
      </CardActions>
    </Card>
  );
}