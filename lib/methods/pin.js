/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */

var
    agent = require('../utils/agent'),
    util = require('../utils/util'),
    p = require('path'),
    Promise = require('bluebird');

/**
 * Запостить
 *
 * @param {Object}      data
 * @param {AuthInfo}    auth
 * @returns {Promise}
 */
exports.add = function add(data, auth) {
    return agent('post', 'pin/add', auth, function (request) {
            request.send(data);
        }).then(function (res) {
            return res.body.data;
        });
};

/**
 * Заливаем фото на сервер
 *
 * @param {Object}      data
 * @param {AuthInfo}    auth
 * @returns {Promise}
 */
exports.addPhoto = function addPhoto(data, auth) {
    return agent('post', 'pin/add-photo', auth, function (request) {
            request
                .query(data.query)
                .attach('attachphoto-photo[]', data.photo, p.basename(data.photo))
                .field('token', data.field.token)
                .field('ownerType', data.field.ownerType)
                .field('from', data.field.from);
        })
        .then(util.resParseJSON)
        .then(function (data) {
            if (data.ret === 0) return Promise.reject(data.error);
            return data.data;
        });
};