const appointmentModel = require('../models/appointmentModel');
const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModels');
const getDoctorInfoController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId })
        res.status(200).send({
            success: true,
            message: 'doctor details fetched successfully',
            data: doctor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error in fetching doctor details',
        })
    }
}

const updateProfileController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({ userId: req.body.userId }, req.body)
        res.status(200).send({
            success: true,
            message: 'doctor profile updated',
            data: doctor,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'doctor profile update issue',
            error,
        })
    }
}

// for booking page
const getDoctorByIdController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ _id: req.body.doctorId })
        res.status(200).send({
            success: true,
            message: 'Single doctor info fetched',
            data: doctor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in single doctor info for booking page',
            error,
        })
    }
}
const doctorAppointmentsController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId });
        const appointments = await appointmentModel.find({ doctorId: doctor._id, });
        res.status(200).send({
            success: true,
            message: 'appointment list fetched successfully',
            data: appointments,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while fetching appointment list',
            error,
        });
    }
}

const updateStatusController = async (req, res) => {
    try {
        const { appointmentsId, status } = req.body
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId, { status })
        const user = await userModel.findOne({ _id: appointments.userId });
        const notification = user.notification
        notification.push({
            type: 'status-update',
            message: `your appointment status has been updated ${status}`,
            onClickPath: '/doctor-appointments'
        });
        await user.save();
        res.status(200).send({
            success: true,
            message: 'appointment status updated',

        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while updating status',
            error,
        });
    }
}
module.exports = {
    getDoctorInfoController,
    updateProfileController,
    getDoctorByIdController,
    doctorAppointmentsController,
    updateStatusController
}
