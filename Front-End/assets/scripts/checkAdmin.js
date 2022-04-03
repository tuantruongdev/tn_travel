const checkAdmin = async () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (!(await red())) {
    window.location.href = "http://127.0.0.1:5555/Front-End/login.html";
  }
  if (userData.role !== "admin") {
    alert("Sorry, You Are Not Allowed to Access This Page");
    window.location.href = "http://127.0.0.1:5555/Front-End/index.html";
    return;
  }
  console.log("check admin succesful");
};

(() => {
  checkAdmin();
})();
