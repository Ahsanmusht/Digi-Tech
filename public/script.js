// const { response } = require("express");

searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
  searchForm.classList.toggle('active');
}

window.onscroll = () => {

  searchForm.classList.remove('active');

  if (window.scrollY > 80) {
    document.querySelector('.header .header-2').classList.add('active');
  } else {
    document.querySelector('.header .header-2').classList.remove('active');
  }

}

window.onload = () => {

  if (window.scrollY > 80) {
    document.querySelector('.header .header-2').classList.add('active');
  } else {
    document.querySelector('.header .header-2').classList.remove('active');
  }

  fadeOut();

}

// function loader() {
//   document.querySelector('.loader-container').classList.add('active');
// }

// function fadeOut() {
//   setTimeout(loader, 4000);
// }

// var swiper = new Swiper(".books-slider", {
//   loop: true,
//   centeredSlides: true,
//   autoplay: {
//     delay: 9500,
//     disableOnInteraction: false,
//   },
//   breakpoints: {
//     0: {
//       slidesPerView: 1,
//     },
//     768: {
//       slidesPerView: 2,
//     },
//     1024: {
//       slidesPerView: 3,
//     },
//   },
// });

// var swiper = new Swiper(".featured-slider", {
//   spaceBetween: 10,
//   loop: true,
//   centeredSlides: true,
//   autoplay: {
//     delay: 9500,
//     disableOnInteraction: false,
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   breakpoints: {
//     0: {
//       slidesPerView: 1,
//     },
//     450: {
//       slidesPerView: 2,
//     },
//     768: {
//       slidesPerView: 3,
//     },
//     1024: {
//       slidesPerView: 4,
//     },
//   },
// });

// var swiper = new Swiper(".arrivals-slider", {
//   spaceBetween: 10,
//   loop: true,
//   centeredSlides: true,
//   autoplay: {
//     delay: 9500,
//     disableOnInteraction: false,
//   },
//   breakpoints: {
//     0: {
//       slidesPerView: 1,
//     },
//     768: {
//       slidesPerView: 2,
//     },
//     1024: {
//       slidesPerView: 3,
//     },
//   },
// });

// var swiper = new Swiper(".reviews-slider", {
//   spaceBetween: 10,
//   grabCursor: true,
//   loop: true,
//   centeredSlides: true,
//   autoplay: {
//     delay: 9500,
//     disableOnInteraction: false,
//   },
//   breakpoints: {
//     0: {
//       slidesPerView: 1,
//     },
//     768: {
//       slidesPerView: 2,
//     },
//     1024: {
//       slidesPerView: 3,
//     },
//   },
// });

// var swiper = new Swiper(".blogs-slider", {
//   spaceBetween: 10,
//   grabCursor: true,
//   loop: true,
//   centeredSlides: true,
//   autoplay: {
//     delay: 9500,
//     disableOnInteraction: false,
//   },
//   breakpoints: {
//     0: {
//       slidesPerView: 1,
//     },
//     768: {
//       slidesPerView: 2,
//     },
//     1024: {
//       slidesPerView: 3,
//     },
//   },
// });


// function sKsignUp() {
//   document.querySelector('#btn').onclick = () => {
//     loginForm.classList.toggle('active');
//   }
// }



// const sKsignUp = () => {
//   var obj = {
//     name: document.getElementById("name").value,
//     email: document.getElementById("email").value,
//     password: document.getElementById("password").value,
//     confPassword: document.getElementById("confirmpassword").value,
//   };

//   const Http = new XMLHttpRequest();
//   Http.open("POST", port + "/signUp");
//   Http.setRequestHeader("Content-Type", "application/json");
//   Http.send(JSON.stringify(obj));
//   Http.onreadystatechange = (e) => {
  //     console.log(e);
//     if (Http.readyState === 4) {
//       var jsonRes = JSON.parse(Http.responseText);
//       if (Http.status === 200) {
//         console.log(jsonRes.message);
//         // swal("Good job!", jsonRes.message, "success");
//         // setInterval(() => {
  //           // window.location.href = "./Login/login.html";
  //         // }, 3000);
//       } else if(Http.status === 405){
//         // swal("Opps!", jsonRes.message, "error");
//       }
//     }
//   };

//   return false;
// };

  //######################### FIRST SUCESSFULL METHOD #################


// const port = "http://localhost:3000"
// function sKSignUp() {
//   console.log("click");
//   var obj = {
//     name: document.getElementById("name").value,
//     email: document.getElementById("email").value,
//     password: document.getElementById("password").value,
//     confPassword: document.getElementById("confirmpassword").value,
//   };
//     console.log("data",obj);
//   const Http = new XMLHttpRequest();
//   Http.open("POST", port + "/signUp");
//   Http.setRequestHeader("Content-Type", "application/json");
//   // var newObj = obj.toString()
//   // console.log(JSON.parse(newObj))
//   Http.send(JSON.stringify(obj));
//   // console.log(JSON.stringify(obj));
//   // console.log(JSON.parse(obj));
//   Http.onreadystatechange = (e) => {
//     console.log(e);
//     if (Http.readyState === 4) {
//       console.log(Http.responseText)
//       alert(Http.responseText)
//       var jsonRes = JSON.parse(Http.responseText);
//       if (Http.status === 200) {
//         console.log(jsonRes.message);
//         // swal("Good job!", jsonRes.message, "success");
//         // setInterval(() => {
//         //   window.location.href = "./Login/login.html";
//         // }, 3000);
//       } else if(Http.status === 405){
//         // swal("Opps!", jsonRes.message, "error");
//       }
//     }
//   };

//   return false;
// }

  //####################### SECOND SUCESSFULL METHOD #####################


const port = "https://digi-tech-production-9eb5.up.railway.app"

const sKSignUp = () => {

  console.log("click");
  var obj = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    confPassword: document.getElementById("confirmpassword").value
  }
  
  axios.post(port+'/signUp',{
    name:obj.name,
    email:obj.email, 
    password:obj.password,
    confPassword:obj.confPassword
  }).then((response) =>{
    console.log(response.data.message)
    alert(response.data.message)
  }).catch((err) =>{
    console.log(err.response.data.message);
  })
  
  
  console.log("click");
  var obj = {
   image: document.getElementById('image').value

}
  axios.post(port+'/upload',{
    image: obj.image,
  }).then((response) =>{
    console.log(response.data.message)
    alert(response.data.message)
  }).catch((err) =>{
    console.log(err.response.data.message);
  })
  return false;
}

