const handleSlider = () => {
  $(".list-product").slick({
    rows: 2,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow:
      "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
    nextArrow:
      "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
  });
};
const handleSearch = () => {
  let form = document.querySelector("form.banner__search-bar");
  form.addEventListener("submit", (e) => {
    let place = $("select#places").val();
    let tripStart = $("input.trip-start").val();
    let search = $("input.search").val();

    e.preventDefault();
  });
};
// Create our number formatter.
var formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

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
const ftechTours = async () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    credentials: "include",
  };

  return fetch(
    "http://127.0.0.1:3000/api/v1/tours?limit=16&page=1&sort=-recommend",
    requestOptions
  )
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => console.log("err", error));
};
const getTour = async () => {
  const data = await ftechTours();
  console.log(data);
  let localtiontemp = `<a class="list-group-item" href="#">{@location@}</a>`;
  let locationList = [];
  //{@imagecover@} {@location@}   {@tourname@} {@duration@} {@ov1@} {@price@}
  const tour_template = `
  <article class="tour">
  <a class="tour-image" href="#">
    <img class="tour__image" src="{@imagecover@}" alt="Tour" />
    <p class="tour-province">
      <i class="fa-solid fa-location-dot"></i
      ><span class="tour__province"> {@location@} </span>
    </p></a
  >
  <div class="tour-detail">
    <a class="tour__name" href="#"
      >{@tourname@}</a
    >
    <p class="tour-time">
      <i class="fa-solid fa-clock"></i
      ><span class="tour__time">{@duration@}</span>
    </p>
    <ul class="tour__overview">
      <li>{@ov1@}</li>
      <li>{@ov2@}</li>
      <li>{@ov3@}</li>
    </ul>
    <h3 class="tour__price">{@price@}</h3>
  </div>
  <span class="tour__hot">Tour bán chạy</span>
</article>
`;
  var mytour = ``;
  data.data.tours.forEach((tour) => {
    var tempTour = tour_template.replace(
      "{@imagecover@}",
      tour.location.imageCover
    );
    tempTour = tempTour.replace("{@location@}", tour.location.name);
    tempTour = tempTour.replace("{@tourname@}", tour.name);
    tempTour = tempTour.replace("{@duration@}", tour.duration + " ngày");
    const ovsplit = tour.overView.split("|");
    tempTour = tempTour.replace("{@ov1@}", ovsplit[0]);
    tempTour = tempTour.replace("{@ov2@}", ovsplit[1]);
    tempTour = tempTour.replace("{@ov3@}", ovsplit[2]);
    tempTour = tempTour.replace("{@price@}", formatter.format(tour.price));
    mytour = mytour + tempTour;

    locationList.push(tour.location.name);
  });
  const listgroup = document.getElementsByClassName("list-group")[0];
  let locations = "";
  let count = 0;
  locationList.forEach((loc) => {
    if (count > 5) return;
    locations += localtiontemp.replace("{@location@}", loc);
    count++;
  });

  listgroup.innerHTML = locations;
  console.log(listgroup);

  $(".list-product:first").slick("unslick");
  document.getElementsByClassName("list-product")[0].innerHTML = mytour;
  handleSlider();
};
// Hàm main, chạy các hàm vào đây nhé
(() => {
  // getTour();
  handleSlider();
  handleSearch();
  handleLogout();
  checklogin();
  getTour();
})();
