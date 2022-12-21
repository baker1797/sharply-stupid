import faunadb from 'faunadb'
import Alert from '@mui/material/Alert';

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

    const time = " " + hours + ":" + minutes
    const amPm = (date.getHours() / 12 > 0) ? "pm" : "am"
    
    return "".concat(dateOutput, time, amPm)
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
    renderStatus,
    renderTimestamp,
    renderMatchupTimestamp,
    renderNoteBullets,
    renderPrimaryImage,
    renderNoteBody,
    renderTeamIcon,
    renderTeamIcons
}