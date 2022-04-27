const { Comment, Pizza } = require('../models');

const commentController = {
  // add comment to pizza
  addComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $push: { comments: _id } }, //$push method to add the comment's _id to the specific pizza we want to update
          { new: true }//receiving back the updated pizza
        );
      })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.json(err));
  },

  //reply to comment
  addReply({ params, body}, res) {  //the callback function of a route method has req and res as parameters
    Comment.findOneAndUpdate(      //so we don't have to explicitly pass any arguments to addReply
      { _id: params.commentId},
      { $push: {replies: body} },
        { new: true }
      )
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!'})
          return;
        }
        res.json(dbPizzaData)
      })
      .catch( err => res.json(err))
  },

  // remove comment
  removeComment({ params }, res) {
    Comment.findOneAndDelete({ _id: params.commentId })//deletes the document while also returning its data
      .then(deletedComment => {
        if (!deletedComment) {
          return res.status(404).json({ message: 'No comment with this id!' });
        }
        return Pizza.findOneAndUpdate(//return the updated pizza data, now without the _id of the comment in the comments array, and return it to the user
          { _id: params.pizzaId },
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.json(err));
  },

  //remove reply
  removeReply({ params }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $pull: {replies: body} }, // $pull operator to remove the specific reply from the replies array 
      { new: true }              //where the replyId matches the value of params.replyId passed in from the route
      )
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => res.json(err))
  }
};

module.exports = commentController;
