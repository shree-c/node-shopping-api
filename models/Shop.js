const mongoose = require('mongoose');
const ShopSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide shop name'],
      unique: true,
      minlength: 8
    },
    description: {
      type: String,
      required: [true, 'Please provide shop description']
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A shop should have an onwner']
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

ShopSchema.virtual('catagories', {
  ref: 'Catagory',
  localField: '_id',
  foreignField: 'shop'
});

module.exports = mongoose.model('Shop', ShopSchema);