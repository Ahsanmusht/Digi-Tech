
const mongoose = require("mongoose");



var imageSchema = new mongoose.Schema({
    image: {
      data : Buffer,
      contentType : String
    }
  });

  
var imageModel = mongoose.model("DP", imageSchema);


module.exports = {
    imageModel : imageModel
  };