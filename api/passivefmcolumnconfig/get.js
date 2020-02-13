module.exports = {


    get: function (req, res) {
        console.log('get passivefm column config  called')
        let fs = require('fs');
        let baseDataDirectory = "./public";

        let loadFromFile = [baseDataDirectory, req.path.split('/').pop()].join('/') + '.json';
    

    fs.readFile(loadFromFile, (err, data) => {
        if (err){
            console.log('error mdata loadfromfle' + loadFromFile)
            res.status(204).send('Data not saved');
            return;
        }
        //console.log('Succesfully GET at path' + path + ' data:' + data);
       // console.log('mdata' + JSON.stringify(data))
        res.send(JSON.parse(data));
    });

        
    }
};