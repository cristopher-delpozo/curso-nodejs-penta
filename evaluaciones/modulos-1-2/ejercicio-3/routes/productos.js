var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    productos = [
        { codigo: 'P001', nombre: 'Laptop Lenovo ThinkPad', precio: 899.99 },
        { codigo: 'P002', nombre: 'Mouse inalámbrico Logitech MX Master 3', precio: 99.99 },
        { codigo: 'P003', nombre: 'Monitor gaming ASUS ROG Swift PG279QZ', precio: 699.99 },
        { codigo: 'P004', nombre: 'Teclado mecánico Corsair K95 RGB Platinum XT', precio: 199.99 },
        { codigo: 'P005', nombre: 'Auriculares inalámbricos Bose QuietComfort 35 II', precio: 299.99 },
        { codigo: 'P006', nombre: 'SSD Samsung 970 EVO Plus 1TB', precio: 229.99 },
        { codigo: 'P007', nombre: 'Tarjeta gráfica Nvidia GeForce RTX 3080', precio: 1099.99 },
        { codigo: 'P008', nombre: 'Procesador Intel Core i9-11900K', precio: 539.99 },
        { codigo: 'P009', nombre: 'Router inalámbrico ASUS RT-AX86U', precio: 249.99 },
        { codigo: 'P010', nombre: 'Impresora multifunción HP OfficeJet Pro 9025e', precio: 329.99 }
    ];
    res.render('productos', { title: 'Productos', productos: productos });
});

module.exports = router;
