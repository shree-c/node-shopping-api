const Category = require('../models/Category');
const Shop = require('../models/Shop');
const Item = require('../models/Item');
const { async_handler } = require('../utils/async_handler');
const { find_owner_for_an_item, find_owner_for_category } = require('../utils/controller_utils');
//i will try to improve this later

//public
exports.getItems = async_handler(async function (req, res, next) {
    const items = await Item.find({ category: req.params.category_id });
    res.json({
        success: true,
        data: items
    });
});

//private
exports.addItems = async_handler(async function (req, res, next) {
    if (req.user.id != await find_owner_for_category(req.params.category_id)) {
        throw new Error('you are not authorized to do this action');
    }
    req.body.forEach(function (val) {
        val.category = req.params.category_id;
    });
    const items = await Item.create(req.body);
    res.json({
        success: true,
        body: items
    });
});

exports.updateItem = async_handler(async function (req, res, next) {
    if (req.user.id != await find_owner_for_an_item(req.params.item_id)) {
        throw new Error('you are not authorized to do this action');
    }
    const item = await Item.findByIdAndUpdate(req.params.item_id, req.body);
    res.json({
        success: true,
        body: item
    });
});

exports.deleteItem = async_handler(async function (req, res, next) {
    if (req.user.id != await find_owner_for_an_item(req.params.item_id)) {
        throw new Error('you are not authorized to do this action');
    }
    const item = await Item.findByIdAndDelete(req.params.item_id);
    res.json({
        success: true,
        body: item
    });
});