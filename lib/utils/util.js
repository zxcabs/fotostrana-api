/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */

/**
 *
 * @param {Object} a
 * @returns {Object}
 */
exports.extend = function extend(a) {
    var
        keys, b, key;

    for (var i = 1, l = arguments.length; l > i; i += 1) {
        b = arguments[i];
        keys = Object.keys(b);

        for (var j = 0, jl = keys.length; jl > j; j += 1) {
            key = keys[j];

            a[key] = b[key];
        }
    }

    return a;
};