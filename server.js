const express = require("express");
const app = express();
const { signUpModel } = require("./src/database/Connection");
const path = require("path");
const port = process.env.PORT || 3000;
const bycrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const jwt = require("jsonwebtoken");

app.use(bodyParser.json());
app.use("/", express.static(path.resolve(path.join(__dirname, "public"))));
app.post("/signUp", (req, res, next) => {
  signUpModel.findOne(
    {
      email: req.body.email,
    },
    (err, data) => {
      if (err || data) {

        res.status(405).send({
          message: "Please Make Another Account User Already Exists !",
        });
        return;
      }
      else {
        const saltRounds = 10;
        bycrypt.genSalt(saltRounds, function (err, salt) {
          bycrypt.hash(req.body.password, salt, function (err, hash) {

            console.log(hash);

            var newSignUpPerson = signUpModel({
              name: req.body.name,
              email: req.body.email,
              password: hash,
              confPassword: hash
            });
            newSignUpPerson.save((err, data) => {
              if (!err) {
                console.log(data);
                res.status(200).send({
                  message: "Sign Up SuccesFull !",
                  data,
                });
                console.log(data);
              } else {
                res.status(405).send({
                  message: "User creation Failed",
                });
              }
            });
          });
        });
      }
    }
  );
});

app.post("/login", (req, res, next) => {
  signUpModel.findOne({ email: req.body.email }, (err, data) => {
    if (data) {
      if (data.email === req.body.email) {
        bycrypt.compare(req.body.password, data.password, (err, isFound) => {
          if (isFound) {
            res.status(200).send({
              data: "  Welcome To Our Website ! ",
            });
          } else {
            res.status(405).send({
              message: "Invalid Is Incorrect  !",
            });
          }
        });
      }
      else {
        res.status(405).send({
          message: "Password is Incorrect !",
        });
      }
    } else {
      res.status(405).send({
        message: "Email is Inccorect !",
      });
    }
  });
});
app.get("/signUpData", (req, res, next) => {
  const data = signUpModel.find({}, (err, data) => {
    if (!err) {
      res.send(data)
    } else {
      res.send(err)
    }
  })
})



app.delete("/user/:id", (req, res, next) => {
  signUpModel.findByIdAndDelete(req.params.id, (err, data) => {
    if (!err) {
      res.send({
        message: "user deleted"
      })
    }
    else {
      res.send({
        message: "error"
      })
    }
  })
});

app.put("/user/:id", (req, res, next) => {
  signUpModel.findByIdAndUpdate(req.params.id, (err, data) => {
    let updateobj = {}

    if (req.body.name) {
      updateobj.name = req.body.name
    }
    if (req.body.eemail) {
      updateobj.email = req.body.email
    }
    if (req.body.password) {
      updateobj.password = req.body.password
    }
    if (req.body.confPassword) {
      updateobj.confPassword = req.body.confPassword
    } else {
      signUpModel.findByIdAndUpdate(req.params.id, updateobj, (err, data) => {
        if (!err) {
          res.send({
            message: "usere updated"
          })
        } else {
          res.send({
            message: "user not updated"
          })
        }
      })
    }
  })
});

app.listen(port, () => {
  console.log("server is running on", port)
})

