const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

app.use(bodyParser.json());
app.use(cors());

MongoClient.connect('mongodb://localhost:27017')
.then((client) => {
  const db = client.db('hotel');
  const roomsCollection = db.collection('rooms');
  const roomsRouter = createRouter(roomsCollection);
  app.use('/api/rooms', roomsRouter);
})
.catch(console.err);


app.listen(3000, function () {
  console.log(`Listening on port ${this.address().port}`);
});
