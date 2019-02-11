module.exports = {
    post: function (req, res) {
        console.log('post versicherte called')
        let fs = require('fs');
        let baseDataDirectory = "../../Datenbank";
        
        let saveToFile = [baseDataDirectory, req.path.split('/').pop()].join('/') + '.csv';

        fs.writeFile(saveToFile, req.body, function (err) {
            if (err) {
                res.status(404).send('Data not saved');
                return;
            }
            console.log('Succesfully POST at path' + req.path);
            res.status(201).send({path: saveToFile});
        });
    }
};