const handleShowPassword = () => {
  let input = $("input[type='password']");
  let toogle = $("button.password-toogle");
  input.keydown(() => {
    toogle.show();
  });
  toogle.click(function (e) {
    input.prop("type", "text");
  });
  $(document).click(function (e) {
    // Nếu click bên ngoài đối tượng container thì ẩn
    if (
      !input.is(e.target) &&
      input.has(e.target).length === 0 &&
      !toogle.is(e.target) &&
      toogle.has(e.target).length === 0
    ) {
      toogle.hide();
      input.prop("type", "password");
    }
  });
};

const handleValidateForm = () => {
  
};

$(() => {
  handleShowPassword();
});
