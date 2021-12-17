require('./mongoose')
const express = require('express')
const router = express.Router()
const User = require('./User')

router.get('/users', async (req, res) => {
    try {
        const user = await User.find()

        res.send({ data: user })
    } catch (error) {
        res.send({ message: error.message || 'internal server error' })
    }
})

router.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findOne({ _id: id })

        if (user) {
            res.send({
                data: user
            })
        } else {
            res.send({ message: 'User not found' })
        }
    } catch (error) {
        res.send({ message: error.message || 'internal server error' })
    }
})

router.post('/users', async (req, res) => {
    try {
        const { name, age, status } = req.body
        const user = await User.create({
            name,
            age,
            status
        })

        res.send({
            data: user
        })

    } catch (error) {
        res.send({ message: error.message || 'internal server error' })
    }
})

router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, age, status } = req.body
        const user = await User.updateOne({ _id: id }, {
            name,
            age,
            status
        }, { runValidators: true })

        if (user) {
            res.send({
                data: user
            })
        } else {
            res.send({ message: 'User not found' })
        }

    } catch (error) {
        res.send({ message: error.message || 'internal server error' })
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.deleteOne({ _id: id })

        if (user) {
            res.send({
                data: user
            })
        } else {
            res.send({ message: 'User not found' })
        }

    } catch (error) {
        res.send({ message: error.message || 'internal server error' })
    }
})

module.exports = router