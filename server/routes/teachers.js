const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const teacher = require('../controllers/teachers');
const router = express.Router();

router.route('/login')
    .get(teacher.login);

router.route('/course/:id')
    .get(verifyJWT, teacher.findCoursesByTeacherId);

router.route('/:id')
    .get(verifyJWT, teacher.findById)
    .delete(verifyJWT, teacher.delete);

router.route('/')
    .get(teacher.findAll)
    .post(teacher.register)
    .put(verifyJWT, teacher.update)

module.exports = router;