const { async_handler } = require('../middlewares/async_handler');
const Catagory = require('../models/Catagory');
const Shop = require('../models/Shop');
const path = require('path');

exports.createShop = exports.funName = async_handler(async function (req, res, next) {
  req.body.owner = req.user.id;
  let shop = await Shop.findOne({ shop: req.user.id });
  if (shop) {
    throw Error('a user can only create one shop');
  }
  if (req.user.role !== 'shop-owner' && req.user.role !== 'admin') {
    throw Error('you are not authorized to create shops');
  }
  shop = await Shop.create(req.body);
  res.json({
    success: true,
    body: shop
  });
});
//private
exports.getAllShops = async_handler(async function (req, res, next) {
  const shops = await Shop.find({ owner: req.user.id }).populate('catagories');
  res.json({
    success: true,
    data: shops
  });
});

//private
exports.updateShop = async_handler(async function (req, res, next) {
  const shop = await Shop.findById(req.params.id);
  if (!shop) {
    throw new Error('shop with id not found');
  }
  Object.keys(req.body).forEach((val) => {
    shop[val] = req.body[val];
  });
  await shop.save({ validateBeforeSave: true });
  res.json({
    success: true,
  });
});

//private
exports.deleteShop = async_handler(async function (req, res, next) {
  const shop = await Shop.findById(req.params.id);
  if (!shop) {
    throw new Error('shop with id not found');
  }
  await shop.remove();
  res.json({
    success: true,
    data: []
  });
});
//private
exports.uploadPhoto = async_handler(async function (req, res, next) {
  const shop = await Shop.findById(req.params.id);
  if (!shop) {
    throw new Error('shop with id not found');
  }
  //check whether user is the owner of shop
  if (req.user.id !== shop.owner.toString()) {
    throw new Error('you are not authorized to do this action');
  }
  //file checks
  //if the file has been uploaded
  if (!req.files || !req.files.heroimage) {
    throw new Error('please upload an image');
  }
  const file = req.files.heroimage;
  console.log(file);
  //mime is correct
  if (!file.mimetype.startsWith('image/')) {
    throw new Error('please upload an image of correct format');
  }
  console.log(Number(process.env.FILE_MAX_SIZE));
  if (file.size > Number(process.env.FILE_MAX_SIZE)) {
    throw new Error(`the uploaded file is greater than 5MB`);
  }
  file.name = `photo_${shop.id}${path.extname(file.name)}`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(`server error happened, please try later`, 500));
    }
    await Shop.findByIdAndUpdate(shop.id, {
      photo: file.name
    });
    res.status(200).json({
      status: 'success',
      data: file.name
    });
  });
});

//public
exports.getSingleShop = async_handler(async function (req, res, next) {
  const shop = await Shop.findById(req.params.id);
  if (!shop) {
    throw new Error('shop with id not found');
  }
  res.json({
    success: true,
    data: shop
  });
});