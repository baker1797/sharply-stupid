
const Note = (data) => {
    const note = new Object({
        title: "",
        body: "",
        week: 15,
        author: "",
        bullets: [],
        teamTags: []
    })
    
    return Object.assign(note, data)
}

export {
    Note
}