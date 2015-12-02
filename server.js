var express = require('express');
var bodyParser = require('body-parser');
var escape = require('html-escape');
var app = express();

var cfg = {
  port: process.env.PORT || 8080,
  hostname: process.env.IP || '127.0.0.1'
};

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(express.static('public'));

// CORS headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var server = app.listen(cfg.port, cfg.hostname, function () {
  console.log('listening on ' + cfg.hostname + ':' + cfg.port);
});


/* Message storage */

var messages = [];


/* API Routes */

app.post('/send', function (req, res) {
  var user = req.body.user;
  var content = req.body.content;
  var timestamp = Date.now();
  // TODO: Save message
  if(messages.length != 0)
  {
    var prevMessage = messages[messages.length - 1];
    if(prevMessage.user == user && prevMessage.content == content)
    {
      res.send("Error!");
      return;
    }
  }
  
  var message = 
  {
    user: user.substring(0,16),
    content: content.substring(0,50),
    timestamp: timestamp
  };
  
  if(messages.length >= 20)
  {
    messages.shift();
  }
  messages.push(message);
  res.send('ok');
});

app.get('/messages', function (req, res) {
  //  The client expects data in this format:
  //    [
  //      {
  //        user: 'foo',
  //        content: 'hello',
  //        timestamp: 1234
  //      },
  //      {
  //        user: 'bar',
  //        content: 'goodbye',
  //        timestamp: 1235
  //      },
  //      ...
  //    ]
  //
  res.send(messages);
});

/* Render homepage */

app.get('/', function (req, res) {
  res.render('index');
});
