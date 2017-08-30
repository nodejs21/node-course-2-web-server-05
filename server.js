
// NOTE: nodemon server.js -e js, hbs (to rerun server on changes in hbs files)

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    // console.log(`${now}: ${req.method} ${req.url}`);
    // NOTE: for version of node below v6
    // var log = `${now}: ${req.method} ${req.url}`;
    // fs.appendFile('server.log', log + '\n');
    // next();
    var logData = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', logData + '\n', (err) => {
        if(err){
            console.log('Unabel to append to server.log.');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// NOTE: hbs helper (handle bar helpers)
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Assalam o Alaikum!!</h1>');
    // res.send({
    //     name: 'Safi Ullah',
    //     likes: {
    //         first: 'Biking',
    //         array: [
    //             'one', 'two', 'three'
    //         ]
    //     }
    // });
    // NOTE: 'hbs' (handle bars), just like 'ejs'
    res.render('home.hbs', {
        pageTitle: 'Home page',
        // currentYear: new Date().getFullYear(),
        welcomeMessage: 'welcome home :)'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        // currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "bad request"
    });
});

app.listen(3000, () => {
    console.log('Server is up on ort 3000');
});

































//
