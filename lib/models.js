
const Note = (data) => {
    const note = new Object({
        title: "",
        body: "",
        week: "",
        author: "",
        bullets: [],
        teamTags: []
    })
    
    return Object.assign(note, data)
}

export {
    Note
}