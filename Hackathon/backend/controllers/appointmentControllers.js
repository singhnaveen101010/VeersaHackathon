const Appointment = require('../models/appointment'); // Assuming your schema is in this file
const User = require('../models/user'); // Assuming you have a User model
const crypto=require('crypto');
const axios=require('axios');

const createPayement=async(req,res)=>{

  const { patientId, doctorId, slot,date } = req.body;
console.log(process.env.MERCH_ID_TEST_PHONE_PAY)
console.log(process.env.SALT_KEY_TEST_PHONE_PAY)
console.log(process.env.SALT_INDEX_PHONEPAY_TEST)
    
  // Validate required fields
  if (!patientId || !doctorId || !slot || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if patient and doctor exist
  const patient = await User.findById(patientId);
  const doctor = await User.findById(doctorId);

  if (!patient || !doctor) {
    return res.status(404).json({ message: 'Patient or Doctor not found' });
  }
   
  let app=await Appointment.findOne({date:date,slot:slot,doctorId:doctorId});
  if(app){
    return res.status(200).json({success:false,message:"Slot already booked !"})
  }

  let merchantTransactionId="TMID"+new Date()+Math.floor(Math.random()*1000); 
  let data={
    name:patient.name,
    amount:doctor.appointmentCharge*100,
    merchantId:process.env.MERCH_ID_TEST_PHONE_PAY,
    merchantTransactionId:merchantTransactionId,
    redirectUrl:`http://localhost:8000/api/appointments/payement-status/${merchantTransactionId}`,
    redirectMode:'POST',
    paymentInstrument:{
      type:'PAY_PAGE'
    }
  }
  const  payload=JSON.stringify(data);
  const payloadMain=Buffer.from(payload).toString('base64');
  const keyIndex=1
  const str=payloadMain+'/pg/v1/pay'+process.env.SALT_KEY_TEST_PHONE_PAY
  const sha256=crypto.createHash('sha256').update(str).digest('hex');
  const checkSum=sha256+'###'+keyIndex;

  const phonePay_url='https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay'

  const options = {
    method: 'post',
    url: phonePay_url,
    headers: {
          accept: 'text/plain',
          'Content-Type': 'application/json',
          'X-VERIFY': checkSum
          },
  data: {
    request:payloadMain
  }
  };
  axios
  .request(options)
      .then(function (response) {
      console.log(response.data);
      return res.redirect(response.data.data.instrumentResponse.redirectInfo.url)
  })
  .catch(function (error) {
      console.error(error.message);
   return res.status(400).json({success:false,message:"Something went wrong !"})
  });

}
const checkPayementStatus=async(req,res)=>{
  const {transactionId,merchantId}=res.req.body;
  const keyIndex=1
  const str=`/pg/v1/status/${merchantId}/${transactionId}`+process.env.SALT_KEY
  const sha256=crypto.createHash('sha256').update(str).digest('hex');
  const checkSum=sha256+'###'+keyIndex;

let phonePay_url=`https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`
  const options = {
    method: 'GET',
    url: phonePay_url,
    headers: {
          accept:'application/json',
          'Content-Type': 'application/json',
          'X-VERIFY': checkSum,
          'X-MERCHANT-ID':merchantId
          },
  };
  axios
  .request(options)
      .then(function (response) {
      console.log(response.data);
      if(response.data.success==true){
        let SUCC_URL='http://localhost:3000/payemnt/success'
        return res.redirect(SUCC_URL)
      }else{
        let FAIL_URL='http://localhost:3000/payemnt/fail'
        return res.redirect(FAIL_URL)
      }
      return res.status(200).json({success:true,message:response.data})
  })
  .catch(function (error) {
      console.error(error);
   return res.status(400).json({success:false,message:"Something went wrong !"})
  });
}
// Create an appointment
const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, slot,date } = req.body;
console.log(req.body)
        
      // Validate required fields
      if (!patientId || !doctorId || !slot || !date) {
        return res.status(400).json({ message: 'All fields are required' });
      }
    
      // Check if patient and doctor exist
      const patient = await User.findById(patientId);
      const doctor = await User.findById(doctorId);
    
      if (!patient || !doctor) {
        return res.status(404).json({ message: 'Patient or Doctor not found' });
      }
       
      let app=await Appointment.findOne({date:date,slot:slot,doctorId:doctorId});
      if(app){
        return res.status(200).json({success:false,message:"Slot already booked !"})
      }
    // Create new appointment
    const newAppointment = new Appointment({
      patientId,
      doctorId,
      date,
      slot,
    });

    // Save appointment to the database
    await newAppointment.save();

    res.status(200).json({
      success:true,
      message: 'Appointment created successfully',
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(400).json({success:false, message: 'something went wrong !' });
  }
};

// Get all appointments of a user (patient or doctor)
const getAppointmentsOfUser = async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Find all appointments where the user is either the patient or doctor
    const appointments = await Appointment.find({
      $or: [{ patientId: userId }, { doctorId: userId }],
    })
      .populate('patientId', 'name email') // Replace 'name email' with fields you want to populate
      .populate('doctorId', 'name email');

    res.status(200).json({
      success:true,
      message:appointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(200).json({success:false, message: 'Server error' });
  }
};

module.exports = {
  createAppointment,
  getAppointmentsOfUser,
  createPayement,
  checkPayementStatus
};
