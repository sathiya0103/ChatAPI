var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var videoSchema = require('../Models/videoModel');
var fs = require('fs');
var path = require('path');
app.set("view engine", "ejs");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB Connected");
    })
    .catch(err => {
        console.error("DB Connection Error: ", err);
    });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 50 } });

app.get('/', (req, res) => {
    videoSchema.find({})
        .then((data, err) => {
            if (err) {
                console.log(err);
            }
            res.render('videopage', { items: data });
        })
});

app.post('/', upload.single('video'), (req, res, next) => {

    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        video: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: req.file.mimetype
        }
    };

    videoSchema.create(obj)
        .then(item => {
            fs.unlinkSync(path.join(__dirname + '/uploads/' + req.file.filename));
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
});
