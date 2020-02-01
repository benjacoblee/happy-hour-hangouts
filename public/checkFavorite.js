const bookmarkIcon = document.querySelector(".fa-bookmark");

const checkIfBookmarked = function() {
  console.log(this.responseText);
  if (this.responseText === "") {
    bookmarkIcon.style.color = "white";
  } else {
    bookmarkIcon.style.color = "#fbf559";
  }
};

// make a new request
const request = new XMLHttpRequest();

// listen for the request response
request.addEventListener("load", checkIfBookmarked);

// ready the system by calling open, and specifying the url
var url = "http://localhost:3000/bars/checkfavorite";
request.open("GET", url);

// send the request
request.send();
