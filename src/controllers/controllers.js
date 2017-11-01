const model = require('../models/models')

function getAll (req, res, next) {
    const result = model.getAll()
    res.status(200).json({ data: result })
}

function create (req, res, next) {
    const result = model.create(req.body)
    if (result.errors) return next(result.errors)
    res.status(201).json({ data: result })
}

function deleteOne (req, res, next) {
    const result = model.deleteOne(req.params.id)
    if (result.errors) return next(result.errors)
    res.status(201).json({ data: result })
}

function editOne (req, res, next) {
    const result = model.editOne(req.body, req.params.id)
    if (result.errors) return next(result.errors)
    res.status(201).json({ data: result })
}

module.exports = { getAll, create, deleteOne, editOne }