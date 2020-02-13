module.exports = {


    delete: function (ressourceUrl, res, ident) {
        console.log('delete passivefm called')
        let fs = require('fs');
        let baseDataDirectory = "./public";
        let dbFilePath = [baseDataDirectory, ressourceUrl.split('/').pop()].join('/') + '.json';

        fs.readFile(dbFilePath, (err, data) => {
            let dbFoerderMits = null;
            if (err) {
                res.status(404).send('The Db-File could not be read.');
                return;
            } else {
                dbFoerderMits = JSON.parse(data);
            }

            const index = dbFoerderMits.findIndex(v => v.AUFNAHMEDATUM === ident)

            if (index === -1) {
                res.sendStatus(204);
                return;
            } else {
                dbFoerderMits.splice(index, 1)
            }

            fs.writeFile(dbFilePath, JSON.stringify(dbFoerderMits), function (err) {
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