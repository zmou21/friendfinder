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
      photo: "https://s-s.huffpost.com/contributors/demetra-gregorakis/headshot.jpg",
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
    }
  ];
  let friendsData = [];
  let friendScoreArr;
  let friendArr = [];

  // HTML GET Requests (htmlroutes.js)
  // Below code handles when users "visit" a page.

    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, "app/public/home.html"));
    });

    app.get("/survey", function(req, res) {
      res.sendFile(path.join(__dirname, "app/public/survey.html"));
    });

  app.get("/api/friends", function(req, res) {
    res.json(friends);
    res.json(friendsData);
  });


  app.post("/api/friends", function(req, res) {
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

    //console.log(friendsArr);

    let matchName = "";
    let matchImage = "";

    let totalDifference = 50;

    //loop through friendsData
    for(let i = 0; i < friends.length; i++) {

      let difference = 0;
      //loop through each individual score and subtract the values together
      for(let j = 0; j < friendsArr.length; j++){
        //console.log(friendsData[i].score[j]);
        difference += Math.abs(friends[i].score[j] - friendsArr[j]);
        //console.log("..." + difference);
      }

      if (difference < totalDifference) {
        totalDifference = difference;
        console.log(totalDifference);
        matchName = friends[i].name;
        matchImage = friends[i].photo;
        //console.log(matchName + " " + matchImage);
      }

    }

    res.json({status: 'OK', matchName: matchName, matchImage: matchImage});

  });

  function friendCompatability() {

      let friendScore = friendsData[0].score;

      friendScore = friendScore.replace(/[\[\]"]+/g,"");

      let friendScoreArr = friendScore.split(",");

      for(let i = 0; i < friendScoreArr.length; i++){
        let friend = parseInt(friendScoreArr[i]);
        //console.log("This is score = " + friend);
        friendArr.push(friend);
      }

  };

  //The below code effectively "starts" our server
  app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });


  // {
  //   name: "Harry",
  //   photo: "https://www.fosi.org/media/images/Beckley_Fred_1_copy.9a3ceee7.fill-400x400.jpg",
  //   score:[
  //       3,
  //       1,
  //       4,
  //       1,
  //       1,
  //       2,
  //       2,
  //       5,
  //       2,
  //       1
  //   ]
  // }
