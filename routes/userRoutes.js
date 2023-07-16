const express = require('express');
const {
    loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllDoctorsController,
    bookAppointmentController,
    bookingAvailabilityController,
    userAppointmentsController
} = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router()
//routes
//Login || post
router.post('/login', loginController)

//Register || post
router.post('/register', registerController);

//AUTH || POST
router.post('/getUserData', authMiddleware, authController)

//APPLY DOCTOR
router.post('/apply-doctor', authMiddleware, applyDoctorController)

//Notification
router.post('/get-all-notification', authMiddleware, getAllNotificationController)

router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController)

// get all doc for appointments
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);

//Book appointments
router.post('/book-appointment', authMiddleware, bookAppointmentController);

//Booking Availability
router.post('/booking-availability', authMiddleware, bookingAvailabilityController);

//appointment list

router.get('/user-appointments', authMiddleware, userAppointmentsController);
module.exports = router;
