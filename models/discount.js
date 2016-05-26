const Mongoose = require('mongoose');

const DiscountSchema = Mongoose.Schema({
    value: Number,
    percent_based: Boolean
});

module.exports = DiscountSchema;
