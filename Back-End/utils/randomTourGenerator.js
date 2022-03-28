const catchAsync = require("./catchAsync");
const Tour = require("../models/tourModel");
const Location = require("../models/locationModel");

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// exports.addRandomTour = catchAsync(async (req, res) => {
//   /*
//   const imglist = [
//     "https://images.unsplash.com/photo-1648019719672-e117b469981d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     "https://images.unsplash.com/photo-1504457047772-27faf1c00561?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1547&q=80",
//     "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     "https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     "https://images.unsplash.com/photo-1521993117367-b7f70ccd029d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1440&q=80",
//     "https://images.unsplash.com/photo-1557750255-c76072a7aad1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     "https://images.unsplash.com/photo-1480996408299-fc0e830b5db1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
//     "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     "https://images.unsplash.com/photo-1521019795854-14e15f600980?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
//     "https://images.unsplash.com/photo-1555979864-7a8f9b4fddf8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
//     "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
//     "https://images.unsplash.com/photo-1588411393236-d2524cca1196?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
//     "https://images.unsplash.com/photo-1526139334526-f591a54b477c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     "https://images.unsplash.com/photo-1555921015-5532091f6026?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     "https://images.unsplash.com/photo-1536086845112-89de23aa4772?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     "https://images.unsplash.com/photo-1609412058473-c199497c3c5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     "https://images.unsplash.com/photo-1604325099517-d9ff3c837c3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1568&q=80",
//     "https://images.unsplash.com/photo-1545172538-171a802bd867?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
//     "https://images.unsplash.com/photo-1561461221-959c3f16234b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     "https://images.unsplash.com/photo-1541079033018-63489731598f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     "https://images.unsplash.com/photo-1570366583862-f91883984fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
//     "https://images.unsplash.com/photo-1596085245533-60589d0dac38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
//   ];
//   const provincelist = [
//     "Tràng An",
//     "Chùa Bái Đính",
//     "Tam Cốc Bích Động",
//     "Hang Múa",
//     "Tam Đảo",
//     "Hà Nội",
//     "Vịnh Hạ Long",
//     "Sapa",
//     "Hà Giang",
//     "Đà Lạt",
//     "Vũng Tàu",
//     "Hang Sơn Đoòng",
//     "Đảo Phú Quốc",
//     "Khu bảo tồn thiên nhiên Sơn Trà",
//     "Hội An",
//     "Cao nguyên Đồng Văn",
//     "Làng An Bằng, Huế",
//     "Côn Đảo",
//     "Thác Bản Giốc",
//     "Huế",
//     "Vườn Quốc gia Phong Nha – Kẻ Bàng",
//     "Vườn Quốc gia Cúc Phương",
//     "Thánh địa Mỹ Sơn",
//     "Cù Lao Chàm",
//     "Mũi Né",
//     "Đồng bằng sông Cửu Long",
//     "Biển Đà Nẵng",
//     "Ninh Thuận",
//     "Thung lũng Bắc Sơn",
//     "Tà Xùa",
//   ];
//   const priceList = [
//     500000, 600000, 750000, 800000, 850000, 900000, 1000000, 1200000, 1500000,
//     1350000, 2000000,
//   ];

//   let dummylocation = {
//     name: "tour name2323",
//     description:
//       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
//     overView:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
//     imageCover:
//       "https://media.istockphoto.com/photos/eiffel-tower-in-paris-france-picture-id924891460?s=612x612",
//     images: [
//       "https://media.istockphoto.com/photos/eiffel-tower-in-paris-france-picture-id924891460?s=612x612",
//       "https://media.istockphoto.com/photos/eiffel-tower-in-paris-france-picture-id924891460?s=612x612",
//       "https://media.istockphoto.com/photos/eiffel-tower-in-paris-france-picture-id924891460?s=612x612",
//     ],
//   };
//   for (let i = 0; i < 30; i += 1) {
//     const randomProvince = randomIntFromInterval(0, provincelist.length);

//     dummylocation.localtion = provincelist[randomProvince];
//     dummylocation.name = `${dummylocation.localtion}`;

//     dummylocation.imageCover =
//       imglist[randomIntFromInterval(0, imglist.length - 1)];
//     dummylocation.images = [
//       imglist[randomIntFromInterval(0, imglist.length)],
//       imglist[randomIntFromInterval(0, imglist.length)],
//       imglist[randomIntFromInterval(0, imglist.length)],
//       imglist[randomIntFromInterval(0, imglist.length)],
//     ];
//     dummylocation.duration = randomIntFromInterval(1, 30);
//     await Location.create(dummylocation);
//   }
//   //  const newTour = await Tour.create(req.body);
// */

