const bcrypt = require('bcryptjs');
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const loadClient = require('../config/redis')


const Producer = require("../producer")
const producer = new Producer()

module.exports = {
    register: async(req, res) => {
        try {
            const { email, password: unhashed } = req.body;
            // console.log(email, unhashed)

            // Checking if the user is already in ghe database
            const emailExist = await User.findOne({email: email});
            if(emailExist) 
                return res.status(400).json('Email already exists');
        
            // Hash the password
            const salt = bcrypt.genSaltSync(10);
            const password = await bcrypt.hashSync(unhashed, salt);
        
            // Store user data in Redis
            const user = await User.create({...req.body, password })

            // BROADCAST DATA
            await producer.publishMessage('', user)

            res.send(user);

          } catch (error) {
            console.error('User registration error:', error);
            res.status(500).send('Internal server error');
          }
    },

    login: async(req, res) => {
      try {
        const { email, password } = req.body
        const user = await User.findOne({email});
        // console.log(email, user)
        if(!user) return res.status(400).send("Credentials do not exists, please try again.");
        
        // Password Check
        const validPass = await bcrypt.compare(password, user.password);
        if(!validPass) return res.status(400).send('Credentials do not exists, please try again.');

        // Generate Access Token
        const tokenData = {
          _id: user._id, 
          name: user.name, 
          email: user.email,
          role: user.role
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        // Connect To Redis
        const client = await loadClient()

        // Store the token in Redis with an expiration time
        client.setEx(token, 3600, JSON.stringify(tokenData));
    
        res.header('auth-token', token).send(token);
      }catch(err) {
          console.log(err)
          return res.status(500).send('An error occured')
      }
    },

    userMe: async(req, res, next) => {
      const authorization = req.header("Authorization");
      const token = authorization?.split(' ')[1];

      if(!token) return res.status(400).send('Access Denied');

      try {
          // Connect to Redis
          const client = await loadClient()
          const value = await client.get(token);
          if(!value)  return res.status(401).json({ error: 'Invalid token' });

          const verified = jwt.verify(token, process.env.TOKEN_SECRET);
          req.user = verified
          res.header('Authorization', token).json({user: verified});
          // next()
      }catch(err) {
        console.log(err)
          res.status(500).send('Invalid token');
      }
  },
}