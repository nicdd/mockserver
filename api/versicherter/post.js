module.exports = {


    post: function (req, res, gartennummer) {
        console.log('post versicherteR called')
        let fs = require('fs');
        let baseDataDirectory = "./public";
        let theMoreVsPath = req.path.split('/').pop();
        theMoreVsPath = theMoreVsPath.substring(0, theMoreVsPath.length - 1);
        theMoreVsPath = [baseDataDirectory, theMoreVsPath].join('/') + '.json';

        fs.readFile(theMoreVsPath, (err, data) => {
            let newVersicherte = null;
            if (err) {
                newVersicherte = {
                    "data": [],
                    "columns": [
                        "Garten",
                        "Anrede",
                        "Nachname",
                        "Vorname",
                        "Geburtsdatum",
                        "Strasse",
                        "Hausnummer",
                        "Postleitzahl",
                        "Wohnort",
                        "Fläche",
                        "Telefon",
                        "E-Mail",
                        "Bemerkungen",
                        "GBV",
                        "FED",
                        "HöV",
                        "SA",
                        "A 7.3",
                        "Solar",
                        "UV",
                        "Beitrag",
                        "Bemerkung",
                        "Weg"
                    ]
                }
            } else {
                newVersicherte = JSON.parse(data);
            }



            const index = newVersicherte.data.findIndex(v => v.GARTENNUMMER === gartennummer)

            if (index === -1) {
                newVersicherte.data.push(req.body);
            } else {
                newVersicherte.data[index] = req.body;
            }

            fs.writeFile(theMoreVsPath, JSON.stringify(newVersicherte), function (err) {
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