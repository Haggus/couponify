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
                amount: 10
            }
        };

        var generatedVoucher;

        it('should add a new coupon', function(done) {
            user.post(url_coupon)
                .send(sample_coupon)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.type).to.equal('application/json');
                    expect(res.body.result).to.equal(true);

                    generatedVoucher = res.body.voucherId;
                    done();
                });
        });
    });
});
