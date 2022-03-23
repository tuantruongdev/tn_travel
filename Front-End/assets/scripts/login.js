//const test = require("./checkLogin");
const form = document.getElementById("login-form");
let message = document.getElementById("password-message");

const login = async (userName, password) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
  var raw = JSON.stringify({
    email: userName,
    password: password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    credentials: "include",
  };
  //console.log("cac");
  return fetch("http://127.0.0.1:3000/api/v1/users/login", requestOptions)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => console.log("error222", error));
};

form.addEventListener("submit", async (e) => {
  const my_username = document.getElementById("username").value;
  const my_password = document.getElementById("password").value;
  let message_text = [];
  if (password.value.length < 6) {
    message_text.push("Mật khẩu phải có độ dài ít nhất 6 ký tự !");
  }
  if (password.value.length >= 20) {
    message_text.push("Mật khẩu có độ dài không quá 20 ký tự !");
  }
  if (message_text.length > 0) {
    e.preventDefault();
    message.innerText = message_text.join(", ");
  }
  e.preventDefault();

  const fetchLogin = await login(my_username, my_password);
  if (fetchLogin.status === "success") {
    console.log("login thành công với token:\n" + fetchLogin.token);
    //  const loggedin = await checkloggedIn();
    //console.log(loggedin);
    window.location.href =
      "http://127.0.0.1:5555/baitap_dapttm/Front-End/index.html";
  } else {
    console.log(fetchLogin);
    message.innerText = fetchLogin.message;
    console.log("login thất bại");
  }
});
