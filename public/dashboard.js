// const express = require("express");
// const Swal  = require("sweetalert2");
// const app = express();

// const url = "https://sir-web.herokuapp.com";
const url = "http://localhost:3000"

function getData() {
  const Http = new XMLHttpRequest();
  Http.open("GET", url + "/signUpData");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(null);
  Http.onreadystatechange = (e) => {
    console.log(e);
    if (Http.readyState === 4) {

        let jsonRes = JSON.parse(Http.responseText);
        console.log(jsonRes)
      
    
    }
  };
  console.log("hello");
}
getData();
