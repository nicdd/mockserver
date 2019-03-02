const express = require('express');
const app = express();
var fs = require('fs');
const csv = require('fast-csv');
var path = require('path');


const cors = require('cors')

var corsOptions = {
    origin: 'http://127.0.0.1:8081',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static('public'));

//app.use(cors(corsOptions))

app.use(function (req, res, next) {
    var allowedOrigins = ['http://127.0.0.1:8081', 'http://localhost:8081', 'http://192.168.2.146:8081', 'http://0.0.0.0:8081'];
    var origin = req.headers.origin;
    console.log('header:' + JSON.stringify(req.originalUrl) + ' method' + req.method)
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);


    if (req.method === "GET") {
        console.log('get called for req.originalUrl' + req.originalUrl)
        if (req.originalUrl.includes('/api') || req.originalUrl.includes('/loadCSV') || req.originalUrl.includes('/auth')) {
            //rest ressources -payloads
            let quelle = require('.' + req.originalUrl + "/get");
            console.log('get method called')
            return quelle.get(req, res)
        } else {
            let __dirname = "../myapp";
            if (req.originalUrl === "/") {
                res.sendFile('index.html', { root: __dirname });
            } else {
                // html ressouces (bower comps, imges ...)
                res.sendFile(req.originalUrl, { root: __dirname });
            }
        }
    } else if (req.method === "POST" || (req.method === "OPTIONS" && req.body)) {
        console.log('post called for req.originalUrl' + req.originalUrl)
        try {
            let quelle = require('.' + req.originalUrl + "/post");
            return quelle.post(req, res)
        } catch (err) {
            console.log('leider nicht geklappt' + JSON.stringify(err))
            res.sendStatus(400);//return Promise.reject(err);
        }


    }


    //return next();
});

app.listen(8000, () => {
    console.log('MockServer läuft! Es kann los gehen.');
});













