import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

export const getUserByRole = async (req, res) => {
  try {
    const role = req.params.role;
    const response = await User.findAll({
      where: {
        role: role
      }
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

export const createUser = async (req, res) => {
  try {
    const saltRounds = 10; 
    const plainPassword = req.body.password;

    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    await User.create({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword,
    });
    res.status(201).json({ msg: "User Created" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error creating user" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    // User logged in successfully (omitting JWT or session handling for brevity)
    const message = user.role === 'Admin' ? 'Login Admin Successful' : 'Login User Successfull';
    res.status(200).json({ msg: message });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    await User.update(req.body, {
      where:{
        id: req.params.id
      }
    });
    res.status(200).json({msg: "User Updated"});
  } catch (error) {
    console.log(error.message);
  }
}

export const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where:{
        id: req.params.id
      }
    });
    res.status(200).json({msg: "User Deleted"});
  } catch (error) {
    console.log(error.message);
  }
}