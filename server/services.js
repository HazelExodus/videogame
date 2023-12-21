const fs = require('fs');
const path = require('path');

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

var dbURL = "mongodb://localhost";  

const DATABASE_FILE = path.join(__dirname + '/files/data.txt');

var services = function(app) {
    app.post('/write-record', function(req, res) {
        var id = "lib" + Date.now();

        var ID = req.body.id;
        var gameName = req.body.gameName;
        var yearReleased = req.body.yearReleased;
        var playerType = req.body.playerType;
        var platforms = req.body.platforms;
        var rating = req.body.rating;

        var bookData = {
            id: id,
            gameName: req.body.gameName,
            yearReleased: req.body.yearReleased,
            playerType: req.body.playerType,
            platforms: req.body.platforms,
            rating: req.body.rating
        };
        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err,client){
            if(err) {
                return res.status(201).send(JSON.stringify({msg: err}));
            }else {
                var dbo = client.db("videogame");

                dbo.collection("record").insertOne(newSpell, function(err){
                    if(err) {
                        return res.status(201).send(JSON.stringify({msg: err}));
                    }else {
                        return res.status(200).send(JSON.stringify({msg: "SUCCESS"}));
                    }

                });
            }
        });

    });

    app.get("/get-record", function(req, res) {
        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err,client){
            if(err) {
                return res.status(201).send(JSON.stringify({msg: err}));
            }else {
                var dbo = client.db("videogame");

                dbo.collection("record").find().toArray(function(err, data){
                    if(err) {
                        return res.status(201).send(JSON.stringify({msg: err}));
                    }else {
                        return res.status(200).send(JSON.stringify({msg: "SUCCESS", spells:data}));
                    }

                });
            }
        });
    });


 //put delete function here

    app.delete("/delete-record", function(req, res) {
        var deleteID = req.body.deleteID;
        console.log(deleteID);

        var V_id = new ObjectId(deleteID);

        var search = {_id: V_id}
        console.log(search);

        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err,client){
            if(err) {
                return res.status(201).send(JSON.stringify({msg: err}));
            }else {
                var dbo = client.db("videogame");

                dbo.collection("record").deleteOne(search, function(err){
                    if(err) {
                        return res.status(201).send(JSON.stringify({msg: err}));
                    }else {
                        return res.status(200).send(JSON.stringify({msg: "SUCCESS"}));
                    }

                });
            }
        });




        

    });
        

};



module.exports = services;


