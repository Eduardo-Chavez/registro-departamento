const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add');
});

/*Para insertar los datos en la tabla departamento*/
router.post('/add', async (req, res) => {
    const { descripcion, planta, fechaConstruccion } = req.body;
    const newLink = {
        descripcion,
        planta,
        fechaConstruccion
    };
    await pool.query('INSERT INTO departamento set ?', [newLink]);
    req.flash('success', 'Departamento guardado correctamente.');
    res.redirect('/links');
});

/*Para mostrar la informacion de la tabla */
router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM departamento');
    res.render('links/list', {links});
});

/*Eliminar departamento*/
router.get('/delete/:cveDepartamento', async (req, res) => {
    const { cveDepartamento } = req.params;
    req.flash('success', 'Se elemino por completo el Departamento');
    await pool.query('DELETE FROM departamento WHERE cveDepartamento = ?', [cveDepartamento]);
    res.redirect('/links');
});

/*Para editar los registros*/
router.get('/edit/:cveDepartamento', async (req, res) => {
    const { cveDepartamento } = req.params;
    const links = await pool.query('SELECT * FROM departamento Where cveDepartamento = ?', [cveDepartamento]);
    res.render('links/edit', {link: links[0]})
});

router.post('/edit/:cveDepartamento', async (req, res) => {
    const { cveDepartamento } = req.params;
    const { descripcion, planta, fechaConstruccion } = req.body;
    const newLink = {
        descripcion,
        planta,
        fechaConstruccion
    };
    req.flash('success', 'Se actualizo correctamente el Departamento.');
    await pool.query('UPDATE departamento set ? WHERE cveDepartamento = ?', [newLink, cveDepartamento]);
    res.redirect('/links');
});

module.exports = router;