import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { weeks } from './nfl'

const alertStatus = {
	PROCESSING: 'processing',
	SUCCESS: 'success',
	ERROR: 'error'
}

const editorStatus = {
	OPEN: 'open',
	CLOSED: 'closed'
}

/**
 * 
 * @param {*} status 
 * @param {*} itemTypeName 
 * @returns 
 */
const renderStatus = (status, itemTypeName) => {
    if (status === 'success') {
        return ( <Alert severity="success">{itemTypeName} added!</Alert> )
    } else if (status === 'error') {
        return ( <Alert severity="error">Ya done goofed!</Alert> )
    } else if (status === 'processing') {
        return ( <Alert severity="info">Processing, hang on!</Alert> )
    } else {
        return ( '' )
    }
}

/**
 * 
 * @param {*} ts 
 * @returns 
 */
const renderTimestamp = (ts) => {
    const date = new Date(ts)
    
    let hours = date.getHours() % 12
    
    if (hours === 0) {
        hours = 12
    }

    let minutes = date.getMinutes()

    if ((minutes + "").length === 1) {
        minutes = "0" + minutes
    }

    const dateOutput = [
        date.getMonth() + 1,
        date.getDate(),
        date.getFullYear()
    ].join('/')

    // TODO - some issue with the server and client outputs not matching
    // const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone:'America/New_York' })
    // return "".concat(dateOutput, " ", time)
    return dateOutput
}

/**
 * 
 * @param {*} ts 
 * @returns 
 */
const renderMatchupTimestamp = (ts) => {
    const date = new Date(ts)
    
    let hours = date.getHours() % 12
    
    if (hours === 0) {
        hours = 12
    }

    let minutes = date.getMinutes()

    if ((minutes + "").length === 1) {
        minutes = "0" + minutes
    }

    const dateOutput = ['Sunday','Monday','Tuesday','Wednesday', 'Thursday', 'Friday','Saturday'][date.getDay()]

    const time = " " + hours + ":" + minutes
    const amPm = (date.getHours() / 12 > 0) ? "pm" : "am"
    
    return "".concat(dateOutput, time, amPm)
}

/**
 * DEPRECATED
 */
const renderTeamIcons = (teamTags) => {
    if (teamTags && teamTags.length > 0) {
        const imgSrc = `/images/${teamTags[0]}.png`

        return (
            // TODO - replace with <Image/>
            <img src={imgSrc} width={24} />
        )
    } else {
        return ('')
    }
}

const renderTeamIcon = (teamId, size) => {
    if (teamId) {
        const imgSrc = `/images/${teamId}.png`

        size = size > 0 ? size : 48

        return (
            // TODO - replace with <Image/> ?
            <img src={imgSrc} width={size} style={{maxWidth: "100%"}} />
        )
    } else {
        return ('')
    }
}


const getSortField = (obj, sortField) => {
    if ('ts' === sortField) {
        return obj.ts
    } else {
        return obj.data[sortField]
    }
}

/**
 * This needs to be refactored and moved to render.js
 * @returns 
 */
const renderNotes = (notes, sortField = 'week') => {

    if (!notes || notes.length <= 0) {
        return (
            <div>No Notes</div>
        )
    }

    return (
        <Grid container align="left" spacing={{ xs: 2, sm: 2, md: 3 }} sx={{mb:4}}>
            {
                notes.sort((a,b) => getSortField(b, sortField) - getSortField(a, sortField)).map((note, noteIndex) => {
                // notes.sort((a,b) => b.ts - a.ts).map((note, noteIndex) => {
                    return (
                        <Grid item xs={12} sm={6} lg={4} key={"note_" + noteIndex}>
                            <Card sx={{pl:2, pr:2, position: "relative"}}>
                                <h4>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                    >
                                        <Grid item xs={2} sm={3} sx={{fontSize: "small", fontWeight: "light"}}>
                                            { renderTeamIcon(note.data.teamTags[0]) }
                                        </Grid>
                                        <Grid item xs={10} sm={9}>{note.data.title}</Grid>
                                    </Grid>
                                </h4>
                                { renderPrimaryImage(note.data.images) }
                                { renderNoteBody(note.data.body) }
                                { renderNoteBullets(note.data.bullets, noteIndex) }
                                <Grid container mb={1}>
                                    <Grid item xs={12} align="right">
                                        <sub>
                                            <i>{ note.data.week ? "Week " + note.data.week : '' } &bull; { renderTimestamp(note.ts/1000) }</i>
                                        </sub>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

/**
 * 
 * @param {*} bullets 
 * @param {*} noteIndex 
 * @returns 
 */
const renderNoteBullets = (bullets, noteIndex) => {
    if (bullets && bullets.length > 0) {
        return (
            <ul>
                {
                    bullets.map((bullet, bulletIndex) => {
                        return (
                            <li key={noteIndex + "_" + bulletIndex}>{bullet.body}</li>
                        )
                    })
                }
            </ul>
        )
    }
}

/**
 * 
 * @param {*} images 
 * @returns 
 */
const renderPrimaryImage = (images) => {
    if (images && images[0]) {
        const imgSrc = `./uploads/${images[0]}`

        return (
            <a href={imgSrc} target="_blank" rel="noreferrer">
                <img src={imgSrc} width="100%" />
            </a>
        )
    }
}

/**
 * 
 * @param {*} body 
 * @returns 
 */
const renderNoteBody = (body) => {
    if (body && body.length) {
        return <p style={{whiteSpace: "pre-line"}}>{body}</p>
    }
}

/**
 * Filter Notes by a given week
 * 
 * @returns 
 */
const renderWeekPicker = (selected) => {
    const redirectToWeeklyNotes = (week) => {
        // let router= useRouter()
        // router.push('/notes/17')
        window.location = `/notes/${week}`
    }

    return (
        <Grid item xs={6} align="center">
            <Select
                labelId="week-nav-label"
                id="new-note-week"
                name="week"
                value={selected}
            >
                {
                    weeks.map((week) => {
                        return (
                            <MenuItem onClick={redirectToWeeklyNotes.bind(this, week.value)} key={week.value} value={week.value}>
                                {week.label}
                            </MenuItem>
                        )
                    })
                }
            </Select>
        </Grid>
    )
}

export {
    alertStatus,
    editorStatus,
    renderMatchupTimestamp,
    renderNoteBody,
    renderNotes,
    renderNoteBullets,
    renderPrimaryImage,
    renderStatus,
    renderTeamIcon,
    renderTeamIcons,
    renderTimestamp,
    renderWeekPicker,
}