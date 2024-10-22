var express = require('express');
var router = express.Router();
var fs = require('fs');
var uuid = require('uuid')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/notes', function(req, res, next) {
  res.render('notes', { title: 'Express' });
});
router.post("/api/notes", function(req, res){
  fs.readFile("./db/db.json", "utf8", function(err, data){
    if(err) throw err;
    var notes = JSON.parse(data);
    req.body.id = uuid.v4();
    notes.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(notes), function(err){
      if(err) throw err;
    });
    res.json(notes);
  });
  console.log(req.body);
});
router.get("/api/notes", function(req, res){
  fs.readFile("./db/db.json", "utf8", function(err, data){
    if(err) throw err;
    var notes = JSON.parse(data);
    res.json(notes);
  });
});
router.delete("/api/notes/:id", function(req, res){
  fs.readFile("./db/db.json", "utf8", function(err, data){
    if(err) throw err;
    var notes = JSON.parse(data);
    notes = notes.filter(note=>note.id != req.params.id)
    fs.writeFile("./db/db.json", JSON.stringify(notes), function(err){
      if(err) throw err;
    });
    res.json(notes);
  });
});
module.exports = router;
