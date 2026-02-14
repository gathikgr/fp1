const User = require('../models/User');

const updateProfile = async (req, res) => {
  try {
    const { name, department, position } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.department = department || user.department;
    user.position = position || user.position;

    if (req.file) {
      user.profilePic = `/uploads/${req.file.filename}`;
    }

    await user.save();

    return res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        department: user.department,
        position: user.position,
        profilePic: user.profilePic
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMyProfile = async (req, res) => {
  return res.status(200).json(req.user);
};

const getAllLecturers = async (_, res) => {
  try {
    const lecturers = await User.find({ role: 'lecturer' }).select('-password');
    return res.status(200).json(lecturers);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getLecturerById = async (req, res) => {
  try {
    const lecturer = await User.findOne({ _id: req.params.id, role: 'lecturer' }).select('-password');
    if (!lecturer) {
      return res.status(404).json({ message: 'Lecturer not found' });
    }
    return res.status(200).json(lecturer);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { updateProfile, getMyProfile, getAllLecturers, getLecturerById };
