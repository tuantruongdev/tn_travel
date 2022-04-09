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
  document.getElementsByClassName("breadcrumb-item active")[0].innerHTML =
    tour.name;

  document.getElementById("tour-overview").innerHTML = tour.location.overView;

  document.getElementById("tour-description").innerHTML = tour.description;
};

(() => {
  getOneTour();
})();