//   //const locals = await Location.find().select("_id");
//   res.status(201).json({
//     status: "success",
//     // locals,
//   });
// });
/*
exports.addRandomTour = catchAsync(async (req, res) => {
  const provincelist = [
    "623c5ff9c6ef994f1ff3f622",
    "623c5ff9c6ef994f1ff3f624",
    "623c5ff9c6ef994f1ff3f626",
    "623c5ff9c6ef994f1ff3f628",
    "623c5ff9c6ef994f1ff3f62a",
    "623c5ff9c6ef994f1ff3f62c",
    "623c5ff9c6ef994f1ff3f62e",
    "623c5ff9c6ef994f1ff3f630",
    "623c5ff9c6ef994f1ff3f632",
    "623c5ffac6ef994f1ff3f634",
    "623c5ffac6ef994f1ff3f636",
    "623c5ffac6ef994f1ff3f638",
    "623c5ffac6ef994f1ff3f63a",
    "623c5ffac6ef994f1ff3f63c",
    "623c5ffac6ef994f1ff3f63e",
    "623c5ffac6ef994f1ff3f640",
    "623c5ffac6ef994f1ff3f642",
    "623c5ffac6ef994f1ff3f644",
    "623c5ffac6ef994f1ff3f646",
    "623c5ffac6ef994f1ff3f648",
    "623c5ffac6ef994f1ff3f64a",
    "623c5ffac6ef994f1ff3f64c",
    "623c5ffac6ef994f1ff3f64e",
    "623c5ffac6ef994f1ff3f650",
    "623c5ffac6ef994f1ff3f652",
    "623c5ffac6ef994f1ff3f654",
    "623c5ffac6ef994f1ff3f656",
    "623c5ffbc6ef994f1ff3f658",
    "623c5ffbc6ef994f1ff3f65a",
    "623c5ffbc6ef994f1ff3f65c",
  ];
  const priceList = [
    500000, 600000, 750000, 800000, 850000, 900000, 1000000, 1200000, 1500000,
    1350000, 2000000,
  ];

  let dummytour = {
    name: "tour name2323",
    duration: "7",
    localtionId: "hà nội",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    overView:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    status: "tour status",
    recommend: 1,
    price: "50000",

    startDate: "2022-02-26T12:23:51.378Z",
  };
  for (let i = 0; i < 30; i += 1) {
    const randomProvince = randomIntFromInterval(0, provincelist.length);
    const randomprice = randomIntFromInterval(0, priceList.length);
    const local = await Location.findById(provincelist[randomProvince]).select(
      "name"
    );

    if (local.name === null) {
      continue;
    }
    dummytour.locationId = provincelist[randomProvince];
    dummytour.name = `Du lịch ${local.name}`;
    dummytour.price = priceList[randomprice];
    dummytour.duration = randomIntFromInterval(2, 30);
    await Tour.create(dummytour);
  }
  //  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: "success",
  });
});
*/
exports.addRandomTour = catchAsync(async (req, res) => {
  const notelist = [
    "Xe giường nằm",
    "Vé máy bay hạng thương gia",
    "Phòng V.I.P",
    "Vé sân golf",
    "Thời tiết đẹp",
    "Xe đưa đón hạng sang",
    "Thiên nhiên hùng vĩ",
    "Thưởng thức BBQ hải sản",
    "View biển tuyệt đẹp",
    "Thời gian đẹp trong năm",
    "Danh lam thắng cảnh",
    "Khu vực lịch sử",
  ];
  const priceList = [
    5000000, 6000000, 7500000, 8000000, 8500000, 9000000, 10000000, 12000000,
    15000000, 13500000, 20000000,
  ];

  const tours = await Tour.find();
  const toursArray = tours.map((tour) => {
    return tour.id;
  });
  console.log(toursArray);
  for (let i = 0; i < 34; i += 1) {
    await Tour.findByIdAndUpdate(toursArray[i], {
      overView: `${notelist[randomIntFromInterval(0, notelist.length - 1)]}|${
        notelist[randomIntFromInterval(0, notelist.length - 1)]
      }|${notelist[randomIntFromInterval(0, notelist.length - 1)]}`,
      price: priceList[randomIntFromInterval(0, priceList.length - 1)],
    });
  }
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: "success",
  });
});
