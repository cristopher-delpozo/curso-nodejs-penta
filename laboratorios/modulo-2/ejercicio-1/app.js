const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('Hola Mundo!');
});

app.listen(port, () => {
    console.log(`Servidor levantado en el puerto ${port}`);
});
