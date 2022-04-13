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
$(() => {
  hanldeAccountMenu();
});
