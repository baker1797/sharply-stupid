import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { NbaTeams as teams } from './../../../lib/nba'


export default function WatchInput() {
    return (
        <Grid container sx={{flexGrow: 1}} spacing={2} alignItems="center" justifyContent="flex-start">
            <Grid item xs={12}>
                <FormControl fullWidth variant="standard">
                    <TextField
                        key="fan-name"
                        id="fan-name"
                        className="action_input"
                        label="Fan's Name"
                        name="fan_name"
                        style={{width: "100%"}}
                    />
                </FormControl>
            </Grid>

            { /* Away */ }
            <Grid item xs={8}>
                <FormControl fullWidth variant="standard">
                    <InputLabel id="away-label">Away</InputLabel>
                    <Select
                        labelId="away-label"
                        id="away-name"
                        className="action_input"
                        name="away_name"
                        // onChange={this.handleSelectChange}
                    >
                        {
                            teams.map((team) => {
                                return <MenuItem key={`away-${team.key}`} value={team.key}>{team.location} {team.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth variant="standard">
                    <TextField
                        key="away-score"
                        id="away-score"
                        className="action_input"
                        label="Score"
                        name="away_score"
                    />
                </FormControl>
            </Grid>


            { /* Home */ }
            <Grid item xs={8}>
                <FormControl fullWidth variant="standard">
                    <InputLabel id="home-label">Home</InputLabel>
                    <Select
                        labelId="home-label"
                        id="home-name"
                        className="action_input"
                        name="home_name"
                        // onChange={this.handleSelectChange}
                    >
                        {
                            teams.map((team) => {
                                return <MenuItem key={`home-${team.key}`} value={team.key}>{team.location} {team.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth variant="standard">
                    <TextField
                        key="home-score"
                        id="home-score"
                        className="action_input"
                        label="Score"
                        name="home_score"
                    />
                </FormControl>
            </Grid>
        </Grid>
    )
}