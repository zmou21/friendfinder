  //Dependencies
  var express = require("express");
  var bodyParser = require("body-parser");
  var path = require("path");

  // Sets up the Express App
  var app = express();
  var PORT = 3000;

  // Sets up the Express app to handle data parsing
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // require("./routing/apiRoutes")(app);
  // require("./routing/htmlroutes")(app);

  let friends = [
    {
      name: "Stacey",
      link: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
      score: [
          5,
          1,
          4,
          4,
          5,
          1,
          2,
          5,
          4,
          1
      ]
    },
    {
      name: "Harry",
      link: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
      score:[
          3,
          1,
          4,
          1,
          1,
          2,
          2,
          5,
          2,
          1
      ]
    }
  ];
  let friendsData = [];
  let friendScoreArr;
  let friendArr = [];

  // HTML GET Requests (htmlroutes.js)
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content

    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, "app/public/home.html"));
    });

    app.get("/survey", function(req, res) {
      res.sendFile(path.join(__dirname, "app/public/survey.html"));
    });

  // API GET Requests (apiroutes.js)
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });


  app.post("/api/new", function(req, res) {
    //"server" will respond to requests and let users know if they have a table or not.
    // app.post() will have functionality to tally up the scores and compare them to users in friends.js array and will append it

    var newFriend = req.body;

    friendsData.push(newFriend);

    friendCompatability();
    friendsData[0].score = "";
    const score = friendArr;
    friendsData[0].score = score;

    //console.log("___________");
    //console.log(friendsData[2]);

    let friendsArr = friendsData[0].score;

    let matchName = "";
    let matchImage = "";

    let totalDifference = 50;

    //loop through friendsData
    for(let i = 0; i < friends.length; i++) {

      let difference = 0;
      //loop through each individual score and subtract the values together
      for(let j = 0; j < friendsArr.length; j++){
        //console.log(friendsData[i].score[j]);
        difference += Math.abs(friends[i].score[j] - friendsArr);
      }

      if (difference < totalDifference) {
        totalDifference = difference;
        matchName = friends[i].name;
        matchImage = friends[i].link;
        console.log(matchName + " " + matchImage);
      }

    }

  });

  function friendCompatability() {

      let friendScore = friendsData[0].score;

      friendScore = friendScore.replace(/[\[\]"]+/g,"");

      let friendScoreArr = friendScore.split(",");

      for(let i = 0; i < friendScoreArr.length; i++){
        let friend = parseInt(friendScoreArr[i]);
        console.log("This is score = " + friend);
        friendArr.push(friend);
      }

  };

  //The below code effectively "starts" our server
  app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
