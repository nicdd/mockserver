module.exports = {


    post: function (req, res) {
        console.log('post versicherte called')
        let fs = require('fs');
        let baseDataDirectory = "./public";
        let saveToFile = [baseDataDirectory, req.path.split('/').pop()].join('/') + '.json';
        fs.writeFile(saveToFile, JSON.stringify(req.body), function (err) {
            if (err) {
                res.status(404).send('Data not saved');
                return;
            }
            //console.log('Succesfully POST at path' + path);
            res.status(201).send(req.body);
        });
    }
};