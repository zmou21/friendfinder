  //Dependencies
  var express = require("express");
  var bodyParser = require("bodyparser");
  var path = require("path");

  // Sets up the Express App
  var app = express();
  var PORT = process.env.PORT || 3000;

  // Sets up the Express app to handle data parsing
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // require("./routing/apiRoutes")(app);
  // require("./routing/htmlroutes")(app);

  var friendsData = [];

  // HTML GET Requests (htmlroutes.js)
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  app.get("/", function(req, res) {
    res.sendFile(path.join(_dirname, "../public/home.html"));
  })

  app.get("/survey", function(req, res) {
    res.sendFile(path.join(_dirname, "../public/survey.html"));
  })

  // API GET Requests (apiroutes.js)
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });


  app.post("..", function(req, res) {
    //"server" will respond to requests and let users know if they have a table or not.
    // app.post() will have functionality to tally up the scores and compare them to users in friends.js array and will append it
  });



  //The below code effectively "starts" our server
  app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
