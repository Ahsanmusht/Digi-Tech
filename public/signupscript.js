
var port = 'https://digi-tech-production-9eb5.up.railway.app'
const signUp = () => {
    console.log("Hello")
    var obj = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        confPassword: document.getElementById("confPassword").value,
    }

    axios.post(port + '/signUp', {
        name: obj.name,
        email: obj.email,
        password: obj.password,
        confPassword: obj.confPassword
    }).then((response) => {
        setInterval(() => {
            window.location.href = "./login.html"
        }, 3000);
        console.log(response)
        alert(response.data.message);
    }).catch((err) => {
        alert(err.response.data.message);
        console.log(err.response.data.message);
    })
    return false;
}