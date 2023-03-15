const express = require('express');
const app = express();
const port = 9000;

app.get('/usuarios', (req, res) => {
    res.send('Listado de usuarios');
});
app.get('/clientes', (req, res) => {
    res.send('Listado de clientes');
});
app.post('/usuario', (req, res) => {
    res.send('Datos de usuario');
});
app.post('/cliente', (req, res) => {
    res.send('Datos de cliente');
});

app.listen(port, () => {
    console.log(`Servidor escuchando por el puerto ${port}`);
});
