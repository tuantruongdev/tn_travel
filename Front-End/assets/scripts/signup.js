const signup = async (name, userName, password, email, phoneNum, dob) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
  var raw = JSON.stringify({
    email: email,
    password: password,
    phoneNum: phoneNum,
    address: "viet nam",
    userName: userName,
    name: name,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    credentials: "include",
  };
  //console.log("cac");
  return fetch("http://127.0.0.1:3000/api/v1/users/signup", requestOptions)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => console.log("error222", error));
};
const handleSignUp = async () => {
  document
    .getElementById("signup-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const fullname = document.getElementsByName("fullname")[0].value;
      const phoneNum = document.getElementsByName("phone")[0].value;
      const email = document.getElementsByName("email")[0].value;
      const password = document.getElementsByName("password")[0].value;
      const gender = document.getElementsByName("gender")[0].value;
      const dob = document.getElementsByName("dateofbirth")[0].value;
      const username = Math.random().toString(36).substr(2, 5);
      const fetchsignUp = await signup(
        fullname,
        username,
        password,
        email,
        phoneNum,
        dob
      );
      //  console.log(fetchsignUp);

      if (fetchsignUp.status === "success") {
        console.log("signup thành công với token:\n" + fetchsignUp.token);
        //  const loggedin = await checkloggedIn();
        //console.log(loggedin);
        await localStorage.setItem(
          "userData",
          JSON.stringify(fetchsignUp.data)
        );
        window.location.href = "http://127.0.0.1:5555/Front-End/index.html";
      } else {
        console.log(fetchsignUp);
        //   $(".password-message").text(fetchsignUp.message);
        // $(".password-message").css("color", "red");
        //  message.innerText = fetchsignUp.message;
        alert(fetchsignUp.message);
        console.log("signup thất bại");
      }
    });
};
(() => {
  handleSignUp();
})();
