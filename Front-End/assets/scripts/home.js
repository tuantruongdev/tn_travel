const handleSlider = (list) => {
  $(list).slick({
    rows: 2,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow:
      "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
    nextArrow:
      "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
  });
};

$(document).ready(() => {
  handleSlider(".list-product ");
});
