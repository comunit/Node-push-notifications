const express = require('express');
const Webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// set static path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

const publicVapidKey = 'BNox5DpG81o6pI7inaX0bI6427nIDGgBiG6IUMPXD1UcpIq1Kye4CYLZ4iKmRjtms8YnqtbQH80kdePIRt60HAc';
const privateVapidKey = 'EmoQJ-HfjppjcAhQOmyn39cwisvxDzlgXNuqhzERQ4o';

Webpush.setVapidDetails('mailto: test@test.com', publicVapidKey, privateVapidKey);

// subscribe route
app.post('/subscribe', (req, res) => {
  // get pushSubscribtion object
  const subscription = req.body;
  // send 201 - resourse created
  res.status(201).json({});
  // create payload
  const payload = JSON.stringify({ title: 'push test'});
  // pass object into sendNotiofication function
  Webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));