const handleSlider = () => {
  $(".list-product").slick({
    rows: 2,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow:
      "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
    nextArrow:
      "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
  });
};

const handleSearch = () => {
  let form = document.querySelector("form.banner__search-bar");
  form.addEventListener("submit", (e) => {
    let place = $("select#places").val();
    let tripStart = $("input.trip-start").val();
    let search = $("input.search").val();

    e.preventDefault();
  });
};

// Hàm main, chạy các hàm vào đây nhé
(() => {
  handleSlider();
  handleSearch();
})();
