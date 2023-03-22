var express = require('express');
var router = express.Router();
const tedious = require('tedious');
const configBD = {
    server: '10.7.0.13',
    authentication: {
        type: 'default',
        options: {
            userName: 'usr_prueba',
            password: 'Pf123456'
        }
    },
    options: {
        database: 'AdventureWorks2017',
        port: 64573,
        encrypt: true,
        trustServerCertificate: true
    }
};

router.post('/', function (req, res, next) {
    const connection = new tedious.Connection(configBD);

    connection.on('connect', (err) => {
        if (err) {
            console.error(err);
        } else {
            const request = new tedious.Request(`INSERT INTO coredeclientes (username, clave) VALUES (@username, @clave)`, (err, rowCount) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Registro insertado correctamente. Filas afectadas: ${rowCount}`);
                }
                connection.close();
            });

            request.addParameter('username', tedious.TYPES.VarChar, req.body.username);
            request.addParameter('clave', tedious.TYPES.VarChar, req.body.clave);

            connection.execSql(request);
        }
    });

    connection.on('error', (err) => {
        console.error(err);
        connection.close();
    });

    connection.connect();

    res.render('persons', {
        title: 'Persons',
        persons: [
            {
                BusinessEntityID: 1,
                PersonType: 'EM',
                NameStyle: false,
                FirstName: 'Ken',
                MiddleName: 'J',
                LastName: 'Sánchez',
                EmailPromotion: 0,
                Demographics: '<IndividualSurvey xmlns="http://schemas.microsoft.com/sqlserver/2004/07/adventure-works/IndividualSurvey"><TotalPurchaseYTD>0</TotalPurchaseYTD></IndividualSurvey>',
                rowguid: '92C4279F-1207-48A3-8448-4636514EB7E2',
                ModifiedDate: '2009-01-07T00:00:00'
            }
        ]
    });
});

router.get('/', (req, res) => {
    // Establecer la conexión a la base de datos
    const connection = new tedious.Connection(configBD);

    connection.on('connect', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error de conexión a la base de datos');
            connection.close();
        } else {
            const request = new tedious.Request('SELECT * FROM Person.Person', (err, rowCount, rows) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error al obtener los registros de la base de datos');
                } else {
                    // Renderizar la plantilla Jade con la información de la tabla Person
                    res.render('persons', { rows: rows })
                }

                connection.close();
            });

            // Recopilar los resultados de la consulta SELECT
            const rows = [];
            request.on('row', (columns) => {
                const row = {};
                columns.forEach((column) => {
                    row[column.metadata.colName] = column.value;
                });
                rows.push(row);
            });

            request.on('done', () => {
                connection.close();
            });

            connection.execSql(request);
        }
    });

    connection.on('error', (err) => {
        console.error(err);
        res.status(500).send('Error de conexión a la base de datos');
        connection.close();
    });

    connection.connect();
});

module.exports = router;
