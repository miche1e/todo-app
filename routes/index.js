const express = require('express');
const { database } = require('../db');
const router = express.Router();
const db = require('../db');

//GET
router.get('/', async (req, res, next) => {
    try {
        const results = await db.query('SELECT * FROM todo');
        return res.status(200).json(results.rows);
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

//GET :id
router.get('/:id', async (req, res, next) => {
    try {
        const results = await db.query('SELECT * FROM todo WHERE id=$1', [req.params.id]);
        if(!results.rows.length){
            return res.status(404).json({message: `Element #${req.params.id} doesn't exist`});
        }
        return res.status(200).json(results.rows);
    } catch (err) {
        return next(err);
    }
});

//POST
router.post('/', async (req, res, next) => {
    try {
        if(!req.body.description){
            return res.status(400).json({message: "You have to pass a description"});
        }
        const results = await db.query('INSERT INTO todo (description, date) VALUES ($1, $2) RETURNING *', [
            req.body.description, new Date().toISOString()
        ]);
        return res.status(200).json(results.rows);
    } catch (err) {
        return next(err);
    }
});

//PATCH
router.patch('/:id', async (req, res, next) => {
    try {
        if(!req.body.description){
            return res.status(400).json({message: "You have to pass a description"});
        }
        const results = await db.query('UPDATE todo SET description=$1 WHERE id=$2 RETURNING *', [
            req.body.description, req.params.id
        ]);
        if(!results.rows.length){
            return res.status(404).json({message: `Element #${req.params.id} doesn't exist`});
        }
        return res.status(200).json(results.rows);
    } catch (err) {
        return next(err);
    }
});

//DELETE
router.delete('/:id', async (req, res, next) => {
    try {
        if(!req.body.description){
            return res.status(400).json({message: "You have to pass a description"});
        }
        const results = await db.query('DELETE FROM todo WHERE id=$1 RETURNING *', [req.params.id]);
        if(!results.rows.length){
            return res.status(404).json({message: `Element #${req.params.id} doesn't exist`});
        }
        return res.status(200).json({message: 'Deleted', element: results.rows});
    } catch (err) {
        return next(err);
    }
});

module.exports = router;