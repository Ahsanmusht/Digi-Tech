const mongoose = require("mongoose")
// const db=process.env.DB
mongoose.connect("mongodb+srv://Ahsanmushtaq:3102007kph0740@cluster0.byoh4nv.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })
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

var signUpModel = mongoose.model("user", signUpschema);


module.exports = {
  signUpModel: signUpModel
};