/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */

var
    agent = require('../utils/agent'),
    url = require('url'),
    p = require('path'),
    fs = require('fs');

/**
 * Запостить
 *
 * @param {Object}      data
 * @param {AuthInfo}    auth
 * @returns {Promise}
 */
exports.add = function add(data, auth) {
    return agent('post', 'pin/add', auth, function (options) {
            options.json = true;
            options.form = data;
        })
        .then(function (res) {
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
    return agent('post', 'pin/add-photo', auth, function (options) {
            options.json = true;
            options.qs = data.query;

            return function (request) {
                var
                    form = request.form(),
                    photoStream = (url.parse(data.photo).host ? agent.request.get(data.photo): fs.createReadStream(data.photo));

                form.append('attachphoto-photo[]', photoStream, p.basename(data.photo));
                form.append('token', data.field.token);
                form.append('ownerType', data.field.ownerType);
                form.append('from', data.field.from);
            }
        })
        .then(function (response) {
            return response.body.data;
        });
};