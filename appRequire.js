module.exports = function () {
    global.appRequire = function (name) {
        return require(require('path').join(__dirname, 'app', name));
    };
};