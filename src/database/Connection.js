
const mongoose = require("mongoose");

mongoose.set('strictQuery' , false);

const db="mongodb+srv://Ahsanmushtaq:3102007kph0740@cluster0.byoh4nv.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(db , { useNewUrlParser: true, useUnifiedTopology : true})
mongoose.connection.on("connected", () => {
  console.log("mongoose connected sucessfully");
})
mongoose.connection.on("disconnected", () => {
  console.log("mongoose not connected sucessfully");
  process.exit(1);
})

var signUpschema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  confPassword: String,
});

var imageSchema = new mongoose.Schema({
  image: {
    data : Buffer,
    contentType : String
  }
})

var signUpModel = mongoose.model("user", signUpschema);
var imageModel = mongoose.model("DP", imageSchema);

module.exports = {
  signUpModel : signUpModel,
  imageModel : imageModel
};