const Payslip = require('../models/Payslip');
const User = require('../models/User');

const createPayslip = async (req, res) => {
  try {
    const { userId, month, year, baseSalary, allowances = 0, deductions = 0 } = req.body;

    const lecturer = await User.findOne({ _id: userId, role: 'lecturer' });
    if (!lecturer) {
      return res.status(404).json({ message: 'Lecturer not found' });
    }

    const netSalary = Number(baseSalary) + Number(allowances) - Number(deductions);

    const payslip = await Payslip.create({
      userId,
      month,
      year,
      baseSalary,
      allowances,
      deductions,
      netSalary
    });

    return res.status(201).json({ message: 'Payslip generated successfully', payslip });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMyPayslips = async (req, res) => {
  try {
    const payslips = await Payslip.find({ userId: req.user._id }).sort({ year: -1, createdAt: -1 });
    return res.status(200).json(payslips);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMyLatestPayslip = async (req, res) => {
  try {
    const latest = await Payslip.findOne({ userId: req.user._id }).sort({ year: -1, createdAt: -1 });
    return res.status(200).json(latest);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPayslipById = async (req, res) => {
  try {
    const payslip = await Payslip.findById(req.params.id).populate('userId', 'name department position email');

    if (!payslip) {
      return res.status(404).json({ message: 'Payslip not found' });
    }

    if (req.user.role === 'lecturer' && payslip.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    return res.status(200).json(payslip);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPayslipsByLecturer = async (req, res) => {
  try {
    const payslips = await Payslip.find({ userId: req.params.userId }).sort({ year: -1, createdAt: -1 });
    return res.status(200).json(payslips);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createPayslip,
  getMyPayslips,
  getMyLatestPayslip,
  getPayslipById,
  getPayslipsByLecturer
};
