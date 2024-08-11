const express = require('express')
const router = express.Router()
const {authUser,registerUser,getUserProfile,updateUserProfile,logout,verifyEmail,forgetPassword,resetpassword, getAllPatients, getAllDoctors} = require('../controllers/userController.js')
const { protect } = require('../middleware/authMiddleware.js')



router.post('/register',registerUser)
router.post('/login', authUser)
router.post('/logout', protect, logout)
router.post('/verifyemail', verifyEmail)
router.post('/forgetpassword', forgetPassword)
router.post('/resetpassword', resetpassword)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

router.get('/getAllPatients', getAllPatients)
router.get('/getAllDoctors', getAllDoctors)

module.exports = router
