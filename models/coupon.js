const Mongoose = require('mongoose');
const Discount = require('./discount');
const Redeem = require('./redeem');

const CouponSchema = Mongoose.Schema({
    unique_id: String,
    discount: Discount,
    redeem: Redeem
});

module.exports = CouponSchema;
