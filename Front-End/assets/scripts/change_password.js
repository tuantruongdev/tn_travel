const hanldeAccountMenu = () => {
  let toogle = $(".account-link");
  let menu = $(".account-menu");

  toogle.mouseenter(() => {
    menu.slideDown(300, "swing");
  });
  menu.mouseleave(function (e) {
    $(this).slideUp(300, "swing");
  });
};
const validateForm = () => {
  $("form").submit(function (e) {
    let passOld = $("#old").val();
    let passNew = $("#new").val();
    let passConfirm = $("#confirm").val();
    let messageOld = $(".old-message");
    let messageNew = $(".new-message");
    let messageConfirm = $(".confirm-message");
    // reset message
    messageOld.text("");
    messageNew.text("");
    messageConfirm.text("");
    let flag = true;
    if (passOld.length < 6) {
      messageOld.text("Độ dài mật khẩu quá ngắn < 6 ký tự");
      flag = false;
    } else if (passOld.length > 20) {
      messageOld.text("Mật khẩu quá dài > 20 ký tự");
      flag = false;
    } else if (passNew.length < 6) {
      messageNew.text("Độ dài mật khẩu quá ngắn < 6 ký tự");
      flag = false;
    } else if (passNew.length > 20) {
      messageNew.text("Mật khẩu quá dài > 20 ký tự");
      flag = false;
    } else if (passConfirm !== passNew) {
      messageConfirm.text("Mật khẩu xác nhận không hợp lệ");
      flag = false;
    }
    // Nếu không hợp lệ thì chặn request
    if (flag == false) {
      e.preventDefault();
    }
  });
};
$(() => {
  hanldeAccountMenu();
  validateForm();
});
