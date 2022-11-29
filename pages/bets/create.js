import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
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

        if (!this.state.status === 'processing') {
            return
        }

        this.setState({
            status: 'processing'
        })

        fetch('/api/fauna/bets/create', {
            method: 'POST',
            body: JSON.stringify({
                betProp: 'Jody vs Sal',
                dateCreated: new Date()
            })
        }).then(() => {
            this.setState({
                status: 'success',
                betProp: null
            })
        }).catch((error) => {

            this.setState({
                status: 'fail',
                betProp: null
            })

            console.log('Your bet failed to submit')
			console.log(error)
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
    
    renderStatus() {
        if (this.state.status === 'success') {
            return ( <Alert severity="success">Bet added!</Alert> )
        } else if (this.state.status === 'success') {
            return ( <Alert severity="error">Ya done goofed!</Alert> )
        } else if (this.state.status === 'processing') {
            return ( <Alert severity="info">Processing, hang on!</Alert> )
        } else {
            return ( '' )
        }
    }

    render() {
        return (
            <Container>
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

                            { this.renderStatus() }

                        </CardContent>
                    </Card>
                </Box>
            </Container>
        )
    }
}