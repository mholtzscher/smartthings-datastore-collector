'use strict';
var projectId = process.env.PROJECT_ID;

if (!projectId) {
    var MISSING_PROJECT_ID = [
        'Cannot find your project ID for Google Cloud project. Please set an environment variable named ',
        '"PROJECT_ID", holding the ID of your project.'
    ].join('');
    throw new Error(MISSING_PROJECT_ID);
}

var gcloud = require('gcloud')({
    projectId: projectId,
    credentials: require('./credentials.json')
});

var datastore = gcloud.datastore();

function saveEvent(key, data, callback) {
    // fix event id
    var eventId = data.id;
    delete data.id;
    data['eventId'] = eventId;

    // convert dates
    var date = data['date'];
    data['date'] = new Date(date);

    var isoDate = data['isoDate'];
    data['isoDate'] = new Date(isoDate);

    // fix booleans
    var isDigital = data['isDigital'];
    data['isDigital'] = Boolean(isDigital);

    var isPhysical = data['isPhysical'];
    data['isDigital'] = Boolean(isDigital);

    var isStateChange = data['isStateChange'];
    data['isStateChange'] = Boolean(isStateChange);

    datastore.save({
        key: key,
        data: data
    }, function(err) {
        if (err) {
            console.log(err);
            return;
        }
    });
}

module.exports = {

    insert: function(data) {
        var key = datastore.key('Event');
        saveEvent(key, data);
    }
};
