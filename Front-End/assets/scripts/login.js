const validatePassword = (password) => {
  if (password.length > 20)
    return { message: "Mật khẩu phải quá dài !", result: false };
  else if (password.length < 6)
    return {
      message: "Mật khẩu phải có độ dài ít nhất 6 ký tự !",
      result: false,
    };
  else
    return {
      message: "Ok",
      result: true,
    };
};

const handleValidate = () => {
  // Init
  let form = $("#login-form");
  let username = $("#username");
  let password = $("#password");
  // Validate
  form.submit((e) => {
    const rulePassword = validatePassword(password.val());

    if (rulePassword.result === false) {
      $(".password-message").text(rulePassword.message);
      $(".password-message").css("color", "red");
      e.preventDefault();
    }
  });

  password.change((e) => {
    $(".password-message").text(
      "Mật khẩu của bạn phải dài 8-20 ký tự, chứa các chữ cái và số, đồng thời không được chứa dấu cách, ký tự đặc biệt hoặc biểu tượng cảm xúc. "
    );
    $(".password-message").css("color", "#6c757d");
  });
};
$(() => {
  handleValidate();
});
