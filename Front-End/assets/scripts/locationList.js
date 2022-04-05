const getLocations = async () => {
  const fetchlocations = await ftechAPI(
    "http://127.0.0.1:3000/api/v1/locations",
    "GET",
    JSON.stringify({})
  );
  if (fetchlocations.status !== "success") {
    console.log("get locations failed");
    //return;
  }
  return fetchlocations;
};
const showModalDeleteLocation = async (id) => {
  $(".modal-body").html("Bạn có chắc chắn muốn xoá địa danh với id: \n" + id);
  $("#confirmBtn").attr("onClick", `deleteLocation( "${id}" )`);
};
const deleteLocation = async (id) => {
  // alert(id);
  const fetchdelete = await ftechAPI(
    "http://127.0.0.1:3000/api/v1/locations/" + id,
    "DELETE",
    JSON.stringify({})
  );
  if (fetchdelete.status !== "success") {
    $(".toast").toast("show");
    $(".toast-body").html("xoá địa danh thất bại ..." + id.substr(-8));
    return;
  }
  $(`#${id}`).attr("hidden", "");
  $(".toast").toast("show");
  $(".toast-body").html("xoá thành công địa danh ..." + id.substr(-8));
};
const findLocation = async () => {
  const data = await ftechAPI(
    `http://127.0.0.1:3000/api/v1/locations/find?text=${
      document.getElementById("tukhoa").value
    }`,
    "GET",
    JSON.stringify({})
  );
  if (data.status !== "success") {
    console.log("có lỗi sảy ra! " + data.message);
    return;
  }
  showLocations(data);
  //  console.log(data.data.tours);
};
const showLocations = async (tours) => {
  console.log(tours);
  const tourTemplate = ` <tr id="{@uuid@}">
    <td></td>
    <th><input type="checkbox"></th>
   
    <td>{@id@}</td>
    <td>{@name@}</td>
    <td>{@overView@}</td>
    <td><img style="height: 50px; width:70px; object-fit: cover;" src="{@image@}" /></td>
    <td>{@createAt@}</td>
   
  
    <td>
      <ul class="" id="">
        <li><div data-toggle="modal" data-target="#confirmModal" class="delete" onclick="showModalDeleteLocation('{@uid@}')" >Xoá</div></li>
        <li><a  href="{@edit@}">Sửa </a></li>
      </ul>
    </td>
  </tr>`;
  let listTourHtml = ``;
  tours.data.location.forEach((tour) => {
    let tempTour = tourTemplate.replace("{@id@}", "..." + tour._id.substr(-8));
    tempTour = tempTour.replace("{@uid@}", tour._id);
    tempTour = tempTour.replace("{@uuid@}", tour._id);
    tempTour = tempTour.replace("{@name@}", tour.name);
    tempTour = tempTour.replace("{@image@}", tour.imageCover);
    tempTour = tempTour.replace("{@overView@}", tour.overView.slice(0, 60));
    tempTour = tempTour.replace(
      "{@edit@}",
      "http://127.0.0.1:5555/Front-End/view-dia-danh/sua-dia-danh.html?id=" +
        tour._id
    );
    tempTour = tempTour.replace(
      "{@createAt@}",
      new Date(tour.createdAt).toLocaleString().split(",")[1]
    );
    listTourHtml += tempTour;
  });
  document.getElementById("tbodyDiaDanh").innerHTML = listTourHtml;
};
const getAllLocations = async () => {
  const locations = await getLocations();
  showLocations(locations);
};
(() => {
  getAllLocations();
})();
