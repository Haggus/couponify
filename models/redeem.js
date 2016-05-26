const Mongoose = require('mongoose');
const Redeemed = require('./redeemed');

const RedeemSchema = Mongoose.Schema({
    amount: Number,
    taken: {
        type: Number,
        default: 0
    },
    entries: [Redeemed]
});

module.exports = RedeemSchema;
