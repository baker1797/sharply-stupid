import faunadb from 'faunadb'

/**
 * 
 * @param {*} secret 
 * @returns 
 */
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

/**
 * 
 * @param {*} uri 
 * @returns 
 */
const createApiRoute = (uri) => {
    const domain = 'development' === process.env.NODE_ENV
        ? 'http://localhost:3000'
        : process.env.API_DOMAIN

    return `${domain}/api/${uri}`
}

/**
 * 
 * @param {*} reqBody 
 * @param {*} key 
 * @returns 
 */
const parseInputFromRequestBody = (reqBody, key) => {
    let value
    
    switch (key) {
        default:
            value = reqBody ? reqBody[key] : null
            break
    }
    
    return value
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
 * Fetch a single match
 * 
 * @returns 
 */
async function fetchMatch(matchId) {
	let notes = [];
    let route = 'notes/fetch-match'

	const endpointUrl = createApiRoute(route)

	try {
		const res = await fetch(endpointUrl, {
            method: 'POST',
            body: {
                matchId
            }
        })
		notes = await res.json()
	} catch (fetchError) {
		console.log(fetchError)
	}

	return notes.data
}

/**
 * Fetch all matches in a week
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

export {
    createDb,
    createApiRoute,
    parseInputFromRequestBody,
    fetchNotes,
    // fetchNotesByAuthor,
    // fetchNotesByTeamId,
    fetchMatch,
    fetchMatches
}