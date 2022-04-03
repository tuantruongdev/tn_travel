const getTour = async (tourId) => {
  const fetchRawTour = await ftechAPI(
    "http://127.0.0.1:3000/api/v1/tours/" + tourId,
    "GET",
    JSON.stringify({})
  );
  if (fetchRawTour.status !== "success") {
    console.log("get tour failed");
    return;
  }
  return fetchRawTour;
};
const updateTour = async (tourId, obj) => {
  const updateTour = await ftechAPI(
    "http://127.0.0.1:3000/api/v1/tours/" + tourId,
    "PATCH",
    JSON.stringify(obj)
  );

  return updateTour;
};

const getLocation = async () => {
  const fetchlocation = await ftechAPI(
    "http://127.0.0.1:3000/api/v1/locations",
    "GET",
    JSON.stringify({})
  );
  if (fetchlocation.status !== "success") {
    console.log("get location failed");
    return;
  }
  return fetchlocation;
};
const tourFetch = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("id");
  if (!code) {
    window.location.href =
      "http://127.0.0.1:5555/Front-End/view-tour/QLtour.html";
    return;
  }
  const tour = await getTour(code);
  document.getElementById("tourId").value = tour.data.tours._id;
  document.getElementById("tourName").value = tour.data.tours.name;
  document.getElementById("overView").value = tour.data.tours.overView;
  document.getElementById("des").value = tour.data.tours.description;
  document.getElementById("price").value = tour.data.tours.price;
  document.getElementById("duration").value = tour.data.tours.duration;
  document.getElementById("recommend").value = tour.data.tours.recommend;
  document.getElementById("status").value = tour.data.tours.status;
  document.getElementById("startAt").value = new Date(tour.data.tours.startDate)
    .toISOString()
    .split("T")[0];
  setlocation(tour.data.tours.locationId);
  //console.log(new Date(tour.data.tours.startDate).toISOString().split(",")[0]);
};
const setlocation = async (locid) => {
  const locations = await getLocation();
  const itemTemplate = `<option {} value="{@value@}">{@text@}</option>`;
  let itemList = ``;
  if (!locations) {
    return;
  }
  locations.data.location.forEach((location) => {
    let tempOpt = ``;
    tempOpt = itemTemplate.replace("{@value@}", location._id);
    tempOpt = tempOpt.replace(
      "{@text@}",
      location.name + " - " + location._id.substr(-3)
    );
    itemList += tempOpt;
  });
  document.getElementById("location").innerHTML = itemList;
  document.getElementById("location").value = locid;
};
const editTour = async () => {
  document.getElementById("success").setAttribute("hidden", "");
  document.getElementById("alert").setAttribute("hidden", "");

  const _id = document.getElementById("tourId").value;
  const name = document.getElementById("tourName").value;
  const overView = document.getElementById("overView").value;
  const description = document.getElementById("des").value;
  const price = document.getElementById("price").value;
  const duration = document.getElementById("duration").value;
  const recommend = document.getElementById("recommend").value;
  const status = document.getElementById("status").value;
  const startDate = document.getElementById("startAt").value;
  const locid = document.getElementById("location").value;
  console.log(locid);
  const _updateTour = await updateTour(_id, {
    name,
    overView,
    description,
    price,
    duration,
    recommend,
    status,
    startDate,
    locationId: locid,
  });
  if (_updateTour.status !== "success") {
    document.getElementById("success").setAttribute("hidden", "");
    document.getElementById("alert").removeAttribute("hidden");
    document.getElementById("alert").innerHTML = "Có lỗi sảy ra!!";
    return;
  }
  document.getElementById("alert").setAttribute("hidden", "");
  document.getElementById("success").removeAttribute("hidden");
  document.getElementById("success").innerHTML = "Sửa tour thành công!";
  console.log(_updateTour);
};
(() => {
  tourFetch();

  document.getElementById("submit").onclick = editTour;
})();
