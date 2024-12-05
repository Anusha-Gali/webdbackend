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
const PORT = process.env.PORT || 5001;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/petlisting', petListingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/admin/users', adminUserRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));