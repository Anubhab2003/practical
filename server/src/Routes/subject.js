import express from 'express';
import Subject from '../models/subject.js';
import { isLoggedIn } from '../middleware/index.js';

const router = express.Router();

// INDEX
router.get('/', isLoggedIn, async (req, res) => {
    const subjects = await Subject.find({});
    res.render('subjects/index', { subjects });
});

// NEW
router.get('/new', isLoggedIn, (req, res) => {
    res.render('subjects/new');
});

// CREATE
router.post('/', isLoggedIn, async (req, res) => {
    const { subjectName, subjectCode, facultyName, department } = req.body;
    const subject = new Subject({ subjectName, subjectCode, facultyName, department });
    await subject.save();
    res.redirect('/subjects');
});

// SHOW
router.get('/:id', isLoggedIn, async (req, res) => {
    const subject = await Subject.findById(req.params.id);
    res.render('subjects/show', { subject });
});

// EDIT
router.get('/:id/edit', isLoggedIn, async (req, res) => {
    const subject = await Subject.findById(req.params.id);
    res.render('subjects/edit', { subject });
});

// UPDATE
router.post('/:id', isLoggedIn, async (req, res) => {
    const { subjectCode, facultyName, department } = req.body;
    await Subject.findByIdAndUpdate(req.params.id, { subjectCode, facultyName, department });
    res.redirect('/subjects');
});

// DELETE
router.post('/:id/delete', isLoggedIn, async (req, res) => {
    await Subject.findByIdAndDelete(req.params.id);
    res.redirect('/subjects');
});

export default router;
