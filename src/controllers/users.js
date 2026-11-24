import bcrypt from 'bcrypt';
import { authenticateUser, createUser } from '../models/users.js';


const showUserRegistrationForm = async (req, res) => {
    const title = 'Register'
    res.render('register', { title });
}

const processNewUserForm = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const userId = await createUser(name, email, passwordHash);

        req.flash('success', 'Registration successful! Now please log in.');
        res.redirect('/');
    } catch (error) {
        console.error(`Error registering user: ${name}`, error);
        req.flash('error', 'An error occurred during registration. Please try again or contact support.');
        res.redirect('/register');
    }
};

const showLoginForm = async (req, res) => {
    const title = 'Login'
    res.render('login', { title });
}

const processLoginForm = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await authenticateUser(email, password)
        if (user) {
            req.session.user = user;
            req.flash('success', 'User successfully logged in.')
            if (res.locals.NODE_ENV === 'developement') {
                console.log(`User: ${user.userId} with name ${user.name} logged in and added to session.`);
            }

            res.redirect('/dashboard')
        } else {
            req.flash('error', 'Unable to login, invalid email or password');
            res.redirect('/login')
        }

    } catch (error) {
        console.error('Error durign login:', error);
        req.flash('error', 'An error ocurred during login. Please try again');
        res.redirect('/login')
    }
};

const processLogout = async (req, res) => {
    if (req.session.user) {
        delete req.session.user;
    }

    req.flash('success', "You have successfully logged out.")
    res.redirect('/login')
};

const requireLogin = (req, res, next) => {
    if (req.session?.user) {
        next();
    } else {
        req.flash('error', 'You must be logged in to access that page. Please login again')
        res.redirect('/login')
    }
}

const showDashboard = async (req, res) => {
    const user = req.session.user;
    const title = 'Dashboard';

    res.render('dashboard', { title, name: user.name, email: user.email });
}

export { showUserRegistrationForm, processNewUserForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard }
