const express = require('express')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.set('views', (path.join(__dirname + '/views')))

app.use(express.static(path.join(__dirname + '/public')))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/movie_details/:id', (req, res) => {
    res.render('movie_details')
    console.log(req.params)
})

app.listen(process.env.PORT || 5000, () => {
    console.log('Listening on port 5000!')
})