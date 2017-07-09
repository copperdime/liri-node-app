var fs = require("../keys.js");

// fs.readFile("keys.js", "utf8", function(error,data){
	
	// console.log(fs);
	// console.log(fs.twitterKeys.consumer_key);
// Twitter keys 
var getKeys = fs.twitterKeys;
var consumerKey = getKeys.consumer_key;
var consumerSecret = getKeys.consumer_secret;
var accessTokenKey = getKeys.access_token_key;
var accessTokenSecret = getKeys.access_token_secret;

console.log(consumerKey);
console.log(consumerSecret);
console.log(accessTokenKey);
console.log(accessTokenSecret);

// user interface prompting questions regarding actions
var inquirer = require("inquirer");
inquirer
  .prompt([
   // Ask user which program functionality he/she would like to use
    {
      type: "list",
      message: "Which would you like to see?",
      choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
      name: "program"
    }
    ]);

// Access to OMBD API
var request = require("request");
	// API Call in node.js
var result = function(){
    request("http://www.omdbapi.com/?t=Forrest+Gump&y=&releaseDate&apikey=40e9cece", function(error,response,body){
        if(!error&&response.statusCode === 200) {
            console.log("The movie's release date is: " + JSON.parse(body).Year);
            console.log(response);
        }

    });
}
