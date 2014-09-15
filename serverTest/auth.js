/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */

var
    signup = require('../lib/methods/signup.js');

describe('signup', function () {

    describe('#init()', function () {

        it('should return infoObject', function () {
            return signup
                .init()
                .then(function (initInfo) {
                    initInfo.should.have.properties(['csrf', 'cookie']);

                    initInfo.csrf.should.not.be.empty.and.be.type('string');
                    initInfo.cookie.should.not.be.empty.and.be.type('string');
                });
        });
    });

    describe('#auth()', function () {

        it('should return AuthInfo', function () {
            return signup
                .auth(process.env.fu, process.env.fp)
                .then(function (authInfo) {
                    authInfo.should.be.an.instanceof(signup.AuthInfo);
                });
        });
    });
});