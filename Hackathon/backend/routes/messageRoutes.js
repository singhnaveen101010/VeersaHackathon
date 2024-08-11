const express = require('express')
const router = express.Router()
const {createMessage,getMessagesOfUser} = require('../controllers/messageController.js')


const multer = require('multer')
const { canChat } = require('../controllers/messageController.js')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/files')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user._id}${file.originalname}${new Date().getHours()}`)
  }
})

const upload = multer({ storage: storage })

router.post('/create-message', upload.single('file'),createMessage)
router.post('/getMessagesOfUser', getMessagesOfUser)
router.post('/canChat', canChat)



module.exports = router
