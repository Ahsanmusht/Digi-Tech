const mongoose = require("mongoose")

mongoose.connect(process.env.DB, { useNewUrlParser: true })
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