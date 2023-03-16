const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const price = require('../controllers/prices');
const router = express.Router();

router.use(verifyJWT);

router.route('/')
    .get(price.findAll)
    .post(price.create)
    .put(price.update)

router.route('/:id')
    .get(price.findOne)
    .delete(price.delete);

router.route('/price')
    .get(price.findByPrice)

module.exports = router;