const mongoose = require('mongoose');

// this is our schema to represent a restaurant
const blogPostSchema = mongoose.Schema({
  title: {type: String, required: true},
  author: {
    firstName: String,
    lastName: String
  },
  content: {type: String, required: true}
});

// *virtuals* (http://mongoosejs.com/docs/guide.html#virtuals)
// allow us to define properties on our object that manipulate
// properties that are stored in the database. Here we use it
// to generate a human readable string based on the address object
// we're storing in Mongo.
blogPostSchema.virtual('fullName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim()});

// this is an *instance method* which will be available on all instances
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
blogPostSchema.methods.apiRepr = function() {

  return {
    title: this.title,
    content: this.content,
    authorName: this.fullName
  };
}

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const BlogPosts = mongoose.model('Blogpost', blogPostsSchema);

module.exports = {BlogPosts};
