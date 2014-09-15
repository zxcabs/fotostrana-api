/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */


var
    Promise = require('bluebird'),
    r = require('request'),

    //
    HOST = 'http://fotostrana.ru/';

/**
 *
 * @type {agent}
 */
module.exports = agent;

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
function agent(method, path, auth, setup) {
    setup = arguments[arguments.length - 1];

    return new Promise(function (resolve, reject) {
        var
            postSetupFn,
            request,
            url = HOST + (path ? path + '/': ''),
            options = {
                method: method,
                url: url,
                headers: {
                    'User-Agent': 'Mozilla/5.0'
                }
            };

        if (auth) {
            options
                .headers['Cookie'] = [
                    'uid=' + auth.uid,
                    'hw=' + auth.hw,
                    'simpletoken=' + auth.simpletoken
            ].join('; ');

            options
                .headers['X-Simple-Token'] = auth.simpletoken;
        }

        if ('function' === typeof setup) {
            postSetupFn = setup(options);
        }

        request = r(options, function endRequest(error, response, body) {
            if (error) return reject(error);
            if (response.statusCode !== 200) return reject('Response status not ok', response);
            if (options.json && body.ret === 0) return reject(body.error);

            return resolve(response, body);
        });

        if ('function' === typeof postSetupFn) {
            postSetupFn(request);
        }
    });
}

/**
 *  * @type {request}
 */
agent.request = r;