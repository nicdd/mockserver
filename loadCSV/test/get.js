module.exports = {


    get: function (req, res) {

        console.log('function called get ');
        let fss = require('fs');
        const csvvv = require('fast-csv');
        //console.log('Endpoint GET:' + req.path + ' Datenladen versuch:' + JSON.stringify(req.body));
        let loadFromFile = '../../Datenbank/testods1.csv';
        let myJsonResponse = [];
        let stream = null;
        try {
            console.log('es wird das lasen der csv TEST datei versucht')
            stream = fss.createReadStream(loadFromFile);

        } catch (err) {
            console.log('leider nicht geklappt' + JSON.stringify(err))

        }
        console.log('TEST hier ist angekommen')

        
            csvvv.fromStream(stream)
            .on("data", function (data) {
                //console.log(data);
                myJsonResponse.push(data);
            })
            .on("end", function () {
                console.log("done");
                res.send(myJsonResponse)
            });

    

        
    }
};