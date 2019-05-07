//CONNECT TO MONGOOSE //

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//-------------------------------------//

//DEFINE SCHEMAS //

var Schema = mongoose.Schema;

var goalSchema = new Schema({
    isTask: Boolean,
    goalName: String,
    goalDescription: String,
    tag: String,
    progressUnit: Number,
    totalUnit: Number,
    startDate: Date,
    projectLength: Number,
    frequency: Number,
    timePeriod: String
});

//---------------------------------------//

// Compile model from schema 
var goalModel = mongoose.model('goalModel', goalSchema );

// load and start express
var express = require('express');
var app = express();

// load and start bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 

// load handlebars library and tell express to use handle bar as a view engine
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//return list of goals to caller
app.get('/listGoal', function(req, res){
    goalModel.find().exec(function(err, goals){
        if(err){
            console.log(err);
        }
        res.render('listGoal')
    });
});

//return createTask.html file to caller
app.get('/createTask', function(req, res){
    res.sendFile('createTask.html', {root: __dirname});
});

//return createHabit.html file to caller
app.get('/createHabit', function(req, res){
    res.sendFile('createHabit.html', {root: __dirname});
});

//accept path "createTask"
app.post('/createTask', function(req, res) {
    res.send('Congratulation! You have just created "' + req.body.goalName + '".');

    //create new goal instance and save into database
    var newGoal = new goalModel({
        goalName: req.body.goalName, 
        goalDescription: req.body.goalDescription,
        tag:req.body.tag,
        progressUnit: req.body.progressUnit,
        totalUnit: req.body.totalUnit,
        startDate: req.body.startDate,
        projectLength: req.body.projectLength,
        isTask: true
    });

    //save new task instance to table
    newGoal.save(function(err){
        if(err){
            console.log(err);
        }
  })

});

//accept path "createHabit"
app.post('/createHabit', function(req, res) {
    res.send('Congratulation! You have just created "' + req.body.goalName + '".');

    //create new goal instance and save into database
    var newGoal = new goalModel({
        goalName: req.body.goalName, 
        goalDescription: req.body.goalDescription,
        tag:req.body.tag,
        frequency: req.body.frequency,
        timePeriod: req.body.timePeriod,
        startDate: req.body.startDate,
        isTask: false
    });

    //save new habit instance to table
    newGoal.save(function(err){
        if(err){
            console.log(err);
        }
  })

});

app.listen(8080, function() {
    console.log('Server running at http://127.0.0.1:8080/');
});