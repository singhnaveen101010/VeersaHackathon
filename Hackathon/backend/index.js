const express = require('express');
const dotenv = require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const appointmentRoutes = require('./routes/appointmentRoute');


const { errorHandler } = require('./middleware/errorMiddleware');
const cp = require('cookie-parser');
const bp = require('body-parser');
const cors = require('cors');

const { protect } = require('./middleware/authMiddleware');
const connectDB = require('./config/db');

connectDB();

const dev = process.env.NODE_ENV !== 'production'


  const app = express();    


  app.use(express.json());
  
  app.use(cp());
  app.use(bp.urlencoded({extended:false}))
  app.use(express.static("public"))
  app.use(cors({origin:"http://localhost:3000",credentials:true}));


  app.get("/auth/isLoggedin",protect,(req,res)=>{
    return res.json({"success":true,"message":req.user})
  });

  app.use('/api/users', userRoutes);
  app.use('/api/appointments', appointmentRoutes);
  app.use('/api/messages', messageRoutes);


  // Error handling middleware
  app.use(errorHandler);


  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})