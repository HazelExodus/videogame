const path = require('path');

//Page listeners
var router = function(app){
    app.get("/", function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/html/VideoGame.html"));
    });

    app.get("/home", function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/html/VideoGame.html"));
    });

    app.get("/write-data", function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/html/write-data.html"));
    });

    app.get("/view-data", function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/html/view-data.html"));
    });

    app.get("/browse-data", function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/html/browse-data.html"));
    });

    



};

module.exports = router;
