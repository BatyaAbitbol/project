const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const teacher = require('../controllers/teachers');
const router = express.Router();

router.route('/login')
    .get(teacher.login);

router.route('/:id')
    .delete(verifyJWT, teacher.delete);

router.route('/')
    .post(teacher.register)
    .put(verifyJWT, teacher.update)

module.exports = router;