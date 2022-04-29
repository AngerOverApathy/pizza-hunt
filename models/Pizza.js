const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: true,
      trim: true
    },
    createdBy: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal) //value in the createdAt field will be formatted by dateFormat()
    },
    size: {
      type: String,
      required: true,
      enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'], //enum option stands for enumerable, refers to a set of data that can be iterated over
      default: 'Large'
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true //use any getter function we've specified
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of comments and replies on retrieval
//.reduce() takes two parameters, an accumulator and a currentValue, the accumulator is total, and the currentValue is comment
//.reduce() walks through the array, it passes the accumulating total and the current value of comment into the function, with the return of the function revising the total for the next iteration through the array

PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;
