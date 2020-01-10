module.exports = {


    put: function (req, res) {
        console.log('put - update foerdermitglieder called')
        let fs = require('fs');

        let baseDataDirectory = "./public";
        let dateiname = req.path.split('/').pop();
        
        let saveToFile = [baseDataDirectory, dateiname].join('/') + '.json';
        
            
            fs.readFile(saveToFile, (err, data) => {
                let newFoerdermitglieder = null;
                if (err) {
                    res.status(404).send('No Paechter Tabelle Found');

                } else {
                    newFoerdermitglieder = JSON.parse(data);
                }

                let toUpdate = req.body.data;

                toUpdate.forEach((up)=>{
                    let idxInOld = newFoerdermitglieder.findIndex(v => v.id === up.id);
                    if(idxInOld || idxInOld === 0){
                        newFoerdermitglieder.splice(idxInOld, 1, up);
                    }
                })

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
};