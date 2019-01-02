'use strict';

module.exports = function (app) {
    app.get('/api/timestamp/:query', function (request, response) {
        let date = request.params.query;
        let unix = null;
        let natural = null;

        if (+date >= 0) {
            unix = +date;
            natural = unixToNat(unix);
        }

        if (isNaN(+date) && new Date(date).getTime()) {
            unix = +natToUnix(date);
            natural = unixToNat(unix);
        }

        const dateObj = {"unix": unix, "natural": natural};
        response.send(dateObj);
    });

    function natToUnix(date) {
        // natural date to unix timestamp
        return new Date(date).getTime();
    }

    function unixToNat(unix) {
        // unix timestamp to natural date
        return new Date(parseInt(unix)).toUTCString();
    }
};
