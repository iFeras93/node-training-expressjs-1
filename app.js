require('dotenv').config();
const PORT = process.env.SERVER_PORT || 3000

const express = require('express')
const app = express()

app.use(express.json())

let genres = []
//get genres
app.get('/api/genres', (req, res) => {
    res.send(genres)
})
//by id
app.get('/api/genres/:id', function (req, res) {
    let idParams = parseInt(req.params.id)
    let singleGenres = genres.find(g => g.id === idParams)

    if (!singleGenres)
        res
            .setHeader('content-type', 'application/json')
            .status(404)
            .send('Genres Not Found!!')

    res.send(singleGenres)
})
//create new one
app.post('/api/genres', (req, res) => {

    console.log(req.body)
    let newGenres = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(newGenres)

    res.send(newGenres)
})
//update genres
app.put('/api/genres/:id', (req, res) => {

    let idParams = parseInt(req.params.id)
    let singleGenres = genres.find(g => g.id === idParams)

    if (!singleGenres)
        res
            .setHeader('content-type', 'application/json')
            .status(404)
            .send('Genres Not Found!!')


    singleGenres.name = req.body.name
    res.send(singleGenres)
})

//delete genres
app.delete('/api/genres/:id', (req, res) => {
    let idParams = parseInt(req.params.id)
    let singleGenres = genres.find(g => g.id === idParams)

    if (!singleGenres)
        res
            .setHeader('content-type', 'application/json')
            .status(404)
            .send('Genres Not Found!!')

    let generesIndex = genres.indexOf(singleGenres)
    genres.splice(generesIndex, 1)
    res.send("Delete action successfully")
});
app.listen(PORT, () => {
    console.log(`Your server run at http://localhost:${PORT}`)
})