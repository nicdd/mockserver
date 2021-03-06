module.exports = {


    post: function (req, res, ident) {
        console.log('post foerdermitglieder called')
        let fs = require('fs');

        let baseDataDirectory = "./public";
        let dateiname = req.path.split('/').pop();

        if (ident || ident === 0){
            let pathArray = req.path.split('/');
            dateiname =  pathArray[pathArray.length - 2]; // vorletztes element
        } 
        
        let saveToFile = [baseDataDirectory, dateiname].join('/') + '.json';
        if (!ident) {
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
                let newFoerdermitglieder = null;
                if (err) {
                    res.status(404).send('No Paechter Tabelle Found');

                } else {
                    newFoerdermitglieder = JSON.parse(data);
                }

                const index = newFoerdermitglieder.findIndex(v => v.AUFNAHMEDATUM === ident)

                if (index === -1) {
                    newFoerdermitglieder.push(req.body);
                } else {
                    newFoerdermitglieder[index] = req.body;
                }

                fs.writeFile(saveToFile, JSON.stringify(newFoerdermitglieder), function (err) {
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