require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
// const pollRoutes = require('./routes/pollRoutes');
const tenantRoutes = require('./routes/tenants');
const loginRoutes = require('./routes/login');
const inviteRoutes = require('./routes/invites');
const userRoutes = require('./routes/users');
// const tenantMiddleware = require('./middleware/tenantMiddleware');

const app = express();
app.use(express.json());
connectDB();

// app.use(tenantMiddleware); // Injects tenant info
// app.use('/polls', pollRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api', loginRoutes);
app.use('/api/invites', inviteRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
