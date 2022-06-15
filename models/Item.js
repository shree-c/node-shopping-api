const mongoose = require('mongoose');
const ItemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide item name']
    },
    price: {
      type: Number,
      required: [true, 'Please provide item price']
    },
    description: {
      type: String,
      required: [true, 'Please provide item description']
    },
    stockLeft: {
      type: Number,
      required: [true, 'Please provide the number of items present in stock']
    },
    createdTime: {
      type: Date,
      default: Date.now
    },
    modifiedTime: {
      type: Date,
      default: Date.now
    },
    images: {
      type: [String],
      required: [true, 'Please provide atleast one image for an item']
    },
    catagory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Catagory',
      required: [true, 'Please provide a catagory for the item']
    }
  }
);

module.exports = mongoose.model('Item', ItemSchema);