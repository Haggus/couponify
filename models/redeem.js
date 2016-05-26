const Mongoose = require('mongoose');
const Redeemed = require('./redeemed');

const RedeemSchema = Mongoose.Schema({
    amount: Number,
    taken: Number,
    entries: [Redeemed]
});

module.exports = RedeemSchema;
