import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

export default class NewBetCard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            betProp: null,
            date_created: null
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleSubmit(event) {
        console.log('/pages/bets/create: handleSubmit')

        fetch('/api/fauna/bets/create', {
            method: 'POST',
            body: JSON.stringify({
                betProp: 'Jody vs Sal',
                dateCreated: new Date()
            })
        }).then(() => {
            alert('Bet Submitted')
            this.setState({
                betProp: null
            })
        }).catch(() => {
            alert('Your bet failed to submit')
        })

    }

    handleCancel(event) {
        console.log('/pages/bets/create: handleCancel')

        this.setState({
            betProp: null
        });
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    render() {
        return (
            <Box
                component="form"
                sx={{
                    minWidth: 150, maxWidth: 500, minheight: 150,
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <h2>Add a new Bet</h2>
                <Card>
                    <CardContent>
                        <TextField
                            id="new-bet-prop"
                            label="Bet"
                            multiline
                            rows={3}
                            name="betProp"
                            onChange={this.handleInputChange}
                        />

                        <CardActions>
                            <Button id="new-bet-submit" variant="contained" endIcon={<SendIcon />} onClick={this.handleSubmit}>
                                Submit
                            </Button>
                            <Button id="new-bet-cancel" variant="outlined" startIcon={<DeleteIcon />} onClick={this.handleCancel}>
                                Cancel
                            </Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </Box>
        )
    }
}