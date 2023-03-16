const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const student = require('../controllers/students.js');
const router = express.Router();

router.route('/login')
    .get(student.login);

router.route('/:id')
    .delete(verifyJWT, student.delete)

router.route('/')
    .get(student.findAll) //? הרשאה רק למנהל המערכת - הכיצד
    .put(verifyJWT, student.update)
    .post(student.register);
    
module.exports = router;