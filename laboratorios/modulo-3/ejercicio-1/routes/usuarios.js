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
        encrypt: true,
        trustServerCertificate: true
    }
};

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('crear-usuario', { title: 'Crear Usuario', resultMessage: '' });
});

router.post('/', function (req, res, next) {
    const { username, password } = req.body;

    const connection = new Connection(configBD);

    connection.on('connect', (err) => {
        if (err) {
            console.error(`Connection error: ${err}`);
            res.render('crear-usuario', { title: 'Crear Usuario', resultMessage: 'Error connecting to the database' });
            connection.close();
            return;
        }

        const query = `INSERT INTO coredeclientes (username, clave) VALUES ('${username}', '${password}')`;

        const request = new Request(query, (err) => {
            if (err) {
                console.error(`Request error: ${err}`);
                res.render('crear-usuario', { title: 'Crear Usuario', resultMessage: 'Error executing the query' });
                connection.close(); 
                return;
            }
        });

        request.on('requestCompleted', () => {
            res.render('crear-usuario', { title: 'Crear Usuario', resultMessage: 'Usuario creado exitosamente' });
            connection.close(); 
        });

        connection.execSql(request);
    });

    connection.connect();
});

module.exports = router;
