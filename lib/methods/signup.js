/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 *
 * @module utils/agent
 */

var
    Promise = require('bluebird'),
    agent = require('../utils/agent');

/**
 * Парсим csrf токен для первичной авторизации
 *
 * @param {string}  htmlString
 * @returns {string|undefined}
 */
exports._parseCsrf = function parseCsrf(htmlString) {
    var
        csrf = htmlString.match(/defCsrf: '([\d\w]+)'/);

    if (csrf) {
        csrf = csrf[1];
    }

    return csrf;
};

/**
 * Получаем небходимые данные для авторизации
 *
 * @returns {Promise}
 */
exports.init = function init() {
    return agent('get', 'signup/login')
        .then(function (res) {
            var
                csrf = exports._parseCsrf(res.text);

            if (!csrf) return Promise.reject('Csrf not found');

            return {
                csrf: csrf,
                cookie: res.header['set-cookie'].join('; ')
            };
        });
};

/**
 * Авторизируемся в фотостране, возвращаем объект authInfo
 *
 * @param {string}      login
 * @param {string}      password
 * @returns {Promise}
 */
exports.auth = function auth(login, password) {
    return exports.init()
        .then(function (initInfo) {
            return agent('post', 'signup/signup/auth', function (request) {
                request
                    .set({
                        //Маскируемся под браузер
                        'User-Agent': 'Mozilla/5.0',
                        'Cookie': initInfo.cookie,
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-Simple-Token': null
                    })
                    .send({
                        csrftkn: initInfo.csrf,
                        user_email: login,
                        user_password: password,
                        submitted: 1,
                        issetFields: ['csrftkn', 'user_email', 'user_password', 'submitted'],
                        _fs2ajax:1
                    });
            })
            .then(function (res) {
                return new AuthInfo(res);
            });
        });
};

/**
 * Объект содержащий в себе информацию полученную после авторизации
 *
 * @param   {Response} res
 * @property {string}   uid
 * @property {string}   hw
 * @property {string}   simpletoken
 * @constructor
 */
function AuthInfo(res) {
    this.uid;
    this.hw;
    this.simpletoken;

    AuthInfo.init(this, res);
}

/**
 * Инициализируем объект AuthInfo
 *
 * @param {AuthInfo} instance
 * @param {Response} res
 */
AuthInfo.init = function init(instance, res) {
    var
        cookie = res.header['set-cookie'].reduce(function (sum, cook) {
            cook = cook.split('; ')[0].split('=');
            sum[cook[0]] = cook[1];
            return sum;
        }, {});

    instance.uid = cookie.uid;
    instance.hw = cookie.hw;
    instance.simpletoken = cookie.simpletoken;
};

exports.AuthInfo = AuthInfo;