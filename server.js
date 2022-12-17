const express = require("express");
const app = express();
const { signUpModel } = require("./src/database/Connection");
const path = require("path");
const port = process.env.PORT || 3000;
const bycrypt = require("bcryptjs");
const cors = require("cors")
const bodyParser = require("body-parser")


app.use("/", express.static(path.resolve(path.join(__dirname, "./public"))));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.post("/signup", (req, res, next) => {
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
    if (!err) {
      if (data.email === req.body.email && data.password === req.body.password) {
        res.status(200).send({
          message: "login sucess",
          data: data

        })
        return;
      } else {
        res.send({
          message: "ur password is wrong"
        })
      }
    } else {

      res.status(404).send({
        message: "not found"
      })


    }
  })
  //   }
})

app.listen(port, () => {
  console.log("server is running on", port)
})

