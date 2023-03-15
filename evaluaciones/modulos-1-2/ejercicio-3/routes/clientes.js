var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    clientes = [
        { rut: '12.345.678-9', nombre: 'Juan', apellidoPaterno: 'Pérez', apellidoMaterno: 'González', edad: 28 },
        { rut: '98.765.432-1', nombre: 'María', apellidoPaterno: 'Gómez', apellidoMaterno: 'López', edad: 35 },
        { rut: '76.543.210-8', nombre: 'Pedro', apellidoPaterno: 'Martínez', apellidoMaterno: 'Ramírez', edad: 42 },
        { rut: '11.223.344-5', nombre: 'Carla', apellidoPaterno: 'García', apellidoMaterno: 'Vásquez', edad: 25 },
        { rut: '33.445.556-2', nombre: 'Diego', apellidoPaterno: 'Hernández', apellidoMaterno: 'Rojas', edad: 39 }
    ];
    res.render('clientes', { title: 'Clientes', clientes: clientes });
});

module.exports = router;
