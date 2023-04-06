var express = require('express');
var router = express.Router();
const { Connection, Request } = require('tedious');
const bcrypt = require('bcrypt');
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

let usuarios = [];

/* GET home page. */
router.get('/', function (req, res, next) {
    const connection = new Connection(configBD);

    connection.on('connect', async (err) => {
        if (err) {
            console.error(err.message);
            res.render('error', { message: 'Error connecting to the database', error: { status: 500, stack: err.stack } });
            return;
        }

        try {
            const sql = `SELECT username, clave FROM dbo.coredeclientes`;
            usuarios = await executeQuery(connection, sql, []);
            res.render('crear-usuario', { title: 'Crear Usuario', usuarios: usuarios });
        } catch (err) {
            console.error(err.message);
            res.render('error', { message: 'Error executing the query', error: { status: 500, stack: err.stack } });
        } finally {
            connection.close();
        }
    });

    connection.connect();    
});

router.post('/', function (req, res, next) {
    const { username, password } = req.body;

    const connection = new Connection(configBD);

    connection.on('connect', (err) => {
        if (err) {
            console.error(`Connection error: ${err}`);
            res.render('crear-usuario', { title: 'Crear Usuario', resultMessage: 'Error connecting to the database', usuarios: usuarios });
            connection.close();
            return;
        }

        const query = `INSERT INTO coredeclientes (username, clave) VALUES ('${username}', '${bcrypt.hashSync(password, bcrypt.genSaltSync(10))}')`;

        const request = new Request(query, (err) => {
            if (err) {
                console.error(`Request error: ${err}`);
                res.render('crear-usuario', { title: 'Crear Usuario', resultMessage: 'Error executing the query', usuarios: usuarios });
                connection.close(); 
                return;
            }
        });

        request.on('requestCompleted', () => {
            res.render('crear-usuario', { title: 'Crear Usuario', resultMessage: 'Usuario creado exitosamente', usuarios: usuarios });
            connection.close(); 
        });

        connection.execSql(request);
    });

    connection.connect();
});

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
