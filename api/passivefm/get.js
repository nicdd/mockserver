module.exports = {


    get: function (req, res, ident) {
        console.log('getpassivefm called + ident ' + ident + " req.path:" + req.path)
        let fs = require('fs');
        let baseDataDirectory = "./public";
        let dateiname = req.path.split('/').pop();
        if (ident || ident === 0) {
            let pathArray = req.path.split('/');
            dateiname = pathArray[pathArray.length - 2]; // vorletztes element
        }
        let loadFromFile = [baseDataDirectory, dateiname].join('/') + '.json';
        fs.readFile(loadFromFile, (err, data) => {
            if (err) {
                console.log('error mdata loadfromfle' + loadFromFile)
                res.status(204).send('Data not saved');
                return;
            }
            //console.log('Succesfully GET at path' + path + ' data:' + data);
            // console.log('mdata' + JSON.stringify(data))
            let allPassivefm = JSON.parse(data)
            if (!ident) {
                // dann ist get all passivefm
                res.setTimeout(2000, function () {
                    res.send(allPassivefm);
                })
            } else {
                const theGesuchter = allPassivefm.find((p) => p.AUFNAHMEDATUM === ident);
                if (theGesuchter) {
                    res.send(theGesuchter)
                } else {
                    res.status(204).send('Data not saved');
                }
            }

        });


    }
};