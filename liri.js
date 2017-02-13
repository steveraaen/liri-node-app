'use strict'
// Get required packages
const keys = require('./keys.js')
const Twitter = require('twitter');
const fs = require('fs')   
const request = require('request');
const spotify = require('spotify');
//  Inital variables
var twtr;
var searchVal = "mr nobody";

var lookup = process.argv[2];
// Twitter credntials (SHOULD BE IN keys.js )
var client = new Twitter({
    consumer_key : keys.consumer_key,
    consumer_secret : keys.consumer_secret,
    access_token_key : keys.access_token_key,
    access_token_secret : keys.access_token_secret
});

if (lookup === 'my-tweets') {
    searchVal = process.argv[3];
    client.get('search/tweets', { q: 'SteveRaaen' }, function(err, tweets, response) {
            if ( err ) {
        
        return;
    } else for (let i = 0; i < tweets.statuses.length; i++){
/*        console.log(tweets.statuses[0].created_at);
        console.log(tweets.statuses[0].text);*/

        console.log('At  - ' + tweets.statuses[i].created_at + '<br>Steve Tweeted  :' + tweets.statuses[i].text);
   } })
} else if (lookup === 'spotify-this-song') {
    searchVal = process.argv[3];
spotify.search({ type: 'track', query: searchVal}, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err[0]);
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
searchVal = process.argv[3];
	request("http://www.omdbapi.com/?t=" + searchVal + "&plot=short&r=json", function(error, response, body) {
		if (error){console.log('error')}
  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {
console.log(searchVal)
    // Then we print out the imdbRating
    console.log("The movie's title is : " + JSON.parse(body).Title);
    console.log("The year it was released: " + JSON.parse(body).Year);
    console.log("The movie's IMDB rating: " + JSON.parse(body).imdbRating);
    console.log("The movie's language is: " + JSON.parse(body).Language);
    console.log("The movie was made in: " + JSON.parse(body).Country);
    console.log("The following actors appeared: " + JSON.parse(body).Actors);
    console.log("The movie's is about: " + JSON.parse(body).Plot);
    console.log("Rotten Tomato : " + JSON.parse(body).tomatoUserRating);

        console.log(body);
  }

});
}else if (lookup === 'do-what-it-says'){
    var dwis = fs.readFile('random.txt', 'utf8', function(err, data){
        if(err){throw err}
            data = data.split(',')
            lookup = data[0];
            searchVal = data[1]
            console.log(data)
    })
    
}
