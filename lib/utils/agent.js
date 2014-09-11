/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */


var
    Promise = require('bluebird'),
    superagent = require('superagent'),

    //
    HOST = 'http://fotostrana.ru/';

/**
 * Подготавливаем Request для наших запросов
 *
 * @param {string}      method
 * @param {string}      [path]
 * @param {AuthInfo}    [auth]
 * @param {Function}    [setup]
 *
 * @returns {Promise}
 */
module.exports = function agent(method, path, auth, setup) {
    setup = arguments[arguments.length - 1];

    return new Promise(function (resolve, reject) {
        var
            url = HOST + (path ? path + '/': ''),
            request = superagent[method](url).set({'User-Agent': 'FotostranaApi'});

        if (auth) {
            request
                .set({
                    'Cookie': [
                            'uid=' + auth.uid,
                            'hw=' + auth.hw,
                            'simpletoken=' + auth.simpletoken
                    ].join('; '),
                    'X-Simple-Token': auth.simpletoken
                });
        }

        if (~['post'].indexOf(method)) {
            request.type('form');
        }

        if ('function' === typeof setup) {
            setup(request);
        }

        request.end(function (err, res) {
            if (err) return reject(err);
            if (res.status !== 200) return reject('Response status not ok', res);
            if (res.body.ret === 0) return reject(res.body.errors);

            return resolve(res);
        });
    });
};