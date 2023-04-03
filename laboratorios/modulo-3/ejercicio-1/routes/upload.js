const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  res.render('upload', { title: 'Subir archivo' });
});

router.post('/', upload.single('archivo'), (req, res) => {
  res.send('Archivo subido exitosamente');
});

module.exports = router;