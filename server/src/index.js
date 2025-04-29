import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './db/db.js';
import User from './Models/user.model.js';
import authRoutes from './Routes/auth.js';
import subjectRoutes from './Routes/subjects.js';

// Setup
const app = express();

// __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(session({
    secret: 'notagoodsecret',
    resave: false,
    saveUninitialized: false
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to access current user
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// Routes
app.use('/', authRoutes);
app.use('/subjects', subjectRoutes);

// Home Route
app.get('/', (req, res) => {
    res.render('home');
});

// Connect Database and Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server started at http://localhost:${PORT}`);
    await connectDB();
});
