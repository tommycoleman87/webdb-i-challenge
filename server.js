const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/accounts', (req, res) => {
    db.select('*').from('accounts').then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.post('/accounts', (req, res) => {
    const account = req.body;
    db('accounts').insert({name: account.name, budget: account.budget})
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.put('/accounts/:id', (req, res) => {
    const id = req.params.id;
    const account = req.body;
    db('accounts').where({id: id}).update({name: account.name, budget: account.budget})
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.delete('/accounts/:id', (req, res) => {
    const id = req.params.id;
    db('accounts').where({id: id}).del()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json(result)
    })
})
module.exports = server;