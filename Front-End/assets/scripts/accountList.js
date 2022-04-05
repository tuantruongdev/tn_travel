var users = ``;
const getUserByEmail = (email) => {
  let myuser = null;
  users.data.users.forEach((user) => {
    if (user.email === email) {
      myuser = user;
    }
  });
  // console.log(myuser);
  return myuser;
};
const getAccounts = async () => {
  const fetchaccounts = await ftechAPI(
    "http://127.0.0.1:3000/api/v1/users",
    "GET",
    JSON.stringify({})
  );
  if (fetchaccounts.status !== "success") {
    console.log("get locations failed");
    //return;
  }
  return fetchaccounts;
};
const updateRole = async (id) => {
  // alert(id + document.getElementById(id).value);
  const fetchUpdateAccounts = await ftechAPI(
    "http://127.0.0.1:3000/api/v1/users/promote",
    "PATCH",
    JSON.stringify({
      email: id,
      role: document.getElementById(id).value,
    })
  );
  if (fetchUpdateAccounts.status !== "success") {
    console.log("get locations failed");
    //return;
    document.getElementById("ThongBao").innerHTML = "có lỗi sảy ra";
    return;
  }
  document.getElementById("ThongBao").innerHTML =
    "Set role " +
    document.getElementById(id).value +
    " cho user " +
    id +
    " Thành công!";
};
const showModalDeleteLocation = async (id) => {
  const myuser = getUserByEmail(id);
  $(".modal-body").html(`<span>Thông tin user:  ${myuser._id}</span>
  <br>
  <span>Fullname: ${myuser.name}</span>
  <br>
  <span>Email: ${myuser.email}</span>
  <br>
  <span>Phone: ${myuser.phoneNum}</span>
  <br>
  <span>Role: ${myuser.role}</span>
  <br>
  <span>Địa chỉ: ${myuser.address}</span>
  `);
  // $("#confirmBtn").attr("onClick", `deleteLocation( "${id}" )`);
};
//luời rename biến, thông cảm =))  nó vẫn chạy rất tốt
const showUsers = async () => {
  const tourTemplate = ` <tr id="{@uuid@}">
      <td></td>
      <th><input type="checkbox"></th>
     
      <td>{@id@}</td>
      <td>{@name@}</td>
      <td>{@email@}</td>
      <td>  
      <select id="{@uuuid@}" class="form-control">
      <option {@user@} value="user">user</option>
      <option  {@admin@} value="admin">admin</option>
    </select></td>
      <td>ok</td>
     
    
      <td>
        <ul class="" id="">
          <li><div class="delete"  onclick="updateRole('{@uid@}')" >Cập nhật</div></li>
          <li><div class="delete" data-toggle="modal" data-target="#confirmModal" class="delete" onclick="showModalDeleteLocation('{@uid@}')"  ">Xem </a></li>
        </ul>
      </td>
    </tr>`;
  let listTourHtml = ``;
  users.data.users.forEach((tour) => {
    let tempTour = tourTemplate.replace("{@id@}", "..." + tour._id.substr(-8));
    tempTour = tempTour.replace("{@uid@}", tour.email);
    tempTour = tempTour.replace("{@uid@}", tour.email);
    tempTour = tempTour.replace("{@uuid@}", tour._id);
    tempTour = tempTour.replace("{@uuuid@}", tour.email);
    //luoi` replace tat ca, thong cam :<
    tempTour = tempTour.replace("{@name@}", tour.name);

    if (tour.role === "admin") {
      tempTour = tempTour.replace("{@admin@}", "selected");
    }
    tempTour = tempTour.replace("{@name@}", tour.name);

    tempTour = tempTour.replace("{@email@}", tour.email);
    tempTour = tempTour.replace(
      "{@edit@}",
      "http://127.0.0.1:5555/Front-End/view-tai-khoan/xem-chi-tiet-TK.html?id=" +
        tour._id
    );
    tempTour = tempTour.replace(
      "{@createAt@}",
      new Date(tour.createdAt).toLocaleString().split(",")[1]
    );
    listTourHtml += tempTour;
  });
  document.getElementById("tbodyTaiKhoan").innerHTML = listTourHtml;
};

const getAllUsers = async () => {
  users = await getAccounts();
  showUsers();
};
const findUser = async () => {
  //console.log("acccc");
  users = await ftechAPI(
    `http://127.0.0.1:3000/api/v1/users/find?text=${
      document.getElementById("tukhoa").value
    }`,
    "GET",
    JSON.stringify({})
  );
  if (users.status !== "success") {
    console.log("có lỗi sảy ra! " + data.message);
    return;
  }
  showUsers();
  //console.log(users);
};
(() => {
  getAllUsers();
})();
