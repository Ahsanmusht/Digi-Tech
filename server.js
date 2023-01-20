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
const cookieParser = require('cookie-parser');
const multer = require("multer");

app.use(cookieParser());

app.use(bodyParser.json());
app.use("/", express.static(path.resolve(path.join(__dirname, "public"))));

var Storage = multer.diskStorage({
  destination: "public/uploads/",
  filename:(req,file,cb)=>{
    cb(null, file.originalname);
  }
});

var upload = multer({
  storage:Storage
});

app.post("/upload", (req,res) =>{
  var ImageFile = req.file.filename;
  var Sucess = req.file.filename+ "Image sucessfully Uploaded";

  var ImageDetails = new UploadModel({
    imagename: ImageFile,
  });

  ImageDetails.save((err, doc) =>{
    if(!err) throw err;


    imageData.exec((err, data) =>{
        if(!err) throw err;
        res.render("upload-file", {title: 'upload-file'})
    });
  });
});

app.post("/signUp", upload.single(''), (req, res, next) => {
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
              confPassword: hash,
              image: req.file.filename,
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
    console.log(data)
    if (data) {
      if (data.email === req.body.email) {
        bycrypt.compare(req.body.password, data.password, (err, isFound) => {
          if (isFound) {
            console.log(isFound)
            const token = jwt.sign({
              email: req.body.email,
              password: req.body.password
            }, "kiojlyuioplkjmiouiytrewqasdfcxzvg")
            res.cookie("jwToken", token, {
              maxAge: 86_400_000,
              httpOnly: true,
            })
            res.status(200).send({
              data: data.name + "  Welcome To Our Website ! ",
            });
          } else {
            res.status(405).send({
              message: "The Password Is Incorrect  !",
            });
          }
        });
      } else {
        res.status(405).send({
          message: "Password is Incorrect !",
        });
      }
    } else if (
      req.body.email === "admin@gmail.com" &&
      req.body.password === "admin"
    ) {
      //Sending Message to Fornt End With Status  Of 201
      res.status(201).send({
        message: "Welcome To Admin Page !",
      });
      return;
    } else {
      //Sending Message to Fornt End With Status  Of 405
      res.status(405).send({
        message: "Email is Inccorect !",
      });
    }
  });
});

// app.use((req, res, next) => {
//   if (!req.cookies.jWToken) {
//     res.status(401).send({
//       message: "Wrong Token",
//     });
//     return; 5
//   }
//   jwt.verify(
//     req.cookies, jwToken, (err, decodeData) => {
//       if (!err) {
//         console.log("hellollo");
//         const issueDate = decodeData.iat * 1000;
//         const nowDate = new Date().getTime();
//         const diff = nowDate - issueDate; // 86400,000
//         console.log(diff);
//         if (diff > 300000) {
//           res.status(401).send({
//             message: "Token Expired",
//           });
//         } else {
//           var token = jwt.sign(
//             {
//               id: decodeData.id,
//               email: decodeData.email,
//               password: decodeData.password,
//             },
//             jwToken
//           );
//           res.cookie("jWToken", token, {
//             maxAge: 86_400_000,
//             httpOnly: true,
//           });
//           req.body.jWToken = decodeData;
//           next();
//         }
//       } else {
//         res.status(401).send({
//           message: "invalid token",
//         });
//       }
//     }
//   );
// });

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

app.put("/update/:id", (req, res) => {
  signUpModel.findOneAndUpdate(
    { id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email
      },
    }
  )
    .then((data) => {
      res.status(200).send({
        message: "User Updated !",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
});

app.listen(port, () => {
  console.log("server is running on", port)
})

