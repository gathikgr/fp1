const express = require('express');
const {
  createPayslip,
  getMyPayslips,
  getMyLatestPayslip,
  getPayslipById,
  getPayslipsByLecturer
} = require('../controllers/payslipController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, authorizeRoles('admin'), createPayslip);

router.get('/me/latest', protect, authorizeRoles('lecturer'), getMyLatestPayslip);
router.get('/me', protect, authorizeRoles('lecturer'), getMyPayslips);

router.get('/lecturer/:userId', protect, authorizeRoles('admin'), getPayslipsByLecturer);
router.get('/:id', protect, getPayslipById);

module.exports = router;
