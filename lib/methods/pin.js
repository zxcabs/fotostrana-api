/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */

var
    agent = require('../utils/agent');

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