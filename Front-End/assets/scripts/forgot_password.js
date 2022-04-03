const ftechAPI = async (url, method, raw = {}) => {
  //   var raw = JSON.stringify({
  //     email: userName,
  //     password: password,
  //   });
  //console.log(raw);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: method,
    headers: myHeaders,
    redirect: "follow",
    credentials: "include",
    body: raw,
  };

  console.log(requestOptions);
  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => console.log("err", error));
};
const forgetpassword = () => {
  document
    .getElementById("forgot-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      //   alert(document.getElementsByClassName("mb-4 form-control")[0].value);
      const fetchForget = await ftechAPI(
        "http://127.0.0.1:3000/api/v1/users/forgotPassword",
        "POST",
        JSON.stringify({
          email: document.getElementsByClassName("mb-4 form-control")[0].value,
        })
      );

      if (fetchForget.status !== "success") {
        document.getElementsByClassName("mb-4 form-text")[0].innerHTML =
          fetchForget.message;
      }
      document.getElementsByClassName("mb-4 form-text")[0].innerHTML =
        fetchForget.message;
      //  console.log(fetchForget);
    });
};
const resetPassword = (code) => {
  document.getElementsByClassName("mb-4 form-text")[0].innerHTML =
    "Vui lòng nhập mật khẩu mới của bạn vào đây!";
  document.getElementsByClassName("mb-4 form-control")[0].placeholder =
    "Your new password...";
  document
    .getElementsByClassName("mb-4 form-control")[0]
    .setAttribute("type", "password");
  document
    .getElementById("forgot-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const fetchReset = await ftechAPI(
        `http://127.0.0.1:3000/api/v1/users/resetPassword/${code}`,
        "PATCH",
        JSON.stringify({
          password:
            document.getElementsByClassName("mb-4 form-control")[0].value,
        })
      );

      if (fetchReset.status !== "success") {
        document.getElementsByClassName("mb-4 form-text")[0].innerHTML =
          fetchReset.message;
        return;
      }
      document.getElementsByClassName("mb-4 form-text")[0].innerHTML =
        "Thay đổi mật khẩu thành công. Bạn sẽ được chuyển hướng về trang đăng nhập sau 5 giây";
      await new Promise((r) => setTimeout(r, 5000));
      window.location.href = "http://127.0.0.1:5555/Front-End/login.html";
    });
};
const checkParameter = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  if (!code) {
    forgetpassword();
    return;
  }
  // /  console.log("abc");
  resetPassword(code);
};
(() => {
  checkParameter();
})();
