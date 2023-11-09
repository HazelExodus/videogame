const fs = require('fs');
const path = require('path');

const DATABASE_FILE = path.join(__dirname + './files/data.txt');

var services = function(app) {
    app.post('/write-record', function(req, res) {
        var id = "lib" + Date.now();

        var bookData = {
            gameName: req.body.gameName,
            yearReleased: req.body.yearReleased,
            playerType: req.body.playerType,
            platforms: req.body.platforms,
            ratings: req.body.ratings
        };

        var gameData = [];
        if(fs.existsSync(DATABASE_FILE)){
            
            //Read in current database
            fs.readFile(DATABASE_FILE, "utf8", function(err, data) {
                if(err) {
                    res.send(JSON.stringify({msg: err}));
                } else {

                    //console.log("Data: " + JSON.stringify(bookData));
                    libraryData = JSON.parse(data);
                    libraryData.push(bookData);

                fs.writeFile(DATABASE_FILE, JSON.stringify(libraryData), function(err){
                    if(err) {
                        res.send(JSON.stringify({msg: err}));
                    } else {
                        res.send(JSON.stringify({msg: "SUCCESS"}));
                    }
                  })
                }
            })
        }
    });

    app.get("/get-records", function(req, res) {
        if(fs.existsSync(DATABASE_FILE)) {
            fs.readFile(DATABASE_FILE, "utf8", function(err, data) {
                if(err){
                    res.send(JSON.stringify({msg: err}));
                }else{
                    libraryData = JSON.parse(data);
                    res.send(JSON.stringify({msg:"SUCCESS", libraryData: libraryData})); //stringify two objects
                }
            });

        }else {
            var data = [];
            res.send(JSON.stringify({msg:"SUCCESS", libraryData: data}));
        }
    });

};

module.exports = services;


