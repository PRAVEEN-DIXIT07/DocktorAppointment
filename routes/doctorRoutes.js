const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
    getDoctorInfoController,
    updateProfileController,
    getDoctorByIdController,
    doctorAppointmentsController,
    updateStatusController
} = require('../controllers/doctorCtrl');

const router = express.Router();

//post single doctor info
router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController);

//post update profile
router.post('/updateProfile', authMiddleware, updateProfileController);

//POST get single doc info for booking page

router.post('/getDoctorById', authMiddleware, getDoctorByIdController);

//get appointments

router.get('/doctor-appointments', authMiddleware, doctorAppointmentsController);


//Post update appointment status
router.post('/update-status', authMiddleware, updateStatusController);
module.exports = router;
