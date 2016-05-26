const chai = require('chai');
const expect = chai.expect;
const request = require('superagent');

describe('Coupon', function() {
    describe('/api/coupon', function() {
        var url_coupon = 'http://localhost:3000/api/coupon';
        var user = request.agent();

        var sample_coupon = {
            campaign: 'TEST',
            discount: {
                value: 50,
                percent_based: true
            },
            redeem: {
                amount: 3
            }
        };

        var generatedVoucherId;

        it('should add a new coupon with 3 uses', function(done) {
            user.post(url_coupon)
                .send(sample_coupon)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.type).to.equal('application/json');
                    expect(res.body.result).to.equal(true);

                    generatedVoucherId = res.body.voucherId;
                    done();
                });
        });

        it('should get an added coupon', function(done) {
            user.get(url_coupon + '/' + generatedVoucherId)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.type).to.equal('application/json');
                    expect(res.body.result).to.equal(true);

                    expect(res.body.coupon.discount.value)
                        .to.equal(sample_coupon.discount.value);
                    expect(res.body.coupon.discount.percent_based)
                        .to.equal(sample_coupon.discount.percent_based);

                    done();
                });
        });

        it('should return an error if coupon does not exist', function(done) {
            user.get(url_coupon + '/coupon_that_does_not_exist')
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(404);
                    expect(res.type).to.equal('application/json');
                    expect(res.body.error).to.equal('Not Found');
                    expect(res.body.message).to.equal('Invalid coupon ID');

                    done();
                });
        });

        it('should use a new coupon #1', function(done) {
            user.post(url_coupon + '/' + generatedVoucherId)
                // .send()
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.type).to.equal('application/json');
                    expect(res.body.result).to.equal(true);

                    done();
                });
        });

        it('should use a new coupon #2', function(done) {
            user.post(url_coupon + '/' + generatedVoucherId)
                // .send()
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.type).to.equal('application/json');
                    expect(res.body.result).to.equal(true);

                    done();
                });
        });

        it('should use a new coupon #3', function(done) {
            user.post(url_coupon + '/' + generatedVoucherId)
                // .send()
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.type).to.equal('application/json');
                    expect(res.body.result).to.equal(true);

                    done();
                });
        });

        it('should throw an error if coupon is used up', function(done) {
            user.post(url_coupon + '/' + generatedVoucherId)
                // .send()
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(404);
                    expect(res.type).to.equal('application/json');
                    expect(res.body.error).to.equal('Not Found');
                    expect(res.body.message).to.equal('Invalid coupon ID');

                    done();
                });
        });
    });
});
