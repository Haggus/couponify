const Mongoose = require('mongoose');

const RedeemedSchema = Mognoose.Schema({
    transaction: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = RedeemedSchema;
