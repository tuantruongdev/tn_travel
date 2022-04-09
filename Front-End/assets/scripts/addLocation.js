const ftechAddLocation = async (locationObj) => {
  const addLocations = await ftechAPI(
    "http://127.0.0.1:3000/api/v1/locations/",
    "POST",
    JSON.stringify(locationObj)
  );

  return addLocations;
};
function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}
const addLocation = async () => {
  document.getElementById("success").setAttribute("hidden", "");
  document.getElementById("alert").setAttribute("hidden", "");

  const _id = document.getElementById("maTour").value;
  const name = document.getElementById("tenDiaDanh").value;
  const overView = document.getElementById("overView").value;
  const description = document.getElementById("moTa").value;

  const imageCover = document.getElementById("imageCover").value;
  if (!validURL(imageCover)) {
    document.getElementById("success").setAttribute("hidden", "");
    document.getElementById("alert").removeAttribute("hidden");
    document.getElementById("alert").innerHTML = "URL không đúng";
    return;
  }

  const listImage = document.getElementById("listImage").value.split("\n");
  if (
    listImage[listImage.length - 1] === "" ||
    listImage[listImage.length - 1] === " "
  ) {
    listImage.pop();
  }

  listImage.forEach((img) => {
    if (!validURL(img)) {
      document.getElementById("success").setAttribute("hidden", "");
      document.getElementById("alert").removeAttribute("hidden");
      document.getElementById("alert").innerHTML = "List URL không đúng";
      return;
    }
  });

  //console.log(listImage);

  const _addLocation = await ftechAddLocation({
    name,
    overView,
    description,
    imageCover,
    images: listImage,
  });

  if (_addLocation.status !== "success") {
    document.getElementById("success").setAttribute("hidden", "");
    document.getElementById("alert").removeAttribute("hidden");
    document.getElementById("alert").innerHTML =
      "Có lỗi sảy ra!!  " + _addLocation.message;
    return;
  }
  document.getElementById("alert").setAttribute("hidden", "");
  document.getElementById("success").removeAttribute("hidden");
  document.getElementById("success").innerHTML =
    "Thêm địa điểm thành công! Về danh sách địa điểm sau 3 giây...";
  await new Promise((r) => setTimeout(r, 3000));
  window.location.href =
    "http://127.0.0.1:5555/Front-End/view-dia-danh/QLdiadanh.html";
};
(() => {
  document.getElementById("btnXacNhan").onclick = addLocation;
  document.getElementById("moTa").value = `<h3> <Tên địa danh> </h3>
  <p>
     <Một đoạn văn siêu dài về địa danh>
  </p>
  <h3>Những trải nghiệm thú vị trong chương trình</h3>
  <p>
  <Những trải nghiệm hết sức thú vị trong tour>
  </p>`;
  tinymce.init({
    selector: "#moTa",
  });
})();
