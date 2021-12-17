const express = require('express')
const router = express.Router()
const connection = require('./connection')

router.get('/users', async (req, res) => {
    try {
        if(connection.connect()) {
            const db = connection.db('db_latihan')
            const users = await db.collection('users').find().toArray()

            res.send({ data: users})
        } else {
            res.send({ message: 'connection database failed'})
        }
    } catch (error) {
        res.send({ message: error.message || 'internal server error'})
    }
})

module.exports = router