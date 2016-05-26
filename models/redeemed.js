const Mongoose = require('mongoose');

const RedeemedSchema = Mongoose.Schema({
    transaction: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = RedeemedSchema;
