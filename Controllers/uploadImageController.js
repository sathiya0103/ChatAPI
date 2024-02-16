var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var imageSchema = require('../Models/imageModel');
var fs = require('fs');
var path = require('path');
app.set("view engine", "ejs");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
    .then(console.log("DB Connected"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

app.get('/', (req, res) => {
    imageSchema.find({})
        .then((data, err) => {
            if (err) {
                console.log(err);
            }
            res.render('imagepage', { items: data })
        })
});


app.post('/', upload.single('image'), (req, res, next) => {

    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imageSchema.create(obj)
        .then((err, item) => {
            if (err) {
                console.log(err);
            }
            else {
                // item.save();
                res.redirect('/');
            }
        });
});