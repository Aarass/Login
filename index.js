const express  = require('express');
const app = express();

const Datastore = require('nedb');
const database = new Datastore('baza_podataka.db');
database.loadDatabase();

app.listen(3000);
app.use(express.static('public'));
app.use(express.json());

app.post('/login', (request, response) => {
  const stream = request.body;
  database.find({username: stream.username, password: stream.password}, (err, data) => {
    if(data.length == 0)
      response.json(false);
    else
      response.json(true);
  })
});

app.post('/register', (request, response) => {
  const stream = request.body;
  database.find({username: stream.username}, function(err, data) {
    if(data.length == 0) {
      database.insert(request.body);
      response.json(true);
    }
    else
      response.json(false);
  });
});
