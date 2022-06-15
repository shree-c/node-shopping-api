const mongoose = require('mongoose');
const CatagorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide catagory name']
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      required: [true, 'Please provide a shop for the catagory']
    },
    description: {
      type: String,
      required: [true, 'Please provide catagory description']
    },
    createdTime: {
      type: Date,
      default: Date.now
    },
    modifiedTime: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CatagorySchema.virtual('items', {
  ref: 'Item',
  localField: '_id',
  foreignField: 'catagory'
});

module.exports = mongoose.model('Catagory', CatagorySchema);