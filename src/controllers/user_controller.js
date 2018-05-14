import dotenv from 'dotenv';
import jwt from 'jwt-simple';
import User from '../models/user_model';

dotenv.config({ silent: true });


export const signin = (req, res, next) => {
  res.json({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  console.log('back in lab5');
  console.log(req.body.email);
  console.log(req.body.password);
  const email = req.body.email;
  // const password = req.body.password;
  if (!email || !req.body.password) {
    return res.status(422).send('You must provide email and password');
  }

  User.findOne({ email })
    .then((result) => {
      if (result) { return res.status(422).send('You already have an account'); }
      const newUser = new User();
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      return newUser.save();
    })
    .then((result) => {
      console.log(' got to then with result');
      res.json({ token: tokenForUser(result) });
    })
    .catch((error) => {
      console.log('in the catch block');
      res.status(700).json({ error });
    });
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
