const handleShowPassword = () => {
  let input = $("input[type='password']");
  let toogle = $("button.password-toogle");
  input.keydown(() => {
    toogle.show();
  });
  toogle.click(function (e) {
    input.prop("type", "text");
  });
  $(document).click(function (e) {
    // Nếu click bên ngoài đối tượng container thì ẩn
    if (
      !input.is(e.target) &&
      input.has(e.target).length === 0 &&
      !toogle.is(e.target) &&
      toogle.has(e.target).length === 0
    ) {
      toogle.hide();
      input.prop("type", "password");
    }
  });
};
const checklogin = async () => {
  let actionheader = document.getElementById("header-action");
  // let headerActionLoggedIn = document.getElementById("header-action-logged-in");
  // let fullname = document.getElementById("name");
  if (await red()) {
    const data = JSON.parse(localStorage.getItem("userData"));
    actionheader.style.display = "none";
    document.getElementsByClassName("col-2 account-wrapper")[0].style.display =
      "block";
    document.getElementsByClassName("username")[0].innerHTML = data.name;
    // actionheader;
    // headerActionLoggedIn.className = headerActionLoggedIn.className.replace(
    //   "d-none ",
    //   ""
    // );
    // fullname.innerHTML = "Nguyen Tuan Truong";
  }
};
const handleLogout = () => {
  document.getElementsByClassName("username")[0].onclick = () => {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    location.reload();
  };
};
const handleValidateForm = () => {};

$(() => {
  handleShowPassword();
  // handleLogout();
  checklogin();
  document.getElementsByClassName("username")[0].onclick = () => {
    window.location.href = "http://127.0.0.1:5555/Front-End/account-page.html";
  };
});
