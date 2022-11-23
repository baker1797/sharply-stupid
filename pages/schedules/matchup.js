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

export default function MatchupCard(props) {
  const { home, away, notes } = props;

  const [checked, setChecked] = React.useState([0]);

  const handleNoteUpdate = (note, index) => {
    const currentIndex = checked.indexOf(index);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(index);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    // setChecked(newChecked);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>

        <Typography variant="h5" component="div">
        {away.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          @
        </Typography>
        <Typography variant="h5" component="div">
          {home.name}
        </Typography>

        {
        /*
          List of Notes 
        */
        }
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {console.log('booger',notes)}
          {notes.map((note, index) => {
            const labelId = `checkbox-list-label-${index}`;

            return (
              <ListItem
                key={`note-${index}`}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <CommentIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton role={undefined} dense>
                  <TextField
                    id="outlined-basic"
                    label="Notes"
                    variant="outlined"
                    defaultValue={note.content}
                    onSubmit={handleNoteUpdate(note, index)}/>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

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