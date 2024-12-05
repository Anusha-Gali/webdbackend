const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const petListingRoutes = require('./routes/petListing');
const path = require('path');
const userRoutes = require('./routes/user');
const statsRoutes = require('./routes/stats');
const adminUserRoutes = require('./routes/users'); 

dotenv.config();

const app = express();

app.use(express.json());

const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('MongoDB connected');
};

app.use(async (req, res, next) => {
    await connectDB();
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/petlisting', petListingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/admin/users', adminUserRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;
