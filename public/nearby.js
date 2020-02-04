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

function success(pos) {
  crd = pos.coords;
  latitude = crd.latitude;
  longitude = crd.longitude;

  nearbyLink.href =
    nearbyLink.href + "?lat=" + latitude + "&" + "long=" + longitude;
  console.log(nearbyLink.href);

  window.location.href = nearbyLink.href;
}

const nearbyLink = document.querySelector("#nearby");
nearbyLink.addEventListener("click", () => {
  let latitude = "";
  let longitude = "";
  event.preventDefault();
  window.navigator.geolocation.getCurrentPosition(success);
});

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

// xhr.open("GET", endpoint);
// xhr.send();

// const bookmark = document.querySelector(".fa-bookmark");
// bookmark.addEventListener("click", responseHandler);
