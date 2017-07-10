var fs = require("./keys.js");
var spotifyKeys = require("./spotifyKeys.js");
var Twitter = require('twitter');
var getKeys = fs.keysForTwitter;
var consumerKey = getKeys.consumer_key;
var consumerSecret = getKeys.consumer_secret;
var accessTokenKey = getKeys.access_token_key;
var accessTokenSecret = getKeys.access_token_secret;
var Spotify = require('node-spotify-api');
var request = require('request');
var tweetCountMax = 20;

var client = new Twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: accessTokenKey,
    access_token_secret: accessTokenSecret
});


var spotify = new Spotify({
    id: spotifyKeys.keysForSpotify.id,
    secret: spotifyKeys.keysForSpotify.secret
});


var getLastTwentyTweets = function(){
    client.get('search/tweets', {q: 'AutumnDNA2'}, function(error, tweets, response) {
        if(error){
            return error;
        }

        if(tweets.statuses.length <= tweetCountMax){
            tweetCountMax = tweets.statuses.length;
        }
        for(var i = (tweetCountMax -1); i >= 0; i--){
            console.log(tweets.statuses[i].text);
        }
    });
};

var getSongDetails = function(songName) {
    spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].preview_url);
        console.log(data.tracks.items[0].album.name);

    });
};

var movieDetails = function(movieName){
    var requestString = "http://www.omdbapi.com/?apikey=40e9cece&t="+movieName;
    var movieDetails = request(requestString, function (error, response, body) {
        console.log(response.body);
    });

};


var showResults = function() {
    let arg = process.argv[2];
    if(arg === 'my-tweets'){
        getLastTwentyTweets();
    }else if(arg === 'spotify-this-song'){
        let songName = process.argv[3];
        if(!songName){
            songName = "The Sign By Ace of Base";
        }
        getSongDetails(songName);
    }else if(arg === 'movie-this'){
        let movieName = process.argv[3];
        if(!movieName){
            movieName = 'Mr.Nobody';
        }
        movieDetails(movieName);
    }else {
        console.log("Please enter an option");
    }
};

showResults();




