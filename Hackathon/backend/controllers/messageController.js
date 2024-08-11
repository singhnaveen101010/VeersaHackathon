const router = require('express').Router();
const Message = require('../models/message');
const Appointment = require('../models/appointment'); // Assuming your schema is in this file

// Create message
const createMessage = async (req, res) => {
  try {
    const { senderId, recieverId, text, sendername } = req.body;

    if (!senderId || !recieverId || !text || !sendername) {
      return res.status(400).json({ success: false, message: "Provide all details!" });
    }

    let file = '';
    if (req?.file && req?.file?.file) {
      file = `http://localhost:8000/public/files/${req.user._id}${req.file.file.originalName}${new Date().getHours()}`;
    }

    let obj;
    if (file != '') {
      obj = {
        members: [senderId, recieverId],
        text,
        sendername,
        file
      };
    } else {
      obj = {
        members: [senderId, recieverId],
        text,
        sendername,
      };
    }

    const mes = new Message(obj);
    const m = await mes.save();
    res.status(200).json({ success: true, message: m });
  } catch (e) {
    res.status(400).json({ success: false, message: "Some error occurred", error: e.message });
  }
};

// Get messages of user
const getMessagesOfUser = async (req, res) => {
  try {
    const m = await Message.find({ members: { $all: [req.id, req.body.reciever] } });
    res.status(200).json({ success: true, message: m });
  } catch (e) {
    res.status(400).json({ success: false, message: "Some error occurred", error: e.message });
  }
};

// Check if user can chat based on appointment status
const canChat = async (req, res) => {
  try {
    const { userId, doctorId } = req.body;

    if (!userId || !doctorId) {
      return res.status(400).json({ success: false, message: "User ID and Doctor ID are required" });
    }

    const currentDate = new Date();

    // Find an active appointment between the patient and doctor
    const activeAppointment = await Appointment.findOne({
      patientId: userId,
      doctorId: doctorId,
      startDate: { $lte: currentDate },
      endDate: { $gt: currentDate }
    });

    if (activeAppointment) {
      return res.status(200).json({ success: true, message: "User is allowed to chat" });
    } else {
      return res.status(403).json({ success: false, message: "No active appointment found, chat not allowed" });
    }
  } catch (e) {
    res.status(400).json({ success: false, message: "Some error occurred", error: e.message });
  }
};

module.exports = {
  createMessage,
  getMessagesOfUser,
  canChat, // Export the new controller
};
