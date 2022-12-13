import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const teams = ['ATL', 'PHI', 'NO', 'GSW']

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
            <Grid item xs={4}>
                <FormControl fullWidth variant="standard">
                    <Select
                        labelId="Action"
                        id="away-name"
                        className="action_input"
                        name="away_name"
                        // value={this.state.away_name}
                        label="Select Action"
                    >
                        {
                            teams.map((option) => {
                                return <MenuItem key={`away-${option}`} value={option}>{option}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={8}>
                <FormControl fullWidth variant="standard">
                    <TextField
                        key="away-score"
                        id="away-score"
                        className="action_input"
                        label="Away Score"
                        name="away_score"
                    />
                </FormControl>
            </Grid>


            { /* Home */ }
            <Grid item xs={4}>
                <FormControl fullWidth variant="standard">
                    <Select
                        labelId="Action"
                        id="home-name"
                        className="action_input"
                        name="home_name"
                        // value={this.state.home_name}
                        label="Select Action"
                    >
                        {
                            teams.map((option) => {
                                return <MenuItem key={`home-${option}`} value={option}>{option}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={8}>
                <FormControl fullWidth variant="standard">
                    <TextField
                        key="home-score"
                        id="home-score"
                        className="action_input"
                        label="Home Score"
                        name="home_score"
                    />
                </FormControl>
            </Grid>
        </Grid>
    )
}