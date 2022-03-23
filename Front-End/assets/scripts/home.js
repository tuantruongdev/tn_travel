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
      fullname.innerHTML = "Nguyen Tuan Truong";
    }
  },
  false
);
