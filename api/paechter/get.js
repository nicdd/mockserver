module.exports = {


    get: function (req, res, gartennummer) {
        console.log('getpaechter called + gartennummer ' + gartennummer + " req.path:" + req.path)
        let fs = require('fs');
        let baseDataDirectory = "./public";
        let dateiname = req.path.split('/').pop();
        if (gartennummer || gartennummer === 0){
            let pathArray = req.path.split('/');
            dateiname =  pathArray[pathArray.length - 2]; // vorletztes element
        } 
        let loadFromFile = [baseDataDirectory, dateiname].join('/') + '.json';
    fs.readFile(loadFromFile, (err, data) => {
        if (err){
            console.log('error mdata loadfromfle' + loadFromFile)
            res.status(204).send('Data not saved');
            return;
        }
        //console.log('Succesfully GET at path' + path + ' data:' + data);
       // console.log('mdata' + JSON.stringify(data))
       let allPaechter = JSON.parse(data)
       if(!gartennummer){
           // dann ist get all paechter
        res.send(allPaechter);
       } else {
            const theGesuchter = allPaechter.data.find((p)=> p.GARTENNUMMER === gartennummer);
            if (theGesuchter){
                res.send(theGesuchter)
            } else {
                res.status(204).send('Data not saved');
            }
       }
        
    });

        
    }
};