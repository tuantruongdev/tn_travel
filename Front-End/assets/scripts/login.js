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
const validatePassword = (password) => {
  if (password.length > 20)
    return { message: "Mật khẩu phải quá dài !", result: false };
  else if (password.length < 6)
    return {
      message: "Mật khẩu yếu!",
      result: false,
    };
  else
    return {
      message: "Ok",
      result: true,
    };
};

const handleValidate = () => {
  // Init
  let form = $("#login-form");
  let username = $("#username");
  let password = $("#password");
  // Validate
  form.submit(async (e) => {
    const rulePassword = validatePassword(password.val());

    if (rulePassword.result === false) {
      $(".password-message").text(rulePassword.message);
      $(".password-message").css("color", "red");
    }
    e.preventDefault();

    const my_username = document.getElementById("username").value;
    const my_password = document.getElementById("password").value;
    const fetchLogin = await login(my_username, my_password);
    if (fetchLogin.status === "success") {
      console.log("login thành công với token:\n" + fetchLogin.token);
      //  const loggedin = await checkloggedIn();
      //console.log(loggedin);
      await localStorage.setItem("userData", JSON.stringify(fetchLogin.data));
      window.location.href = "http://127.0.0.1:5555/Front-End/index.html";
    } else {
      console.log(fetchLogin);
      $(".password-message").text(fetchLogin.message);
      $(".password-message").css("color", "red");
      message.innerText = fetchLogin.message;
      console.log("login thất bại");
    }
  });

  password.change((e) => {
    $(".password-message").text(
      "Mật khẩu của bạn phải dài 8-20 ký tự, chứa các chữ cái và số, đồng thời không được chứa dấu cách, ký tự đặc biệt hoặc biểu tượng cảm xúc. "
    );
    $(".password-message").css("color", "#6c757d");
  });
};
$(() => {
  handleValidate();
});
