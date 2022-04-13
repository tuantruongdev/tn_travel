const hanldeAccountMenu = () => {
  let toogle = $(".account-link");
  let menu = $(".account-menu");

  toogle.mouseenter(() => {
    menu.slideDown(300, "swing");
  });
  menu.mouseleave(function (e) {
    $(this).slideUp(300, "swing");
  });
};
const validateForm = () => {
  $("form").submit(function (e) {
    let passOld = $("#old").val();
    let passNew = $("#new").val();
    let passConfirm = $("#confirm").val();
    let messageOld = $(".old-message");
    let messageNew = $(".new-message");
    let messageConfirm = $(".confirm-message");
    // reset message
    messageOld.text("");
    messageNew.text("");
    messageConfirm.text("");
    let flag = true;
    if (passOld.length < 6) {
      messageOld.text("Độ dài mật khẩu quá ngắn < 6 ký tự");
      flag = false;
    } else if (passOld.length > 20) {
      messageOld.text("Mật khẩu quá dài > 20 ký tự");
      flag = false;
    } else if (passNew.length < 6) {
      messageNew.text("Độ dài mật khẩu quá ngắn < 6 ký tự");
      flag = false;
    } else if (passNew.length > 20) {
      messageNew.text("Mật khẩu quá dài > 20 ký tự");
      flag = false;
    } else if (passConfirm !== passNew) {
      messageConfirm.text("Mật khẩu xác nhận không hợp lệ");
      flag = false;
    }
    // Nếu không hợp lệ thì chặn request
    if (flag == false) {
      e.preventDefault();
    } else {
      e.preventDefault();
      changePass();
    }
  });
};
const bindHeader = async () => {
  const headermenu = document.getElementsByClassName("dropdown-item");
  const userinfo = JSON.parse(localStorage.getItem("userData"));
  // console.log(userinfo);
  // alert(userinfo.role);
  if (userinfo.role != "admin") {
    headermenu[0].setAttribute("hidden", "");
  }
  headermenu[0].href = "http://127.0.0.1:5555/Front-End/view-tour/QLtour.html";
  headermenu[1].href = "http://127.0.0.1:5555/Front-End/account-page.html";
  headermenu[2].href = "http://127.0.0.1:5555/Front-End/change_password.html";
  headermenu[3].onclick = () => {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    location.reload();
  };
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
  } else {
    window.location.href = "http://127.0.0.1:5555/Front-End/login.html";
  }
};
const fetchChangePass = async (obj) => {
  const fetchaccounts = await ftechAPI(
    "http://127.0.0.1:3000/api/v1/users/changePassword",
    "PATCH",
    JSON.stringify(obj)
  );
  if (fetchaccounts.status !== "success") {
    console.log("post change failed");
    // alert("lỗi " + fetchaccounts.message);
    //return;
  }
  return fetchaccounts;
};
const changePass = async () => {
  const oldpass = document.getElementsByName("password_old")[0].value;
  const newpass = document.getElementsByName("password_new")[0].value;
  const fchangepass = await fetchChangePass({
    password: oldpass,
    newpassword: newpass,
  });
  if (fchangepass.status != "success") {
    let messageOld = $(".old-message");
    let messageNew = $(".new-message");
    let messageConfirm = $(".confirm-message");
    messageOld.text(fchangepass.message);
  } else {
    $(".old-message").text("");
    $(".new-message").text("");
    $(".confirm-message").text("");
    alert("Thay đổi mật khẩu thành công!");
  }
  console.log(fchangepass);
};
$(() => {
  hanldeAccountMenu();
  validateForm();
  checklogin();
  document.getElementsByClassName("username")[0].onclick = () => {
    window.location.href = "http://127.0.0.1:5555/Front-End/account-page.html";
  };
  document.getElementsByClassName("header-logo")[0].href =
    "http://127.0.0.1:5555/Front-End";
  bindHeader();
});
