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
export {
    createDb,
    parseInputFromRequestBody,
    renderStatus
}