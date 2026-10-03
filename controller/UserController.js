import User from "../modules/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get User
export function getUser(req, res) {
  // Creatinga object which can be saved in the database in the format of User
  const user = new User(req.body);

  // If there is no user
  if (req.user == null) {
    res.json({
      message: "Cannot find user..!Try again..!",
    });
    return;
  }

  // If user is not an admin
  if (req.user !== "Admin") {
    res.json({
      message: "You are not authorized to view user details..!",
    });
    return;
  }

  // getting usr obect details
  User.find().then((users) => {
    res.json(users);
  });
}

// Creating a user
export function createUser(req, res) {
  const data = req.body;
  const hashPassword = bcrypt.hashSync(data.password, 10);

  console.log(hashPassword);
  res.json({ hashPassword });

  // Creatinga object which can be saved in the database in the format of User
  const user = new User({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    password: hashPassword,
    role: data.role,
  });

  user.save().then(() => {
    res.json({
      message: "User created successfully..!",
    });
  });
}

// Updating a user
export function updateUser(req, res) {
  // Creatinga object which can be saved in the database in the format of User
  const user = new User(req.body);

  res.json({
    message: "User Updated successfully..!",
  });
}

// Deleting a user
export function deleteUser(req, res) {
  // Creatinga object which can be saved in the database in the format of User
  const user = new User(req.body);

  res.json({
    message: "User deleted successfully..!",
  });
}

// login user function
export function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.find({ email: email }).then((users) => {
    //console.log(users);
    if (users[0] == null) {
      res.json({
        message: "User Not Found..!",
      });
    } else {
      const user = users[0];

      // Compare the entered password and the pssword stored in the database
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if (isPasswordCorrect) {
        const payLoad = {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          Image: user.image,
        };

        // Create a unique web token for authentication process
        const token = jwt.sign(payLoad, "secretKey96$2025", {
          expiresIn: "150h",
        });
        res.json({
          message: "Login Successfull..!",
          token: token,
        });
      } else {
        res.json({
          message: "Login Not successfull..!",
        });
      }
    }
  });
}

// Reusable common function to check wether admin is present
export function isAdmin(req) {
  if (req.user == null) {
    return false;
  }

  if (req.user.role != "Admin") {
    return false;
  }

  return true;
}
