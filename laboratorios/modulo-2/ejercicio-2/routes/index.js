var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    futbolistas = ['Cristiano Ronaldo', 'Leonel Messi', 'Neymar Junior'];
    res.render('index', { title: 'Futbolistas', datos: futbolistas });
});

module.exports = router;
