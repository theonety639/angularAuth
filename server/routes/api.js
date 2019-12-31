const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://thisismyuser:thisismypass@localhost:27017/eventsdb', { useNewUrlParser: true }, error => {
    if (error) {
        console.error("This is me presenting the error message:", error);
    }
    else {
        console.log("Connected successfully to MongoDB, yes!");
    }
});

router.get('/', (req, res) => {
    res.send("From API router.");
});

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if (error) {
            console.log("This error came from the api.js file in the post method:", error);
        }
        else {
            //let payload = { subject: registeredUser._id }; unnecessary, this should only be used in the login part.
            //let token = jwt.sign(payload, "secretKey"); unnecessary, this should only be used in the login part.
            res.status(200).send();
        }
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({ email: userData.email }, (error, registeredUser) => {
        if (error) {
            console.log("This error is coming from api.js, method router.post with '/login':", error);
        }
        else {
            if (!registeredUser) {
                res.status(401).send("Invalid e-mail.");
            }
            else if (userData.password !== registeredUser.password) {
                res.status(401).send("E-mail and password don't match.");
            }
            else {
                let payload = { subject: registeredUser._id };/*It's subject for convention, it's _id because that's what the primary key sent from the mongodb is called.*/
                let token = jwt.sign(payload, "secretKey");/*The second parameter is a secret key.  I'm choosing it to be called "secretKey".*/
                res.status(200).send({ token });
            }
        }
    });
});

router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "name1",
            "description": "description1",
            "date": "2020-11-05T20:00:00"
        },
        {
            "_id": "2",
            "name": "name2",
            "description": "description2",
            "date": "2020-11-05T20:00:00"
        },
        {
            "_id": "3",
            "name": "name3",
            "description": "description3",
            "date": "2020-11-05T20:00:00"
        },
        {
            "_id": "4",
            "name": "name4",
            "description": "description4",
            "date": "2020-11-05T20:00:00"
        },
        {
            "_id": "5",
            "name": "name5",
            "description": "description5",
            "date": "2020-11-05T20:00:00"
        },
        {
            "_id": "6",
            "name": "name6",
            "description": "description6",
            "date": "2020-11-05T20:00:00"
        }
    ];
    res.json(events);
});

router.get('/special', verifyToken, (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "name1 special",
            "description": "description1 special",
            "date": "2020-11-05T21:00:00"
        },
        {
            "_id": "2",
            "name": "name2 special",
            "description": "description2 special",
            "date": "2020-11-05T21:00:00"
        },
        {
            "_id": "3",
            "name": "name3 special",
            "description": "description3 special",
            "date": "2020-11-05T21:00:00"
        },
        {
            "_id": "4",
            "name": "name4 special",
            "description": "description4 special",
            "date": "2020-11-05T21:00:00"
        },
        {
            "_id": "5",
            "name": "name5 special",
            "description": "description5 special",
            "date": "2020-11-05T21:00:00"
        },
        {
            "_id": "6",
            "name": "name6 special",
            "description": "description6 special",
            "date": "2020-11-05T21:00:00"
        }
    ];
    res.json(events);
});

function verifyToken(req, res, next) {
    let payload = undefined;
    if (!req.headers.authorization) {
        return status(401).send("Unauthorized request.");
    }
    let token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return status(401).send("Unauthorized request.");
    }
    /*Wrappping jwt.verify with a try/catch is mandatory or it won't work, even though no syntax error will show up in the code editor.  If not wrapped, and the token is forcibly changed, it won't navigate to login.*/
    try {
        payload = jwt.verify(token, "secretKey");
    } catch (error) {
        return res.status(401).send("Unauthorized request");
    }
    if (!payload) {
        return status(401).send("Unauthorized request.");
    }
    req.userId = payload.subject;
    next();

}

module.exports = router;