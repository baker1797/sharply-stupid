import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const teams = ['ATL', 'PHI', 'NO', 'GSW']


export default function WatchInput() {
    return (
        <Grid container sx={{flexGrow: 1}} spacing={4} alignItems="center" justifyContent="flex-start">
            <Grid item xs={12}>
                <TextField
                    key="fan-name"
                    id="fan-name"
                    label="Fan's Name"
                    name="fan_name"
                    style={{width: "100%"}}
                />
            </Grid>

            { /* Away */ }
            <Grid item xs={3}>
                <Select
                    labelId="Action"
                    id="action-entry"
                    name="away_name"
                    value="ATL"
                    label="Select Action"
                >
                    {
                        teams.map((option) => {
                            return <MenuItem key={`away-${option}`} value={option}>{option}</MenuItem>
                        })
                    }
                </Select>
            </Grid>
            <Grid item xs={9}>
                <TextField
                    key="away-score"
                    id="away-score"
                    label="Away Score"
                    name="away_score"
                />
            </Grid>


            { /* Home */ }
            <Grid item xs={3}>
                <Select
                    labelId="Action"
                    id="action-entry"
                    name="home_name"
                    value="GSW"
                    label="Select Action"
                >
                    {
                        teams.map((option) => {
                            return <MenuItem key={`home-${option}`} value={option}>{option}</MenuItem>
                        })
                    }
                </Select>
            </Grid>
            <Grid item xs={9}>
                <TextField
                    key="home-score"
                    id="home-score"
                    label="Home Score"
                    name="home_score"
                />
            </Grid>
        </Grid>
    )
}