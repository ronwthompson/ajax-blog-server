const uuid = require('uuid/v4')
const fs = require('fs')
let posts = []

function getAll(){
    readFile()
    return posts
}

function create (body) {
    readFile()
    let errors
    const content = body.content
    const date = body.date
    let response
    if (!content || !date) {
        errors = {status: 400, message: "You need both a date and some content!"}
        response = { errors }
    } else {
    const post = { id: uuid(), date, content }
        posts.push(post)
        response = post
    }
    writeFile()
    return response
}

function deleteOne (id) {
    readFile()
    let errors
    let delIndex
    for (let i = 0; i < posts.length; i++){
        if (id == posts[i].id){
            delIndex = i
        }
    }
    let response = posts.splice(delIndex, 1)
    writeFile()
    return response
}

function editOne (body, id) {
    readFile()
    let errors
    const content = body.content
    const date = body.date
    let response
    let index
    for (let i = 0; i < posts.length; i++){
        if (posts[i].id == id) {
            index = i
        }
    }
    if (!content || !date) {
        errors = {status: 400, message: "You need both a date and some content!"}
        response = { errors }
    } else if (!index) {
        errors = {status: 404, message: "ID not found."}
        response = { errors }
    } else {
        posts[index].date = date
        posts[index].content = content
        response = posts[index]
    }
    writeFile()
    return response
}

function readFile(){
    let current = JSON.parse(fs.readFileSync('./src/storage.json', 'utf-8'))
    if (current.data){
        posts = current.data
    }
}

function writeFile(){
    let jsonContent = JSON.stringify({posts})
    fs.writeFileSync('./src/storage.json', jsonContent)
}

module.exports = { getAll, create, deleteOne, editOne }