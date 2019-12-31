const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
const api = require('./routes/api');

const app = express();
app.use(bodyParser.json());
app.use(cors());  /*This is used to automatically add the header allow-access-control-origin because the app is running on localhost:4200 and the server runs on localhost:3000.*/
app.use('/api', api);

app.get('/', (req, res) => {
    res.send('Hello from server.');
});

/* app.post('/enroll', function (req, res) {
    console.log(req.body);
    res.status(200).send({ "message": "Data received!" });
}); */

app.listen(PORT, function () {
    console.log("Server listening on port " + PORT + ".");
});