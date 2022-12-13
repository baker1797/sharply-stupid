const Note = (data) => {
    const note = new Object({
        title: "",
        body: "",
        bullets: [],
        teamTags: []
    })
    
    return Object.assign(note, data)
}

export {
    Note
}