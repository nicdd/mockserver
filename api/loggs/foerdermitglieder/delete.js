module.exports = {


    delete: function (ressourceUrl, res, ident) {
        console.log('delete foerdermitglieder called')
        let fs = require('fs');
        let baseDataDirectory = "./public";
        let dbFilePath = [baseDataDirectory, ressourceUrl.split('/').pop()].join('/') + '.json';

        fs.readFile(dbFilePath, (err, data) => {
            let dbFoerdermitglieder = null;
            if (err) {
                res.status(404).send('The Db-File could not be read.');
                return;
            } else {
                dbFoerdermitglieder = JSON.parse(data);
            }

            const index = dbFoerdermitglieder.findIndex(v => v.id === ident)

            if (index === -1) {
                res.sendStatus(204);
                return;
            } else {
                dbFoerdermitglieder.splice(index, 1)
            }

            fs.writeFile(dbFilePath, JSON.stringify(dbFoerdermitglieder), function (err) {
                if (err) {
                    res.status(404).send('After the deletion, Data could not be saved to DB');
                    return;
                }
                //console.log('Succesfully POST at path' + path);
                res.sendStatus(201);
                return;
            });
            
        });
        
        
    }
};