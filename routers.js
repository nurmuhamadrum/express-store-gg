const express = require('express')
const { ObjectID } = require('mongodb')
const router = express.Router()
const connection = require('./connection')

/**
 * Get User method
 */
router.get('/users', async (req, res) => {
    try {
        if (connection.connect()) {
            const db = connection.db('db_latihan')
            const users = await db.collection('users').find().toArray()

            res.send({ data: users })
        } else {
            res.send({ message: 'connection database failed' })
        }
    } catch (error) {
        res.send({ message: error.message || 'internal server error' })
    }
})

/**
 * Add User method
 */
router.post('/users', async (req, res) => {
    try {
        if (connection.connect()) {
            const { name, age, status } = req.body
            const db = connection.db('db_latihan')

            const user = await db.collection('users').insertOne({
                name,
                age,
                status
            })

            if (user.insertedId) {
                res.send({ message: 'successfuly add data' })
            } else {
                res.send({ message: 'failed to add data' })
            }

        } else {
            res.send({ message: 'connection database failed' })
        }
    } catch (error) {
        res.send({ message: error.message || 'internal server error' })
    }
})


/**
 * Updated User method
 */
router.put('/users/:id', async (req, res) => {
    try {
        if (connection.connect()) {
            const { id } = req.params
            const { name, age, status } = req.body
            const db = connection.db('db_latihan')

            const user = await db.collection('users').updateOne({ _id: ObjectID(id) }, {
                $set: {
                    name,
                    age,
                    status
                }
            })

            if (user.modifiedCount === 1) {
                res.send({ message: 'successfuly updated data' })
            } else {
                res.send({ message: 'failed updated data' })
            }
        } else {
            res.send({ message: 'connection database failed' })
        }
    } catch (error) {
        res.send({ message: error.message || 'internal server error' })
    }
})


/**
 * Delete User method
 */
router.delete('/users/:id', async (req, res) => {
    try {
        if (connection.connect()) {
            const { id } = req.params
            const db = connection.db('db_latihan')

            const user = await db.collection('users').deleteOne({ _id: ObjectID(id) })

            if (user.deletedCount === 1) {
                res.send({ message: 'successfuly deleted data' })
            } else {
                res.send({ message: 'failed deleted data' })
            }
        } else {
            res.send({ message: 'connection database failed' })
        }
    } catch (error) {
        res.send({ message: error.message || 'internal server error' })
    }
})

module.exports = router