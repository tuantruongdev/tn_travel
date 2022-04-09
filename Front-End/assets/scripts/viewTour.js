const fetchTour = async (tourId) => {
  const fetchTour = await ftechAPI(
    "http://127.0.0.1:3000/api/v1/tours/" + tourId,
    "GET",
    JSON.stringify({})
  );
  if (fetchTour.status !== "success") {
    console.log("get tour failed");
    alert("tour không tồn tại");
    window.location.href = "http://127.0.0.1:5555/Front-End/index.html";
    return;
  }
  return fetchTour;
};
const checkoutTour = async (tourId) => {
  const fetchTour = await ftechAPI(
    "http://127.0.0.1:3000/api/v1/tours/checkout/" + tourId,
    "POST",
    JSON.stringify({})
  );
  if (fetchTour.status !== "success") {
    console.log("checkout tour failed");
    alert("checkout tour failed");
    //   window.location.href = "http://127.0.0.1:5555/Front-End/index.html";
    return;
  }
  return fetchTour;
};
var formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
const getOneTour = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("id");
  if (!code) {
    window.location.href = "http://127.0.0.1:5555/Front-End/index.html";
    return;
  }
  const tour = await fetchTour(code);
  console.log(tour);
  showTour(tour.data.tours);
};
const showTour = (tour) => {
  //<img src="https://images.unsplash.com/photo-1557750255-c76072a7aad1?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80" style="height: 390px;width: 750px;" alt="img">
  document.getElementsByClassName("tour-img")[0].children[0].src =
    tour.location.imageCover;
  document.getElementById("tour-").innerHTML = tour.location.name;
  document.getElementById("tour-time").innerHTML = tour.duration + " ngày";
  document.getElementById("tour-id").innerHTML = tour.location._id.substr(-8);
  const startDate = new Date(tour.startDate);

  document.getElementById("tour-start").innerHTML = startDate
    .toLocaleDateString()
    .split("T")[0];

  document.getElementsByClassName("breadcrumb-item active")[0].innerHTML =
    tour.name;

  document.getElementById("tour-overview").innerHTML =
    tour.location.description;

  document.getElementById("tour-description").innerHTML = tour.description;

  //   $(".quantity").on("input", () => {
  //     alert("cu");
  //   });
  document.getElementsByClassName("total")[0].innerHTML = formatter.format(
    tour.price * 1
  );
  let tourDes = tour.description;
  for (var i = 0; i < tour.location.images.length; i++) {
    //   alert(i);
    tourDes = tourDes.replace(
      "[image]",
      `<img src="${tour.location.images[i]}" alt="" class="d-block w-100"></img>`
    );
  }
  document.getElementById("tour-description").innerHTML = tourDes;

  document.getElementById("quantity").oninput = () => {
    // alert("cac");
    var currentValue = document.getElementById("quantity").value;
    document.getElementsByClassName("total")[0].innerHTML = formatter.format(
      tour.price * currentValue
    );
  };

  document.getElementsByClassName("decrement")[0].onclick = () => {
    if (document.getElementById("quantity").value > 1)
      document.getElementById("quantity").value =
        document.getElementById("quantity").value - 1;
    var currentValue = document.getElementById("quantity").value;
    document.getElementsByClassName("total")[0].innerHTML = formatter.format(
      tour.price * currentValue
    );
  };
  document.getElementsByClassName("increment")[0].onclick = () => {
    if (document.getElementById("quantity").value < 20)
      document.getElementById("quantity").value =
        parseFloat(document.getElementById("quantity").value) + 1;
    var currentValue = document.getElementById("quantity").value;
    document.getElementsByClassName("total")[0].innerHTML = formatter.format(
      tour.price * currentValue
    );
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
const handleCheckout = async () => {
  var form = document.getElementsByTagName("form")[0];
  form.addEventListener("submit", async (event) => {
    //  alert("cu");
    event.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("id");
    if (!code) {
      window.location.href = "http://127.0.0.1:5555/Front-End/index.html";
      return;
    }
    const checkout = await checkoutTour(code);
    if (checkout.status === "success") {
      alert(
        "Đặt tour thành công, Vui lòng xem lịch sử đặt tour để xem trạng thái đơn của bạn! "
      );
    }
  });
};
(() => {
  getOneTour();
  // handleLogout();
  checklogin();
  document.getElementsByClassName("username")[0].onclick = () => {
    window.location.href = "http://127.0.0.1:5555/Front-End/account-page.html";
  };
  handleCheckout();
})();
