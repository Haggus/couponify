'use strict';

const Hapi = require('hapi');
const Mongoose = require('mongoose');
const Joi = require('joi');

const CouponSchema = require('./models/coupon');
const Coupon = Mongoose.model('Coupon', CouponSchema);
const DiscountSchema = require('./models/discount');
const Discount = Mongoose.model('Discount', DiscountSchema);
const RedeemSchema = require('./models/redeem');
const Redeem = Mongoose.model('Redeem', RedeemSchema);
const RedeemedSchema = require('./models/redeemed');
const Redeemed = Mongoose.model('Redeemed', RedeemedSchema);

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        reply('hello world');
    }
});

server.route({
    method: 'POST',
    path: '/api/coupon',
    config: {
        validate: {
            payload: {
                campaign: Joi.string().required(),
                discount: Joi.object({
                    value: Joi.number().required(),
                    percent_based: Joi.boolean().required()
                }),
                redeem: Joi.object({
                    amount: Joi.number().required(),
                    taken: Joi.number().required(),
                    entries: Joi.array().items(
                        Joi.object({
                            transaction: Joi.string(),
                            date: Joi.date()
                        })
                    ).allow(null)
                })
            }
        },
        handler: function(request, reply) {
            reply({
                result: true
            });
        }
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }

    Mongoose.connect('mongodb://localhost/couponify');

    const db = Mongoose.connection;
    db.on('error', console.error.bind(console, 'Database connection error: '));
    db.open('open', function() {
        console.log('Connection to database: OPEN');
    });

    console.log('Server running at: ', server.info.uri);
});
