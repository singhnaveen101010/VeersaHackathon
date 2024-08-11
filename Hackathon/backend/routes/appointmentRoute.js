const express = require('express')
const { createAppointment, getAppointmentsOfUser, createPayement, checkPayementStatus } = require('../controllers/appointmentControllers')
const router = express.Router()


router.post('/create-payement',createPayement)
router.post('/payement-status',checkPayementStatus)

router.post('/create-appointment',createAppointment)
router.post('/getAppointmentsOfUser',getAppointmentsOfUser)


module.exports = router
