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

//DEFINE SCHEMAS //
var Schema = mongoose.Schema;

var goalSchema = new Schema({
    isTask: Boolean,
    goalName: String,
    goalDescription: String,
    tag: String,
    unitName: String,
    totalUnit: Number,
    startDate: Date,
    projectLength: Number,
    frequency: Number,
    timePeriod: String
});

// Compile model from schema 
var goalModel = mongoose.model('goalModel', goalSchema);

// load and start express
var express = require('express');
var app = express();

// load and start bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// load handlebars library and tell express to use handle bar as a view engine
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//register public folder which stores static files
app.use(express.static('public'));

//-------------------------API RETURN JSON----------------------------------------//

//return lisf of goals json file to caller
app.get('/api/listGoal', function(req, res){
    
    goalModel.find().exec(function(err, goals){
        if(err){
            console.log(err);
        }

        res.send(goals);

    });
});

//return a specific goal json file to caller
app.get('/api/listGoal/:goal_id', function (req, res) {

    goalModel.find({ _id: req.params.goal_id }).exec(function (err, goal) {
        res.send(goal);
    });

});

//return updateTask json file to caller
app.post('/updateTask', function (req, res) {

    goalModel.findOneAndUpdate({ "_id": req.query.id }, {
        goalName: req.body.goalName,
        goalDescription: req.body.goalDescription,
        tag: req.body.tag,
        unitName: req.body.unitName,
        totalUnit: req.body.totalUnit,
        startDate: req.body.startDate,
        projectLength: req.body.projectLength,
    }).exec(function (err, goal) {
        if (err) {
            console.log(err);
        }
        res.send(goal);
    });
});

//return updateHabit json file to caller
app.post('/updateHabit', function (req, res) {
    goalModel.findOneAndUpdate({ "_id": req.query.id }, {
        goalName: req.body.goalName,
        goalDescription: req.body.goalDescription,
        tag: req.body.tag,
        frequency: req.body.frequency,
        timePeriod: req.body.timePeriod,
        startDate: req.body.startDate,
    }).exec(function (err, goal) {
        if (err) {
            console.log(err);
        }
        res.send(goal);
    });
});


//---------------------UI RETURN HTML-------------------------------------------//

//return about page to caller
app.get('/about', function (req, res) {
    res.render('about');
});

//return home page file to caller
app.get('/home', function (req, res) {
    res.render('home');
});

app.get('/listGoal', function(req, res){
    goalModel.find().exec(function(err, goals){
        if(err){
            console.log(err);
        }
        var result = {allGoals: goals}
        res.render('listGoal', result)

    });
});

//accept path "createTask"
app.post('/createTask', function (req, res) {

    //create new goal instance and save into database
    var newGoal = new goalModel({
        goalName: req.body.goalName,
        goalDescription: req.body.goalDescription,
        tag: req.body.tag,
        unitName: req.body.unitName,
        totalUnit: req.body.totalUnit,
        startDate: req.body.startDate,
        projectLength: req.body.projectLength,
        isTask: true
    });

    //save new task instance to table
    newGoal.save(function (err) {
        if (err) {
            console.log(err);
        }
        res.redirect('/listGoal');
    })
});

//accept path "createHabit"
app.post('/createHabit', function (req, res) {

    //create new goal instance and save into database
    var newGoal = new goalModel({
        goalName: req.body.goalName,
        goalDescription: req.body.goalDescription,
        tag: req.body.tag,
        frequency: req.body.frequency,
        timePeriod: req.body.timePeriod,
        startDate: req.body.startDate,
        isTask: false
    });

    //save new habit instance to table
    newGoal.save(function (err) {
        if (err) {
            console.log(err);
        }
        res.redirect('/listGoal');
    })
});

//return updateTask page to caller
app.get('/updateTask', function (req, res) {
    goalModel.findOne({ "_id": req.query.id }).exec(function (err, goal) {
        if (err) {
            console.log(err);
        }

        var date = new Date(goal.startDate);
        formattedDate = date.toISOString().split('T')[0];
        var result = { 'goal': goal, 'date': formattedDate }
        res.render('updateTask', result)
    });
});

//return updateHabit page to caller
app.get('/updateHabit', function (req, res) {
    goalModel.findOne({ "_id": req.query.id }).exec(function (err, goal) {
        if (err) {
            console.log(err);
        }
        var date = new Date(goal.startDate);
        formattedDate = date.toISOString().split('T')[0];
        var result = { 'goal': goal, 'date': formattedDate }
        res.render('updateHabit', result)
    });
});

//return delete page to caller
app.get('/deleteGoal', function (req, res) {
    res.sendFile('public/html/deleteGoal.html', { root: __dirname })
});

//accept path "deleteGoal"
app.delete('/deleteGoal', function (req, res) {

    var goalId = req.body.goalId;

    goalModel.findOneAndDelete({ "_id": goalId }).exec(function (err, goals) {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/listGoal');
});

app.listen(8080, function () {
    console.log('Server running at http://127.0.0.1:8080/');
});