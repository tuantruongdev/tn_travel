let actionheader = document.getElementById("header-action");
let headerActionLoggedIn = document.getElementById("header-action-logged-in");
let fullname = document.getElementById("name");
//console.log("cac");
//document.addEventListener("DOMContentLoaded", red, false);
document.addEventListener(
  "DOMContentLoaded",
  async () => {
    if (await red()) {
      actionheader.className = "d-none " + actionheader.className;
      headerActionLoggedIn.className = headerActionLoggedIn.className.replace(
        "d-none ",
        ""
      );
      const userData = JSON.parse(await localStorage.getItem("userData"));
      fullname.innerHTML = userData.name;
    }
  },
  false
);

function deleteAllCookies() {
  document.cookie.split(";").forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
}
fullname.addEventListener("click", () => {
  deleteAllCookies();
  location.reload();
});
