var request = require('request');

var baseURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
var apiKey = process.env.GOOGLE_PLACES_API_KEY;

function googlePlacesRequest(callback, query){
    process.nextTick(function(){

        queryParam = {query: query ,type: 'restaurant', location: '44.9778,-93.2650', radius: '16093.4', key: apiKey};

        request({uri: baseURL, qs: queryParam}, function(error, google_response, body){

            if(!error && google_response.statusCode === 200){
                console.log(JSON.stringify(body));
                var googleJSON = JSON.parse(body);
                callback(null, googleJSON);

            }
            else{
                console.log(error);
                console.log(apiKey);
                console.log(google_response);
                callback(Error("Error fetching data"));
            }
        });
    });
}

module.exports = googlePlacesRequest;