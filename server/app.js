var express = require('express');
var app = express();

const axios = require('axios');

app.set('view engine', 'ejs');
app.use(express.static('public'))

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ links: [], user: [], count: 1000 }).write();

app.get('/', function (req, res) {
    var links = db.get('links').value();
    res.render('main', { links });
})

app.get('/add', function (req, res) {
    res.render('add');
})

app.get('/save', async function (req, res) {
    var link = req.query.link;
    var title = req.query.title;

    if(!link) res.sendStatus(400).end();

    if (!title) {
        title = await GetTitle(link);
    }

    var count = db.get('count').value();

    db.get('links')
        .push({ id: count + 1, link: link, title: title })
        .write()

    // Increment count
    db.update('count', n => n + 1)
        .write()

    res.sendStatus(200).end();
});

async function GetTitle(link) {
    let response = await axios.get('https://textance.herokuapp.com/rest/title/' + link);
    return response.data;
}

app.get('/links', function (req, res) {
    var links = db.get('links').value();

    res.json(links);
})

app.get('/links/remove/:id', function (req, res) {
    var id = req.params.id;

    db.get('links')
        .remove({ id: parseInt(id) })
        .write();

    res.sendStatus(200).end();
})

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address
    var port = server.address().port
});