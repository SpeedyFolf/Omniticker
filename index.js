//pkg index.js --output omniticker
const interval = 12; //In seconds
// var _ = require("lodash");
var fs = require('fs');
const readline = require("readline-sync");
var ComfyJS = require("comfy.js");

var newestSub = 'C:/Users/SpeedyFolf/Documents/Streamlabs StreamLabels/most_recent_subscriber.txt';
var newestFollower = "C:/Users/SpeedyFolf/Documents/Streamlabs StreamLabels/most_recent_follower.txt";
var newestCheerer = "C:/Users/SpeedyFolf/Documents/Streamlabs StreamLabels/most_recent_cheerer.txt";
var currentFollowers = "C:/Users/SpeedyFolf/Documents/Streamlabs StreamLabels/total_follower_count.txt"
var nowPlaying = "C:/Users/SpeedyFolf/Documents/GTA San Andreas User Files/Now Playing.txt"
// var sessionSubs = "C:/Users/SpeedyFolf/Documents/Streamlabs StreamLabels/session_subscriber_count.txt";
var extraTxt = "C:/Users/SpeedyFolf/Documents/GitHub/Omniticker/txts/extratxt.txt";
var firstTxt = "C:/Users/SpeedyFolf/Documents/GitHub/Omniticker/txts/first.txt";
var twitterTxt = "C:/Users/SpeedyFolf/Documents/GitHub/Omniticker/txts/twitter.txt"
var twitchTxt = "C:/Users/SpeedyFolf/Documents/GitHub/Omniticker/txts/twitch.txt"
var kofiTxt = "C:/Users/SpeedyFolf/Documents/GitHub/Omniticker/txts/kofi.txt"
var sevenTxt = "C:/Users/SpeedyFolf/Documents/GitHub/Omniticker/txts/7tv.txt"

var subImage = "C:/Users/SpeedyFolf/Documents/GitHub/Omniticker/img/sub.png";
var cheerImage = "C:/Users/SpeedyFolf/Documents/GitHub/Omniticker/img/cheers.png";
var followerImage = "C:/Users/SpeedyFolf/Documents/GitHub/Omniticker/img/followers.png";
var nowPlayingImage = "C:/Users/SpeedyFolf/Documents/GitHub/Omniticker/img/musiccover.png";
var cstmMsgImage = "C:/Users/SpeedyFolf/Documents/GitHub/Omniticker/img/msg.png";
// var sesstarImage = "C:/Users/SpeedyFolf/Documents/GitHub/Omniticker/img/sesstar.png";
var oneImage = "C:/Users/SpeedyFolf/Documents/GitHub/Omniticker/img/one.png";
var twitterImage = "C:/Users/SpeedyFolf/Documents/GitHub/Omniticker/img/twitter.png";
var twitchImage = "C:/Users/SpeedyFolf/Documents/GitHub/Omniticker/img/twitch.png";
var kofiImage = "C:/Users/SpeedyFolf/Documents/GitHub/Omniticker/img/kofi.png";
var sevenImage = "C:/Users/SpeedyFolf/Documents/GitHub/Omniticker/img/7tv.png";

var options = [newestSub, newestFollower, newestCheerer, currentFollowers, twitterTxt, twitchTxt, sevenTxt, kofiTxt];
var optionsImage = [subImage, followerImage, cheerImage, followerImage, twitterImage, twitchImage, sevenImage, kofiImage];
var currentState = 0;
var lines = "";
var userinput = "";
var customMsg = "";
var readChannel = "speedyfolf"
var slideshowOutput = 'slideshow.txt';
var slideshowImageOutput = 'slideshowimage.png';

userinput = readline.question('Will there be GTA music? (y/n)');
if (userinput.match("y")) {
  options.push(nowPlaying);
  optionsImage.push(nowPlayingImage);
  console.log("there will be GTA music");
}
userinput = readline.question('Do you have a custom message? (n for no): ');
if (userinput !== "n") {
  customMsg = userinput;
  options.push(customMsg);
  optionsImage.push(cstmMsgImage);
  console.log("Added message: " + userinput);
}

// // Below is a minimum subs in a session thing
//userinput = readline.question('Is this stream eligible for an end-of-stream bonus?');
//if (userinput !== "n") {
//  options.push(sessionSubs);
//  optionsImage.push(sesstarImage);
//  console.log("Have fun streaming, gamer.");
//}
ComfyJS.onChat = ( user, command, message, flags, extra ) => {
	if( extra.customRewardId == 'Placeholder') {
		console.log(user + ' is now first');
		  options.push(firstTxt);
		  optionsImage.push(oneImage);
		fs.writeFile(firstTxt, user + ' was the first chatter today.', (err) => {
		if (err) throw err;
		});
	}
}
ComfyJS.Init( readChannel );
doSwap();
setInterval(function() {
  // Invoke function every 10 minutes
  doSwap();
}, interval * 1000);

function doSwap() {
  if (currentState == options.length) {
    currentState = 0;
  }
  if (options[currentState] == customMsg) {
    console.log(customMsg);
    fs.writeFile(slideshowOutput, customMsg, (err) => {
      if (err) throw err;
    });
  } else {
    fs.readFile(options[currentState], function(err, data) {
      if (err) throw err;
      //Fills lines with everything in a string array, seperated by \n.
      lines = data.toString();
      console.log(lines);
      fs.writeFile(slideshowOutput, lines, (err) => {
        if (err) throw err;
      });
    });
  }
  fs.readFile(optionsImage[currentState], function(err, data) {
    if (err) throw err;
    fs.writeFile(slideshowImageOutput, data, function(err) {
      if (err) throw err;
    });
  });
  currentState++
}