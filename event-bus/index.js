const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());

const events = [];


app.get('/', (req, res) => {
    res.send('Event-Bus is running!');
});

app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event);
    // posts service
    axios.post('http://posts-service-clusterip-srv:4000/events', event).catch((err) => {
        console.log(err.message);
    });
    
    // comments service
    axios.post('http://comments-service-clusterip-srv:4001/events', event).catch((err) => {
        console.log(err.message);
    });
    // query service
    axios.post('http://query-service-clusterip-srv:4002/events', event).catch((err) => {
        console.log(err.message);
    });
    // moderation service
    axios.post('http://moderation-service-clusterip-srv:4003/events', event).catch((err) => {
        console.log(err.message);
    });
    
    res.send({ status: 'OK' });
});

app.get('/events', (req, res)=>{
    res.send(events);
})

app.listen(4005, () => {
    console.log('Event-bus is running on port 4005!');
});