var express = require('express');
var router = express.Router();
const { Connection, Request, TYPES } = require('tedious');
const jwt = require('jsonwebtoken');
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

router.get('/', (req, res) => {
    res.render('login', { title: 'Iniciar sesión' });
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const connection = new Connection(configBD);

    connection.on('connect', async (err) => {
        if (err) {
            console.error(err.message);
            res.render('error', { message: 'Error connecting to the database', error: { status: 500, stack: err.stack } });
            return;
        }

        try {
            const findUserResults = await executeQuery(connection, 'SELECT username, clave FROM dbo.coredeclientes WHERE username = @username', [{ name: 'username', type: TYPES.VarChar, value: username }]);
            const user = findUserResults.find((u) => u.username === username);

            if (user && bcrypt.compareSync(password, user.clave)) {
                const token = jwt.sign({ name: user.username }, 'xyz', { expiresIn: '1h' });
                req.session.token = token;
                res.redirect('/usuarios');
            } else {
                res.status(401).send('Usuario o contraseña incorrecta');
            }
        } catch (err) {
            console.error(err.message);
            res.render('error', { message: 'Error executing the query', error: { status: 500, stack: err.stack } });
        } finally {
            connection.close();
        }
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
