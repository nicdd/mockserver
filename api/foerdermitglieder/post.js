module.exports = {


    post: function (req, res, gartennummer) {
        console.log('post foerdermitglieder called')
        let fs = require('fs');

        let baseDataDirectory = "./public";
        let dateiname = req.path.split('/').pop();
        if (gartennummer || gartennummer === 0){
            let pathArray = req.path.split('/');
            dateiname =  pathArray[pathArray.length - 2]; // vorletztes element
        } 
        
        let saveToFile = [baseDataDirectory, dateiname].join('/') + '.json';
        if (!gartennummer) {
            fs.writeFile(saveToFile, JSON.stringify(req.body), function (err) {
                if (err) {
                    res.status(404).send('Data not saved');
                    return;
                }
                //console.log('Succesfully POST at path' + path);
                res.status(201).send(req.body);
            });
        } else {
            
            fs.readFile(saveToFile, (err, data) => {
                let newVersicherte = null;
                if (err) {
                    res.status(404).send('No Paechter Tabelle Found');

                } else {
                    newVersicherte = JSON.parse(data);
                }

                const index = newVersicherte.data.findIndex(v => v.GARTENNUMMER === gartennummer)

                if (index === -1) {
                    newVersicherte.data.push(req.body);
                } else {
                    newVersicherte.data[index] = req.body;
                }

                fs.writeFile(saveToFile, JSON.stringify(newVersicherte), function (err) {
                    if (err) {
                        res.status(404).send('Data not saved');
                        return;
                    }
                    //console.log('Succesfully POST at path' + path);
                    res.status(201).send(req.body);
                });

            });
        }

    }
};