// Get required packages
const fs = require('fs')
    /*const keys = require('./keys.js')*/
const request = require('request');
const Twitter = require('twitter');
const spotify = require('spotify');
//  Inital variables
var twtr;
var searchVal = process.argv[3];
var lookup = process.argv[2];
// Twitter credntials (SHOULD BE IN keys.js )
var client = new Twitter({
    consumer_key: '0NnRfQzKbUqICsAnXmEPGHfry',
    consumer_secret: 'TXBVryflFhY1olcSvpqBXbBwnPBgcDnwwYiVhYhwVq9t4cqpSl',
    access_token_key: '11233182-pcsuP3N9IzWDIlNvml12YKIOYh5QoajqcNVVF1obG',
    access_token_secret: 'rSWx5BO9A1dmun0Vf0EGSe6CjwismdIB4qNV7fROEO9Kt'
});

if (lookup === 'my-tweets') {
    client.get('search/tweets', { q: 'SteveRaaen' }, function(error, tweets, response) {
        console.log(tweets.statuses[0].created_at);
        console.log(tweets.statuses[0].text);
    });
} else if (lookup === 'spotify-this-song') {
spotify.search({ type: 'track', query: searchVal}, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 	for (var i = 0; i < data.tracks.items.length; i++) {
    console.log('Track Name =  ' + data.tracks.items[i].preview_url);
    console.log('Album =  ' + data.tracks.items[i].album.name);
    console.log('Artist =  ' + data.tracks.items[i].album.artists[0].name);
    console.log('Preview URL =  ' + data.tracks.items[i].preview_url);
}
});
} else if (lookup === 'movie-this') {
	request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&r=json", function(error, response, body) {
		if (error){console.log('error')}
  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {

    // Then we print out the imdbRating
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }
});
}
