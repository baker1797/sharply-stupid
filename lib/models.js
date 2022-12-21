
const Note = (data) => {
    const note = new Object({
        title: "",
        body: "",
        week: "",
        author: "",
        bullets: [],
        teamTags: ['']
    })
    
    return Object.assign(note, data)
}

const authors = [{
    key: 'Kyle',
    label: 'Kyle'
},{
    key: 'Dylan',
    label: 'Dylan'
},{
    key: 'Nick',
    label: 'Nick'
},{
    key: 'Austin',
    label: 'Austin'
},{
    key: 'Logan',
    label: 'Logan'
},{
    key: 'Colin',
    label: 'Colin'
},{
    key: 'Marshall',
    label: 'Marshall'
},{
    key: 'Will',
    label: 'Will'
},{
    key: 'Patrick',
    label: 'Patrick'
}]

export {
    Note,
    authors
}