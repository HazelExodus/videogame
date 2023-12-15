const fs = require('fs');
const path = require('path');

const DATABASE_FILE = path.join(__dirname + '/files/data.txt');

var services = function(app) {
    app.post('/write-record', function(req, res) {
        var id = "lib" + Date.now();

        var bookData = {
            id: id,
            gameName: req.body.gameName,
            yearReleased: req.body.yearReleased,
            playerType: req.body.playerType,
            platforms: req.body.platforms,
            rating: req.body.rating
        };
console.log(JSON.stringify(bookData));
        var gameData = [];
        if(fs.existsSync(DATABASE_FILE)){
            
            //Read in current database
            fs.readFile(DATABASE_FILE, "utf8", function(err, data) {
                if(err) {
                    res.send(JSON.stringify({msg: err}));
                } else {

                    //console.log("Data: " + JSON.stringify(bookData));
                    gameData = JSON.parse(data);
                    gameData.push(bookData);

                fs.writeFile(DATABASE_FILE, JSON.stringify(gameData), function(err){
                    if(err) {
                        res.send(JSON.stringify({msg: err}));
                    } else {
                        res.send(JSON.stringify({msg: "SUCCESS"}));
                    }
                  })
                }
            })
        }else{
            gameData.push(bookData);
            fs.writeFile(DATABASE_FILE, JSON.stringify(gameData), function(err){
                if(err) {
                    res.send(JSON.stringify({msg: err}));
                } else {
                    res.send(JSON.stringify({msg: "SUCCESS"}));
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

 //put delete function here

    app.delete("/delete-records", function(req, res) {
        var deleteID = req.body.deleteID;

        if(fs.existsSync(DATABASE_FILE)) {
            fs.readFile(DATABASE_FILE, "utf8", function(err, data) {
                if(err){
                    res.send(JSON.stringify({msg: err}));
                }else{
                    libraryData = JSON.parse(data);
                }
                    for (let i = 0; i < libraryData.length; i++){
                        deleteID.splice(i,1);
                        res.send(JSON.stringify({msg: "SUCCESS"}));
                    };
                    

                    fs.writeFile(DATABASE_FILE, JSON.stringify(libraryData), function(err){
                        if(err) {
                            res.send(JSON.stringify({msg: err}));
                        } else {
                            res.send(JSON.stringify({msg: "SUCCESS"}));
                        }
                      })
                    
                
            });

        }
            

    });
        

};



module.exports = services;


