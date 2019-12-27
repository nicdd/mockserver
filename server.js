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
        if (req.originalUrl.includes('/api') || req.originalUrl.includes('/loadCSV')) {
            
            let moduleNameComponents = req.originalUrl.split('/');
            console.log('modulenamecomponents ist' + JSON.stringify(moduleNameComponents))
            let moduleName = "";
            
            let anId = null;
            console.log('get method called')
            if (moduleNameComponents.some((elem) => elem === "loggs")){
                moduleName += "/" + moduleNameComponents[1] + "/" + moduleNameComponents[2] + "/" + moduleNameComponents[3];
                if (moduleNameComponents.length > 4){
                    anId = moduleNameComponents[4];
                }
            } else {
                moduleName += "/" + moduleNameComponents[1] + "/" + moduleNameComponents[2];
                if (moduleNameComponents.length > 3){
                    anId = moduleNameComponents[3];
                }
            }
            let quelle = require('.' + moduleName + "/get");
            if(anId !== null){
                return quelle.get(req, res, anId)
            } else return quelle.get(req, res)
        } else if (req.originalUrl.includes('/auth')){
            let quelle = require('.' + req.originalUrl + "/get");
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
            let moduleNameComponents = req.originalUrl.split('/');
            let moduleName = "";
            let anId = null;
            console.log('modulenamecomponents ist' + JSON.stringify(moduleNameComponents))
            if (moduleNameComponents.some((elem) => elem === "loggs")){
                moduleName += "/" + moduleNameComponents[1] + "/" + moduleNameComponents[2] + "/" + moduleNameComponents[3];
                if (moduleNameComponents.length > 4){
                    anId = moduleNameComponents[4];
                }
            } else {
                moduleName += "/" + moduleNameComponents[1] + "/" + moduleNameComponents[2];
                if (moduleNameComponents.length > 3){
                    anId = moduleNameComponents[3];
                }
            }

            
            let quelle = require('.' + moduleName + "/post");
            if(anId !== null){
                return quelle.post(req, res, anId);
            } else return quelle.post(req, res);
        } catch (err) {
            console.log('leider nicht geklappt' + JSON.stringify(err))
            res.sendStatus(400);//return Promise.reject(err);
        }
    } else if (req.method === "PUT" || (req.method === "OPTIONS" && req.body)) {
        console.log('PUT called for req.originalUrl' + req.originalUrl)
        try {
            
            let quelle = require('.' + req.originalUrl + "/put");
            return quelle.put(req, res);
        } catch (err) {
            console.log('leider nicht geklappt' + JSON.stringify(err))
            res.sendStatus(400);//return Promise.reject(err);
        }
    } else if (req.method === "DELETE" || (req.method === "OPTIONS" && req.body)) {
        console.log('delete called for req.originalUrl' + req.originalUrl)
        try {
            let gartenNummer = req.originalUrl.split('/').pop();
            let ressourceUrl = req.originalUrl.substring(0,req.originalUrl.lastIndexOf('/'));
            let quelle = require('.' + ressourceUrl + "/delete");
            return quelle.delete(ressourceUrl, res, gartenNummer)
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













