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
const ftechAddTour = async (tourObj) => {
  const addTour = await ftechAPI(
    "http://127.0.0.1:3000/api/v1/tours/",
    "POST",
    JSON.stringify(tourObj)
  );

  return addTour;
};
const addTour = async () => {
  document.getElementById("success").setAttribute("hidden", "");
  document.getElementById("alert").setAttribute("hidden", "");

  const _id = document.getElementById("tourId").value;
  const name = document.getElementById("tourName").value;
  const overView = document.getElementById("overView").value;
  const description = tinymce.get("des").getContent();
  const price = document.getElementById("price").value;
  const duration = document.getElementById("duration").value;
  const recommend = document.getElementById("recommend").value;
  const status = document.getElementById("status").value;
  const startDate = document.getElementById("startAt").value;
  const locid = document.getElementById("location").value;
  // console.log(locid);
  const _addTour = await ftechAddTour({
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
  if (_addTour.status !== "success") {
    document.getElementById("success").setAttribute("hidden", "");
    document.getElementById("alert").removeAttribute("hidden");
    document.getElementById("alert").innerHTML =
      "Có lỗi sảy ra!!   \n" + _addTour.message;
    return;
  }
  document.getElementById("alert").setAttribute("hidden", "");
  document.getElementById("success").removeAttribute("hidden");
  document.getElementById("success").innerHTML =
    "Sửa tour thành công! Về danh sách tour sau 3 giây...";
  await new Promise((r) => setTimeout(r, 3000));
  window.location.href =
    "http://127.0.0.1:5555/Front-End/view-tour/QLtour.html";
};

(() => {
  setlocation();
  document.getElementById("submit").onclick = addTour;
  document.getElementById("des").value = `<h2>Chương trình tour</h2>
  <h4>NGÀY 1: ĐÓN KHÁCH - SƠN TRÀ - MỸ KHÊ - SUNWHEEL ( ĂN TRƯA, CHIỀU)</h4>
  <p style="font-size: medium; font-weight: 400;"><strong>Sáng:</strong>&nbsp;Đón quý khách tại....<br><strong>Chiều:</strong>&nbsp;Khởi hành ...</p>
  <p style="font-size: medium; font-weight: 400;">&nbsp;[image]</p>
  <h4>NGÀY 2: ĐÓN KHÁCH - SƠN TRÀ - MỸ KHÊ - SUNWHEEL ( ĂN TRƯA, CHIỀU)</h4>
  <p style="font-size: medium; font-weight: 400;"><strong>Sáng:</strong>&nbsp;Đón quý khách tại....<br><strong>Chiều:</strong>&nbsp;Khởi hành ...</p>
  <p style="font-size: medium; font-weight: 400;">&nbsp;[image]</p>`;
  tinymce.init({
    selector: "#des",
  });
})();
