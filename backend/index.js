const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const storeOwnerRoutes = require('./routes/storeOwner');
const User = require('./models/User'); // <-- 1. IMPORT USER MODEL

dotenv.config();

// Initialize server and connect to database
connectDB();
// --- 2. ADD ADMIN SEEDING FUNCTION ---
const seedAdmin = async () => {
    try {
        const adminEmail = 'admin@gmail.com';
        const adminExists = await User.findOne({ email: adminEmail });

        if (!adminExists) {
            const newAdmin = new User({
                name: 'System Admin',
                email: 'admin@gmail.com',
                password: 'Admin123@', // Your model will hash this automatically before saving
                role: 'System Administrator',
            });
            await newAdmin.save();
            console.log('Default admin user created successfully.');
        } else {
            console.log('Default admin user already exists.');
        }
    } catch (error) {
        console.error('Error creating admin user:', error.message);
    }
};

// Call the seeding function after the DB connection is established.
// It's good practice to give the connection a moment to establish.
setTimeout(seedAdmin, 2000); 
// --- END OF NEW SECTION ---


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/store-owner', storeOwnerRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
