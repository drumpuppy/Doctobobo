// routes.js
const express = require('express');
const router = express.Router();

// Import controllers
const authController = require('../controllers/authController');
const appointmentController = require('../controllers/appointmentsController');
const userController = require('../controllers/userController');
const doctorController = require('../controllers/doctorController');
const prescriptionController = require('../controllers/prescriptionController');

// Auth routes
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/register', authController.register);

// Appointment routes
router.post('/book-appointment', appointmentController.bookAppointment);
router.get('/appointments', appointmentController.getAppointments);
router.post('/cancel-appointment', appointmentController.cancelAppointment);
router.get('/available-slots', appointmentController.getAvailableSlots);

// User routes
router.get('/user-data', userController.getUserData);
router.post('/update-user-info', userController.updateUserInfo);

// Doctor search
router.get('/search-doctor', doctorController.searchDoctor);
router.get('/search-result', doctorController.getSearchResult);

// Prescription routes
router.post('/add-prescription', prescriptionController.addPrescription);
router.post('/update-prescription', prescriptionController.updatePrescription);

module.exports = router;
