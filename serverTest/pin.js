/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */


var
    signup = require('../lib/methods/signup'),
    pin = require('../lib/methods/pin');

describe('pin', function () {
    var
        authPromise;

    beforeEach(function () {
        return authPromise = signup.auth(process.env.fu, process.env.fp);
    });

    describe('#addPhoto()', function () {

        it('should load photo from local path', function () {
            return authPromise.then(function (authInfo) {
                return pin.addPhoto({
                        query: {
                            toAlbum: 1,
                            from: 'usernews'
                        },
                        field: {
                            token: 0,
                            ownerType: 2,
                            from: 'community.profile'
                        },
                        photo: __dirname + '/cat.jpg'
                    }, authInfo)
                    .then(function (photo) {
                        photo.id.should.be.type('number');
                    });
            });
        });

        it('should load photo from url', function () {
            return authPromise.then(function (authInfo) {
                return pin.addPhoto({
                        query: {
                            toAlbum: 1,
                            from: 'usernews'
                        },
                        field: {
                            token: 0,
                            ownerType: 2,
                            from: 'community.profile'
                        },
                        photo: 'http://img0.joyreactor.cc/pics/post/full/%D0%BA%D0%BE%D1%82%D0%B8%D0%BA-%D0%BC%D0%B8%D0%BC%D0%B8%D0%BC%D0%B8-%D0%B5%D0%B1%D0%B8%D1%81%D1%8C%D0%BE%D0%BD%D0%BE%D0%B2%D1%81%D0%B5%D0%BA%D0%BE%D0%BD%D0%B5%D0%BC-%D0%BF%D0%B5%D1%81%D0%BE%D1%87%D0%BD%D0%B8%D1%86%D0%B0-1168743.jpeg'
                    }, authInfo)
                    .then(function (photo) {
                        photo.id.should.be.type('number');
                    });
            });
        });
    });

    describe('#add()', function () {

        it('should add pin', function () {
            return authPromise.then(function (authInfo) {
                return pin
                    .add({
                        ownerType: 1,
                        ownerId: authInfo.uid,
                        viewPlace: 'user.profile',
                        viewTarget: 'feed_single',
                        ajax: 1,
                        pinTitle: 'Всем привет!',
                        _fs2ajax: 1
                    }, authInfo)
                    .then(function (pin) {
                        pin.pinId.should.be.type('number');
                    });
            });
        });
    });
});