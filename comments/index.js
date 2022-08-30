const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuid } = require('uuid');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Comments service is running!');
});

const commentsByPostId = {};

app.get('/posts/comments/:id', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
    console.log('/posts/comments/'+req.params.id);
    console.log('testttt1');
});


app.get('/posts/comments/create', async (req, res) => {
    console.log('/posts/comments/create');
    console.log('testttt2');
});

app.post('/posts/comments/create/:id', async (req, res) => {
    const commentId = uuid();
    const postId = req.params.id;
    const { content } = req.body;
    const comments = commentsByPostId[postId] || [];
    comments.push({ commentId, content, status: 'pending' });

    commentsByPostId[postId] = comments;

    await axios.post('http://event-bus-service-clusterip-srv:4005/events', { type: 'CommentCreated', data: { commentId, content, postId, status: 'pending' } }).catch((err) => {
        console.log(err.message);
    });

    res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    console.log('Recieved Event', req.body.type);
    const { type, data } = req.body;
    const { postId, commentId, status, content } = data;
    if (type === 'CommentModerated') {
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => {
            return comment.commentId == commentId;
        });
        comment.status = status;
        await axios.post('http://event-bus-service-clusterip-srv:4005/events', { type: 'CommentUpdated', data: { commentId, content, postId, status } }).catch((err) => {
            console.log(err.message);
        });
    }

    res.send({});
});

app.listen(4001, () => {
    console.log('Comments service running on port 4001!');
});