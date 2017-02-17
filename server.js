const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {
    BlogPosts
} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

BlogPosts.create('Blog1', 'stuff and more stuff', 'fred', '2017-02-17');
BlogPosts.create('Blog2', 'even more stuff', 'george', '2017-02-16');
BlogPosts.create('Blogx', 'even more stuff', 'samantha', '2017-02-16');

app.get('/blogposts', (req, res) => {
    res.json(BlogPosts.get());
})

app.post('/blogposts', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author', 'publishDate'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
    res.status(201).json(item);
});


app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
