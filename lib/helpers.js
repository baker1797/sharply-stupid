import faunadb from 'faunadb'
import Alert from '@mui/material/Alert';

/**
 * TODO - move this to components
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

const parseInputFromRequestBody = (reqBody, key) => {
    let value
    
    switch (key) {
        default:
            value = reqBody ? reqBody[key] : null
            break
    }
    
    return value
}

const createDb = (secret) => {
    const client = new faunadb.Client({
        secret,
        domain: 'db.us.fauna.com',
        scheme: 'https',
    });

    return {
        client,
        q: faunadb.query
    }
}

const createApiRoute = (uri) => {
    const domain = 'development' === process.env.NODE_ENV
        ? 'http://localhost:3000'
        : process.env.API_DOMAIN

    return `${domain}/api/${uri}`
}


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

    const time = " " + hours + ":" + minutes
    const amPm = (date.getHours() / 12 > 0) ? "pm" : "am"
    
    return "".concat(dateOutput, time, amPm)
}

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
 * Fetch all notes
 * 
 * @returns 
 */
async function fetchNotes(week) {
	let notes = [];
    let route = 'notes/fetch'

	const endpointUrl = createApiRoute(route)

	try {
		const res = await fetch(endpointUrl, {
            method: 'POST',
            body: {
                week
            }
        })
		notes = await res.json()
	} catch (fetchError) {
		console.log(fetchError)
	}

	return notes.data
}
/**
 * Fetch all notes
 * 
 * @returns 
 */
async function fetchMatches(week) {
	let notes = [];
    let route = 'notes/fetch-matches'

	const endpointUrl = createApiRoute(route)

	try {
		const res = await fetch(endpointUrl, {
            method: 'POST',
            body: {
                week
            }
        })
		notes = await res.json()
	} catch (fetchError) {
		console.log(fetchError)
	}

	return notes.data
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

        return (
            // TODO - replace with <Image/>
            <img src={imgSrc} width={size} />
        )
    } else {
        return ('')
    }
}

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


const renderPrimaryImage = (images) => {
    if (images && images[0]) {
        const imgSrc = `./uploads/${images[0]}`

        return (
            <a href={imgSrc} target="_blank" rel="noreferrer">
                <img src={imgSrc} width="100%"/>
            </a>
        )
    }
}

const renderNoteBody = (body) => {
    if (body && body.length) {
        return <p style={{whiteSpace: "pre-line"}}>{body}</p>
    }
}

export {
    createDb,
    parseInputFromRequestBody,
    renderStatus,
    createApiRoute,
    fetchNotes,
    fetchMatches,
    renderTimestamp,
    renderMatchupTimestamp,
    renderNoteBullets,
    renderPrimaryImage,
    renderNoteBody,
    renderTeamIcon,
    renderTeamIcons
}