const { Router } = require('express');
// const countriesroot = require('./middleware/countriesroot.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', countriesroot);


module.exports = router;
