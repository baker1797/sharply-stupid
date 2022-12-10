/** TODO this should be moved to /lib */


export function parseInputFromRequestBody(reqBody, key) {
    let value
    
    switch (key) {
        default:
            value = reqBody ? reqBody[key] : null
            break
    }
    
    return value
}