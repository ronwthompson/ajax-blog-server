const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/controllers')

router.get('/', ctrl.getAll)
router.post('/', ctrl.create)
router.delete('/:id', ctrl.deleteOne)
router.put('/:id', ctrl.editOne)

module.exports = router