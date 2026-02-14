require('dotenv').config();
const bcrypt = require('bcrypt');
const connectDB = require('../config/db');
const User = require('../models/User');
const Payslip = require('../models/Payslip');

const seed = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Payslip.deleteMany({});

    const hashedPassword = await bcrypt.hash('Password@123', 10);

    const admin = await User.create({
      name: 'Portal Admin',
      email: 'admin@vnrvjiet.in',
      password: hashedPassword,
      role: 'admin'
    });

    const lecturer = await User.create({
      name: 'Dr. Ravi Kumar',
      email: 'lecturer@vnrvjiet.in',
      password: hashedPassword,
      role: 'lecturer',
      department: 'Computer Science',
      position: 'Professor of Practice'
    });

    await Payslip.insertMany([
      {
        userId: lecturer._id,
        month: 'July',
        year: 2026,
        baseSalary: 90000,
        allowances: 10000,
        deductions: 5000,
        netSalary: 95000
      },
      {
        userId: lecturer._id,
        month: 'August',
        year: 2026,
        baseSalary: 90000,
        allowances: 12000,
        deductions: 4000,
        netSalary: 98000
      }
    ]);

    console.log('Dummy data seeded successfully');
    console.log('Admin:', admin.email, 'Password: Password@123');
    console.log('Lecturer:', lecturer.email, 'Password: Password@123');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
