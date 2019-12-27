module.exports = {


    post: function (req, res, gartennummer) {
        console.log('post logg paechter called')
        let fs = require('fs');

        let baseDataDirectory = "./public";
        let dateiname = req.path.split('/').pop() + "_history";
        if (gartennummer || gartennummer === 0){
            let pathArray = req.path.split('/');
            dateiname =  pathArray[pathArray.length - 2] + "_history"; // vorletztes element
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
                let newHistory = [];
                if (err) {
                    res.status(404).send('No Paechter Tabelle Found');

                } else {
                    newHistory = JSON.parse(data);
                }

                const index = newHistory.findIndex(p => p.id === gartennummer)

                if (index === -1) {
                    newHistory.push({"id": gartennummer, "history": [req.body]});
                } else {
                    if (newHistory[index].history.length >= 10){
                        newHistory[index].history.pop();
                    }
                    newHistory[index].history.unshift(req.body);
                }

                fs.writeFile(saveToFile, JSON.stringify(newHistory), function (err) {
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