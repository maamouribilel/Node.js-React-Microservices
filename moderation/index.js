const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Moderation Service is Running');
});

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    if (type === 'CommentCreated') {
        console.log('comment moderation active');
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        await axios.post('http://event-bus-service-clusterip-srv:4005/events', {
            type: 'CommentModerated', data: {
                commentId: data.commentId,
                postId: data.postId,
                status,
                content: data.content
            }
        });
    }
    res.send({});
});

app.listen(4003, () => {
    console.log('Moderation service is running on port 4003');
});
