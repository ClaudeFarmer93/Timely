const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/test2";
mongoose.connect(url,(error) =>{
  if(error){
    console.log(error, "Failed to connect to the database");
  }else{
    console.log("Succesed to connect to the database");
  }
}, {useNewUrlParser: true});