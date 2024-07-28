const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { db, sequelize } = require("../database/config/database");

const User = db['User'];

const generateToken = (user) => {
  const payload = {
    email: user.email,
    role: user.role
  }

  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 * 24 });
}

exports.signup = async (req, res) => {
  try {
    const { username: display_name, email, password, role } = req.body;

    const alreadyUser = await User.findOne({
      where: {
        email
      }
    })

    if (alreadyUser) {
      return res.status(409).json({
        message: 'Email already exists'
      })
    }

    const newUser = await User.create({
      email,
      password,
      display_name,
      role
    })

    const userObj = newUser.toJSON();

    userObj.avatar = "";

    const token = generateToken(userObj);

    // const expireDate = new Date();
    // expireDate.setDate(expireDate.getDate() + 1);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.status(200).json({
      message: 'Signup successfully',
      result: {
        user: userObj,
        token
      }
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email
      }
    })

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(403).json({
        message: 'No match password'
      })
    }

    const profile = await user.getProfile();

    const userObj = user.toJSON();

    userObj.avatar = profile ? profile.avatar || "" : "";

    const token = generateToken(userObj);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.status(200).json({
      message: 'Login successfully',
      result: {
        user: userObj,
        token
      }
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.loginWithToken = async (req, res) => {
  try {
    const { email } = req.user;

    const user = await User.findOne({
      where: {
        email
      }
    })

    const profile = await user.getProfile();

    const userObj = user.toJSON();

    userObj.avatar = profile ? profile.avatar || "" : "";
    
    const token = generateToken(userObj);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.status(200).json({
      message: 'Login with token successfully',
      result: {
        user: userObj,
        token
      }
    })

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    message: 'Logout successfully'
  })
}
