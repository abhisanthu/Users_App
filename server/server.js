// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
var mongojs = require('mongojs');
var Users = mongojs('Users', ['user_information']);
 
// Configuration
mongoose.connect('mongodb://localhost/Users');

console.log("connected");

 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 

 
  app.post('/insertdb', function (req, res) {   //  insert array of objects get from given url into the user_information collection of Users database
   Users.user_information.insert(req.body, function (err, doc) {
      res.json(doc);

      
     
    });
  })


  app.get('/aggregationcountuser', function (req, res) {   //  
    // Users.user_information.insert(req.body, function (err, doc) {
    //    res.json(doc);
 
       
      
    //  });
    Users.user_information.aggregate(
      [
       { $match :{ "site_admin":false}},
        { $group : { _id : "$site_admin", count: { $sum: 1 } } }
      ]
   ).toArray(function (err, doc)
   {
  
      console.log(doc)
      res.json(doc)
     
   })

  })

 
  app.delete('/userDelete:userid', function (req, res) {    //  Delete userid from database through it's object_Id


    var userid= req.params.userid;
    

   Users.user_information.remove({
      _id: mongojs.ObjectId(userid)
    }, function (err, doc) {
      res.json(doc);
      console.log(doc);
    })
  })
   

  app.put('/userupdate:userupdateloginid', function (req, res) {   // update user with loginid

    
    var userupdate = req.params.userupdateloginid;

    var usersplit=userupdate.split(',');

   Users.user_information.update({
      "_id": mongojs.ObjectID(usersplit[1])
    }, {
      $set: {
        "id": usersplit[0],
      
      }
    }, function (err, doc) {
  
  
      res.json(doc);
    })
  });
 
// listen (start app with node server.js) ======================================

var port=8080;
app.listen(port);
console.log("App listening on port" + port);