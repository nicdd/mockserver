module.exports = {


    delete: function (ressourceUrl, res, gartenNummer) {
        console.log('delete paechter called')
        let fs = require('fs');
        let baseDataDirectory = "./public";
        let dbFilePath = [baseDataDirectory, ressourceUrl.split('/').pop()].join('/') + '.json';

        fs.readFile(dbFilePath, (err, data) => {
            let dbPaechter = null;
            if (err) {
                res.status(404).send('The Db-File could not be read.');
                return;
            } else {
                dbPaechter = JSON.parse(data);
            }

            const index = dbPaechter.findIndex(v => v.GARTENNUMMER === gartenNummer)

            if (index === -1) {
                res.sendStatus(204);
                return;
            } else {
                dbPaechter.splice(index, 1)
            }

            fs.writeFile(dbFilePath, JSON.stringify(dbPaechter), function (err) {
                if (err) {
                    res.status(404).send('After the deletion, Data could not be saved to DB');
                    return;
                }
                //console.log('Succesfully POST at path' + path);
                res.sendStatus(200);
                return;
            });
            
        });
        
        
    }
};