const ftechAPI = async (url, method, raw = {}) => {
  //   var raw = JSON.stringify({
  //     email: userName,
  //     password: password,
  //   });
  //console.log(raw);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: method,
    headers: myHeaders,
    redirect: "follow",
    credentials: "include",
  };
  if (method !== "GET" && method !== "DELETE") {
    requestOptions.body = raw;
  }

  //console.log(requestOptions);
  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => console.log("err", error));
};
