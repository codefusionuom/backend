const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
require('dotenv').config();
const passport = require('passport');

//imported files
const connectDatabase = require("./config/database/mongodbatlas");
// require('./config/google-auth')(passport);
require('./config/google-auth')
const grantAuth=require("./middleware/authmiddleware")

// Call the connectDatabase function and pass the startServer function as a callback
connectDatabase((err) => {
    if (err) {
        console.error("Error in connecting to the database:", err);
    } else {
        // Database connection successful, start the server
        startServer();
    }
});



app.use( session({ 
	secret: 'cookie_secret',
	name:   'kaas',
	store: null,
	proxy:  true,
    resave: true,
    saveUninitialized: true
}));


//common middlewares 
app.use(express.json());
app.use(passport.initialize());
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())


//test router
app.get('/test', (req, res) => res.send('Hello I am a dummy test router!'))
app.get('/testsucess', (req, res) => res.send('Hello I am a dummy test sucess router!'))

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ],failureRedirect: '/test', successRedirect: '/testsucess' }
),(req, res) => {
  console.log('Callback reached'); // Add this for debugging
});

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/testsucess',
    failureRedirect: '/test'
  }),
  (req, res) => {
    console.log('Callback reached'); // Add this for debugging
  });

const authRouter  = require("./routers/studioSide/authRouters");
app.use('/auth', authRouter);


app.get('/protected', passport.authenticate('jwt',{ session: false }),grantAuth,(req,res)=>{
  res.send('You have accessed a protected route!'); 
});

 
app.listen(process.env.PORT, () => console.log(`App started on port: ${process.env.PORT}`))