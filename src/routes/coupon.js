const Mongoose = require('mongoose');
const Joi = require('joi');
const CodeGenerator = require('voucher-code-generator');
const Boom = require('boom');

const CouponSchema = require('../models/coupon');
const Coupon = Mongoose.model('Coupon', CouponSchema);
const DiscountSchema = require('../models/discount');
const Discount = Mongoose.model('Discount', DiscountSchema);
const RedeemSchema = require('../models/redeem');
const Redeem = Mongoose.model('Redeem', RedeemSchema);
const RedeemedSchema = require('../models/redeemed');
const Redeemed = Mongoose.model('Redeemed', RedeemedSchema);

const couponGet = {
    method: 'GET',
    path: '/api/coupon/{coupon_id}',
    config: {
        validate: {
            params: {
                coupon_id: Joi.string().required()
            }
        },
        handler: function(request, reply) {
            Coupon.findOne(
                { unique_id: request.params.coupon_id },
                'discount.value discount.percent_based',
                function(err, foundCoupon) {
                    if (err || !foundCoupon) {
                        reply(Boom.notFound('Invalid coupon ID'));
                    } else {
                        reply({
                            result: true,
                            coupon: foundCoupon
                        });
                    }
                }
            );
        }
    }
};

const couponUse = {
    method: 'POST',
    path: '/api/coupon/{coupon_id}',
    config: {
        validate: {
            params: {
                coupon_id: Joi.string().required()
            }
        },
        handler: function(request, reply) {
            Coupon.findOne(
                { unique_id: request.params.coupon_id },
                function(err, foundCoupon) {

                    if (err || !foundCoupon) {
                        reply(Boom.notFound('Invalid coupon ID'));
                    } else {
                        if (foundCoupon.redeem.taken < foundCoupon.redeem.amount) {
                            foundCoupon.redeem.taken += 1;

                            foundCoupon.redeem.entries.push(new Redeemed({
                                transaction: 'transaction_id_from_the_store'
                            }));

                            foundCoupon.save(function(err) {
                                if (err) {
                                    reply(Boom.badRequest('Invalid query'));
                                } else {
                                    reply({
                                        result: true
                                    });
                                }
                            });
                        } else {
                            reply(Boom.notFound('Invalid coupon ID'));
                        }
                    }
                }
            );
        }
    }
};

const couponPost = {
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
                    amount: Joi.number().required()
                })
            }
        },
        handler: function(request, reply) {
            Coupon.count({ campaign: request.payload.campaign }, function(error, count) {
                if (error) {
                    reply(Boom.badRequest('Invalid query'));
                } else if (count && count > 10000) {
                    reply(Boom.badRequest('Too many campaigns'));
                } else {
                    var voucherId = CodeGenerator.generate({
                        prefix: request.payload.campaign + '_',
                        length: 7
                    });

                    var couponObject = new Coupon({
                        unique_id: voucherId,
                        campaign: request.payload.campaign,
                        discount: new Discount({
                            value: request.payload.discount.value,
                            percent_based: request.payload.discount.percent_based
                        }),
                        redeem: new Redeem({
                            amount: request.payload.redeem.amount
                        })
                    });

                    couponObject.save(function(err, savedCoupon) {
                        if (err || !savedCoupon) {
                            reply(Boom.badRequest('Invalid query'));
                        } else {
                            reply({
                                result: true,
                                voucherId: savedCoupon.unique_id
                            });
                        }
                    });
                }
            });
        }
    }
};

module.exports = [couponGet, couponUse, couponPost];
