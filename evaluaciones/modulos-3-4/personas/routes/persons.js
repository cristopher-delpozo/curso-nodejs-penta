var express = require('express');
var router = express.Router();
const { Connection, Request } = require('tedious');
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
        trustServerCertificate: true
    }
};

router.get('/', function (req, res, next) {
    const connection = new Connection(configBD);

    connection.on('connect', async (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error connecting to the database');
            return;
        }

        try {
            const sql = `SELECT BusinessEntityID, PersonType, NameStyle, Title, FirstName, MiddleName, LastName, EmailPromotion FROM Person.Person`;
            const result = await executeQuery(connection, sql, []);
            res.status(200).json(result);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Error executing the query');
        } finally {
            connection.close();
        }
    });

    connection.connect();
});

router.post('/', function (req, res, next) {
    const { BusinessEntityID, PersonType, NameStyle, Title, FirstName, MiddleName, LastName, EmailPromotion } = req.body;

    const connection = new Connection(configBD);

    connection.on('connect', async (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error connecting to the database');
            return;
        }

        try {
            const sql = `INSERT INTO Person.Person (BusinessEntityID, PersonType, NameStyle, Title, FirstName, MiddleName, LastName, EmailPromotion) VALUES (${BusinessEntityID}, '${PersonType}', ${NameStyle ? 1 : 0}, '${Title}', '${FirstName}', '${MiddleName}', '${LastName}', ${EmailPromotion})`;
            await executeSql(connection, sql);
            res.status(200).send('Insert successful');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Error executing the query');
        } finally {
            connection.close();
        }
    });

    connection.connect();
});

function executeSql(connection, sql) {
    return new Promise((resolve, reject) => {
        const request = new Request(sql, (err) => {
            if (err) {
                reject(err);
                return;
            }
        });

        request.on('requestCompleted', () => {
            resolve();
        });

        connection.execSql(request);
    });
}

function executeQuery(connection, sql, parameters) {
    return new Promise((resolve, reject) => {
        const request = new Request(sql, (err, rowCount) => {
            if (err) {
                reject(err);
                return;
            }
        });

        const result = [];
        request.on('row', (columns) => {
            const row = {};
            columns.forEach((column) => {
                row[column.metadata.colName] = column.value;
            });
            result.push(row);
        });

        parameters.forEach((parameter) => {
            request.addParameter(parameter.name, parameter.type, parameter.value);
        });

        request.on('requestCompleted', () => {
            resolve(result);
        });

        connection.execSql(request);
    });
}

module.exports = router;
