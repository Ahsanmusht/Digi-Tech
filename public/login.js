// var port = "https://digi-tech-production-9eb5.up.railway.app"

var port = "https://digi-tech-production-9eb5.up.railway.app"
function Login() {
    var obj = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    var Http = new XMLHttpRequest();
    Http.open("POST", port + "/login");
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify(obj));
    Http.onreadystatechange = (e) => {
      if (Http.readyState === 4) {
        let jsonRes = JSON.parse(Http.responseText);
        if (Http.status === 200) {
          alert(jsonRes.data , "success");
          setInterval(function () {
            window.location.href = "./index.html";
          }, 3000);
          console.log(jsonRes);
          return;
        }
        else if (Http.status === 201) {
          alert( jsonRes.message);
          setInterval(() => {
            window.location.href = "./dashboard.html"  
          }, 3000);
        }
        else {
          alert(jsonRes.message);
          console.log(jsonRes.message);
        }
      }
    };
  
    return false;
  }