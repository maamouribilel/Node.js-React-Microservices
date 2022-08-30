const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuid } = require('uuid');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/', (req, res) => {
    res.send('Post service is running!');
});

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts/create', async (req, res) => {
    const id = uuid();
    const { title } = req.body;
    posts[id] = {
        id, title
    };
    await axios.post('http://event-bus-service-clusterip-srv:4005/events', {
        type: 'PostCreated',
        data: { id, title }
    }).catch((err) => {
        console.log(err.message);
    });
    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log('Recieved Event', req.body.type);
    res.send({});
});

app.listen(4000, () => {
    console.log('latest version of post service!!!');
    console.log('Posts service running on port 4000!!!');
});