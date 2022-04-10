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
  } else {
    window.location.href = "http://127.0.0.1:5555/Front-End/login.html";
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
const getAccountsinfo = async () => {
  const fetchaccounts = await ftechAPI(
    "http://127.0.0.1:3000/api/v1/users/showme",
    "GET",
    JSON.stringify({})
  );
  if (fetchaccounts.status !== "success") {
    console.log("get account failed");
    //return;
  }
  return fetchaccounts;
};

const postAccountsinfo = async (user) => {
  const fetchaccounts = await ftechAPI(
    "http://127.0.0.1:3000/api/v1/users/updateme",
    "POST",
    JSON.stringify(user)
  );
  if (fetchaccounts.status !== "success") {
    console.log("post account failed");
    alert("lỗi " + fetchaccounts.message);
    //return;
  }
  return fetchaccounts;
};

const handleValidateForm = () => {};
const submitEdit = async () => {
  document
    .getElementById("account-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const name = document.getElementsByName("fullname")[0].value;
      const phone = document.getElementsByName("phone")[0].value;
      const address = document.getElementsByName("address")[0].value;

      const account = await postAccountsinfo({
        name,
        phoneNum: phone,
        address,
      });
      if (account.status === "success") {
        alert("thay đổi thông tin người dùng thành công!");
        localStorage.setItem("userData", JSON.stringify(account.data.user));
        window.location.href =
          "http://127.0.0.1:5555/Front-End/account-page.html";
      }
    });
};
const showAccount = async (account) => {
  // console.log(account);
  document.getElementsByName("fullname")[0].value = account.data.user.name;
  document.getElementsByName("phone")[0].value = account.data.user.phoneNum;
  document.getElementsByName("address")[0].value = account.data.user.address;
  document.getElementsByName("email")[0].value = account.data.user.email;
};
$(async () => {
  handleShowPassword();

  // handleLogout();
  checklogin();
  showAccount(await getAccountsinfo());
  document.getElementsByClassName("username")[0].onclick = () => {
    window.location.href = "http://127.0.0.1:5555/Front-End/account-page.html";
  };
  //document.getElementsByName("password")[0].setAttribute("hidden", "");
  // an? password.
  document.getElementsByClassName("mb-3")[4].setAttribute("hidden", "");
  submitEdit();
});
