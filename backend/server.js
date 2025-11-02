require('dotenv').config();
const express = require('express');
const cors = require('cors');
app.use(cors({
  origin: 'https://fullstack-telimedicine-frontend.onrender.com',
  credentials: true
}));

const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const hospitalRoutes = require('./routes/hospitals');
const appointmentRoutes = require('./routes/appointments');
const userRoutes = require('./routes/users');

const app = express();
connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// ✅ Route mounting
app.use('/api/auth', authRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', require('./routes/auth'));


const PORT = process.env.PORT || 5011;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
