const fetchRequests = async (tourId) => {
  const _fetchRequests = await ftechAPI(
    "http://127.0.0.1:3000/api/v1/requests/tour/" + tourId,
    "GET",
    JSON.stringify({})
  );
  if (_fetchRequests.status !== "success") {
    console.log("get requests failed");
    return;
  }
  return _fetchRequests;
};
const approval = async (id, stt) => {
  //alert(id + stt);
  const _fetchRequest = await ftechAPI(
    "http://127.0.0.1:3000/api/v1/requests/" + id,
    "PATCH",
    JSON.stringify({ status: stt })
  );
  if (_fetchRequest.status !== "success") {
    console.log("get requests failed");
    return;
  }
  $(".toast").toast("show");
  $(".toast-body").html("Cập nhật thành công yêu cầu " + id.substr(-8));
  let statusText;
  switch (stt) {
    case 1:
      statusText = "đang chờ";
      break;
    case 2:
      statusText = "đã huỷ";
      break;
    case 3:
      statusText = "không chấp nhận";
      break;
    case 4:
      statusText = "đã đuyệt";
      break;

    default:
      statusText = "Lỗi";

      break;
  }
  document.getElementById("stt_" + id).innerHTML = statusText;
  // $("#TableDon").DataTable().ajax.reload();
};
const showRequest = (requests) => {
  const requestTemplate = `<tr>
  <td></td>
    
    <th><input type="checkbox"></th>
    <td>{@reqId@}</td>
    <td>{@tourName@}</td>
    <td>{@userName@}</td>
    <td>{@userEmail@}</td>
    <td>{@userPhone@}</td>
    <td>{@requestAt@}</td>
    <td id ="stt_{@uid@}">{@status@}</td>
    <td>
      <ul>
        <li><div class="delete" onclick="approval('{@uid@}',3)" >Huỷ</div>
        <li><div class="delete"  onclick="approval('{@uid@}',4)" >Duyệt</div>
      </ul>                  
    </td>
  </tr> `;
  let listRequest = ``;
  requests.forEach((request) => {
    let tempRequest = requestTemplate.replace(
      "{@reqId@}",
      "..." + request._id.substr(-8)
    );
    tempRequest = tempRequest.replace("{@tourName@}", request.tourInfo.name);
    tempRequest = tempRequest.replace("{@userName@}", request.userInfo.name);
    tempRequest = tempRequest.replace("{@userEmail@}", request.userInfo.email);
    tempRequest = tempRequest.replace(
      "{@userPhone@}",
      request.userInfo.phoneNum
    );

    tempRequest = tempRequest.replace(
      "{@requestAt@}",
      new Date(request.requestAt).toLocaleDateString().split("T")[0]
    );

    let statusText;
    switch (request.status) {
      case 1:
        statusText = "đang chờ";
        break;
      case 2:
        statusText = "đã huỷ";
        break;
      case 3:
        statusText = "không chấp nhận";
        break;
      case 4:
        statusText = "đã đuyệt";
        break;

      default:
        statusText = "Lỗi";

        break;
    }
    //alert(typeof request.status);
    tempRequest = tempRequest.replace("{@status@}", statusText);
    tempRequest = tempRequest.replace("{@uid@}", request._id);
    tempRequest = tempRequest.replace("{@uid@}", request._id);
    tempRequest = tempRequest.replace("{@uid@}", request._id);

    listRequest += tempRequest;
  });
  document.getElementById("tbodyDonHang").innerHTML = listRequest;
};
const getRequests = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("id");
  if (!code) {
    window.location.href =
      "http://127.0.0.1:5555/Front-End/view-tour/QLtour.html";
    return;
  }
  const requests = await fetchRequests(code);
  //console.log(requests.data.requests);
  showRequest(requests.data.requests);

  $("#TableDon").DataTable();
};

(() => {
  getRequests();
})();
