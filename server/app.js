var express    = require('express')
var app        = express()
var bodyParser = require('body-parser')
var urlEncoded = bodyParser.urlencoded({extended: false})
var path       = require('path')

app.set('port', process.env.PORT || 3000)

// initial jokes provided by the client
var jokes = [
  {
    whoseJoke: "Huck",
    jokeQuestion: "What's the difference between roast beef and pea soup?",
    punchLine: "Anyone can roast beef."
  },
  {
    whoseJoke: "Kris",
    jokeQuestion: "How many software engineers does it take to change a lightbulb?",
    punchLine: "None! That's a hardware problem!"
  },
  {
    whoseJoke: "Luke",
    jokeQuestion: "Friends are like snow flakes...",
    punchLine: "If you pee on them they disappear."
  }
];

app.get('/', function (req, res) {
  res.sendFile( path.resolve( 'server/public/views/index.html') )
}) // end serve index.html

app.get('/jokes', function (req, res) {
  res.send(jokes);
}) // end get /jokes

app.post('/jokes', urlEncoded, function (req, res) {
  jokes.push({
    whoseJoke: req.body.name,
    jokeQuestion: req.body.setUp,
    punchLine: req.body.punchLine
  })

  res.sendStatus(201)
})

app.use(express.static('server/public'))

app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port') + '...');
})
