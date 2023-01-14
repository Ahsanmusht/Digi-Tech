const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://Ahsan:kph07403102007@dynamic.u7gfsnh.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })
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