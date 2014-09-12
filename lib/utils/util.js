/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */

/**
 *
 * @param {Response} res
 * @returns {Object}
 */
exports.resParseJSON = function resParseJSON(res) {
    return JSON.parse(res.text);
};