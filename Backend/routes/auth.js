const { application } = require("express");
const User = require("../models/User");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_Secret = "Sajal$1";

//Route:1  Register a user using: Post  dosn't require Auth: /api/auth {Register}

router.post("/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 5 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false
    // if there are error show this

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success,  error: "Already Exist" });
      }

      const salt = await bcrypt.genSalt(10);
      SecPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: SecPass,
      });

      //  .then(user => res.json(user))
      //  .catch(err=>{console.log(err)
      // res.json({error: "PLease be validate with credentials" , message: err.message})})

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_Secret);
      success = true
      // console.log(jwtData);
      res.json({ success, authtoken });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);

//Route:2 Create a user using: Post  dosn't require Auth: /api/auth/login  {Login}

router.post("/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // if there are error show this

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({ error: "Incorrect Credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false;
        return res.status(400).json({ success,error: "Incorrect Credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_Secret);
      // console.log(jwtData);
      success=true;
      res.json({ success, authtoken });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);

//Route:3  Create a user for User Details using: Post  dosn't require Auth: /api/auth/getdetails

router.post("/getuser",fetchuser, async (req, res) => {

      try {
           const userId =req.user.id; 
           const user = await User.findById(userId).select("-password")
           res.send(user);

      } catch (error) {
         console.error(error.message);
         res.status(500).send("Internal Error Occured");
       }

   })

   
module.exports = router;