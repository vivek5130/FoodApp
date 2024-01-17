const userModel = require("../models/userModel");

// user controller
async function getUser(req, res) {
  // res.send(users);
  // console.log("query is: ",req.query)
  const uid = req.id; //the id is passed in req body in protectedRoute middle ware, so we can access id
  console.log(uid);
  let user = await userModel.findById(uid);
  if (user) {
    return res.json(user);
  } else {
    return res.json({
      message: "User not found",
    });
  }
}

//   function postUser(req, res) {
//     console.log(req.body);
//     users = req.body;
//     res.json({
//       message: "Data received sucessfully",
//       user: req.body,
//     });
//     // res.json({data : req.body})
//   }

async function updateUser(req, res) {
  // console.log("req-> ", req.body);
  try {
    let id = req.params.id;
    let user = await userModel.findById(id);
    let datatobeupdated = req.body;
    if (user) {
      const keys = [];
      for (let key in datatobeupdated) {
        keys.push(key);
      }
      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = datatobeupdated[keys[i]];
      }
      user.confirmPassword = user.password;
      const updatedData = await user.save();
      res.json({
        message: "data updated successfully",
        data: user,
      });
    } else {
      res.json({
        message: "User is not found",
      });
    }
  } catch (err) {
    res.json({
      error: err.message,
    });
  }
}

async function deleteUser(req, res) {
  try {
    let id = req.params.id;

    let user = await userModel.findByIdAndDelete(id);
    if (!user) {
      res.json({
        message: "User is not found",
      });
    } else {
      res.json({
        message: "User is deleted",
        data: user,
      });
    }
  } catch (err) {
    res.json({
      error: err.message,
    });
  }
}

async function getAllUser(req, res) {
  let users = await userModel.find();
  if (users) {
    res.json({
      message: "all users retrieved",
      data: users,
    });
  } else {
    res.json({
      message: "No user to display",
    });
  }
}

async function updateProfileImage(req, res) {
  try {
    //updating profile image
    const email = req.params.email;
    console.log("Email is: ", email);
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("User not found");
      res.json({
        message: "User is not found"
      })
      return;
    }
    user.profileImage = `img/users/user-${email}.jpeg`;
    await user.save();
    res.json("File Uploaded successfully");
  } catch (err) {
    console.log(err.message);
    res.json({
      error: "error occured while saving image",
    });
  }
}

//   function setCookies(req, res) {
//     // res.setHeader('Set-Cookie', 'isLoggedIn = true');
//     res.cookie("isLoggedIn", true, {
//       maxAge: 1000 * 60 * 60 * 24,
//       secure: true,
//       httpOnly: true,
//     });
//     res.cookie("isPrime", true);
//     // maxAge refers to time taken to expire the cookie by default it is session which refers to on tab close it deletes automatically
//     // if secure is true then it cannot run in unsecure website i.e http
//     //http only refers to cookies is only accessible in backend by http request and not on frontend
//     res.send("Cookies has been set");
//   }
//   function getCookies(req, res) {
//     let cookies = req.cookies;
//     res.send("Cookies recieved");
//     console.log(cookies);
//   }

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  getAllUser,
  updateProfileImage,
};
