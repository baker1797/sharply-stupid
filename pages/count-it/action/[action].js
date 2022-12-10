import * as React from 'react';
import Head from 'next/head'
import styles from '/styles/Home.module.css'
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import NavBottom from './../components/nav-bottom';
import WatchInput from './../components/WatchInput';


/**
 * 
 * @returns 
 */
function ReferInput() {
    return (
        <Container>ReferInput Card to be created</Container>
    )
}



export default class CountItAction extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            actionType: props.actionType,
            status: null
        }

        this.handleActionTypeChange = this.handleActionTypeChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.actionOptions = [
            {
                type: "watch",
                label: "Watch"
            },
            {
                type: "still-watching",
                label: "Still Watching"
            },
            {
                type: "stay-informed",
                label: "Stay Informed"
            },
            {
                type: "attend",
                label: "Attend"
            },
            {
                type: "refer",
                label: "Refer"
            },
            {
                type: "gear",
                label: "Gear"
            }
        ]
    
    }

    /**
     * 
     * @param {*} event 
     */
    handleInputChange(event) {
        console.log('handleInputChange')
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    
    /**
     * 
     * @param {*} event 
     */
    handleActionTypeChange(event) {
        console.log('handleActionTypeChange')

        const target = event.target;

        this.setState({
            actionType: target.value
        })
    }

    /**
     * 
     * @param {*} event 
     */
    handleSubmit(event) {
        console.log('handleSubmit')
        
        this.setState({
            status: 'processing'
        })
    }
    
    /**
     * TODO - move this to components
     * @returns 
     */
    renderStatus() {
        if (this.state.status === 'success') {
            return ( <Alert severity="success">Action added!</Alert> )
        } else if (this.state.status === 'success') {
            return ( <Alert severity="error">Ya done goofed!</Alert> )
        } else if (this.state.status === 'processing') {
            return ( <Alert severity="info">Processing, hang on!</Alert> )
        } else {
            return ( '' )
        }
    }

    /**
     * Render Action Details
     * Determines which form elements to display for a given action
     * 
     * @param {actionType}
     * @returns 
     */
    renderActionDetails(actionType) {
        console.log('renderActionDetails')
        console.log(actionType)
    
        switch(actionType) {
            case 'watch':
                return <WatchInput></WatchInput>
            case 'refer':
                return <ReferInput></ReferInput>
            default:
                return `Invalid <actionType>: ${actionType}`
        }
    }

    /**
     * 
     * @returns 
     */
    render() {

        return (
            <div className={styles.container}>
                <Head>
                    <title>Count It!</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Container sx={{maxWidth: 400}}>
                    <main>
                        <h1>Count It</h1>
                        <h3>Track my Action</h3>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <Select
                                labelId="Action"
                                id="action-entry"
                                value={this.state.actionType}
                                label="Select Action"
                                onChange={this.handleActionTypeChange}
                            >
                                {
                                    this.actionOptions.map((option) => {
                                        return <MenuItem key={option.type} value={option.type}>{option.label}</MenuItem>
                                    })
                                }
                            </Select>
                            <Card className={styles.card}>
                                <CardContent>
                                    {this.renderActionDetails(this.state.actionType)}

                                    {/* TODO: this should be activated from handleInputChange   */}
                                    { this.renderStatus() }
                                </CardContent>

                                <CardActions>
                                    <Button id="new-bet-submit" variant="contained" onClick={this.handleSubmit}>
                                        Count it!
                                    </Button>
                                </CardActions>
                            </Card>
                        </FormControl>
                    </main>
                </Container>

                <NavBottom></NavBottom>
            </div>
        )
    }
    
}

//await async?
export function getServerSideProps({query}) {
    console.log('Count It Action | getServerSideProps [action]')
    console.log(query.action)

    return { props: {
        actionType: query.action
    } }
}