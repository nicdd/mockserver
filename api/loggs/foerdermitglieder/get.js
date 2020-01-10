module.exports = {


    get: function (req, res, ident) {
        console.log('get logata for foerdermitglieder called + ident ' + ident + " req.path:" + req.path)
        let fs = require('fs');
        let baseDataDirectory = "./public";
        let dateiname = req.path.split('/').pop();
        if (ident || ident === 0){
            let pathArray = req.path.split('/');
            dateiname =  pathArray[pathArray.length - 2] + "_history"; // vorletztes element
        } 
        let loadFromFile = [baseDataDirectory, dateiname].join('/') + '.json';
    fs.readFile(loadFromFile, (err, data) => {
        if (err){
            console.log('error logdata loadfromfle' + loadFromFile)
            res.status(204).send('Data not saved');
            return;
        }
        //console.log('Succesfully GET at path' + path + ' data:' + data);
       // console.log('mdata' + JSON.stringify(data))
       let allHistory = JSON.parse(data)
       if(!ident){
           // dann ist get all foerdermitglieder
        res.send(allHistory);
       } else {
            const theGesuchter = allHistory.find((garten)=> garten.id === ident);
            if (theGesuchter){
                res.send(theGesuchter)
            } else {
                res.status(204).send('Data not saved');
            }
       }
        
    });

        
    }
};