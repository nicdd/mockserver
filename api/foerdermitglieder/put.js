module.exports = {


    put: function (req, res) {
        console.log('put - update foerdermitglieder called')
        let fs = require('fs');

        let baseDataDirectory = "./public";
        let dateiname = req.path.split('/').pop();
        
        let saveToFile = [baseDataDirectory, dateiname].join('/') + '.json';
        
            
            fs.readFile(saveToFile, (err, data) => {
                let newVersicherte = null;
                if (err) {
                    res.status(404).send('No Paechter Tabelle Found');

                } else {
                    newVersicherte = JSON.parse(data);
                }

                let toUpdate = req.body.data;

                toUpdate.forEach((up)=>{
                    let idxInOld = newVersicherte.data.findIndex(v => v.GARTENNUMMER === up.GARTENNUMMER);
                    if(idxInOld || idxInOld === 0){
                        newVersicherte.data.splice(idxInOld, 1, up);
                    }
                })

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
};