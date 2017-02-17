const express = require('express');
const morgan = require('morgan');

const app = express();

const blogPostRouter = require('./blogPostRouter');

// log the http layer
app.use(morgan('common'));
app.use('/blogposts', blogPostRouter);

app.use('/blogposts', blogPostRouter);
app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
