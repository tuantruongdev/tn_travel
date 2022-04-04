const getTours = async () => {
  const fetchRawTour = await ftechAPI(
    "http://127.0.0.1:3000/api/v1/tours/raw",
    "GET",
    JSON.stringify({})
  );
  if (fetchRawTour.status !== "success") {
    console.log("get tour failed");
    return;
  }
  return fetchRawTour;
};
const showModalDeleteTour = async (id) => {
  // alert(id);
  // const fetchdelete = await ftechAPI(
  //   "http://127.0.0.1:3000/api/v1/tours/" + id,
  //   "DELETE",
  //   JSON.stringify({})
  // );
  // if (fetchRawTour.status !== "success") {
  //   console.log("get tour failed");
  //   return;
  // }
  //$(".toast").toast("show");
  // $(".toast-body").html("xoá thành công tour ..." + id.substr(-8));
  $(".modal-body").html("Bạn có chắc chắn muốn xoá tour với id: \n" + id);
  $("#confirmBtn").attr("onClick", `deleteTour( "${id}" )`);
};
const deleteTour = async (id) => {
  // alert(id);
  const fetchdelete = await ftechAPI(
    "http://127.0.0.1:3000/api/v1/tours/" + id,
    "DELETE",
    JSON.stringify({})
  );
  if (fetchdelete.status !== "success") {
    $(".toast").toast("show");
    $(".toast-body").html("xoá tour thất bại ..." + id.substr(-8));
    return;
  }
  $(`#${id}`).attr("hidden", "");
  $(".toast").toast("show");
  $(".toast-body").html("xoá thành công tour ..." + id.substr(-8));
};
const showTours = async () => {
  const tours = await getTours();
  console.log(tours);
  const tourTemplate = ` <tr id="{@uuid@}">
  <td></td>
  <th><input type="checkbox"></th>
 
  <td>{@id@}</td>
  <td>{@name@}</td>
  <td>{@price@}</td>
  <td>{@waiting@}</td>
  <td>{@allowed@}</td>
  <td>{@status@}</td>
  <td> <ul class="" id=""> <li><a href="{@link@}">Link</a></li> </ul></td>
  <td>{@createAt@}</td>
  <td>{@startAt@}</td>

  <td>
    <ul class="" id="">
      <li><div data-toggle="modal" data-target="#confirmModal" class="delete" onclick="showModalDeleteTour('{@uid@}')" >Xoá</div></li>
      <li><a  href="{@edit@}">Sửa </a></li>
    </ul>
  </td>
</tr>`;
  let listTourHtml = ``;
  tours.data.tours.forEach((tour) => {
    let tempTour = tourTemplate.replace("{@id@}", "..." + tour._id.substr(-8));
    tempTour = tempTour.replace("{@uid@}", tour._id);
    tempTour = tempTour.replace("{@uuid@}", tour._id);
    tempTour = tempTour.replace("{@name@}", tour.name);
    tempTour = tempTour.replace("{@price@}", tour.price);
    tempTour = tempTour.replace("{@waiting@}", tour.waiting);
    tempTour = tempTour.replace("{@allowed@}", tour.accepted);
    tempTour = tempTour.replace("{@status@}", tour.status);
    tempTour = tempTour.replace(
      "{@edit@}",
      "http://127.0.0.1:5555/Front-End/view-tour/sua-tour.html?id=" + tour._id
    );
    tempTour = tempTour.replace(
      "{@startAt@}",
      new Date(tour.startDate).toLocaleString().split(",")[1] +
        " - " +
        new Date(tour.startDate).toLocaleString().split(",")[0]
    );
    tempTour = tempTour.replace(
      "{@createAt@}",
      new Date(tour.createdAt).toLocaleString().split(",")[1]
    );
    listTourHtml += tempTour;
  });
  document.getElementById("tbodyTour").innerHTML = listTourHtml;
};
(() => {
  showTours();
  // $(".toast").attr("class", "cac");
  //toast.show();
})();
