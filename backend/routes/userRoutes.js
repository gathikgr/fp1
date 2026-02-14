const express = require('express');
const {
  updateProfile,
  getMyProfile,
  getAllLecturers,
  getLecturerById
} = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/me', protect, getMyProfile);
router.put('/profile', protect, upload.single('profilePic'), updateProfile);

router.get('/lecturers', protect, authorizeRoles('admin'), getAllLecturers);
router.get('/lecturers/:id', protect, authorizeRoles('admin'), getLecturerById);

module.exports = router;
