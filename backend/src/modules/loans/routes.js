const express = require('express');
const {requireAuth} = require('../../middleware/auth');
const {listLoans, getLoan, createLoan, updateStatus} = require('./controller');

const router = express.Router();

router.use(requireAuth);
router.get('/', listLoans);
router.get('/:id',getLoan);
router.post('/', createLoan);
router.put('/:id/status', updateStatus);

module.exports = router;