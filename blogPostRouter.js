const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

mongoose.Promise = global.Promise;

const {BlogPosts} = require('./models');
const {PORT, DATABASE_URL} = require('./config');
// BlogPosts.create('Blog1', 'stuff and more stuff', 'fred', '2017-02-17');
// BlogPosts.create('Blog2', 'even more stuff', 'george', '2017-02-16');
// BlogPosts.create('Blogx', 'even more stuff', 'samantha', '2017-02-16');


router.get('/blogposts', (req, res) => {
    Blogpost
    .find()
    .exec()
    .then(blogposts => {

     res.json({
      blogposts: blogposts.map(
        (blogpost) => blogpost.apiRepr())
    });

  })
  router.get('/blogposts/:id', (req, res) => {
    BlogPost
      // this is a convenience method Mongoose provides for searching
      // by the object _id property
      .findById(req.params.id)
      .exec()
      .then(blogpost =>res.json(blogpost.apiRepr()))
      .catch(err => {
        console.error(err);
          res.status(500).json({message: 'Internal server error'})
      });
  });

  router.post('/blogposts', (req, res) => {

    const requiredFields = ['title', 'content'];
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }

    if (!req.body.title || typeof req.body.title !== 'string')
      return res.sendStatus(400);
    
    BlogPost
      .create(req.body)


      .then(
        restaurant => res.status(201).json(blogpost.apiRepr()))
      .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
      });
  });

router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author', 'publishDate'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id) {
        const message = (
            `Request path id (${req.params.id}) and request body id `
            `(${req.body.id}) must match`);
        console.error(message);
        return res.status(400).send(message);
    }
    console.log(`Updating blogposts \`${req.params.id}\``);
    const updatedItem = BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        publishDate: req.body.publishDate
    });
    res.status(204).json(updatedItem);
});

router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted post list item \`${req.params.id}\``);
    res.status(204).end();
});

module.exports = router;
