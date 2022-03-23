const checkloggedIn = async () => {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
    credentials: "include",
  };
  //console.log("cac");
  return fetch("http://127.0.0.1:3000/api/v1/users/auth", requestOptions)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => console.log("err", error));
};

const red = async () => {
  const loggedin = await checkloggedIn();
  console.log(loggedin);
  if (loggedin.status === "success") {
    // dang nhap thanh cong
    return true;
  } else {
    //chua dang nhap
    return false;
  }
  // window.location.replace("http://127.0.0.1:5500/public/index.html");
};
//document.addEventListener("DOMContentLoaded", red, false);
//console.log("ttd");
