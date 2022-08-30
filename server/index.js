const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require("body-parser");
const path = require('path');

// const users = require('./routes/api/users');
// const wine = require('./routes/api/wine');

const app = express();


// * Body parser middleware -- 08/30/2022 JH
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// // * Use Routes -- 08/30/2022 JH
// app.use('/api/users', users);
// app.use('/api/wine', wine);


// * DB setup -- 08/30/2022 JH
const mongoDBUsername = require('./config/keys').mongoDBUsername;
const mongoDBPassword = require('./config/keys').mongoDBPassword;

const uri = `mongodb+srv://${mongoDBUsername}:${mongoDBPassword}@cluster0.ioncj.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object

  client.close();
});


// * serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


// * setup port -- 08/30/2022 JH
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});