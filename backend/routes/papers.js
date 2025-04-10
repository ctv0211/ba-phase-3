const express = require('express')
const {
    getPapers,
    getPaperById,
    createPaper,
    deletePaperById,
    deleteAllPapers,
    updatePaperById
} = require('../controllers/paperController')

const router = express.Router()

// Dieser router hat als Präfix /api/papers (siehe server.js)

// GET all papers
router.get('/', getPapers)

// GET paper by id
router.get('/:id', getPaperById)

// POST new paper
router.post('/', createPaper)

// DELETE paper by id
router.delete('/:id', deletePaperById)

// DELETE all papers
router.delete('/', deleteAllPapers)

// UPDATE paper by id
router.patch('/:id', updatePaperById)

module.exports = router