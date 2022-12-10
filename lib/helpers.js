/** TODO this should be moved to /lib */


const parseInputFromRequestBody = (reqBody, key) => {
    let value
    
    switch (key) {
        default:
            value = reqBody ? reqBody[key] : null
            break
    }
    
    return value
}

export {
    parseInputFromRequestBody
}