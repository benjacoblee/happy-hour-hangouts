// const nearby = document.querySelector(".nearby");
// nearby.addEventListener("click", () => {
//   window.navigator.geolocation.getCurrentPosition(success);
//   function success(pos) {
//     var crd = pos.coords;

//     console.log("Your current position is:");
//     console.log(`Latitude : ${crd.latitude}`);
//     console.log(`Longitude: ${crd.longitude}`);
//     console.log(`More or less ${crd.accuracy} meters.`);
//   }
// });

// let crd;

//   function success(pos) {
//      crd = pos.coords;

//     console.log("Your current position is:");
//     console.log(`Latitude : ${crd.latitude}`);
//     console.log(`Longitude: ${crd.longitude}`);
//     console.log(`More or less ${crd.accuracy} meters.`);
//   }
//   window.navigator.geolocation.getCurrentPosition(success);

//   console.log(crd)

// var xhr = new XMLHttpRequest();

// var responseHandler = () => {
//   if (xhr.readyState == 4) {
//     let responseObj = JSON.parse(xhr.responseText);
//     console.log(responseObj.results);
//   }
// };

// xhr.onreadystatechange = responseHandler;
// let endpoint =
//   "https://maps.googleapis.com/maps/api/place/textsearch/json?query=bars+near+me&key=" +
//   "AIzaSyBqS4JvzTk41aPzk_vA2wOgie7Q0KuaAUE";

// `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=
//   AIzaSyBqS4JvzTk41aPzk_vA2wOgie7Q0KuaAUE`

// https: xhr.open("GET", endpoint);
// xhr.send();
// const bookmark = document.querySelector(".fa-bookmark");
// bookmark.addEventListener("click", responseHandler);

console.log(placesSrc);
