var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    paises = [
        { nombre: 'Estados Unidos', habitantes: 331449281 },
        { nombre: 'China', habitantes: 1444216109 },
        { nombre: 'India', habitantes: 1393409038 },
        { nombre: 'Brasil', habitantes: 213993437 },
        { nombre: 'México', habitantes: 130222815 }
    ];
    res.render('paises', { title: 'Países', paises: paises });
});

module.exports = router;
