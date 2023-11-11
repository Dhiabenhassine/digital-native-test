const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/user");

const register = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password || password.length < 10) {
    return res.status(422).json({ error: "Please fill in all the required fields and ensure the password is at least 10 characters long" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(422).json({ error: "Email is already registered" });
    }

    const hash = await bcrypt.hash(password, 10);
    console.log("password", hash);

    const newUser = await User.create({
      name,
      email,
      password: hash,
    });

    const token = jwt.sign({ userId: newUser.id }, 'azerty123', { expiresIn: '1h' });

    return res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password ) {
      return res.status(422).json({ error: "Please fill in all the required fields" });
    }
  
    try {
      const existUser = await User.findOne({ where: { email } });
  
      if (!existUser) {
        return res.status(500).json("No user found!");
      }
  
      const passwordMatch = await bcrypt.compare(password, existUser.password);
  
      if (!passwordMatch) {
        return res.status(401).json('The password is wrong!');
      }
  
      const secretKey = process.env.SECRETKEY;
      const accessToken = jwt.sign(
        {
          email: req.body.email,
          password: req.body.password,
        },
        secretKey,
        { expiresIn: '12h', algorithm: 'HS256' }
      );
  
      existUser.token = accessToken;
  
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
  
      res.status(201).json({ accessToken, existUser });
    } catch (error) {
      console.error(error);
      res.status(500).json("There is an error");
    }
  };
  const profile = async (req, res) => {
    const {userId} = req.params;
  
    try {
      const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      return res.status(200).json({ user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
module.exports = {
  register,
  login,
  profile
};
